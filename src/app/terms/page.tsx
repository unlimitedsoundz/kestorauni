import TermsContent from '@/components/legal/TermsContent';

export const metadata = {
    title: 'Terms of Use and Conditions | Kestora University',
    description: 'The terms governing the use of Kestora University digital platforms and services.',
    alternates: {
        canonical: 'https://kestora.online/terms/',
    },
};

export default function TermsOfUsePage() {
    return <TermsContent />;
}
