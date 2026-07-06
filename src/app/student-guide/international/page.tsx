import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { Hero } from '@/components/layout/Hero';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { Highlight } from '@/components/ui/Highlight';

const tocSections = [
    { id: 'intro', title: 'Purpose of Guide', content: '' },
    { id: 'why-helsinki', title: 'Why Helsinki, Finland', content: '' },
    { id: 'admission', title: 'After Admission', content: '' },
    { id: 'arrival', title: 'After Arrival', content: '' },
    { id: 'living', title: 'Living in Helsinki', content: '' },
    { id: 'support', title: 'Support Services', content: '' },
];

export const metadata = {
    title: 'International Student Guide | Kestora University',
    description: 'A comprehensive guide for international students joining Kestora University in Helsinki, Finland — study permits, housing, transport, and settling in.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/international/',
    },
};

export default function InternationalGuidePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is orientation mandatory?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, orientation is mandatory and provides essential info for starting your studies. All students are expected to attend sessions during the first week."
                }
            },
{
                                "@type": "Question",
                                "name": "Can I bring my family to Finland?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, eligible family members may apply for a residence permit based on family ties. You must demonstrate sufficient financial resources for your family's stay and have suitable housing."
                                }
                            }
        ]
    };

    return (
        <GuideSidebarLayout sections={tocSections}>
            <div className="min-h-screen bg-white text-black font-sans pb-20">
            <SchemaLD data={faqSchema} />

            <Hero
                title="International Students"
                body="Practical guidance for your journey to Helsinki, Finland and Kestora University."
                backgroundColor="#000000"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Student Guide', href: '/student-guide' },
                    { label: 'International Students' }
                ]}
                image={{
                    src: "/images/international-students-hero.png",
                    alt: "International students at Kestora University Helsinki"
                }}
            />

            <div className="cc-container py-12 md:py-20">
                <div className="space-y-16 md:space-y-24">

                    {/* Purpose */}
                    <section id="intro" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Purpose of This Guide</h2>
                        </div>
                        <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
                            This section provides international degree and exchange students with practical guidance on what to do after admission and after arrival in Helsinki, Finland. It covers study permits, housing, transportation, health coverage, and settling into your new community.
                        </p>
                    </section>

                    {/* Why Helsinki */}
                    <section id="why-ottawa" className="scroll-mt-32">
                        <div className="cc-section-divider mb-10">
                            <h2 className="cc-h2">Why Study in Helsinki, Finland?</h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div className="space-y-5">
                                <p className="text-neutral-600 leading-relaxed">
                                    Helsinki is Finland's capital — a bilingual, safe, and cosmopolitan city that consistently ranks among the best places in the world to live and study. With a thriving tech sector, world-class research institutions, and a welcoming multicultural community, Helsinki offers international students an unparalleled experience.
                                </p>
<p className="text-neutral-600 leading-relaxed">
                                    The Finnish education system is internationally recognized for its high quality, student-centered approach, and strong focus on research and innovation.
                                </p>
                                <div className="bg-[#f5f5f5] p-6 border-l-4 border-[#000000]">
                                    <p className="font-semibold text-[#000000] text-sm leading-relaxed">
                                        Kestora University operates in the heart of Helsinki with strong ties to Finland's public service, tech industry, and research community.
                                    </p>
                                </div>
<div className="flex flex-wrap gap-6 pt-2">
                                    <Link href="https://finland.fi" target="_blank" className="cc-btn-primary text-sm">Finland.fi →</Link>
                                    <Link href="https://www.myhelsinki.fi" target="_blank" className="cc-btn-primary text-sm">Visit Helsinki →</Link>
                                    <Link href="https://www.businesshelsinki.com" target="_blank" className="cc-btn-primary text-sm">Invest Helsinki →</Link>
                                </div>
                            </div>
<div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
                                    <Image
                                        src="/images/46d9590a0798520f2880dbd7b836b79c.jpg"
                                        alt="Helsinki Market Square"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                  </div>
                        </div>
                    </section>

                    <Highlight
                        body="The mix of innovation, nature, and culture in Helsinki is something special. I felt welcome from day one — the city and college community really made this an amazing experience."
                        source="Marco Rossi, International Student"
                        alignment="right"
                    />

                    {/* After Admission */}
                    <section id="admission" className="scroll-mt-32">
                        <div className="cc-section-divider mb-10">
                            <h2 className="cc-h2">Practical Things to Do After Admission</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
<Card
                            title="Residence Permit"
                            body="Apply for your Finnish residence permit for studies through Enter Finland as soon as you receive your acceptance letter. Processing times vary but typically take 1-3 months."
                            cta={{ label: "Apply via Enter Finland", linkComponentProps: { href: "https://migri.fi/apply-for-residence-permit", target: "_blank" } }}
                        />
                            <Card
                                title="Housing"
                                body="Arrange accommodation before arrival. Helsinki student housing providers and private rentals should be booked early, especially for August/September intake."
                                cta={{ label: "Housing Guide", linkComponentProps: { href: "/student-guide/housing-for-students" } }}
                            />
<Card
                            title="Health Insurance"
                            body="All residents in Finland are entitled to public healthcare through Kela (Social Insurance Institution). EU/EEA students can use their European Health Insurance Card. Non-EU students must have private insurance for the first 3 months until registered with Kela."
                            cta={{ label: "Kela Info", linkComponentProps: { href: "https://www.kela.fi/web/en", target: "_blank" } }}
                        />
                            <Card
                                title="Tuition & Scholarships"
                                body="International tuition fees apply. Check our merit scholarship opportunities — awards of up to 50% tuition waiver are available."
                                cta={{ label: "Tuition Info", linkComponentProps: { href: "/admissions/tuition" } }}
                            />
                        </div>
                    </section>

                    {/* After Arrival */}
                    <section id="arrival" className="scroll-mt-32">
                        <div className="cc-section-divider mb-10">
                            <h2 className="cc-h2">After Moving to Helsinki</h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-10">
                            <div className="cc-card cc-card-body space-y-6">
