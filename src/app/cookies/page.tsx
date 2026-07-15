import CookiesContent from '@/components/legal/CookiesContent';

export const metadata = {
    title: 'Cookie Policy | Heffring University',
    description: 'How Heffring University uses cookies and similar technologies to ensure proper functionality and improve user experience.',
    alternates: {
        canonical: 'https://heffring.online/cookies/',
    },
};

export default function CookiePolicyPage() {
    return <CookiesContent />;
}
