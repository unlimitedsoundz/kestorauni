import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers | Heffring University',
    description: 'Join the Heffring University team. Explore our open positions and learn about our multi-disciplinary institutional culture in Helsinki, Finland.',
    alternates: {
        canonical: 'https://www.heffring.online/careers',
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
