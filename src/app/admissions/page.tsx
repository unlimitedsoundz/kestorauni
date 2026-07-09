import { Link } from "@aalto-dx/react-components";
import { CTA } from "@aalto-dx/react-modules";
import Image from 'next/image';
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import TableOfContents from '@/components/course/TableOfContents';
import StudentStoriesCarousel from '@/components/admissions/StudentStoriesCarousel';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { Breadcrumbs } from '@aalto-dx/react-modules';
import { Hero } from '@/components/layout/Hero';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';

export const metadata = {
    title: 'Admissions | Kestora University',
    description: 'Overview of admissions, degree programmes, and student life at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/admissions/',
    },
};

const tocSections = [
    { id: 'overview', title: 'Explore our fields', content: '' },
    { id: 'degree-programmes', title: 'Degree Programmes', content: '' },
    { id: 'how-to-apply', title: 'How to Apply', content: '' },
    { id: 'events', title: 'Events for Applicants', content: '' },
    { id: 'student-stories', title: 'Student Stories', content: '' },
    { id: 'campus', title: 'Studying on Campus', content: '' },
    { id: 'careers', title: 'Career Opportunities', content: '' },
    { id: 'online-opportunities', title: 'Online & Onsite', content: '' },
    { id: 'community', title: 'Vibrant Community', content: '' },
    { id: 'graduation', title: 'After Graduation', content: '' },
    { id: 'study-in-ottawa-canada', title: 'study in Helsinki, Finland', content: '' },

    { id: 'multidisciplinary', title: 'Multidisciplinary', content: '' },
    { id: 'lifelong', title: 'Lifelong Learning', content: '' },
    { id: 'summer', title: 'Summer Education', content: '' },
    { id: 'collaboration', title: 'Collaboration', content: '' },
    { id: 'contact', title: 'Contact & Support', content: '' },
];

