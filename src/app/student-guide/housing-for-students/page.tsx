import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import { Hero } from '@/components/layout/Hero';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';
import { Highlight } from '@/components/ui/Highlight';

export const metadata = {
    title: 'Housing for Students | Kestora University',
    description: 'Find information about student housing, apartments, and rental options for students studying at Kestora University in Helsinki, Finland.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/housing-for-students/',
    },
};

const sections = [
    { id: 'overview', title: 'Housing Overview', content: '' },
    { id: 'providers', title: 'Housing Providers', content: '' },
    { id: 'applying', title: 'How to Apply', content: '' },
    { id: 'private-market', title: 'Private Market', content: '' },
    { id: 'settling-in', title: 'Settling In', content: '' },
];

export default function HousingGuidePage() {
    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white text-black font-sans pb-20">
                <Hero
                    title="Housing for Students"
                    body="Finding a comfortable place to live is essential for your academic success. This guide covers student housing options and the Helsinki rental market."
                    backgroundColor="#ffc341"
                    tinted
                    lightText={false}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Student Guide', href: '/student-guide' },
                        { label: 'Housing' }
                    ]}
                    image={{
                        src: "/images/student-housing-hero.png",
                        alt: "Student Housing in Helsinki"
                    }}
                />

                <div className="cc-container py-12 md:py-20">
                    <div className="space-y-16 md:space-y-24">

                        {/* Overview */}
                        <section id="overview" className="scroll-mt-32">
                            <div className="cc-section-divider mb-10">
                                <h2 className="cc-h2">Your New Home in Helsinki</h2>
                            </div>
                            <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
                                Helsinki's student housing market is competitive — especially for September intake. We strongly recommend starting your search as soon as you receive your admission offer. Options range from on-campus residences and student-specific buildings to private rentals.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
<Card
                                      title="Shared Apartments"
                                      body="A cost-effective option where you have your own private bedroom but share the kitchen and common areas with 2–4 other students. Typical rent: €400–€600/month."
                                    />
                                    <Card
                                      title="Studio & Bachelor Apartments"
                                      body="A self-contained private apartment with your own kitchen and bathroom. Highly popular — expect a competitive rental market. Typical rent: €800–€1,200/month."
                                    />
                                    <Card
                                      title="On-Campus Residence"
                                      body="Limited spots available through HOAS (Helsinki Region Student Housing Foundation) and university housing services. Priority given to first-year and international students. Apply early via the HOAS application system."
                                    />
                            </div>
                        </section>

                        <Highlight
                            body="Moving to Helsinki was a big step, but the college's housing guide made it so much easier. I found a great shared apartment in Centretown within two weeks of my acceptance."
                            source="Sarah Johnson, MSc Student"
                            alignment="left"
                        />

                        {/* Providers */}
                        <section id="providers" className="scroll-mt-32">
                            <div className="cc-section-divider mb-10">
                                <h2 className="cc-h2">Helsinki Student Housing Providers</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
