import { Metadata } from 'next';
import { Envelope as Mail, Phone, MapPin, Clock, Building, Globe, FileText, CreditCard, ArrowRight, Users, Archive, IdentificationBadge, ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { Hero } from '@/components/layout/Hero';
import { List, Link } from "@aalto-dx/react-components";
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { ContentBox } from '@/components/ui/ContentBox';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
    title: 'Contact Information | Heffring University',
    description: 'Contact details for Heffring University including Registry, Admissions, Student Services, and general inquiries.',
    alternates: {
        canonical: 'https://heffring.online/contact/',
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Contact', item: '/contact' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact Heffring University",
                "url": "https://heffring.online/contact",
                "mainEntity": {
                    "@type": "EducationalOrganization",
                    "name": "Heffring University",
                    "email": "Heffring@heffring.online",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Kaarrostie 38",
                        "addressLocality": "Helsinki",
                        "postalCode": "00960",
                        "addressCountry": "CA"
                    }
                }
            }} />
            {/* HERO SECTION */}
            <Hero
                title="Contact Information"
                body="Heffring University provides contact information for administrative services including Registry, Admissions, Student Services and general inquiries to support students, applicants, staff and partners."
                backgroundColor="#ff8d4f"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Contact' }
                ]}
                image={{
                    src: "https://i.pinimg.com/736x/fa/28/ed/fa28ed6017e508a4291beda999617f25.jpg",
                    alt: "Contact Heffring University"
                }}
            />

            <div className="container mx-auto px-4 mt-20 max-w-6xl">
                <div className="space-y-24 pb-aalto-p6">
                    {/* Main Switchboard */}
                    <section>
                        <ContentBox
                            size="large"
                            icon="phone"
                            title="Main Switchboard"
                            body={
                                <div className="space-y-8 text-left">
                                    <div>
                                        <a href="tel:+3580942721884" className="inline-flex items-center gap-2 text-xl font-bold text-black mb-2 underline underline-offset-4 hover:opacity-80 transition-opacity">
                                            <Phone size={24} weight="fill" />
                                            Talk to Heffring
                                        </a>
                                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Helsinki, Finland resident enquiries</p>
                                    </div>
                                    <div>
                                        <a href="tel:+15026865522" className="inline-flex items-center gap-2 text-xl font-bold text-black mb-2 underline underline-offset-4 hover:opacity-80 transition-opacity">
                                            <Phone size={24} weight="fill" />
                                            Talk to Admissions
                                        </a>
                                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Admissions office International students only</p>
                                    </div>
                                    <div>
                                         <h4 className="font-bold text-black uppercase tracking-[0.2em] text-xs mb-4">Postal Address</h4>
                                        <address className="not-italic text-neutral-600 leading-relaxed text-sm font-bold">
                                            Heffring University – Helsinki Campus<br />
                                            Kaarrostie 38,<br />
                                            00960 Helsinki, Uusimaa,<br />
                                            Finland
                                        </address>
                                    </div>
                                </div>
                            }
                        />
                    </section>

                    {/* Key Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ContentBox
                            icon="identificationBadge"
                            title="Registry Office"
                            body={
                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-neutral-600">Responsible for receiving official correspondence and documentation.</p>
                                    <a href="mailto:registry@heffring.online" className="block font-bold underline">registry@heffring.online</a>
                                </div>
                            }
                        />
                        <ContentBox
                            icon="users"
                            title="Admissions Services"
                            body={
                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-neutral-600">Information on programmes, applications, scholarships, and deadlines.</p>
                                    <a href="mailto:admissions@heffring.online" className="block font-bold underline">admissions@heffring.online</a>
                                </div>
                            }
                        />
                        <ContentBox
                            icon="chatCircleDots"
                            title="Student Services"
                            body={
                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-neutral-600">Support for enrolled students including study planning and wellbeing.</p>
                                    <a href="mailto:studentservices@heffring.online" className="block font-bold underline">studentservices@heffring.online</a>
                                </div>
                            }
                        />
                        <ContentBox
                            icon="archive"
                            title="Archives"
                            body={
                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-neutral-600">Storage of permanent records and official documentation.</p>
                                    <a href="mailto:archives@heffring.online" className="block font-bold underline">archives@heffring.online</a>
                                </div>
                            }
                        />
                    </div>

                    <hr className="border-neutral-200" />

                    {/* Academic Schools */}
                    <section>
                        <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Schools and Departments</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {[
                                { name: "School of Arts, Design and Architecture", href: "/schools/arts" },
                                { name: "School of Science", href: "/schools/science" },
                                { name: "School of Technology", href: "/schools/technology" },
                                { name: "School of Business", href: "/schools/business" },
                                { name: "School of Health and Community Services", href: "/schools/health-community" },
                                { name: "School of Transportation and Aviation", href: "/schools/transportation-aviation" },
                                { name: "School of Education and Social Sciences", href: "/schools/education-social-sciences" },
                                { name: "School of Hospitality and Tourism", href: "/schools/hospitality-tourism" }
                            ].map((school) => (
                                <Link 
                                    key={school.name} 
                                    label={school.name}
                                    linkComponentProps={{ href: school.href }}
                                    className="group flex justify-between items-center py-6 border-b border-neutral-200 hover:border-black transition-colors uppercase tracking-widest text-sm"
                                    icon={<span className="text-neutral-400 group-hover:text-black">→</span>}
                                    iconPosition="right"
                                />
                            ))}
                        </div>
                    </section>

                    <hr className="border-neutral-200" />

                    {/* Footer Info Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                        <section>
                            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-black mb-8">Related Services</h3>
                            <List
                                items={[
                                    { label: 'Career Services', linkComponentProps: { href: '/student-guide/international#after-graduation' } },
                                    { label: 'International Office', linkComponentProps: { href: '/student-guide/international' } },
                                    { label: 'Research and Innovation Services', linkComponentProps: { href: '/research' } },
                                    { label: 'Alumni Relations', linkComponentProps: { href: '/alumni' } },
                                    { label: 'Media and Communications', linkComponentProps: { href: '/news' } },
                                ]}
                            />
                        </section>

                        <section>
                            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-black mb-8">Campus Maps</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed text-sm font-bold">
                                Find your way around our learning spaces, labs, and studios.
                            </p>
                            <Link 
                                label="View Campus Maps"
                                linkComponentProps={{ href: "#" }}
                                className="font-bold text-black hover:underline text-[10px] uppercase tracking-[0.2em]"
                            />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