export default function AdmissionsPage() {
    const pageSlug = 'admissions';
    const getSectionDefault = (sectionKey: string) => getPageContentSection(pageSlug, sectionKey)?.defaultContent ?? '';

    return (
        <div className="flex flex-col min-h-screen bg-white text-black font-sans">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Admissions', item: '/admissions' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Admissions to Kestora University",
                "url": "https://kestora.online/admissions",
                "description": "Admissions information for Bachelor’s and Master’s level programmes at Kestora University in Helsinki, Finland.",
                "mainEntity": {
                    "@type": "EducationalOccupationalProgram",
                    "name": "Degree Programmes at Kestora University",
                    "educationalLevel": [
                        "BachelorLevel",
                        "MasterLevel"
                    ],
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "Kestora University",
                        "url": "https://kestora.online"
                    },
                    "inLanguage": "en",
                    "availableChannel": {
                        "@type": "ServiceChannel",
                        "serviceLocation": {
                            "@type": "Place",
                            "name": "Helsinki, Finland"
                        }
                    }
                }
            }} />

            <Hero
                title={
                    <DbPageContent
                        tagName="span"
                        pageSlug={pageSlug}
                        sectionKey="hero_title"
                        fallbackContent={getSectionDefault('hero_title')}
                    />
                }
                body={
                    <DbPageContent
                        tagName="span"
                        pageSlug={pageSlug}
                        sectionKey="hero_subtitle"
                        fallbackContent={getSectionDefault('hero_subtitle')}
                    />
                }
                backgroundColor="#472247"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Admissions' }
                ]}
                image={{
                    src: "/images/admissions/hero-main.png",
                    alt: "Admissions to Kestora University"
                }}
            >
                <div className="flex flex-wrap gap-4">
                    <Link href="/admissions/bachelor" className="text-aalto-3 font-bold underline underline-offset-8 decoration-white hover:opacity-70 transition-colors text-white inline-flex items-center gap-2">
                        Bachelor's Admissions <ArrowRight size={20} weight="bold" />
                    </Link>
                    <Link href="/admissions/master" className="text-aalto-3 font-bold underline underline-offset-8 decoration-white hover:opacity-70 transition-colors text-white inline-flex items-center gap-2">
                        Master's Admissions <ArrowRight size={20} weight="bold" />
                    </Link>
                </div>
            </Hero>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar / Table of Contents */}
                    <div className="hidden lg:col-span-3">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <TableOfContents sections={tocSections} />
                            <div className="bg-[#000000] text-white p-10 border-0">
                                <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider">Admissions Office</h3>
                                <p className="text-sm text-white opacity-40 mb-6 font-light">Questions? We are here to help.</p>
                                <Link href="/contact" className="text-sm font-bold underline underline-offset-4 hover:text-white transition-colors">Contact Us</Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8 md:space-y-24 px-0 md:px-0">

                        <section id="overview" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Explore our fields</h2>
                            <p className="text-lg text-black leading-relaxed mb-4">
                                Studying at Kestora University offers a rich academic experience where innovation, multidisciplinary collaboration, and student community thrive together. You can pursue degree education at all levels Bachelor’s and Master’s as well as various lifelong learning options. In the Kestora University community, students have the freedom to specialise in one field or combine courses across several fields.
                            </p>
                        </section>

                        <section id="degree-programmes" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Degree Programmes & Fields of Study</h2>
                            <p className="text-lg text-black mb-6">Degree Programmes & Fields of Study</p>
                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <ContentBox
                                    icon="chartBar"
                                    title="Business and Economics"
                                    body="Innovative leadership, digital entrepreneurship, and global market strategies."
                                />
                                <ContentBox
                                    icon="palette"
                                    title="Arts, Design and Creative Industries"
                                    body="Fusing creative excellence with modern design and professional practice."
                                />
                                <ContentBox
                                    icon="cpu"
                                    title="Engineering, Technology and Sciences"
                                    body="Pioneering advanced engineering and applied research for global challenges."
                                />
                            </div>
                            <p className="text-black">
                                Students can pursue degrees in their chosen field or explore courses across fields, gaining new perspectives and collaborative opportunities as part of a multidisciplinary community.
                            </p>
                        </section>

                        <section id="how-to-apply" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">How to Apply</h2>
                            <p className="text-lg text-black mb-6">
                                Ready to apply to <Link href="/" className="underline font-medium hover:text-black hover:no-underline transition-colors">Kestora University Helsinki</Link>? Learn more about our programmes and campus in Helsinki, Finland.
                            </p>
                            <p className="text-lg text-black mb-6">You can explore admissions details and requirements for:</p>
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <Link href="/admissions/bachelor" className="flex-1 bg-[#000000] text-white p-10 hover:bg-[#000000] transition-colors group">
                                    <h3 className="font-bold text-xl mb-2 flex justify-between items-center">Bachelor's Admissions <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" /></h3>
                                    <p className="text-white opacity-40">Undergraduate programmes in English</p>
                                </Link>
                                <Link href="/admissions/master" className="flex-1 bg-[#000000] text-white p-10 hover:bg-[#000000] transition-colors group">
                                    <h3 className="font-bold text-xl mb-2 flex justify-between items-center">Master's Admissions <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" /></h3>
                                    <p className="text-white opacity-40">Graduate programmes and advanced studies</p>
                                </Link>
                            </div>
                            <p className="text-black">
                                The application process, deadlines, and eligibility criteria vary by degree level and study option. Full details can be found in the Kestora University admissions guide.
                            </p>
                        </section>

                        <section id="events" className="scroll-mt-32">
                            <ContentBox
                                size="large"
                                icon="calendar"
                                title="Events for Applicants"
                                body={
                                    <div className="space-y-6">
                                        <p className="text-black">Kestora University regularly organises events designed to help prospective students learn more about studying and applying:</p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { title: "Webinars on degree programmes", desc: "Interact with programme heads" },
                                                { title: "Student chats", desc: "Peer ambassadors share experiences" },
                                                { title: "Campus events", desc: "Tailored to applicants" },
                                                { title: "Applicant newsletters", desc: "And Q&A sessions" },
                                            ].map((item) => (
                                                <li key={item.title} className="flex gap-3 items-start border-0">
                                                    <ArrowRight size={18} weight="bold" className="mt-1 text-black flex-shrink-0" />
                                                    <div>
                                                        <strong className="block text-black font-bold">{item.title}</strong>
                                                        <span className="text-black opacity-40 text-sm font-light">{item.desc}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                image={{
                                    src: "/images/admissions/events.jpg",
                                    alt: "Students at Kestora University event"
                                }}
                            />
                        </section>

                        <section id="student-stories" className="scroll-mt-32">
                            <div>
                                <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Student Stories</h2>
                                <p className="text-lg text-black mb-8">
                                    Hear first-hand experiences from current students and alumni about life at Kestora University, academic projects, internships, and perspectives on how the University supports personal and professional growth.
                                </p>
                            </div>
                            <StudentStoriesCarousel />
                        </section>

                        <section id="campus" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Studying on Campus</h2>
                            <p className="text-lg text-black leading-relaxed">
                                Kestora University’s campus provides vibrant learning spaces, studios, libraries, and collaborative hubs where students experience academic life and community activities. The campus environment supports both study and leisure, encouraging a balanced student experience.
                            </p>
                        </section>

                        <section id="careers" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Career Opportunities</h2>
                            <p className="text-lg text-black mb-8">
                                Kestora University offers support and services to help students plan and pursue careers after graduation. Our strong industry ties ensure your education translates into real-world success.
                            </p>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { title: "Industry Collaboration", image: "/images/about/student-collab.jpg", desc: "Work on real projects with our global partners." },
                                    { title: "Alumni Networks", image: "/images/admissions/alumni_success.png", desc: "Connect with graduates working in leading industries." },
                                    { title: "Career Services", image: "/images/admissions-hero.png", desc: "Expert guidance for your professional journey." }
                                ].map(item => (
                                    <Card
                                        key={item.title}
                                        title={item.title}
                                        image={{
                                            src: item.image,
                                            alt: item.title
                                        }}
                                        body={item.desc}
                                        cta={{
                                            label: "Learn more",
                                            linkComponentProps: {
                                                href: "/contact"
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </section>

                        <section id="online-opportunities" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Explore Online and Onsite Opportunities</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Webinars on Degree Programmes</h3>
                                    <p className="text-black">Prospective students can join interactive webinars where programme content, learning outcomes, and study paths are explained by faculty and programme heads.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Podcasts About Studying</h3>
                                    <p className="text-black">Listen to podcasts where current students and staff discuss what it’s like to study at Kestora University, how programmes are structured, and tips for success.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Chat with Students</h3>
                                    <p className="text-black">Student ambassadors are available for online chats and Q&A sessions for prospective students, offering realistic insights into student life, academics and campus culture.</p>
                                </div>
                            </div>
                        </section>

                        {/* Vibrant Community */}
                         <section id="community" className="scroll-mt-32">
                             <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
                                 {/* Left: Text Content */}
                                 <div className="p-12 md:p-16 flex flex-col justify-center bg-gray-100 text-black">
                                     <h2 className="text-3xl font-bold mb-6 text-black">Vibrant Community</h2>
                                     <h3 className="text-xl font-bold mb-4 text-black">Life Beyond the Classroom</h3>
                                     <p className="text-lg text-black leading-relaxed font-medium">
                                         From music festivals to tech hackathons, your time at Kestora is about more than just studies.
                                     </p>
                                 </div>

                                 {/* Right: Image */}
                                 <div className="relative aspect-square lg:aspect-auto overflow-hidden">
                                     <Image
                                         src="/images/news/helsinki_study_hero_1771086748710.png"
                                         alt="Kestora Community"
                                         fill
                                         className="object-cover object-top"
                                         sizes="(max-width: 1024px) 100vw, 50vw"
                                     />
                                 </div>
                             </div>
                         </section>

                         {/* After Graduation */}
                          <section id="graduation" className="scroll-mt-32">
                              <CTA
                                  title="After Graduation"
                                  body="Kestora University supports your transition to working life. We offer resources for job seeking, career guidance, and alumni networking both in Helsinki, Finland and internationally."
                                  cta={{
                                      label: "Explore Career Services",
                                      linkComponentProps: {
                                          href: "/careers",
                                      },
                                  }}
                              />
                          </section>


                        <section id="study-in-ottawa-canada" className="scroll-mt-32">
                            <ContentBox
                                size="large"
                                icon="globeHemisphereWest"
                                title="study in Helsinki, Finland with Kestora University"
                                body={
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 gap-6">
                                            {[
                                                { title: "Quality & Safety", desc: "World-leading education in a safe, equal society." },
                                                { title: "Practical Innovation", desc: "Focus on independent study and real-world application." },
                                                { title: "Life Balance", desc: "Flexibility to shape your own unique academic path." }
                                            ].map(item => (
                                                <div key={item.title} className="flex gap-4 items-start">
                                                    <ArrowRight size={18} weight="bold" className="mt-1 text-black flex-shrink-0" />
                                                    <div>
                                                        <strong className="block text-black font-bold">{item.title}</strong>
                                                        <span className="text-black opacity-60 text-sm">{item.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Link href="/student-guide/international" className="inline-flex items-center gap-2 font-bold underline underline-offset-4 hover:opacity-50 transition-colors text-black">
                                            Read Our International Student Guide <ArrowRight size={20} weight="bold" />
                                        </Link>
                                    </div>
                                }
                                image={{
                                    src: "/images/admissions/finland_bus.jpg",
                                    alt: "Helsinki, Finland Campus"
                                }}
                            />
                        </section>

                        <section id="multidisciplinary" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Multidisciplinary Study Environment</h2>
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <p className="text-lg text-black mb-4">
                                        Kestora University encourages cross-field learning. You can take courses in areas such as business, arts, technology, and design, enabling you to create a personalised and comprehensive academic pathway.
                                    </p>
                                    <p className="text-black">
                                        Students are encouraged to combine studies across fields to gain broader perspectives and prepare for diverse career environments.
                                    </p>
                                </div>
                                <div className="w-24 h-24 bg-[#000000] flex items-center justify-center font-bold text-white text-xs text-center p-2 uppercase tracking-tighter">
                                    Cross-Pollination
                                </div>
                            </div>
                        </section>

                        <section id="lifelong" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Lifewide and Lifelong Learning</h2>
                            <p className="text-lg text-black mb-8">Education is a journey that never ends. Explore our flexible learning paths:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: "Professional Modules", image: "/images/admissions/lifelong_learning_adult.png", desc: "Deepen your expertise with specialized short courses." },
                                    { title: "Online Learning", image: "/images/admissions/online_learning.png", desc: "Flexible content accessible from anywhere in the world." },
                                    { title: "Campus Workshops", image: "/images/campus-workshops.png", desc: "Hands-on learning in our state-of-the-art labs." },
                                    { title: "Custom Training", image: "/images/custom-training.png", desc: "Tailored solutions for organizational growth." }
                                ].map(item => (
                                    <Card
                                        key={item.title}
                                        title={item.title}
                                        image={{
                                            src: item.image,
                                            alt: item.title
                                        }}
                                        body={item.desc}
                                        cta={{
                                            label: "View Path",
                                            linkComponentProps: {
                                                href: "#lifelong"
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </section>

                        <section id="summer" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Summer and Continuing Education</h2>
                            <p className="text-lg text-black leading-relaxed">
                                Kestora University hosts summer courses and programmes that allow students and professionals to deepen specific skills and knowledge in compact, high-impact formats. These programmes offer valuable opportunities for networking and learning from experienced faculty and industry experts.
                            </p>
                        </section>

                        <section id="collaboration" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Collaboration and Community</h2>
                            <p className="text-lg text-black leading-relaxed mb-4">
                                Kestora University actively partners with industries, research institutions, and international universities to provide students with collaborative projects, internships, and global exchange opportunities.
                            </p>
                            <p className="text-black">
                                Students benefit from a connected academic community that supports innovation, entrepreneurship and real-world problem solving.
                            </p>
                        </section>


                        <section id="contact" className="scroll-mt-32 mb-24 -mx-4 md:mx-0">
                            <div className="bg-[#000000] text-white p-12">
                                <p className="text-lg mb-6">
                                    Prospective and current students can find support and contact information for admissions, campus visits, and student services through the official Kestora University contact pages.
                                </p>
                                <p className="text-white opacity-60 mb-6">
                                    Whether you’re planning a campus visit or seeking guidance on admissions, resources are available to help guide your academic journey.
                                </p>
                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    <Link href="/contact" className="text-lg font-bold underline underline-offset-4 hover:text-neutral-300 transition-colors">
                                        Contact Us
                                    </Link>
                                    <Link href="/admissions-policy" className="text-lg font-bold underline underline-offset-4 hover:text-neutral-300 transition-colors">
                                        Admissions Policy
                                    </Link>
                                    <Link href="/academic-regulations" className="text-lg font-bold underline underline-offset-4 hover:text-neutral-300 transition-colors">
                                        Academic Regulations
                                    </Link>
                                    <Link href="/student-handbook" className="text-lg font-bold underline underline-offset-4 hover:text-neutral-300 transition-colors">
                                        Student Handbook
                                    </Link>
                                    <Link href="/code-of-conduct" className="text-lg font-bold underline underline-offset-4 hover:text-neutral-300 transition-colors">
                                        Code of Conduct
                                    </Link>
                                    <Link href="/refund-withdrawal-policy/" className="text-lg font-bold underline underline-offset-4 hover:text-neutral-300 transition-colors">
                                        Refund Policy
                                    </Link>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}

