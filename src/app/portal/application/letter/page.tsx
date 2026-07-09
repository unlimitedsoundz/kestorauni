'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Application } from '@/types/database';
import { Link } from "@aalto-dx/react-components";
import { CaretLeft as ChevronLeft, CheckCircle, WarningCircle as AlertCircle } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';
import PrintButton from '@/components/portal/PrintButton';
import RejectOfferButton from './RejectOfferButton';
import Image from 'next/image';
import { 
    getTuitionFee, 
    calculateDiscountedFee, 
    mapSchoolToTuitionField,
    getProgramYears,
    getAnnualFeeFromTotal,
    calculateTuitionDeposit
} from '@/utils/tuition';

interface EnrichedApplication extends Application {
    offer?: any[];
    admission_details?: any;
}

function AdmissionLetterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [data, setData] = useState<EnrichedApplication | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchLetterData = async () => {
            if (!id) {
                router.push('/portal/dashboard');
                return;
            }

            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/portal/account/login');
                    return;
                }

                const { data: applicationRaw, error } = await supabase
                    .from('applications')
                    .select(`
                        *,
                        course:Course(*, school:School(*)),
                        user:profiles(*),
                        offer:admission_offers(*)
                    `)
                    .eq('id', id)
                    .eq('user_id', user.id)
                    .single();

                if (error || !applicationRaw) {
                    console.error('Letter data not found', error);
                    router.push('/portal/dashboard');
                    return;
                }

                // Fetch Admission Details
                const { data: admissionData } = await supabase
                    .from('admissions')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('program', applicationRaw.course?.title)
                    .maybeSingle();

                setData({ ...applicationRaw, admission_details: admissionData });
            } catch (err) {
                console.error('CRITICAL: Fetching letter data failed', err);
                router.push('/portal/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchLetterData();
    }, [id, router, supabase]);

    const handleAcceptOffer = async () => {
        if (!id || !data) return;

        const confirmed = window.confirm(
            'Are you sure you want to accept this offer? This will finalize your admission process and proceed to tuition payment.'
        );

        if (!confirmed) return;

        setIsSaving(true);
        try {
            const { acceptApplicationOffer } = await import('@/app/portal/student/offer/actions');
            await acceptApplicationOffer(id);

            // Navigate to payment immediately
            window.location.href = `/portal/application/payment?id=${id}`;
        } catch (err: any) {
            console.error('Error accepting offer:', err);
            // If offer was already accepted, still navigate to payment
            if (err.message?.includes('already') || err.message?.includes('not in a state')) {
                window.location.href = `/portal/application/payment?id=${id}`;
            } else {
                alert(err.message || 'Failed to accept offer. Please try again.');
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-neutral-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data || !id) return null;

    const application = data;

    const degreeLevelRaw = (application.course?.degreeLevel || '').toUpperCase();
    const degreeLevelLabel =
        degreeLevelRaw === 'MASTER' ? "Master's Degree"
            : degreeLevelRaw === 'BACHELOR' ? "Bachelor's Degree"
                : degreeLevelRaw === 'DIPLOMA' ? 'Diploma'
                    : degreeLevelRaw === 'CERTIFICATE' ? 'Certificate'
                        : "Bachelor's Degree";

    // Determine Fees (Annual based for Deposit calculation)
    let displayOffer = Array.isArray(data.offer) ? data.offer[0] : data.offer;
    displayOffer = displayOffer || {};

    const years = getProgramYears(application.course?.duration || '', application.course?.degreeLevel);
    const field = mapSchoolToTuitionField(application.course?.school?.slug || 'technology');
    const isEarlyBird = (displayOffer.discount_amount || 0) > 0;

    const nationality = application.personal_info?.nationality;
    const isDomestic = nationality ? (nationality.toLowerCase().trim() === 'finland' || nationality.toLowerCase().trim() === 'finnish' || nationality.toLowerCase().trim() === 'eu' || nationality.toLowerCase().trim() === 'domestic') : false;

    let annualFee: number;
    if (displayOffer.tuition_fee) {
        annualFee = getAnnualFeeFromTotal(displayOffer.tuition_fee, displayOffer.discount_amount || 0, years);
    } else {
        annualFee = getTuitionFee(application.course?.degreeLevel || 'BACHELOR', field, isDomestic);
    }

    const firstYearFee = isEarlyBird ? calculateDiscountedFee(annualFee) : annualFee;
    const depositAmount = calculateTuitionDeposit(annualFee, field, isEarlyBird, application.course?.degreeLevel, isDomestic);
    const remainingBalance = firstYearFee - depositAmount;

    const today = new Date();
    const showAcceptButton = application.status === 'ADMITTED';
    const admissionTimestamp = displayOffer?.accepted_at || displayOffer?.created_at || application.updated_at || application.submitted_at || application.created_at || today.toISOString();
    const admissionDateLabel = formatToDDMMYYYY(admissionTimestamp);

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6">
            {/* Control Bar (Hidden on Print) */}
            <div className="max-w-[210mm] mx-auto mb-6 md:mb-8 print:hidden space-y-3 md:space-y-0">
                <div className="flex items-center justify-between">
                    <Link
                        href="/portal/dashboard"
                        className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors"
                    >
                        <ChevronLeft size={14} weight="bold" />
                        <span className="hidden sm:inline">Back to Dashboard</span>
                        <span className="sm:hidden">Back</span>
                    </Link>
                    <PrintButton />
                </div>
                {showAcceptButton && (
                    <div className="grid grid-cols-2 gap-2 md:flex md:gap-3">
                        <button
                            onClick={handleAcceptOffer}
                            disabled={isSaving}
                            className="flex items-center justify-center gap-1.5 bg-neutral-600 text-white px-3 md:px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider md:tracking-widest hover:bg-neutral-700 transition-all shadow-sm disabled:opacity-50"
                        >
                            {isSaving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <CheckCircle size={14} weight="bold" />
                            )}
                            Accept<span className="hidden md:inline"> Offer</span>
                        </button>
                        <RejectOfferButton applicationId={id} />
                    </div>
                )}

            </div>

            {/* Letter Container */}
            <div className="w-full max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none min-h-[297mm] p-6 md:p-[20mm] print:p-[10mm] relative overflow-hidden text-black border border-neutral-100 print:border-0" style={{ fontFamily: '"Inter", sans-serif' }}>
                
                {/* 1. Header: Logo & Address */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 mb-6 md:mb-8 border-b-2 border-neutral-900 pb-4">
                    <div>
                        <div className="mb-2 relative w-56 h-12">
                            <Image
                                src="/logo-kestora.png"
                                alt="Kestora University Official Logo"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                                priority
                            />
                        </div>
                    </div>
                    <div className="text-left md:text-right text-[10px] font-medium text-black leading-relaxed uppercase tracking-wide">
                        <strong className="text-black text-xs">Kestora University – Helsinki Campus</strong><br />
                        Pohjoisesplanadi 51<br />
                        00150 Helsinki, Finland<br />
                        Phone: +358 09 42721884<br />
                        kestora.online<br />
                        admissions@kestora.online
                    </div>
                </div>

                {['ENROLLED', 'ADMISSION_LETTER_READY', 'ADMISSION_LETTER_GENERATED'].includes(application.status) ? (
                    /* ADMISSION LETTER VIEW */
                    <div className="space-y-4 print:space-y-2">
                        {/* 1a. Recipient Address Block (Top Left) */}
                        <div className="mb-6 flex flex-col justify-between items-start gap-8">
                            <div className="flex-1">
                                <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">To:</div>
                                <div className="text-sm font-bold text-black mb-1">{application.personal_info?.firstName} {application.personal_info?.lastName}</div>
                                <div className="text-xs text-neutral-600 max-w-[250px] leading-relaxed">
                                    {(application.personal_info?.streetAddress || application.contact_details?.streetAddress) ? (
                                        <>
                                            {application.personal_info?.streetAddress || application.contact_details?.streetAddress}<br />
                                            {application.personal_info?.city || application.contact_details?.city}, {application.personal_info?.country || application.contact_details?.country}
                                        </>
                                    ) : (
                                        'Address Pending'
                                    )}
                                </div>
                                <div className="text-xs font-bold text-black mt-2">Student ID: {application.user?.student_id || application.id.slice(0, 8).toUpperCase()}</div>
                            </div>
                        </div>

                        <div className="text-center mb-6 print:mb-4 pt-2">
                            <h1 className="text-2xl print:text-xl font-bold uppercase tracking-[0.1em] text-black">
                                Official Admission Letter
                            </h1>
                        </div>
                        {/* Admission Details Grid */}
                        <div className="grid grid-cols-3 gap-4 print:gap-2 p-3 print:p-2 mb-6 print:mb-4 border-y border-black">
                            <div className="text-center">
                                <span className="block text-[8px] font-bold text-black uppercase tracking-widest mb-0.5">Enrollment Date</span>
                                <span className="block font-bold text-xs text-black">{formatToDDMMYYYY(today.toISOString())}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-[8px] font-bold text-black uppercase tracking-widest mb-0.5">Admission Reference</span>
                                <span className="block font-bold text-xs font-mono text-black">{application.id.slice(0, 8).toUpperCase()}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-[8px] font-bold text-black uppercase tracking-widest mb-0.5">Official Student ID</span>
                                <span className="block font-bold text-xs font-mono text-black">{application.user?.student_id || 'KU9166922'}</span>
                            </div>
                        </div>


                        {/* Official Statement */}
                        <div className="text-sm print:text-xs leading-relaxed text-black mb-6 print:mb-4">
                            <p className="mb-2 print:mb-1 text-black">
                                This letter serves as official notification that {application.personal_info?.firstName} {application.personal_info?.lastName} (Passport: {application.personal_info?.passportNumber || 'N/A'}, DOB: {formatToDDMMYYYY(application.user?.date_of_birth || application.personal_info?.dateOfBirth || today.toISOString())}) has been formally admitted and fully enrolled as a degree student at Kestora University for the 2026 - 2027 academic year.
                            </p>
                            <p className="text-black">
                                Having satisfied all academic entrance criteria and fulfilled the mandated tuition fee obligations, the student is officially registered for the <strong className="text-black">{application.course?.title} ({application.course?.programType || 'Full-time'})</strong>. This program is a full-time course of study conducted in the English language at our Helsinki Campus location (Pohjoisesplanadi 51, 00150 Helsinki, Uusimaa, Finland).
                            </p>
                        </div>


                        {/* Details Table */}
                        <div className="space-y-0.5 mb-8 print:mb-4">
                            {[
                                { label: 'Date of Admission', value: admissionDateLabel },
                                { label: 'Academic Year', value: '2026 - 2027' },
                                { label: 'Intake', value: 'Fall 2026' },
                                { label: 'Degree Level', value: degreeLevelLabel },
                                { label: 'Programme Start Date', value: '17.09.2026' },
                                { label: 'Programme End Date', value: (application.course?.degreeLevel || '').toUpperCase() === 'MASTER' ? '10.08.2028' : (application.course?.degreeLevel || '').toUpperCase() === 'BACHELOR' ? '10.08.2029' : (application.course?.degreeLevel || '').toUpperCase() === 'DIPLOMA' ? '10.08.2028' : '10.08.2027' },
                                { label: 'Total Credits', value: (application.course?.degreeLevel || '').toUpperCase() === 'MASTER' ? '120 ECTS' : (application.course?.degreeLevel || '').toUpperCase() === 'BACHELOR' ? '180 ECTS' : (application.course?.degreeLevel || '').toUpperCase() === 'DIPLOMA' ? '120 ECTS' : '60 ECTS' },
                                { label: 'Programme of Study', value: `${application.course?.title} (${application.course?.programType || 'Full-time'})` }
                            ].map((row, idx) => (
                                <div key={idx} className="flex justify-between py-1.5 print:py-1 border-b border-black">
                                    <span className="text-[11px] print:text-[10px] font-bold uppercase text-black">{row.label}</span>
                                    <span className="text-[11px] print:text-[10px] font-medium text-black">{row.value}</span>
                                </div>
                            ))}

                        </div>

                        {/* Rights & Access, Official Use, Next Steps, Refund Policy */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6 print:gap-y-4">
                            <div>
                                <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 border-b border-black pb-1 text-center">Student Rights & Access</h4>
                                <p className="text-[10px] text-black leading-relaxed">
                                    As an enrolled student, you are granted full access to:
                                </p>
                                <ul className="list-disc ml-4 text-[10px] text-black space-y-1 mt-1">
                                    <li>Campus facilities (Library, Labs, Study Areas)</li>
                                    <li>Digital learning resources and student portal</li>
                                    <li>Academic advising and student support services</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 border-b border-black pb-1 text-center">Immigration / Official Use</h4>
                                <p className="text-[10px] text-black leading-relaxed">
                                    This document is an official certificate of admission and may be used for visa applications, residence permit processing (Migri), and other official purposes requiring proof of student status in Helsinki, Finland.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 border-b border-black pb-1 text-center">Next Steps</h4>
                                <ul className="list-decimal ml-4 text-[10px] text-black space-y-1">
                                    <li>Activate your student email and IT account (credentials sent separately).</li>
                                    <li>Register for the orientation week sessions via the student portal.</li>
                                    <li>Submit your housing application if you have not done so.</li>
                                    <li>Arrival instructions will be communicated to your student email.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-2 border-b border-black pb-1 text-center">Refund Policy</h4>
                                <p className="text-[10px] text-black leading-relaxed">
                                    Tuition fees are subject to the university’s refund policy. Full details can be found at <a href="https://kestora.online/refund-withdrawal-policy/" className="underline text-black">kestora.online/refund-withdrawal-policy/</a>.
                                </p>
                            </div>
                        </div>

                        {/* Signature Block */}
                        <div className="mt-6 print:mt-4 pt-4 print:pt-2 border-t border-black flex justify-between items-end">
                            <div>
                                <div className="w-40 h-16 print:h-12 mb-2 print:mb-1 relative">

                                    <Image
                                        src="/images/anna-virtanen-signature.jpg"
                                        alt="Official Signature"
                                        fill
                                        style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
                                    />
                                </div>
                                <div className="text-[11px] font-black text-black uppercase">Office of the Registrar</div>
                                <div className="text-[11px] font-bold text-black mt-0.5">Alex Moulton</div>
                                <div className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">College Registrar | Kestora University, Helsinki</div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-[10px] text-black">
                                Generated electronically via Kestora SIS. Valid without physical signature if verified online.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* OFFER LETTER VIEW (EXISTING) */
                    <>
                        <div className="text-center mb-6 print:mb-3">
                            <h1 className="text-2xl print:text-xl font-bold uppercase tracking-[0.2em] text-black">
                                Official Letter of Offer
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 print:gap-2 p-4 print:p-2 mb-6 print:mb-4">
                            <div>
                                <span className="block text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Date Issued</span>
                                <span className="font-bold text-xs">{formatToDDMMYYYY(today.toISOString())}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Status</span>
                                <span className="font-bold text-xs">{application.status.replaceAll('_', ' ')}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Application ID</span>
                                <span className="font-bold text-xs font-mono">{application.id.slice(0, 8).toUpperCase()}</span>
                            </div>
                        </div>


                        {/* 2. Applicant Info */}
                        <div className="mb-6 print:mb-4">
                            <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-3 print:mb-2 pb-1">Applicant & Programme Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 print:gap-y-1.5 gap-x-12">
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Full Name (Passport Match)</div>
                                    <div className="text-sm print:text-xs font-bold text-black">{application.personal_info?.firstName} {application.personal_info?.lastName}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Intake & Year</div>
                                    <div className="text-sm print:text-xs font-bold text-black">Fall Semester 2026</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Intended Programme</div>
                                    <div className="text-sm print:text-xs font-bold text-black">{application.course?.title}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Degree Level</div>
                                    <div className="text-sm print:text-xs font-bold text-black">{application.course?.degreeLevel === 'MASTER' ? "Master's Degree" : application.course?.degreeLevel === 'BACHELOR' ? "Bachelor's Degree" : application.course?.degreeLevel === 'DIPLOMA' ? "Diploma" : application.course?.degreeLevel === 'CERTIFICATE' ? "Certificate" : "Bachelor's Degree"}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Study Mode</div>
                                    <div className="text-sm print:text-xs font-bold text-black">{application.course?.programType || 'Full-time'}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Programme Duration</div>
                                    <div className="text-sm print:text-xs font-bold text-black">17.09.2026 – {(application.course?.degreeLevel || '').toUpperCase() === 'MASTER' ? '10.08.2028' : (application.course?.degreeLevel || '').toUpperCase() === 'BACHELOR' ? '10.08.2029' : (application.course?.degreeLevel || '').toUpperCase() === 'DIPLOMA' ? '10.08.2028' : '10.08.2027'}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold text-black uppercase tracking-widest mb-1 print:mb-0">Total Credits</div>
                                    <div className="text-sm print:text-xs font-bold text-black">{(application.course?.degreeLevel || '').toUpperCase() === 'MASTER' ? '120 ECTS' : (application.course?.degreeLevel || '').toUpperCase() === 'BACHELOR' ? '180 ECTS' : (application.course?.degreeLevel || '').toUpperCase() === 'DIPLOMA' ? '120 ECTS' : '60 ECTS'}</div>
                                </div>
                            </div>
                        </div>


                        {/* 3. Offer Statement */}
                        <div className="p-4 md:p-6 print:p-2 mb-6 print:mb-3">
                            <p className="text-sm print:text-xs font-bold text-neutral-900 mb-3 print:mb-1">
                                Dear {application.personal_info?.firstName},
                            </p>
                            <p className="text-sm print:text-xs leading-relaxed text-black mb-3 print:mb-1">
                                We are pleased to inform you that, following a thorough review of your application, the Admissions Committee of Kestora University has decided to offer you a place in the <strong>{application.course?.title}</strong> ({application.course?.programType || 'Full-time'}) programme for the <strong>Fall 2026</strong> intake.
                            </p>
                            <p className="text-sm print:text-xs leading-relaxed text-black">
                                This offer is subject to the conditions outlined below, including acceptance of the offer via the student portal and confirmation of tuition payment by the specified deadline. Upon fulfillment of these conditions, an official Letter of Admission will be issued confirming your enrollment.
                            </p>
                        </div>


                        {/* 4. Conditions */}
                        <div className="mb-6 print:mb-3 text-sm print:text-xs leading-relaxed text-black">
                            <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-3 print:mb-1 pb-1">Conditions of Offer</h4>
                            <p className="mb-3 print:mb-1">This offer is conditional upon acceptance and fulfillment of all stated requirements:</p>
                            <ul className="list-disc ml-5 space-y-1 mb-4 print:mb-2">
                                <li>Formal acceptance of this offer via the student portal.</li>
                                <li>Payment of required tuition deposit by the specified deadline.</li>
                                <li>Submission of any outstanding original documents (if applicable).</li>
                            </ul>
                        </div>


                        {/* 5. Tuition & Financial Information */}
                        <div className="mb-6 print:mb-3">
                            <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-3 print:mb-1 pb-1">Tuition & Financial Information</h4>
                            <p className="text-xs print:text-[10px] text-black mb-2 print:mb-1">The following tuition information is provided for your reference based on the programme and degree level.</p>
                            <div className="overflow-hidden">
                                <table className="w-full text-sm print:text-xs text-left">
                                    <tbody className="text-black">
                                        <tr className="font-bold bg-neutral-50/10 text-black border-y border-neutral-100">
                                            <td className="py-4 print:py-2 px-4 print:px-2 uppercase tracking-tighter">Tuition Deposit (To Secure Place)</td>
                                            <td className="py-4 print:py-2 px-4 print:px-2 text-right text-lg print:text-base border-l border-neutral-100">€{depositAmount.toLocaleString()} EUR</td>
                                        </tr>
                                        <tr className="bg-white/50">
                                            <td className="py-3 print:py-1.5 px-4 print:px-2 text-[10px] font-bold uppercase text-neutral-500">Remaining Balance (1st Year)</td>
                                            <td className="py-3 print:py-1.5 px-4 print:px-2 text-right font-bold text-neutral-600">€{remainingBalance.toLocaleString()} EUR</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        {/* 6. Next Steps & Validity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
                            <div>
                                <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-3 pb-1">Next Steps</h4>
                                <ol className="list-decimal ml-5 text-sm text-black space-y-1">
                                    <li>Accept offer via the student portal.</li>
                                    <li>Proceed to tuition payment.</li>
                                    <li>Admission letter issued after payment confirmation.</li>
                                </ol>
                            </div>
                                <div>
                                    <h4 className="text-[10px] font-bold text-black uppercase tracking-widest mb-3 pb-1">Payment Deadline</h4>
                                    <div className="text-sm font-bold mb-1">
                                        {displayOffer.accepted_at 
                                            ? (() => {
                                                const d = new Date(displayOffer.accepted_at);
                                                d.setDate(d.getDate() + 7);
                                                return formatToDDMMYYYY(d.toISOString());
                                            })()
                                            : '7 Days from Acceptance'
                                        }
                                    </div>
                                    <p className="text-[10px] text-black">Required to secure your place after accepting the offer.</p>
                                </div>
                        </div>

                        {/* 7. Signature & Closing */}
                        <div className="mt-auto pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
                            <div>
                                <div className="w-48 h-16 mb-2 relative">
                                    <Image
                                        src="/images/official-signature.png"
                                        alt="Signature"
                                        fill
                                        style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
                                    />
                                </div>
                                <div className="text-sm font-bold text-black uppercase">
                                    Admissions Office
                                </div>
                                <div className="text-[9px] font-bold text-black uppercase tracking-widest leading-none mt-1">
                                    Kestora University | Helsinki, Finland
                                </div>
                            </div>

                        </div>

                        {/* Mandatory Disclaimer */}
                        <div className="mt-6 pt-4">
                            <p className="text-[10px] text-black leading-relaxed text-center max-w-2xl mx-auto">
                                LEGAL DISCLAIMER: "This Offer Letter does not constitute confirmation of enrollment. Official admission is granted only after acceptance of the offer and confirmation of required tuition payment."
                            </p>
                        </div>
                    </>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 15mm; size: A4; }
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    
                    /* Hide nav header, footer, and control bar */
                    header, nav, footer,
                    [data-theme="portal"] > header,
                    [data-theme="portal"] > footer,
                    .print\\:hidden { display: none !important; }
                    
                    /* Reset layout containers */
                    [data-theme="portal"] { min-height: 0 !important; }
                    [data-theme="portal"] > main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
                    .min-h-screen { min-height: 0 !important; background: white !important; padding: 0 !important; }
                    .min-h-\\[297mm\\] { min-height: 0 !important; }
                    
                    /* Letter container reset */
                    .max-w-\\[210mm\\] { max-width: 100% !important; margin: 0 !important; padding: 15mm 0 !important; }
                    .shadow-xl, .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:border-0 { border: none !important; }
                    
                    /* Ensure black text */
                    * { color: black !important; }
                    a { text-decoration: none !important; }
                }
            ` }} />
        </div>
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
