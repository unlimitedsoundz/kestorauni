import CookiesContent from '@/components/legal/CookiesContent';

export const metadata = {
    title: 'Cookie Policy | Kestora University',
    description: 'How Kestora University uses cookies and similar technologies to ensure proper functionality and improve user experience.',
    alternates: {
        canonical: 'https://kestora.online/cookies/',
    },
};

export default function CookiePolicyPage() {
    return <CookiesContent />;
}
