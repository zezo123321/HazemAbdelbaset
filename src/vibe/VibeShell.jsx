'use client';

import { ThemeProvider } from '@/vibe/contexts/ThemeContext';
import Layout from '@/vibe/components/Layout';

export default function VibeShell({ children }) {
  return (
    <ThemeProvider>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

