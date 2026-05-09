import VibeShell from '@/vibe/VibeShell';

export default function VibeLayout({ children }: { children: React.ReactNode }) {
  return <VibeShell>{children}</VibeShell>;
}