<h3 className="font-bold text-lg text-[#000000]">Getting Around</h3>
                                 <p className="text-neutral-600 text-sm leading-relaxed">
                                     Helsinki's public transport is operated by <strong>HSL (Helsinki Region Transport)</strong>, offering bus, tram, metro, commuter train, and ferry services. Students qualify for discounted fares with a student card.
                                 </p>
                                 <div className="flex flex-wrap gap-4">
                                     <Link href="https://www.hsl.fi/en" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-[#000000] transition-colors">HSL →</Link>
                                     <Link href="https://www.hsl.fi/en/tickets-and-fares/ticket-prices/discount-groups/students" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-[#000000] transition-colors">Student Tickets →</Link>
                                 </div>
                                <h3 className="font-bold text-lg text-[#000000] pt-2">Registering with Authorities</h3>
<div className="space-y-3 text-sm font-medium text-neutral-700">
                                     <p className="flex gap-3 items-start"><ArrowRight size={14} weight="bold" className="mt-0.5 shrink-0 text-[#000000]" /> All international students must register their address at the <strong>Digital and Population Data Services Agency</strong> (Digi- ja väestötietovirasto) after arrival.</p>
                                     <p className="flex gap-3 items-start"><ArrowRight size={14} weight="bold" className="mt-0.5 shrink-0 text-[#000000]" /> EU/EEA citizens register their right of residence; non-EU/EEA citizens apply for a residence permit card through the Finnish Immigration Service (Migri).</p>
                                     <p className="flex gap-3 items-start"><ArrowRight size={14} weight="bold" className="mt-0.5 shrink-0 text-[#000000]" /> Open a Finnish bank account early — Nordea, OP, Danske Bank, and others offer student accounts with low fees.</p>
                                 </div>
                                <Link href="/student-guide/arrival" className="cc-btn-primary inline-flex items-center gap-2 text-sm">
                                    Full Arrival Guide <ArrowRight size={16} weight="bold" />
                                </Link>
                            </div>
                            <div className="cc-card cc-card-body space-y-5">
                                <h3 className="font-bold text-lg text-[#000000]">Post-Arrival Checklist</h3>
<ul className="space-y-4 text-sm">
                                     {[
                                         "Collect keys and move into your accommodation",
                                         "Register at college and activate your student card (Frank)",
                                         "Register your address at the Digital and Population Data Services Agency",
                                         "Apply for a residence permit card at Migri (if non-EU/EEA)",
                                         "Get your HSL student card for public transport discounts",
                                         "Open a Finnish bank account",
                                         "Attend mandatory orientation week",
                                         "Join the Kestora student community platform",
                                     ].map((item, i) => (
                                         <li key={i} className="flex gap-3 items-start font-medium text-neutral-700">
                                             <span className="w-5 h-5 rounded-full bg-[#000000] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                                             {item}
                                         </li>
                                     ))}
                                 </ul>
                            </div>
                        </div>
                    </section>

                    {/* Living in Helsinki */}
                    <section id="living" className="scroll-mt-32">
                        <div className="cc-section-divider mb-10">
                            <h2 className="cc-h2">Living in Helsinki</h2>
                        </div>
<div className="relative aspect-video overflow-hidden rounded-lg shadow mb-10">
                                    <Image
                                        src="/images/615d65201ede79dfc3ce8289899dfc88.jpg"
                                        alt="Students enjoying life in Helsinki, Finland"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 1200px"
                                    />
                                </div>
                        <div className="grid md:grid-cols-2 gap-6">
<Card
                            title="Student Health Care"
                            body="Once registered as a resident with a Finnish personal identity code, you can access public healthcare through Kela. In the interim, ensure you have private coverage. Kestora partners with local clinics for walk-in care."
                        />
                        <Card
                            title="Local Culture"
                            body="Helsinki is bilingual (Finnish & Swedish), diverse, and welcoming. It's one of the world's safest cities with a vibrant arts scene, national museums, and four distinct seasons."
                        />
                        <Card
                            title="Working While Studying"
                            body="Your Finnish residence permit allows you to work up to 30 hours/week during term time (full-time during holidays). Many local employers actively recruit Kestora students."
                        />
                        <Card
                            title="Language & Careers"
                            body="Kestora's Career Centre offers job boards, resume workshops, internships, and networking events with Helsinki's tech, government, and business sectors."
                            cta={{ label: "Career Centre", linkComponentProps: { href: "/careers" } }}
                        />
                    </div>
                    </section>

                    {/* Support Services */}
                    <section id="support" className="scroll-mt-32">
                        <div className="cc-section-divider mb-10">
                            <h2 className="cc-h2">Support Services</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <ContentBox
                                icon="users"
                                title="Peer Advice"
                                body="Connect with current international students for practical tips on student life, housing, and finding your feet in Helsinki."
                            />
                            <ContentBox
                                icon="identificationBadge"
                                title="International Student Office"
                                body="Guidance on study permits, enrollment, academic procedures, and immigration compliance throughout your studies."
                            />
                            <ContentBox
                                icon="briefcase"
                                title="Career & Settlement"
                                body="Dedicated career support to help you plan your professional future and integrate into Helsinki's vibrant job market."
                            />
                        </div>
                    </section>

                    <div className="pt-8 border-t border-neutral-100 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        <p>Updated: June 2026 | Kestora University International Student Services</p>
                    </div>
                </div>
            </div>
            </div>
        </GuideSidebarLayout>
    );
}
