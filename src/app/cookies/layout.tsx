import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy — Heffring University',
    description: 'How Heffring University uses cookies and similar technologies to ensure proper functionality, improve user experience, and analyse website usage.',
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