<div className="cc-card cc-card-body space-y-3">
                                     <h4 className="font-bold text-[#000000] text-lg">HOAS</h4>
                                     <p className="text-sm text-neutral-600 leading-relaxed">The main student housing foundation in the Helsinki region, offering affordable apartments and shared rooms for students.</p>
                                     <Link href="https://www.hoas.fi" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-[#000000] transition-colors block">hoas.fi →</Link>
                                   </div>
<div className="cc-card cc-card-body space-y-3">
                                     <h4 className="font-bold text-[#000000] text-lg">Lumo</h4>
                                     <p className="text-sm text-neutral-600 leading-relaxed">A major Finnish rental housing provider offering modern apartments across Helsinki.</p>
                                     <Link href="https://www.lumo.fi" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-[#000000] transition-colors block">lumo.fi →</Link>
                                   </div>
<div className="cc-card cc-card-body space-y-3">
                                      <h4 className="font-bold text-[#000000] text-lg">Attica</h4>
                                      <p className="text-sm text-neutral-600 leading-relaxed">Provides student housing in Helsinki with various apartment types and locations.</p>
                                      <Link href="https://www.attica.fi" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-[#000000] transition-colors block">attica.fi →</Link>
                                    </div>
                            </div>
                        </section>

                        {/* How to Apply */}
                        <section id="applying" className="scroll-mt-32">
                            <ContentBox
                                size="large"
                                icon="listChecks"
                                title="How to Secure Housing"
body={
                                     <div className="space-y-8 text-left">
                                         {[
                                             {
                                                 step: 1,
                                                 title: "Accept Your Study Offer",
                                                 desc: "Begin your housing search immediately after receiving your admission offer. The Helsinki housing market is competitive, especially for autumn intake."
                                             },
                                             {
                                                 step: 2,
                                                 title: "Choose Your Area",
                                                 desc: "Popular student neighbourhoods include Kallio, Punavuori, Kampuri, Töölö, and Otaniemi (Espoo). All are well-connected by Helsinki's public transport (HSL)."
                                             },
                                             {
                                                 step: 3,
                                                 title: "Submit Your Application",
                                                 desc: "Apply through housing providers' websites (e.g., HOAS, Attica) or rental platforms like Vuokraovi and Oikotie. Prepare proof of enrollment, personal details, and be ready to pay a deposit (usually one month's rent)."
                                             },
                                             {
                                                 step: 4,
                                                 title: "Sign Your Lease",
                                                 desc: "Review the rental agreement carefully. Finnish tenancy law (Act on Residential Leases 481/1995) protects tenants. The deposit is typically one month's rent."
                                             },
                                         ].map(({ step, title, desc }) => (
                                             <div key={step} className="flex gap-5 items-start">
                                                 <div className="w-10 h-10 bg-[#000000] text-white flex items-center justify-center font-bold shrink-0 rounded-full">{step}</div>
                                                 <div>
                                                     <h4 className="font-bold text-black mb-1">{title}</h4>
                                                     <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                 }
                            />
                        </section>

                        {/* Private Market */}
                        <section id="private-market" className="scroll-mt-32">
                            <div className="cc-section-divider mb-10">
                                <h2 className="cc-h2">Private Rental Market</h2>
                            </div>
<p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
                                 The Helsinki private market offers many listings. Use these trusted Finnish platforms to search for rentals. Always visit (or arrange a video tour) before paying any deposit.
                             </p>
                            <div className="grid md:grid-cols-3 gap-6">
<Card
                                      title="Vuokraovi"
                                      body="Finland's most popular rental listing site with extensive Helsinki coverage. Filter by district, price, and size."
                                      cta={{ label: "Search on Vuokraovi", linkComponentProps: { href: "https://www.vuokraovi.com", target: "_blank" } }}
                                  />
                                  <Card
                                      title="Oikotie"
                                      body="A major Finnish classifieds site for rental apartments and shared housing."
                                      cta={{ label: "Browse on Oikotie", linkComponentProps: { href: "https://asunnot.oikotie.fi", target: "_blank" } }}
                                  />
                                  <Card
                                      title="Tori.fi"
                                      body="Popular Finnish marketplace for rental apartments, rooms, and shared housing in Helsinki."
                                      cta={{ label: "Search on Tori.fi", linkComponentProps: { href: "https://www.tori.fi", target: "_blank" } }}
                                  />
                            </div>
<div className="mt-6 cc-section-tinted p-6">
                                 <p className="text-sm font-semibold text-[#000000]">⚠️ Tenant Rights in Finland</p>
                                 <p className="text-sm text-neutral-600 mt-2 leading-relaxed">Rental housing in Finland is governed by the Act on Residential Leases (481/1995). Security deposits are typically one month's rent. Learn more at <Link href="https://www.omaoikeus.fi/en/rental-housing" target="_blank" className="underline font-bold hover:text-[#000000]">Finnish Ministry of Justice →</Link></p>
                             </div>
                        </section>

                        {/* Settling In */}
                        <section id="settling-in" className="scroll-mt-32">
                            <ContentBox
                                backgroundColor="#000000"
                                title={<span className="text-white">Settling Into Helsinki Life</span>}
                                body={
                                    <div className="space-y-6">
<p className="text-neutral-300 leading-relaxed">
                                             Helsinki is a welcoming, walkable city with four distinct seasons. Winters are cold (bring warm layers!) but beautiful, and summers are warm and festival-filled. Most apartment buildings include in-suite or shared laundry, and many are pet-friendly.
                                         </p>
                                         <ul className="space-y-3 text-sm text-neutral-300">
                                             {[
                                                 "Helsinki's Market Square (Kauppatori) has fresh food, cafes, and local crafts",
                                                 "K-Citymarket, Prisma, and Lidl are popular for affordable grocery shopping",
                                                 "The Helsinki tram network and metro connect all major neighbourhoods",
                                                 "Most landlords accept online bank transfers — Finnish banks like Nordea, OP, and Danske Bank are common",
                                             ].map((tip, i) => (
                                                 <li key={i} className="flex gap-3 items-start">
                                                     <ArrowRight size={14} weight="bold" className="mt-0.5 shrink-0 text-white/60" />
                                                     {tip}
                                                 </li>
                                             ))}
                                         </ul>
                                        <Link
                                            href="/student-guide/arrival"
                                            className="inline-flex items-center gap-2 bg-white text-[#000000] px-6 py-3 font-bold hover:bg-neutral-100 transition-all text-sm"
                                        >
                                            Read the Full Arrival Guide <ArrowRight size={16} weight="bold" />
                                        </Link>
                                    </div>
                                }
                            />
                        </section>

                    </div>
                </div>
            </div>
        </GuideSidebarLayout>
    );
}
