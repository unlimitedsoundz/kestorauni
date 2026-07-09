
import { Student, Course, Profile } from '@/types/database'; // Import from database types
import { Layout, CheckCircle, Clock, CurrencyEur as DollarSign, WarningCircle as AlertCircle } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';

type PaymentState = { paid: boolean; paidAt: string | null };

function PaymentStatusRow({
    icon,
    label,
    state,
}: {
    icon: React.ReactNode;
    label: string;
    state: PaymentState;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-3 px-4 border border-neutral-200 rounded-sm bg-white">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${state.paid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-[13px] font-bold text-black leading-tight">{label}</p>
                    <p className="text-[10px] font-bold text-neutral-500">
                        {state.paid
                            ? state.paidAt
                                ? `Paid on ${new Date(state.paidAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`
                                : 'Paid'
                            : 'Awaiting payment'}
                    </p>
                </div>
            </div>
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider ${state.paid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {state.paid ? 'Paid' : 'Pending'}
            </span>
        </div>
    );
}


interface AcademicDashboardProps {
    student: Student & {
        program: Course;
        user: Profile;
    };
}

export default function AcademicDashboard({ student }: AcademicDashboardProps) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-xl md:text-2xl font-black text-black leading-none mb-1">Student Portal</h1>
                <p className="text-black text-[11px] md:text-[13px] font-bold">
                    Academic Year 2026-2027 • Sem 1
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
                {/* Left Column: Digital ID & status */}
                <div className="lg:col-span-1 space-y-4">

                    {/* Student Profile (Simple) */}
                    <div className="bg-white p-4 md:p-6 border border-neutral-100 rounded-sm">
                        <h2 className="text-lg font-bold leading-tight text-black mb-1">
                            {student.user?.first_name} {student.user?.last_name}
                        </h2>
                        <div className="space-y-3 mb-4">
                            <div>
                                <p className="text-[11px] text-black font-bold mb-0.5">Student ID</p>
                                <p className="text-[13px] text-black font-mono">{student.student_id}</p>
                            </div>
                            <div className="pt-2">
                                <p className="text-[11px] text-black font-bold mb-0.5">Programme</p>
                                <p className="text-[13px] md:text-[15px] font-bold text-black">{student.program?.title}</p>
                            </div>
                        </div>
                    </div>


                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="bg-neutral-50 p-3 md:p-4 border border-neutral-100 rounded-sm">
                            <h4 className="text-[11px] font-bold text-black mb-1">Credits</h4>
                            <p className="text-xl md:text-2xl font-bold text-black">0 / 180</p>
                        </div>
                        <div className="bg-neutral-50 p-3 md:p-4 border border-neutral-100 rounded-sm">
                            <h4 className="text-[11px] font-bold text-black mb-1">GPA</h4>
                            <p className="text-xl md:text-2xl font-bold text-black">0.0</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dashboard Actions */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    {/* Orientation/News */}
                    <div>
                        <h3 className="font-bold text-[13px] md:text-[15px] pb-2 md:pb-3 mb-3">Urgent Notifications</h3>
                        <div className="bg-neutral-50 p-4 md:p-6 border-l-2 border-black">
                            <p className="text-[13px] md:text-[15px] font-semibold mb-1">Orientation Week Starts</p>
                            <p className="text-[11px] md:text-[13px] text-black">Monday, 10th August • 09:00 AM • Tomakinen Hall</p>
                        </div>
                    </div>

                    {/* Status Banner */}
                    <div className="bg-neutral-50 p-4 md:p-6 border-l-2 border-black">
                        <h3 className="text-[13px] md:text-[15px] font-semibold mb-1">Academic Status: Active</h3>
                        <p className="text-black text-[11px] md:text-[13px] leading-relaxed">
                            You are officially enrolled for the upcoming term. An information on how to set up your instituitional email will be sent to your email.
                            <br /><span className="opacity-75">View <Link href="/refund-withdrawal-policy/" className="underline hover:text-neutral-700">Refund Policy</Link>.</span>
                        </p>
                        <div className="mt-3 md:mt-4 flex gap-3 text-[11px] md:text-[13px] text-black">
                            <span className="bg-white/50 px-2 py-1 rounded"><strong>Institutional Email:</strong> {student.institutional_email}</span>
                        </div>
                    </div>

                    {/* Payment Status - sourced from the students table (kept in sync with tuition_payments & housing_payments) */}
                    <div>
                        <h3 className="font-bold text-[13px] md:text-[15px] pb-2 md:pb-3 mb-3 flex items-center gap-2">
                            <DollarSign size={16} weight="bold" /> Payment Status
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                            <PaymentStatusRow
                                icon={<CheckCircle size={16} weight="bold" />}
                                label="Tuition Deposit"
                                state={{ paid: !!student.tuition_deposit_paid, paidAt: student.tuition_deposit_paid_at }}
                            />
                            <PaymentStatusRow
                                icon={<CheckCircle size={16} weight="bold" />}
                                label="Housing Fees"
                                state={{ paid: !!student.housing_fee_paid, paidAt: student.housing_fee_paid_at }}
                            />
                        </div>
                    </div>

                    {/* Academic Services Section */}
                    <div>
                        <h3 className="font-bold text-[13px] md:text-[15px] pb-2 md:pb-3 mb-4 md:mb-6 flex items-center gap-2">
                            Academic Services
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                            {[
                                {
                                    label: "Course Registration",
                                    desc: "Browse and enroll in modules",
                                    href: "/portal/student/courses",
                                    active: true,
                                    image: "/images/course-registration.png"
                                },
                                {
                                    label: "LMS Access",
                                    desc: "Canvas Learning Platform",
                                    href: "/portal/student/lms",
                                    active: true,
                                    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
                                },
                                {
                                    label: "Timetable",
                                    desc: "View your class schedule",
                                    href: "/portal/student/timetable",
                                    active: true,
                                    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop"
                                },
                                {
                                    label: "Academic Record",
                                    desc: "Transcripts and history",
                                    href: "/portal/student/transcript",
                                    active: true,
                                    image: "/images/academic-record.png"
                                },
                                {
                                    label: "Housing",
                                    desc: "Room assignments and applications",
                                    href: "/portal/student/housing",
                                    active: true,
                                    image: "/images/housing.png"
                                },
                                {
                                    label: "IT Access",
                                    desc: "Credentials and digital resources",
                                    href: "/portal/student/it-access",
                                    active: true,
                                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                                },
                                {
                                    label: "Code of Conduct",
                                    desc: "Standards of behavior",
                                    href: "/code-of-conduct",
                                    active: true,
                                    image: "/images/library.png"
                                },
                                {
                                    label: "Refund Policy",
                                    desc: "Withdrawal & Refund Terms",
                                    href: "/refund-withdrawal-policy/",
                                    active: true,
                                    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
                                },
                            ].map((item) => (
                                <Link href={item.href} key={item.label} className={`border border-neutral-200 rounded-sm overflow-hidden hover:border-black transition-all group bg-white ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <div className="relative h-20 md:h-24 w-full bg-neutral-100">
                                        <Image
                                            src={item.image}
                                            alt={item.label}
                                            fill
                                            className="object-cover object-top opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="p-3 md:p-4">
                                        <h4 className="font-bold text-[11px] md:text-[13px] tracking-wide mb-0.5 leading-tight">{item.label}</h4>
                                        <p className="hidden md:block text-[11px] text-black font-medium">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Campus Services Section */}
                    <div>
                        <h3 className="font-bold text-[13px] md:text-[15px] pb-2 md:pb-3 mb-4 md:mb-6 flex items-center gap-2">
                            Campus Services & Amenities
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                            {[
                                {
                                    label: "Opiskelija Cafe",
                                    desc: "Student Restaurant & Catering",
                                    href: "/student-life/cafe",
                                    active: true,
                                    image: "/images/student-cafe.png"
                                },
                                {
                                    label: "Student Wellness",
                                    desc: "Health and counseling services",
                                    href: "#",
                                    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                                },
                                {
                                    label: "Campus Library",
                                    desc: "Study spaces and resources",
                                    href: "#",
                                    image: "/images/library.png"
                                },
                                {
                                    label: "Career Center",
                                    desc: "Internships and job support",
                                    href: "#",
                                    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop"
                                },
                            ].map((item) => (
                                <Link href={item.href} key={item.label} className={`border border-neutral-200 rounded-sm overflow-hidden hover:border-black transition-all group bg-white ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <div className="relative h-20 md:h-24 w-full bg-neutral-100">
                                        <Image
                                            src={item.image}
                                            alt={item.label}
                                            fill
                                            className="object-cover object-top opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="p-3 md:p-4">
                                        <h4 className="font-bold text-[11px] md:text-[13px] tracking-wide mb-0.5 leading-tight">{item.label}</h4>
                                        <p className="hidden md:block text-[11px] text-black font-medium">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

