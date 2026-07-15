import TermsContent from '@/components/legal/TermsContent';

export const metadata = {
    title: 'Terms of Use and Conditions | Heffring University',
    description: 'The terms governing the use of Heffring University digital platforms and services.',
    alternates: {
        canonical: 'https://heffring.online/terms/',
    },
};

export default function TermsOfUsePage() {
    return <TermsContent />;
}
