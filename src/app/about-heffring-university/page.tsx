import { createClient } from "@/utils/supabase/server";
import { Link } from "@aalto-dx/react-components";
import { CTA } from "@aalto-dx/react-modules";
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';

export const metadata = {
    title: 'About Heffring University — Our Story, Mission & Helsinki Campus',
    description: "Heffring University is a dynamic and career-focused institution located in Helsinki, Finland's capital city, committed to providing high-quality education through a wide range of Diploma, Degree, and Certificate programs.",
    alternates: {
        canonical: 'https://heffring.online/about-heffring-university/',
    },
};

import { Hero } from "@/components/layout/Hero";
import DynamicNewsSection from "@/components/news/DynamicNewsSection";
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { ContentBox } from "@/components/ui/ContentBox";
import { Card } from "@/components/ui/Card";

export default async function AboutPage() {


    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'About Heffring University', item: '/about-heffring-university' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About Heffring University",
                "url": "https://heffring.online/about-heffring-university",
                "mainEntity": {
                    "@type": "EducationalOrganization",
                    "description": "Heffring University is a dynamic and career-focused institution located in Helsinki, Finland’s capital city.",
                    "url": "https://heffring.online"
                }
            }} />

            {/* HERO SECTION */}
            <Hero
                title="About Heffring University"
                body="Heffring University is a dynamic and career-focused institution located in Helsinki, Finland's capital city, committed to providing high-quality education through a wide range of Diploma, Degree, and Certificate programs."
                backgroundColor="#6c531b"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'About' }
                ]}
                image={{
                    src: "/images/home-carousel-3.png",
                    alt: "Heffring University – Helsinki Campus main building"
                }}
            />

            <div className="cc-container py-8 md:py-20">
                {/* Institutional Description Section */}
                <section className="max-w-4xl mx-auto mb-16 space-y-5 text-lg leading-relaxed">
                    <p className="font-semibold text-xl text-[#000000]">
                        Heffring University is a forward-looking, career-oriented institution located in Helsinki, the capital city of Finland. The college is dedicated to delivering quality post-secondary education through a range of Certificate, Diploma, and Degree programs designed to equip students with the skills needed in today's global and evolving job market.
                    </p>
                    <p className="text-neutral-600">
                        The college welcomes both domestic and international students into a diverse and inclusive academic environment that promotes learning, cultural exchange, and professional growth. Academic programs span key fields such as Business Administration, Information Technology, Health Sciences, Hospitality and Tourism, Engineering Foundations, Education, and Social Sciences.
                    </p>
                    <p className="text-neutral-600">
                        With a focus on practical learning and student success, Heffring University combines academic instruction with hands-on training, industry-relevant projects, and experiential learning opportunities. Students benefit from small class sizes, accessible faculty, and individualized academic support, as well as internship and co-op pathways that enhance employability and real-world readiness.
                    </p>
                    <p className="text-neutral-600">
                        International students are supported through dedicated services including admissions guidance, study permit assistance, academic advising, career development support, and newcomer integration services to ensure a smooth transition to life and studies in Finland.
                    </p>
                    <p className="font-semibold text-[#000000]">
                        Heffring University is committed to preparing graduates who are confident, skilled, and ready to contribute meaningfully to both local and global communities.
                    </p>
                </section>

                {/* Content Sections: Philosophy, Mission & Approach */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-16 mb-24">
                        <ContentBox
                            icon="bookOpen"
                            title="Academic Philosophy"
                            body={
                                <div className="space-y-4">
                                    <p>Heffring University is guided by a learner-centered approach that emphasizes critical thinking, applied knowledge, and personal development. Inspired by modern global education practices, the college integrates academic theory with practical application to ensure students gain both understanding and real-world competence.</p>
                                    <p>The learning model focuses on active engagement, collaboration, and problem-solving, encouraging students to take part in project-based learning and industry-aligned experiences.</p>
                                </div>
                            }
                        />
                        <ContentBox
                            icon="target"
                            title="Mission Statement"
                            body={
                                <div className="space-y-4">
                                    <p>Our mission is to empower students with the knowledge, technical skills, and professional values required to succeed in their chosen careers and contribute positively to society and the global economy.</p>
                                    <ul className="space-y-2">
                                        {[
                                            "Certificate, Diploma, and Degree programs",
                                            "Interdisciplinary academic pathways",
                                            "Applied, project-based learning model",
                                            "An inclusive international student community in Helsinki"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <ArrowRight size={20} weight="bold" className="shrink-0 text-black mt-0.5" />
                                                <span className="text-base font-bold text-black leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        />
                    </div>

                    <div className="mb-16">
                        <div className="cc-section-divider text-center mb-12">
                            <h2 className="cc-h2">Academic Approach</h2>
                            <p className="cc-label">At Heffring University, learning is built around:</p>
                        </div>
                        <ul className="grid md:grid-cols-2 gap-6 mb-12">
                            {[
                                "Applied, project-based education",
                                "Collaboration with industry partners and community organizations",
                                "Interdisciplinary academic pathways",
                                "Strong integration of theory and practical training"
                            ].map((item, i) => (
                                <li key={i} className="cc-card flex items-start gap-4 p-5">
                                    <ArrowRight size={18} weight="bold" className="shrink-0 text-[#000000] mt-0.5" />
                                    <span className="text-neutral-700 font-medium leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-neutral-600 text-lg leading-relaxed bg-[#f5f5f5] p-8 border-l-4 border-[#000000]">
                            Our Helsinki campus provides a supportive and inclusive environment where students and faculty work together to explore real-world challenges and develop innovative, future-ready solutions.
                        </p>
                    </div>
                </section>

                <section id="graduation" className="scroll-mt-32 mb-16">
                    <CTA
                        title="After Graduation"
                        body="Heffring University supports your transition to working life. We offer resources for job seeking, career guidance, and alumni networking both in Helsinki, Finland and internationally."
                        cta={{
                            label: "Explore Career Services",
                            linkComponentProps: {
                                href: "/careers"
                            }
                        }}
                    />
                </section>

                {/* Specialized Campuses */}
                <div className="mb-16">
                    <h2 className="cc-h2 mb-12 text-center">Our Specialized Campuses</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card
                            title="School of Arts & Design"
                            body="Preparing students for international careers in the creative industries, from digital design to contemporary architecture."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/arts" }
                            }}
                        />
                        <Card
                            title="School of Business"
                            body="Empowering future leaders with English-taught programmes in international management, finance, and entrepreneurship."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/business" }
                            }}
                        />
                        <Card
                            title="School of Technology"
                            body="Specializing in the development of smart infrastructure, automation, and industrial engineering solutions."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/technology" }
                            }}
                        />
                        <Card
                            title="School of Science"
                            body="Focusing on applied scientific research, data-driven innovation, and the development of transformative materials."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/science" }
                            }}
                        />
                        <Card
                            title="School of Health & Community Services"
                            body="Preparing compassionate healthcare and community professionals through practical nursing, pharmacy, and support pathways."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/health-community" }
                            }}
                        />
                        <Card
                            title="School of Hospitality & Tourism"
                            body="Fostering excellence in event planning, culinary management, hotel operations, and global tourism."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/hospitality-tourism" }
                            }}
                        />
                        <Card
                            title="School of Education & Social Sciences"
                            body="Developing future educators and social service leaders through hands-on teaching, youth care, and justice programs."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/education-social-sciences" }
                            }}
                        />
                        <Card
                            title="School of Transportation & Aviation"
                            body="Specializing in flight services, aviation management, and advanced aircraft and automotive maintenance."
                            cta={{
                                label: "Explore Campus",
                                linkComponentProps: { href: "/schools/transportation-aviation" }
                            }}
                        />
                    </div>
                </div>
            </div>



            {/* Key Figures */}
            <div className="py-20 bg-[#000000] text-white w-full">
                <div className="cc-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
                        <div className="flex flex-col items-center">
                            <span className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-3">2.4k</span>
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Students</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-3">250</span>
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Faculty</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-3">60+</span>
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Countries</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cc-container py-8 md:py-20">

                {/* Partnerships Section */}
                <section className="mb-24">
                    <div className="cc-section-divider mb-12">
                        <h2 className="cc-h2">Industry &amp; Research Partnerships</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="cc-card cc-card-body space-y-5">
                            <p className="text-neutral-600 leading-relaxed">
                                We don't just study the future; we build it. Heffring University maintains strategic partnerships with over 200 global companies and research institutions. Our students have direct access to internships, joint research projects, and innovation labs that bridge the gap between academic theory and market-ready solutions.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
                                <ContentBox
                                    icon="globe"
                                    title="Global Network"
                                    body="Member of the World Federation of Sustainability Universities."
                                />
                                <ContentBox
                                    icon="briefcase"
                                    title="Employment Rate"
                                    body="92% of graduates find relevant employment within 6 months."
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
{[
                                 { src: "/images/0f4315c00b2784fbddf4239ce341dd7e.jpg", alt: "Campus life at Heffring University", credit: "Heffring University" },
                                 { src: "/images/2ea8f4b07a6cd09f34810c687fd924dc.jpg", alt: "Students collaborating on campus", credit: "Heffring University" },
                                 { src: "/images/5e581c79ed9339bdf506cf8f30e73aaa.jpg", alt: "Modern learning environment", credit: "Heffring University" },
                                 { src: "/images/8abea6bf09491ed4dcead9bb2d737082.jpg", alt: "Student activities and engagement", credit: "Heffring University" },
                             ].map((img, index) => (
                                 <div key={index} className="relative group rounded-3xl overflow-hidden shadow-lg h-64 md:h-auto md:aspect-square">
                                     <div className="absolute inset-0 bg-black opacity-20 mix-blend-multiply group-hover:opacity-5 transition-opacity z-10 duration-500"></div>
                                     <Image
                                         src={img.src}
                                         alt={img.alt}
                                         fill
                                         className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                         sizes="(max-width: 768px) 50vw, 25vw"
                                     />
                                 </div>
                             ))}
                        </div>
                    </div>
                </section>

                <section id="community" className="scroll-mt-32 mb-32">
                    <ContentBox
                        size="large"
                        icon="users"
                        title="Vibrant Community"
                        body={
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-black">Life Beyond the Classroom</h3>
                                <p>
                                    From music festivals to tech hackathons, your time at Heffring is about more than just studies. Our campus in Helsinki is a hub of activity where students from over 60 countries collaborate and create.
                                </p>
                            </div>
                        }
image={{
                             src: "/images/news/helsinki_study_hero_1771086748710.png",
                             alt: "Heffring Community"
                         }}
                    />
                </section>

            </div>
        </div >
    );
}

