'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { formatToDDMMYYYY } from '@/utils/date';
import { Plus, CreditCard, WarningCircle as AlertCircle, GraduationCap, SquaresFour as LayoutDashboard, FileText, Clock } from "@phosphor-icons/react/dist/ssr";
import DeleteApplicationBtn from './DeleteApplicationBtn';
import { ensureStudentId } from '../profile-actions';
import { ProgressIndicator, Button, Link, List, Tag } from "@aalto-dx/react-components";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    const fetchDashboardData = async () => {
        try {
            console.log('Dashboard: Starting data fetch');

            // 1. Auth Check
            const { data: { user: sbUser }, error: authError } = await supabase.auth.getUser();
            console.log('Dashboard: Auth check result:', { user: !!sbUser, error: authError });

            if (!sbUser) {
                console.log('Dashboard: No user, redirecting to login');
                router.push('/portal/account/login');
                return;
            }
            setUser(sbUser);

            // Fetch Data
            console.log('Dashboard: Fetching data for user:', sbUser.id);
            const [profileRes, appsRes, studentRes, admissionRes] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', sbUser.id).single(),
                supabase.from('applications').select('*, course:Course(title, duration), offer:admission_offers(*)').eq('user_id', sbUser.id).order('updated_at', { ascending: false }),
                supabase.from('students').select('*, program:Course(*), user:profiles(*)').eq('user_id', sbUser.id).maybeSingle(),
                Promise.resolve({ data: [], error: null }) // Temporarily disable admissions query until table exists
                // supabase.from('admissions').select('*').eq('user_id', sbUser.id)
            ]);

            console.log('Dashboard: Data fetch results:', {
                profile: { data: !!profileRes.data, error: profileRes.error },
                apps: { data: appsRes.data?.length || 0, error: appsRes.error },
                student: { data: !!studentRes.data, error: studentRes.error },
                admissions: { data: admissionRes.data?.length || 0, error: admissionRes.error }
            });

            // Log detailed errors if any
            if (profileRes.error) console.error('Profile fetch error:', profileRes.error);
            if (appsRes.error) console.error('Applications fetch error:', appsRes.error);
            if (studentRes.error) console.error('Student fetch error:', studentRes.error);
            if (admissionRes.error) console.error('Admissions fetch error:', admissionRes.error);

            const admissionsMap = new Map((admissionRes.data as any[] || []).map(a => [a.program, a]));

            if (profileRes.data) setProfile(profileRes.data);
            if (appsRes.data) {
                // Enrich apps with admission letter info
                const enrichedApps = appsRes.data.map(app => ({
                    ...app,
                    admission_details: admissionsMap.get(app.course?.title)
                }));
                setApplications(enrichedApps);
            }
            if (studentRes.data) setStudent(studentRes.data);

            // AUTO-ENSURE STUDENT ID IF MISSING
            if (profileRes.data && !profileRes.data.student_id) {
                console.log('Dashboard: Student ID missing, generating...');
                const { studentId } = await ensureStudentId();
                if (studentId) {
                    setProfile((prev: any) => ({ ...prev, student_id: studentId }));
                }
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <ProgressIndicator size={32} />
            </div>
        );
    }

      return (
           <div className="space-y-8 text-white bg-black min-h-screen p-4 md:p-8 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                      <div className="flex items-center gap-2">
                          <h1 className="text-xl font-semibold text-white leading-none">My Applications</h1>
                          {profile?.student_id && (
                              <Tag 
                                  label={`Student ID: ${profile.student_id}`}
                                  className="!font-black border-white text-white"
                              />
                          )}
                      </div>
                      <p className="text-neutral-300 text-sm font-medium mt-1">
                          Welcome back, <span className="text-white">{profile?.first_name || user?.email}</span>
                      </p>
                  </div>
                  {!student && (
                      <Button
                          href="/portal/apply"
                          type="outline"
                          label="New Application"
                          size="sm"
                          className="self-start md:self-auto border-white text-white hover:bg-white hover:text-black"
                      />
                  )}
              </div>

            {/* Enrolled Student Alert Card - Only show if fully ENROLLED (Admin approved) */}
            {student && applications.some(app => app.id === student.application_id && app.status === 'ENROLLED') && (
                <div className="flex items-start justify-between border-2 border-white p-6 md:p-8 rounded-sm text-white relative overflow-hidden bg-neutral-900">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                        <div>
                            <h4 className="font-black text-[11px] flex items-center gap-2">
                                <GraduationCap size={14} weight="bold" /> Active Student Status
                            </h4>
                            <p className="text-neutral-300 text-[11px] font-bold mt-1">
                                You are officially enrolled in <span className="text-white">{student.program?.title}</span>. Access your academic tools below.
                            </p>
                        </div>
                        <Button
                            href="/portal/student"
                            type="primary"
                            label="Enter Student Portal"
                            className="whitespace-nowrap shadow-lg bg-white text-black hover:bg-neutral-200"
                        />
                    </div>
                </div>
            )}

            {/* Applications List */}
            {applications && applications.length > 0 ? (
                <div className="grid gap-3">
                    {applications.map((app) => (
                        <div key={app.id}>
                            {/* Action Needed - DOCS_REQUIRED */}
                            {app.status === 'DOCS_REQUIRED' && (
                                <div className="flex items-start justify-between border-2 border-white p-6 md:p-8 rounded-sm text-white relative overflow-hidden bg-neutral-900 mb-4 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] border-l-[8px]">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                        <div>
                                            <h4 className="font-black text-[13px] flex items-center gap-2">
                                                <AlertCircle size={16} weight="bold" /> Additional Documents Requested
                                            </h4>
                                            {app.document_request_note && (
                                                <div className="mt-3 bg-white/10 p-4 rounded-sm border border-white/20 backdrop-blur-sm">
                                                    <p className="text-[11px] font-black text-neutral-400 mb-1 leading-none">Note from Admissions:</p>
                                                    <p className="text-sm font-bold text-white leading-relaxed italic">"{app.document_request_note}"</p>
                                                </div>
                                            )}
                                            {app.requested_documents && app.requested_documents.length > 0 ? (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {app.requested_documents.map((docId: string) => (
                                                        <Tag 
                                                            key={docId}
                                                            label={docId.replaceAll('_', ' ')}
                                                            className="bg-neutral-800 text-neutral-300 border-neutral-700"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-neutral-300 text-[11px] font-bold mt-1">
                                                    The admissions team has requested additional documents. Please check your uploads.
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <Button
                                                href={`/portal/application?id=${app.id}&step=6`}
                                                type="primary"
                                                label="Upload Missing Documents"
                                                 className="bg-white text-black hover:bg-neutral-200 whitespace-nowrap shadow-lg px-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Decision Alert Card - ADMITTED */}
                            {app.status === 'ADMITTED' && (
                                <div className="flex items-start justify-between border-2 border-white p-6 md:p-8 rounded-sm text-white relative overflow-hidden bg-neutral-900 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] mb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                        <div>
                                            <h4 className="font-black text-[13px] flex items-center gap-2">
                                                <GraduationCap size={16} weight="bold" /> Formal Offer of Admission
                                            </h4>
                                            <p className="text-neutral-300 text-[11px] font-bold mt-1">
                                                An official offer letter has been issued. Action is required to secure your place.
                                            </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <Link
                                                label="Accept Official Offer"
                                                linkComponentProps={{ href: `/portal/application/letter?id=${app.id}` }}
                                                className="bg-white text-black px-8 py-4 rounded-sm text-[11px] font-black hover:bg-neutral-200 transition-all whitespace-nowrap text-center shadow-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                             {/* Payment Pending Alert Card - OFFER_ACCEPTED */}
                             {app.status === 'OFFER_ACCEPTED' && (
                                 <div className="flex items-start justify-between border border-white/20 p-6 md:p-8 rounded-sm text-white relative overflow-hidden bg-neutral-900 shadow-sm mb-4">
                                     {(() => {
                                         const offer = Array.isArray(app.offer) ? app.offer[0] : app.offer;
                                         const isInvoicePushed = offer?.invoice_pushed;
                                         const tuitionFee = offer?.tuition_fee;
                                         const invoiceType = offer?.invoice_type ? offer.invoice_type.replace(/_/g, ' ') : 'TUITION DEPOSIT';
                                         
                                         if (isInvoicePushed) {
                                             return (
                                                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                                     <div>
                                                         <h4 className="font-normal text-[11px] flex items-center gap-2 text-white">
                                                             <CreditCard size={14} weight="bold" /> {invoiceType} Required: ${tuitionFee}
                                                         </h4>
                                                         <p className="text-white text-[11px] font-bold mt-1">
                                                             Your invoice has been generated. Complete your {invoiceType.toLowerCase()} payment to secure enrollment.
                                                         </p>
                                                     </div>
                                                     <div className="flex flex-col md:flex-row gap-2">
                                                         <Link
                                                             label="View Offer"
                                                             linkComponentProps={{ href: `/portal/application/letter?id=${app.id}` }}
                                                             className="px-6 py-3 border border-white/30 text-white rounded-sm text-[11px] font-black hover:bg-white/10 transition-all whitespace-nowrap text-center"
                                                         />
                                                         <Link
                                                             label={`Pay ${invoiceType}`}
                                                             linkComponentProps={{ href: `/portal/application/payment?id=${app.id}` }}
                                                             className="bg-white text-black px-6 py-3 rounded-sm text-[11px] font-black hover:bg-neutral-200 transition-all whitespace-nowrap text-center"
                                                         />
                                                     </div>
                                                 </div>
                                             );
                                         } else {
                                             return (
                                                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                                     <div>
                                                         <h4 className="font-black text-[11px] flex items-center gap-2 text-white">
                                                             <Clock size={14} weight="bold" /> Pending Invoice
                                                         </h4>
                                                         <p className="text-white text-[11px] font-bold mt-1">
                                                             The Admissions Office is preparing your tuition invoice. You will be able to pay once it is sent shortly.
                                                         </p>
                                                     </div>
                                                     <div className="flex flex-col md:flex-row gap-2">
                                                         <Link
                                                             label="View Offer"
                                                             linkComponentProps={{ href: `/portal/application/letter?id=${app.id}` }}
                                                             className="px-6 py-3 border border-white/30 text-white rounded-sm text-[11px] font-black hover:bg-white/10 transition-all whitespace-nowrap text-center"
                                                         />
                                                     </div>
                                                 </div>
                                             );
                                         }
                                     })()}
                                 </div>
                             )}

                            {/* Payment Verification Pending - PAYMENT_SUBMITTED */}
                            {app.status === 'PAYMENT_SUBMITTED' && (
                                <div className="flex items-start justify-between border border-neutral-200 p-6 md:p-8 rounded-sm text-black relative overflow-hidden bg-neutral-50 mb-4 shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                        <div className="flex-1">
                                            <h4 className="font-black text-[11px] flex items-center gap-2 text-black">
                                                <AlertCircle size={14} weight="bold" /> Payment Verification Pending
                                            </h4>
                                            <p className="text-black text-[11px] font-bold mt-1">
                                                Your payment has been received. Our team is verifying the transaction before finalizing your enrollment.
                                            </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-3">
                                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-neutral-200 whitespace-nowrap">
                                                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                                <span className="text-[11px] font-black text-black">Verifying</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {app.status === 'REJECTED' && (
                                <div className="border border-white/20 p-6 rounded-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 bg-neutral-900 text-white">
                                    <div>
                                        <h4 className="font-semibold text-[11px]">Decision updated</h4>
                                        <p className="text-neutral-300 text-[11px] font-medium mt-0.5">A decision has been reached regarding your application.</p>
                                    </div>
                                    <Link
                                        label="Details"
                                        linkComponentProps={{ href: `/portal/application?id=${app.id}` }}
                                        className="border border-white/30 text-white px-4 py-2 rounded-sm text-[11px] font-semibold hover:bg-white/10 transition-all whitespace-nowrap"
                                    />
                                </div>
                            )}

                            <div className="bg-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all border-b border-neutral-100 hover:bg-neutral-50/50">
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="font-semibold text-sm text-black leading-none">
                                            {app.course?.title || 'Untitled Application'}
                                            {app.course?.duration && (
                                                <span className="text-black font-medium"> — {app.course.duration}</span>
                                            )}
                                        </h3>
                                        {app.application_number && (
                                            <span className="text-neutral-500 font-medium text-[11px]">#{app.application_number}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-[11px] font-semibold leading-none mt-1">
                                        <span className={`${app.status === 'ADMITTED' || app.status === 'OFFER_ACCEPTED' || app.status === 'ENROLLED' ? 'text-black' :
                                            app.status === 'REJECTED' ? 'text-neutral-500' :
                                                'text-black'
                                            }`}>
                                            {app.status.replaceAll('_', ' ')}
                                        </span>
                                        <span className="text-neutral-400">Updated: {formatToDDMMYYYY(app.updated_at)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Draft State */}
                                    {app.status === 'DRAFT' && (
                                        <Link
                                            label="Continue"
                                            linkComponentProps={{ href: `/portal/application?id=${app.id}` }}
                                            className="px-4 py-2 border border-black text-black rounded-sm text-[11px] font-bold hover:bg-neutral-50 transition-all"
                                        />
                                    )}

                                    {/* Submitted / Under Review */}
                                    {(app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW') && (
                                        <Link
                                            label="View Form"
                                            linkComponentProps={{ href: `/portal/application/view?id=${app.id}` }}
                                            className="px-4 py-2 border border-neutral-200 text-black rounded-sm text-[11px] font-bold hover:bg-neutral-50 transition-all"
                                        />
                                    )}

                                    {/* Decision / Pay Buttons */}
                                    {app.status === 'ADMITTED' && (
                                        <Link
                                            label="View Offer"
                                            linkComponentProps={{ href: `/portal/application/letter?id=${app.id}` }}
                                            className="px-4 py-2 bg-black text-white rounded-sm text-[11px] font-black hover:bg-neutral-800 transition-all flex items-center gap-2"
                                            icon={<CreditCard size={12} />}
                                        />
                                    )}

                                    {app.status === 'OFFER_ACCEPTED' && (() => {
                                        const offer = Array.isArray(app.offer) ? app.offer[0] : app.offer;
                                        const isInvoicePushed = offer?.invoice_pushed;
                                        
                                        return (
                                        <div className="flex gap-2">
                                            <Link
                                                label="View Offer"
                                                linkComponentProps={{ href: `/portal/application/letter?id=${app.id}` }}
                                                className="px-4 py-2 border border-black text-black rounded-sm text-[11px] font-bold hover:bg-neutral-50 transition-all flex items-center gap-2"
                                                icon={<FileText size={12} weight="bold" />}
                                            />
                                            {isInvoicePushed && (
                                                <Link
                                                    label="Pay Tuition"
                                                    linkComponentProps={{ href: `/portal/application/payment?id=${app.id}` }}
                                                    className="px-4 py-2 bg-black text-white rounded-sm text-[11px] font-black hover:bg-neutral-800 transition-all flex items-center gap-2"
                                                    icon={<CreditCard size={12} weight="bold" />}
                                                />
                                            )}
                                        </div>
                                    )})()}

                                    {/* Enrolled State — Admission Letter + Receipt + Portal */}
                                    {app.status === 'ENROLLED' && (
                                        <div className="flex gap-2">
                                            <Link
                                                label="Admission Letter"
                                                linkComponentProps={{ href: `/portal/application/admission-letter/?id=${app.id}` }}
                                                className="px-4 py-2 border border-neutral-600 text-neutral-600 rounded-sm text-[11px] font-bold hover:bg-neutral-50 transition-all flex items-center gap-2"
                                                icon={<FileText size={12} weight="bold" />}
                                            />
                                            <Link
                                                label="Receipt"
                                                linkComponentProps={{ href: `/portal/application/receipt?id=${app.id}` }}
                                                className="px-4 py-2 border border-neutral-200 text-black rounded-sm text-[11px] font-bold hover:bg-neutral-50 transition-all flex items-center gap-2"
                                                icon={<FileText size={12} weight="bold" />}
                                            />
                                            <Link
                                                label="Enter Portal"
                                                linkComponentProps={{ href: `/portal/student` }}
                                                className="px-4 py-2 bg-black text-white rounded-sm text-[11px] font-black hover:bg-neutral-800 transition-all flex items-center gap-2"
                                                icon={<LayoutDashboard size={12} weight="bold" />}
                                            />
                                        </div>
                                    )}

                                    {/* View Offer Letter link for non-enrolled states */}
                                    {(app.status === 'PAYMENT_SUBMITTED') && (
                                        <Link
                                            label="Offer Letter"
                                            linkComponentProps={{ href: `/portal/application/letter?id=${app.id}` }}
                                            className="px-4 py-2 border border-neutral-200 text-black rounded-sm text-[11px] font-bold hover:bg-neutral-50 transition-all flex items-center gap-2"
                                            icon={<FileText size={12} weight="bold" />}
                                        />
                                    )}

                                    {/* Delete Button for non-enrolled */}
                                    {app.status !== 'ENROLLED' && (
                                        <DeleteApplicationBtn id={app.id} onSuccess={fetchDashboardData} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center border border-white/20 rounded-sm bg-neutral-900">
                    <h3 className="text-[11px] font-semibold text-white mb-2">No active applications</h3>
                    <Link
                        label="Start Journey"
                        linkComponentProps={{ href: "/portal/apply" }}
                        className="inline-block border border-white text-white px-6 py-2 rounded-sm text-[11px] font-semibold hover:bg-white hover:text-black transition-all"
                    />
                </div>
            )}


        </div>
    );
}
