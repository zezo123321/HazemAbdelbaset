'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const primaryLinks = NAV_LINKS.filter((link) => link.label !== 'Start Project');
    const ctaLink = NAV_LINKS.find((link) => link.label === 'Start Project');

    return (
        <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/" className={styles.logo} aria-label="Hazem Abdelbaset home">
                <span>HA.</span>
                <small>Hazem Abdelbaset</small>
            </Link>

            <div className={styles.desktopLinks}>
                {primaryLinks.map((item) => (
                    <Link key={`${item.label}-${item.href}`} href={item.href} className={styles.link}>
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className={styles.actions}>
                {ctaLink && <Link href={ctaLink.href} className={styles.cta}>{ctaLink.label}</Link>}
                <button
                    className={styles.menuButton}
                    onClick={() => setIsMenuOpen((value) => !value)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            <div
                id="mobile-menu"
                className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ''}`}
                aria-hidden={!isMenuOpen}
            >
                {NAV_LINKS.map((item) => (
                    <Link key={`${item.label}-${item.href}`} href={item.href} className={styles.mobileLink}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
