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
    title: 'Paying the Tuition Fee | Cannoga College',
    description: 'Structure of tuition fees, payment methods (Bank Transfer), and refund policies for international students at Cannoga College.',
    alternates: {
        canonical: 'https://cannogacollege.ca/admissions/tuition/',
    },
};

const sections = [
    { id: 'fee-structure', title: 'Fee Structure', content: '' },
    { id: 'tuition-estimator', title: 'Tuition & Fees Estimator', content: '' },
    { id: 'certificate-fees', title: 'Certificate Fees', content: '' },
    { id: 'diploma-fees', title: 'Diploma Fees', content: '' },
    { id: 'bachelor-fees', title: 'Bachelor\u2019s Fees', content: '' },
    { id: 'master-fees', title: 'Master\u2019s Fees', content: '' },
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
                backgroundColor="#a987ff"
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
                        <DbPageContent pageSlug={pageSlug} sectionKey="fee_structure_content" fallbackContent={getSectionDefault('fee_structure_content')} />
                    </section>

                    <section id="tuition-estimator" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Interactive Tuition &amp; Fees Estimator</h2>
                            <p className="cc-label">Estimate your tuition and ancillary fees per semester</p>
                        </div>
                        <TuitionEstimator courses={courses || []} />
                    </section>

                    <section id="certificate-fees" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Certificate Programs</h2>
                            <p className="cc-label">6 months – 1 year · Domestic $3,500 / International $9,500 per year</p>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="certificate_fees_content" fallbackContent={getSectionDefault('certificate_fees_content')} />
                    </section>

                    <section id="diploma-fees" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Diploma &amp; Advanced Diploma Programs</h2>
                            <p className="cc-label">2–3 years · Domestic $3,500 / International $9,500 per year</p>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="diploma_fees_content" fallbackContent={getSectionDefault('diploma_fees_content')} />
                    </section>

                    <section id="bachelor-fees" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Bachelor's Programmes</h2>
                            <p className="cc-label">4 years · Domestic $6,200 / International $12,500 per year</p>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="bachelor_fees_content" fallbackContent={getSectionDefault('bachelor_fees_content')} />
                    </section>

                    <section id="master-fees" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Master's Fees</h2>
                            <p className="cc-label">2 years · Domestic $8,500 / International $18,000 per year</p>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="master_fees_content" fallbackContent={getSectionDefault('master_fees_content')} />
                    </section>

                    <section id="merit-scholarship" className="scroll-mt-32">
                        <div className="cc-section-divider">
                            <h2 className="cc-h2">Merit Scholarship</h2>
                        </div>
                        <DbPageContent pageSlug={pageSlug} sectionKey="merit_scholarship_content" fallbackContent={getSectionDefault('merit_scholarship_content')} />
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
