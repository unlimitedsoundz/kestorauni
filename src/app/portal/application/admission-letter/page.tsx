'use client';

import { createClient } from '@/utils/supabase/client';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Link } from "@aalto-dx/react-components";
import { CaretLeft as ChevronLeft } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';
import { getIntakeStartDate, getProgramEndDate, getIntakeAcademicYear } from '@/lib/intakes';
import PrintButton from '@/components/portal/PrintButton';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { format } from 'date-fns';

function AdmissionLetterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [admission, setAdmission] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [student, setStudent] = useState<any>(null);
    const [payment, setPayment] = useState<any>(null);

    useEffect(() => {
        if (!id) {
            router.push('/portal/dashboard');
            return;
        }

        const fetchData = async () => {
            const supabase = createClient();
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/portal/account/login');
                    return;
                }

                // Fetch Application with Offer and Payments
                const { data: applicationRaw, error } = await supabase
                    .from('applications')
                    .select(`
                        *,
                        course:Course(*),
                        offer:admission_offers(*, payments:tuition_payments(*))
                    `)
                    .eq('id', id)
                    .eq('user_id', user.id)
                    .single();

                if (error || !applicationRaw) {
                    console.error('Fetch error:', error || 'Application not found');
                    setData(null);
                    setLoading(false);
                    return;
                }

                setData(applicationRaw);

                // Fetch admission details
                const { data: admissionData } = await supabase
                    .from('admissions')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('program', applicationRaw.course?.title)
                    .maybeSingle();

                if (admissionData) setAdmission(admissionData);

                // Fetch profile
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('first_name, last_name, student_id, address_line1, city, country_of_residence')
                    .eq('id', user.id)
                    .single();

                if (profileData) setProfile(profileData);

                // Fetch Student record for the official ID
                const { data: studentRecord } = await supabase
                    .from('students')
                    .select('*')
                    .eq('application_id', id)
                    .maybeSingle();

                if (studentRecord) setStudent(studentRecord);

                // Get completed payment
                const offer = Array.isArray(applicationRaw.offer) ? applicationRaw.offer[0] : applicationRaw.offer;
                const completedPayment = offer?.payments?.find((p: any) => p.status === 'COMPLETED');
                setPayment(completedPayment);

            } catch (e) {
                console.error('Error fetching admission letter data:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-200 border-t-black rounded-full animate-spin"></div>
                    <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">Loading Admission Letter...</p>
                </div>
            </div>
        );
    }

    if (!data && !loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-xl font-bold text-neutral-900 uppercase tracking-tight">Document Not Found</p>
                <p className="text-sm text-neutral-500 max-w-md text-center">We couldn't retrieve your admission letter. This might be due to a session timeout or a temporary connection issue.</p>
                <div className="flex gap-4">
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">Retry</button>
                    <Link href="/portal/dashboard" className="px-6 py-2 border border-neutral-200 text-[10px] font-bold uppercase tracking-widest rounded-sm">Dashboard</Link>
                </div>
            </div>
        );
    }

    const application = data;
    // Check if enrolled or admitted/paid
    const isEnrolled = application.status === 'ENROLLED' || (application.status === 'ADMITTED' && payment);

    if (!isEnrolled) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-medium text-neutral-900">Admission Letter Not Available</p>
                <p className="text-sm text-neutral-500">You must be officially enrolled to view this document.</p>
                <Link href="/portal/dashboard" className="text-sm text-blue-600 underline hover:text-blue-800">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    // Current Date
    const today = new Date();
    const admissionTimestamp = (admission?.accepted_at || admission?.created_at || application.updated_at || application.submitted_at || application.created_at || today.toISOString());
    const issueDate = format(new Date(admissionTimestamp), "MMMM d, yyyy");

    const academicYear = getIntakeAcademicYear(application.intake);
    const intake = application.intake || 'Fall 2026';

    const degreeLevelRaw = (application.course?.degreeLevel || '').toUpperCase();
    const degreeLevelLabel =
        degreeLevelRaw === 'MASTER' ? "Master's Degree"
            : degreeLevelRaw === 'BACHELOR' ? "Bachelor's Degree"
                : degreeLevelRaw === 'DIPLOMA' ? 'Diploma'
                    : degreeLevelRaw === 'CERTIFICATE' ? 'Certificate'
                        : "Bachelor's Degree";

    // Dynamic Student ID (if available, otherwise fallback)
    const displayStudentId = student?.student_id || admission?.student_id || profile?.student_id || application.user?.student_id || "Generating...";

    // Improved Name detection
    const firstName = profile?.first_name || application.personal_info?.firstName || application.user?.first_name;
    const lastName = profile?.last_name || application.personal_info?.lastName || application.user?.last_name;
    const studentName = firstName && lastName ? `${firstName} ${lastName}` : application.user?.email;

    // Data for detailed wording
    const passportNumber = application.personal_info?.passportNumber || "N/A";
    const dob = application.personal_info?.dateOfBirth ? format(new Date(application.personal_info.dateOfBirth), "MMMM d, yyyy") : "N/A";

    const studentAddress = (profile?.address_line1 || application.contact_details?.addressLine1) ? (
        <>
            {profile?.address_line1 || application.contact_details?.addressLine1 || 'Address Pending'}<br />
            {(profile?.city || application.contact_details?.city) ? `${profile?.city || application.contact_details?.city}, ` : ''}{profile?.country_of_residence || application.contact_details?.country || ''}
        </>
    ) : 'Address Pending';

    const programStart = getIntakeStartDate(application.intake); // Fall 2026 start date
    const admissionRef = admission?.admission_reference || application.application_number || application.id.slice(0, 8).toUpperCase();

    return (
        <div className="min-h-screen bg-neutral-100/50 py-6 md:py-12 px-4 sm:px-6 font-rubik">
            {/* Control Bar */}
            <div className="max-w-[210mm] mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link
                    href="/portal/dashboard"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                >
                    <ChevronLeft size={14} weight="bold" />
                    Back to Dashboard
                </Link>
                <PrintButton />
            </div>

            {/* Document Container - A4 Size */}
            <div className="w-full max-w-[210mm] mx-auto bg-white print:shadow-none p-[15mm] md:p-[20mm] print:p-[10mm] border border-neutral-200 print:border-0 relative overflow-hidden min-h-[297mm] flex flex-col justify-between text-black">

                {/* Content Wrapper */}
                <div className="space-y-3 print:space-y-1">
                    {/* 1. Header (Logo & Contact + To Block) */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 pb-3">
                        <div className="space-y-4">
                            <div className="relative w-40 h-10">
                                <Image
                                    src="/images/logo-heffring.png"
                                    alt="Heffring University"
                                    fill
                                    style={{ objectFit: 'contain', objectPosition: 'left center' }}
                                />
                            </div>
                            {/* To: Section */}
                            <div className="text-[10px] leading-tight text-black">
                                <span className="text-[8px] font-bold text-black uppercase tracking-widest block mb-0.5">To:</span>
                                <strong className="text-xs block mb-0.5 text-black">{studentName}</strong>
                                <span className="text-black block">{studentAddress}</span>
                                <span className="block mt-1 font-mono text-[10px] text-black">Student ID: {displayStudentId}</span>
                            </div>
                        </div>
                        <div className="text-left md:text-right text-[9px] font-medium text-black leading-tight uppercase tracking-wide">
                            <strong className="text-black block mb-1 text-[10px]">Heffring University – Helsinki Campus</strong>
                            Kaarrostie 38,<br />
                            00960 Helsinki, Uusimaa, Finland<br />
                            Phone: +358-09-42721884<br />
                            <div className="mt-1 text-[8px]">
                                heffring.online | admissions@heffring.online
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-4 print:mb-2 pt-2 print:pt-0">
                        <h1 className="text-2xl print:text-lg font-bold uppercase tracking-[0.1em] text-black">
                            Official Admission Letter
                        </h1>
                    </div>

                    {/* Admission Details */}
                    <div className="mb-4 print:mb-2 text-[10px] text-black space-y-1">
                        <div><strong>Enrollment Date:</strong> {issueDate}</div>
                        <div><strong>Official Student ID:</strong> <span className="font-mono">{displayStudentId}</span></div>
                    </div>

                    {/* Official Statement */}
                    <div className="text-xs print:text-[10px] leading-normal text-black mb-4 print:mb-2">
                        <p className="mb-2 print:mb-1 text-black">
                            This letter serves as official notification that {studentName} (Passport: {passportNumber}, DOB: {dob}) has been formally admitted and fully enrolled as a degree student at Heffring University for the 2026 - 2027 academic year.
                        </p>
                        <p className="text-black">
                            Having satisfied all academic entrance criteria and fulfilled the mandated tuition fee obligations, the student is officially registered for the <strong className="text-black">{application.course?.title} ({application.course?.programType || 'Full-time'})</strong>. This program is a full-time course of study conducted in the English language at our Helsinki Campus location (Kaarrostie 38, 00960 Helsinki, Uusimaa, Finland).
                        </p>
                    </div>


                    {/* Details List */}
                    <div className="mb-4 print:mb-2 text-[10px] text-black">
                        <p className="font-bold mb-1 uppercase tracking-widest text-[9px]">Programme Details</p>
                        <ul className="list-none space-y-1 ml-0">
                            {[
                                { label: 'Date of Admission', value: issueDate },
                                { label: 'Academic Year', value: academicYear },
                                { label: 'Intake', value: intake },
                                { label: 'Degree Level', value: degreeLevelLabel },
                                { label: 'Programme Start Date', value: getIntakeStartDate(application.intake) },
                                { label: 'Programme End Date', value: getProgramEndDate(application.intake, application.course?.degreeLevel) },
                                { label: 'Total Credits', value: (application.course?.degreeLevel || '').toUpperCase() === 'MASTER' ? '120 ECTS' : (application.course?.degreeLevel || '').toUpperCase() === 'BACHELOR' ? '180 ECTS' : (application.course?.degreeLevel || '').toUpperCase() === 'DIPLOMA' ? '120 ECTS' : '60 ECTS' },
                                { label: 'Programme of Study', value: `${application.course?.title} (${application.course?.programType || 'Full-time'})` }
                            ].map((row, idx) => (
                                <li key={idx}><strong>{row.label}:</strong> {row.value}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Rights & Access, Official Use, Next Steps, Refund Policy */}
                    <div className="space-y-4 print:space-y-2 mb-4 print:mb-2">
                        <div>
                            <h4 className="text-[9px] font-bold uppercase tracking-widest mb-1 text-black">Student Rights</h4>
                            <p className="text-[10px] text-black leading-tight">
                                Access to campus facilities (Library, Labs), digital resources, and student portal.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[9px] font-bold text-black uppercase tracking-widest mb-1">Official Use</h4>
                            <p className="text-[10px] text-black leading-tight italic">
                                Certificate of admission and may be used for visa applications, residence permit processing (Migri), and other official purposes requiring proof of student status in Helsinki, Finland.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[9px] font-bold text-black uppercase tracking-widest mb-1">Next Steps</h4>
                            <ul className="list-disc ml-4 text-[10px] text-black space-y-0.5 leading-tight">
                                <li>Activate IT account and student email.</li>
                                <li>Register for orientation sessions.</li>
                                <li>Submit housing application if pending.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[9px] font-bold text-black uppercase tracking-widest mb-1">Refund Policy</h4>
                            <p className="text-[10px] text-black leading-tight">
                                Subject to the university's refund policy at <a href="https://heffring.online/refund-withdrawal-policy/" className="underline text-black">heffring.online/refund</a>.
                            </p>
                        </div>
                    </div>

                    {/* Signature Block */}
                    <div className="mt-4 print:mt-2 pt-2 print:pt-1 flex flex-row justify-between items-end">
                        <div className="w-1/2">
                            <div className="w-32 h-12 print:h-10 mb-1 print:mb-0.5 relative">

                                <Image
                                    src="/images/anna-virtanen-signature.jpg"
                                    alt="Official Signature"
                                    fill
                                    style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
                                />
                            </div>
                            <div className="text-[10px] font-black text-black uppercase">Office of the Registrar</div>
                            <div className="text-[9px] font-bold text-black">Office of the Registrar, Heffring University</div>
                            <div className="text-[8px] font-bold text-black uppercase tracking-widest">Heffring University | Helsinki, Finland</div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-[10px] text-black italic">
                            Generated electronically via Heffring SIS. Valid without physical signature if verified online.
                        </p>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 15mm; size: A4; }
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    header, nav, footer,
                    [data-theme="portal"] > header,
                    [data-theme="portal"] > footer,
                    .print\\:hidden { display: none !important; }
                    [data-theme="portal"] { min-height: 0 !important; }
                    [data-theme="portal"] > main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
                    .min-h-screen { min-height: 0 !important; background: white !important; padding: 0 !important; }
                    .min-h-\\[297mm\\] { min-height: 0 !important; }
                    .max-w-\\[210mm\\] { max-width: 100% !important; margin: 0 !important; padding: 15mm 0 !important; }
                    .shadow-xl, .shadow-sm, .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:border-0 { border: none !important; }
                    * { color: black !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    a { text-decoration: none !important; }
                }
            ` }} />
        </div >
    );
}

export default function AdmissionLetterPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-neutral-200 border-t-black rounded-full animate-spin"></div>
            </div>
        }>
            <AdmissionLetterContent />
        </Suspense>
    );
}

