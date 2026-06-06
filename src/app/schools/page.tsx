
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { School } from '@/types/database';

export const metadata = {
    title: 'Academic Schools — Cannoga College Ottawa, Canada | Arts, Business, Science, Technology',
    description: 'Cannoga College is organized into four schools: Arts & Architecture, Business, Science, and Technology. Explore departments, research, and degree programmes.',
    alternates: {
        canonical: 'https://cannogacollege.ca/schools/',
    },
};

import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Hero } from '@/components/layout/Hero';

import { createStaticClient } from '@/lib/supabase/static';
import { Card } from '@/components/ui/Card';

export default async function SchoolsPage() {
    const supabase = createStaticClient();
    const { data: schools, error } = await supabase
        .from('School')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching schools:', error);
        return <div>Error loading schools.</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Schools', item: '/schools' }
            ]} />
            {/* Hero Section */}
            <Hero
                title="Our Schools"
                body="Cannoga College is organized into specialized schools, each driving innovation in technology, business, science, and design through world-class research and English-taught Bachelor’s and Master’s programmes."
                backgroundColor="#5c2d91"
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
