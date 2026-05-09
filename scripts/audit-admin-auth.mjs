/**
 * Admin Auth Audit Script
 * 
 * Scans the project for common admin authorization security issues.
 * Run: node scripts/audit-admin-auth.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const SRC = join(process.cwd(), 'src');
const SUPABASE = join(process.cwd(), 'supabase');
let passed = 0;
let failed = 0;
let warnings = 0;

function log(icon, msg) {
    console.log(`  ${icon} ${msg}`);
}

function pass(msg) { log('✅', msg); passed++; }
function fail(msg) { log('❌', msg); failed++; }
function warn(msg) { log('⚠️ ', msg); warnings++; }

function getAllFiles(dir, ext = ['.ts', '.tsx']) {
    const results = [];
    try {
        const items = readdirSync(dir);
        for (const item of items) {
            const fullPath = join(dir, item);
            try {
                const stat = statSync(fullPath);
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    results.push(...getAllFiles(fullPath, ext));
                } else if (ext.some(e => item.endsWith(e))) {
                    results.push(fullPath);
                }
            } catch {}
        }
    } catch {}
    return results;
}

function readFile(path) {
    try { return readFileSync(path, 'utf8'); } catch { return ''; }
}

console.log('\n🔐 Admin Auth Security Audit\n');
console.log('=' .repeat(60));

// ─── CHECK 1: admin_users migration exists ──────────────
console.log('\n📋 1. Migration Files\n');

const migrationDir = join(SUPABASE, 'migrations');
const adminMigration = join(migrationDir, '006_admin_users.sql');
const adminMigrationContent = readFile(adminMigration);

if (adminMigrationContent.includes('admin_users')) {
    pass('006_admin_users.sql exists and defines admin_users table');
} else {
    fail('006_admin_users.sql is missing or does not define admin_users table');
}

if (adminMigrationContent.includes('is_admin')) {
    pass('is_admin() helper function defined');
} else {
    warn('is_admin() helper function not found in migration');
}

// ─── CHECK 2: admin setup SQL exists ────────────────────
const setupSql = readFile(join(SUPABASE, 'setup', 'create-first-admin.sql'));
if (setupSql.includes('INSERT INTO admin_users')) {
    pass('Admin setup SQL template exists');
} else {
    fail('Missing supabase/setup/create-first-admin.sql');
}

// ─── CHECK 3: requireAdmin function ─────────────────────
console.log('\n📋 2. requireAdmin Implementation\n');

const actionsFile = readFile(join(SRC, 'app', 'admin', 'actions.ts'));

if (actionsFile.includes('async function requireAdmin')) {
    pass('requireAdmin() function exists in actions.ts');
} else {
    fail('requireAdmin() function NOT found in actions.ts');
}

// Check for the dangerous pattern: return before admin check
const requireAdminMatch = actionsFile.match(/async function requireAdmin[\s\S]*?return/);
if (requireAdminMatch) {
    const fnBody = requireAdminMatch[0];
    if (
        (fnBody.includes('admin_users') && fnBody.includes('adminRecord')) ||
        fnBody.includes("rpc('is_admin'")
    ) {
        pass('requireAdmin checks admin_users table BEFORE returning');
    } else {
        fail('CRITICAL: requireAdmin may return BEFORE checking admin_users');
    }
} else {
    fail('Could not parse requireAdmin function body');
}

// Verify it throws on no admin record
if (actionsFile.includes('if (!adminRecord) throw') || actionsFile.includes('if (error || !isAdmin) throw')) {
    pass('requireAdmin throws error when user is not admin');
} else {
    fail('requireAdmin does NOT throw when user is not admin');
}

// ─── CHECK 4: All admin actions use requireAdmin ────────
console.log('\n📋 3. Admin Action Protection\n');

const adminActionFiles = getAllFiles(join(SRC, 'app', 'admin'))
    .filter(f => f.endsWith('actions.ts'));

for (const filePath of adminActionFiles) {
    const content = readFile(filePath);
    const relPath = relative(process.cwd(), filePath);
    
    // Check for old requireAuth
    if (content.includes('function requireAuth') || 
        (content.includes('requireAuth()') && !content.includes('requireAdmin'))) {
        fail(`${relPath}: Still uses requireAuth (not requireAdmin)`);
    }
    
    // Find exported async functions (mutations)
    const exportedFns = content.match(/export async function (\w+)/g) || [];
    for (const fn of exportedFns) {
        const fnName = fn.replace('export async function ', '');
        
        // Skip read-only functions
        if (['getBookingProfile', 'getPopupOptions'].includes(fnName)) continue;
        
        // Check if function uses requireAdmin or has admin check
        const fnBody = content.split(fn)[1]?.split('export ')[0] || '';
        if (fnBody.includes('requireAdmin()') || fnBody.includes('admin_users')) {
            pass(`${relPath}: ${fnName} → protected by requireAdmin`);
        } else if (fnBody.includes('createClient()') && !fnBody.includes('admin_users')) {
            fail(`${relPath}: ${fnName} → uses createClient without admin check`);
        }
    }
}

// ─── CHECK 5: RLS policies use admin_users ──────────────
console.log('\n📋 4. RLS Policies\n');

const sqlFiles = getAllFiles(migrationDir, ['.sql']);
let rlsAdminCount = 0;
let rlsAuthenticatedCount = 0;

for (const sqlFile of sqlFiles) {
    const content = readFile(sqlFile);
    const relPath = relative(process.cwd(), sqlFile);
    
    // Count admin_users references in policies
    const adminMatches = content.match(/admin_users/g);
    if (adminMatches) rlsAdminCount += adminMatches.length;
    
    // Check for dangerous "authenticated" policies that should be admin
    if (content.includes("auth.role() = 'authenticated'") && 
        !relPath.includes('popups')) { // popups already fixed
        warn(`${relPath}: Uses auth.role() = 'authenticated' — may need admin_users check`);
        rlsAuthenticatedCount++;
    }
}

if (rlsAdminCount > 0) {
    pass(`RLS policies reference admin_users (${rlsAdminCount} references found)`);
} else {
    fail('No RLS policies reference admin_users');
}

if (rlsAuthenticatedCount === 0) {
    pass('No dangerous "authenticated = admin" RLS policies in new migrations');
} else {
    warn(`${rlsAuthenticatedCount} RLS policies use authenticated role (may be from existing migrations)`);
}

// ─── CHECK 6: Middleware protection ─────────────────────
console.log('\n📋 5. Middleware Protection\n');

const middlewareContent = readFile(join(SRC, 'utils', 'supabase', 'middleware.ts'));

if (middlewareContent.includes('/admin') && middlewareContent.includes('/login')) {
    pass('Middleware redirects unauthenticated /admin requests to /login');
} else {
    fail('Middleware does NOT protect /admin routes');
}

if (middlewareContent.includes('getUser')) {
    pass('Middleware refreshes user session');
} else {
    warn('Middleware may not refresh sessions');
}

// ─── SUMMARY ────────────────────────────────────────────
console.log('\n' + '='.repeat(60));
console.log(`\n📊 AUDIT SUMMARY`);
console.log(`   ✅ Passed:   ${passed}`);
console.log(`   ❌ Failed:   ${failed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log();

if (failed > 0) {
    console.log('🚨 CRITICAL ISSUES FOUND — Review and fix before deploying.\n');
    process.exit(1);
} else if (warnings > 0) {
    console.log('⚠️  Minor issues found — Review warnings above.\n');
    process.exit(0);
} else {
    console.log('🎉 All checks passed!\n');
    process.exit(0);
}
