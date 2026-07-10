import { Link } from "@aalto-dx/react-components";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Hero } from '@/components/layout/Hero';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import TuitionFAQ from '@/components/admissions/TuitionFAQ';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';
import { registerFaqPage } from '@/lib/registerFaqPage';
import { createStaticClient } from '@/lib/supabase/static';
import TuitionEstimator from '@/components/admissions/TuitionEstimator';

export const metadata = {
    title: 'Paying the Tuition Fee | Kestora University',
    description: 'Structure of tuition fees, payment methods (Bank Transfer), and refund policies for international students at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/admissions/tuition/',
    },
};

const sections = [
    { id: 'fee-structure', title: 'Fee Structure', content: '' },
    { id: 'tuition-estimator', title: 'Tuition & Fees Estimator', content: '' },
    { id: 'merit-scholarship', title: 'Merit Scholarship', content: '' },
    { id: 'payment-methods', title: 'Payment Methods', content: '' },
    { id: 'timing', title: 'Payment Schedule', content: '' },
    { id: 'additional-fees', title: 'Additional Fees & Benefits', content: '' },
    { id: 'health-insurance', title: 'Health Insurance', content: '' },
    { id: 'refunds', title: 'Refund Policy', content: '' },
    { id: 'faq', title: 'General FAQ', content: '' },
    { id: 'contact', title: 'Contact Support', content: '' },
];

export default async function TuitionPaymentPage() {
    const supabase = createStaticClient();
    const { data: courses } = await supabase
        .from('Course')
        .select('*')
        .order('title');

    // For static build, we use empty FAQs - they will be loaded client-side
    const faqs: any[] = [];
    const pageSlug = 'admissions/tuition';
    const getSectionDefault = (sectionKey: string) => getPageContentSection(pageSlug, sectionKey)?.defaultContent ?? '';

    // Register this page
    try {
        registerFaqPage("Tuition", "admissions/tuition");
    } catch (error) {
        // Ignore errors
    }

    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white text-black font-sans">
            {/* HERO SECTION */}
            <Hero
                title={
                    <DbPageContent
                        tagName="span"
                        pageSlug={pageSlug}
                        sectionKey="hero_title"
                        fallbackContent={getSectionDefault('hero_title') || 'Paying the Tuition Fee'}
                    />
                }
                body={
                    <DbPageContent
                        tagName="span"
                        pageSlug={pageSlug}
                        sectionKey="hero_subtitle"
                        fallbackContent={getSectionDefault('hero_subtitle') || 'Information on tuition fee structure, payment methods, and scholarship opportunities for international students.'}
                    />
                }
                backgroundColor="#000000"
                tinted
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Admissions', href: '/admissions' },
                    { label: 'Tuition' }
                ]}
                image={{
                    src: "/images/admissions/tuition-hero.jpg",
                    alt: "Tuition Hero"
                }}
            >
                <Link href="#payment-methods" className="text-aalto-3 font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                    View payment methods <ArrowRight size={20} weight="bold" />
                </Link>
            </Hero>
            <div className="cc-container py-8 md:py-16">
                <main className="space-y-12 md:space-y-20">

                    <section id="fee-structure" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">How Much is the Tuition Fee?</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-neutral-200 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-neutral-900 text-white">
                                        <th className="border border-neutral-700 px-4 py-3 text-left text-xs font-black uppercase tracking-widest">Programme</th>
                                        <th className="border border-neutral-700 px-4 py-3 text-left text-xs font-black uppercase tracking-widest">Duration</th>
                                        <th className="border border-neutral-700 px-4 py-3 text-left text-xs font-black uppercase tracking-widest">Credits</th>
                                        <th className="border border-neutral-700 px-4 py-3 text-right text-xs font-black uppercase tracking-widest">Domestic Students</th>
                                        <th className="border border-neutral-700 px-4 py-3 text-right text-xs font-black uppercase tracking-widest">International Students</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="border border-neutral-200 px-4 py-3 text-sm font-bold text-black">Certificate</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">1 Year</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">60 ECTS</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€1,500/year</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€2,500/year</td>
                                    </tr>
                                    <tr className="bg-neutral-50">
                                        <td className="border border-neutral-200 px-4 py-3 text-sm font-bold text-black">Diploma</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">2 Years</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">120 ECTS</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€1,500/year</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€2,500/year</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="border border-neutral-200 px-4 py-3 text-sm font-bold text-black">Bachelor's</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">3 Years</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">180 ECTS</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€2,500/year</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€4,000/year</td>
                                    </tr>
                                    <tr className="bg-neutral-50">
                                        <td className="border border-neutral-200 px-4 py-3 text-sm font-bold text-black">Master's</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">2 Years</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black">120 ECTS</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€3,500/year</td>
                                        <td className="border border-neutral-200 px-4 py-3 text-sm text-black text-right">€6,000/year</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="tuition-estimator" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Interactive Tuition &amp; Fees Estimator</h2>
                            <p className="cc-label">Estimate your tuition and ancillary fees per semester</p>
                        </div>
                        <TuitionEstimator courses={courses || []} />
                    </section>

                    <section id="merit-scholarship" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Merit Scholarship</h2>
                        </div>
                        <div className="space-y-4">
                            <DbPageContent pageSlug={pageSlug} sectionKey="merit_scholarship_content" fallbackContent={getSectionDefault('merit_scholarship_content')} />
                            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
                                <h3 className="text-lg font-bold text-black mb-2">Apply for Kela support</h3>
                                <p className="text-sm text-neutral-600 mb-4">If you are eligible for Finnish social security support, you can start your Kela application directly through the official portal.</p>
                                <Link href="https://www.kela.fi/web/en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-black underline underline-offset-4 hover:text-neutral-700">
                                    Go to Kela <ArrowRight size={16} weight="bold" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section id="payment-methods" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">How Do I Pay?</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="payment_methods_content" fallbackContent={getSectionDefault('payment_methods_content')} />
                    </section>

                    <section id="timing" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Tuition Fee Payment Schedule</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="timing_content" fallbackContent={getSectionDefault('timing_content')} />
                    </section>

                    <section id="additional-fees" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Additional Fees &amp; Student Benefits</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="additional_fees_content" fallbackContent={getSectionDefault('additional_fees_content')} />
                    </section>

                    <section id="health-insurance" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Health Insurance</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="health_insurance_content" fallbackContent={getSectionDefault('health_insurance_content')} />
                    </section>

                    <section id="refunds" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Refund Policy</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="refunds_content" fallbackContent={getSectionDefault('refunds_content')} />
                    </section>

                    <section id="faq" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">General FAQ</h2>
                        </div>
                        <TuitionFAQ />
                    </section>

                    <section id="contact" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Need Help?</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="contact_content" fallbackContent={getSectionDefault('contact_content')} />
                    </section>

                </main>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
