
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { School } from '@/types/database';

export const metadata = {
    title: 'Academic Schools — Heffring University Helsinki, Finland | Arts, Business, Science, Technology',
    description: 'Heffring University is organized into eight schools, including Arts & Architecture, Business, Science, Technology, Health & Community, Hospitality & Tourism, Education & Social Sciences, and Transportation & Aviation. Explore departments, research, and degree programmes.',
    alternates: {
        canonical: 'https://heffring.online/schools/',
    },
};

import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Hero } from '@/components/layout/Hero';

import { Card } from '@/components/ui/Card';
import { STATIC_SCHOOLS } from '@/lib/schools';

export default async function SchoolsPage() {
    const schools = STATIC_SCHOOLS;

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Schools', item: '/schools' }
            ]} />
            {/* Hero Section */}
            <Hero
                title="Our Schools"
                body="Heffring University is organized into specialized schools, each driving innovation in technology, business, science, and design through world-class research and English-taught certificate, diploma, bachelor’s and master’s programmes."
                backgroundColor="#000000"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Schools' }
                ]}
            />

            <div className="container mx-auto px-4 py-16 md:py-24">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {(schools as School[])?.map((school) => (
                        <Card
                            key={school.id}
                            title={school.name}
                            image={school.imageUrl ? {
                                src: school.imageUrl,
                                alt: school.name
                            } : undefined}
                            body={school.description || ""}
                            cta={{
                                label: "Explore School",
                                linkComponentProps: {
                                    href: `/schools/${school.slug}`
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
