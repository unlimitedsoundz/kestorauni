import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Exchange Students — Study Abroad at Heffring University Helsinki, Finland',
    description: 'Information for exchange students at Heffring University. Orientation, courses, student housing, and support for Erasmus+ and bilateral exchange programmes in Helsinki.',
};

export default function ExchangeGuideLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
