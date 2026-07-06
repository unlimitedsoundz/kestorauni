
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: 'Study at Kestora University — Bachelor, Master & Lifelong Learning',
    description: 'Find your study path at Kestora University. Explore our Bachelor\'s and Master\'s degree programmes, professional continuing education, and open studies.',
    alternates: {
        canonical: 'https://kestora.online/studies/',
    },
};

import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Hero } from '@/components/layout/Hero';
import { Card } from '@/components/ui/Card';

export default function StudiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Studies', item: '/studies' }
            ]} />
            {/* Hero */}
            <Hero
                title="Study at Kestora University"
                body="From undergraduate degrees to executive education, we offer diverse paths for learners at every stage of their journey."
                backgroundColor="#392d56"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Studies' }
                ]}
            >
                <div className="flex flex-wrap gap-4">
                    <Link href="/admissions" className="text-aalto-3 font-bold underline underline-offset-8 decoration-white hover:opacity-70 transition-colors text-white inline-flex items-center gap-2">
                        Apply Now <ArrowRight size={20} weight="bold" />
                    </Link>
                    <Link href="#programmes" className="text-aalto-3 font-bold underline underline-offset-8 decoration-white hover:opacity-70 transition-colors text-white inline-flex items-center gap-2">
                        Explore Programmes <ArrowRight size={20} weight="bold" />
                    </Link>
                </div>
            </Hero>

            <div id="programmes" className="container mx-auto py-12 md:py-32">
                <div className="grid md:grid-cols-2 gap-4 md:gap-12">
                    {/* Bachelor's */}
                    <div className="group relative bg-black overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[500px]">
                        <div className="absolute inset-0">
                            <Image
                                src="/images/bachelors-group-v2.png"
                                alt="Bachelor's"
                                fill
                                className="object-cover object-top transition-transform duration-1000 group-hover:scale-105 opacity-60"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                            <h2 className="text-aalto-4 font-bold mb-aalto-p2 uppercase tracking-aalto-3">Bachelor's Degrees</h2>
                            <p className="text-aalto-2 text-white/80 mb-8 max-w-md leading-aalto-2">
                                Build a strong foundation in sustainability, business, design, or technology. Our undergraduate programmes combine theory with real-world practice.
                            </p>
                             <Link href="/admissions/bachelor" className="inline-flex items-center gap-3 font-bold uppercase tracking-aalto-3 hover:gap-5 transition-all text-aalto-1 text-white">
                                 View Bachelor's Programmes <ArrowRight size={20} weight="bold" className="align-middle" />
                             </Link>
                        </div>
                    </div>

                    {/* Master's */}
                    <div className="group relative bg-black overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[500px]">
                        <div className="absolute inset-0">
                            <Image
                                src="/images/admissions/master_hero_refined.jpg"
                                alt="Master's"
                                fill
                                className="object-cover object-top transition-transform duration-1000 group-hover:scale-105 opacity-60"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                            <h2 className="text-aalto-4 font-bold mb-aalto-p2 uppercase tracking-aalto-3">Master's Degrees</h2>
                            <p className="text-aalto-2 text-white/80 mb-8 max-w-md leading-aalto-2">
                                Deepen your expertise and lead the change. Our graduate programmes are designed for professionals and ambitious researchers.
                            </p>
                             <Link href="/admissions/master" className="inline-flex items-center gap-3 font-bold uppercase tracking-aalto-3 hover:gap-5 transition-all text-aalto-1 text-white">
                                 View Master's Programmes <ArrowRight size={20} weight="bold" className="align-middle" />
                             </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Study Options */}
                <div className="mt-32">
                    <h2 className="text-aalto-5 font-bold mb-16 text-center uppercase tracking-aalto-3">More Ways to Learn</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Lifelong Learning", desc: "Short courses and professional development modules.", link: "/admissions#lifelong" },
                            { title: "Open University", desc: "Flexible studies open to everyone, regardless of background.", link: "/admissions#online-opportunities" },
                            { title: "Summer School", desc: "Intensive summer courses in Helsinki.", link: "/admissions#summer" }
                        ].map((item, i) => (
                            <Card 
                                key={i}
                                title={item.title}
                                body={item.desc}
                                cta={{
                                    label: "Learn more",
                                    linkComponentProps: {
                                        href: item.link
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

