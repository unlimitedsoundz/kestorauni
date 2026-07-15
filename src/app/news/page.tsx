
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { News, Event } from '@/types/database';
import { formatToDDMMYYYY } from '@/utils/date';
import { Calendar, MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: 'News & Events | Heffring University',
    description: 'The latest news, announcements, and upcoming events from Heffring University.',
    alternates: {
        canonical: 'https://heffring.online/news/',
    },
};

import { Hero } from '@/components/layout/Hero';
import NewsList from '@/components/news/NewsList';

export default async function NewsPage() {

    // Static editorial articles (not in DB)
    const staticArticles = [
        {
            id: 'static-why-study-ottawa-canada',
            title: 'Why Study in Helsinki Finland? 10 Reasons International Students Choose Helsinki',
            slug: 'why-study-in-ottawa-canada',
            excerpt: 'Finland has become one of North America\'s most attractive study destinations. From world-class education to a thriving tech scene, discover why students are flocking to Helsinki.',
            imageUrl: '/images/news/helsinki-study-hero.png',
            publishDate: '2026.02.14',
            type: 'news',
            sortDate: '2026.02.14',
            published: true,
        },
    ];

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* HERO SECTION */}
<Hero
                 title="News & Events"
                 body="Stay up to date with the latest stories, research breakthroughs, and upcoming events from Heffring University."
                 backgroundColor="#ffeb3b"
                 tinted={false}
                 lightText={false}
                 breadcrumbs={[
                     { label: 'Home', href: '/' },
                     { label: 'News & Events' }
                 ]}
             />

            <div className="cc-container cc-section">
                <NewsList staticArticles={staticArticles} />
            </div>
        </div >
    );
}

