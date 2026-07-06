import { createStaticClient } from '@/lib/supabase/static';
import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/types/database';
import { notFound } from 'next/navigation';
import { formatToDDMMYYYY } from '@/utils/date';
import { Calendar, MapPin, Clock, Tag, CaretLeft as ChevronLeft } from "@phosphor-icons/react/dist/ssr";
import EventDetailClient from '@/components/news/EventDetailClient';

export async function generateStaticParams() {
    const supabase = createStaticClient();
    const { data: events } = await supabase
        .from('Event')
        .select('slug');
    
    return events?.map(({ slug }) => ({ slug })) || [];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const supabase = createStaticClient();

    const { data: event } = await supabase
        .from('Event')
        .select('title, content')
        .eq('slug', slug)
        .single();

    if (!event) return { title: 'Event Not Found' };

    return {
        title: `${event.title} | Kestora University Events`,
        description: event.content?.substring(0, 160) || `Join us for ${event.title} at Kestora University.`,
        alternates: {
            canonical: `https://kestora.online/news/events/${slug}/`,
        },
    };
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EventDetailPage({ params }: Props) {
    const { slug } = await params;
    const supabase = createStaticClient();

    const { data: eventItem, error } = await supabase
        .from('Event')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !eventItem) {
        if (error?.code !== 'PGRST116') console.error('Error fetching event:', error);
        notFound();
    }

    const item = eventItem as Event;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: item.title,
        startDate: item.date,
        endDate: item.date,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'Place',
            name: item.location || 'Kestora University – Helsinki Campus',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Pohjoisesplanadi 51',
                addressLocality: 'Helsinki',
                postalCode: '00150',
                addressRegion: 'Uusimaa',
                addressCountry: 'FI'
            }
        },
        image: item.imageUrl ? [item.imageUrl] : undefined,
        description: item.content?.substring(0, 160) || `Join us for ${item.title} at Kestora University.`,
        organizer: {
            '@type': 'EducationalOrganization',
            name: 'Kestora University',
            url: 'https://kestora.online'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EventDetailClient initialEvent={item} />
        </>
    );
}
