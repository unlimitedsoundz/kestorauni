'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { invokeEdgeFunction } from '@/utils/supabase/invoke';
import PayGoWireCheckout from './PayGoWireCheckout';
import { calculateDiscountedFee, EARLY_PAYMENT_DISCOUNT_PERCENT, getProgramYears, isWithinEarlyPaymentWindow } from '@/utils/tuition';
import Image from 'next/image';

export default function TuitionPaymentPage({ admissionOffer, application }: {
    params: { id: string },
    admissionOffer: any,
    application: any
}) {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Admin-pushed invoice values
    const finalAmount = admissionOffer.tuition_fee || 0;
    const rawInvoiceType = admissionOffer.invoice_type || 'TUITION_DEPOSIT';
    const invoiceTypeLabel = rawInvoiceType.replace(/_/g, ' ');

    const ancillaryFees = [
        { name: 'Student Activity Fee', amount: 100 },
        { name: 'Technology Fee', amount: 100 },
        { name: 'Athletics and Recreation Fee', amount: 100 },
        { name: 'Convocation Fee', amount: 100 },
        { name: 'Student Counselling Fee', amount: 100 },
        { name: 'Program Transcript Fee', amount: 100 },
        { name: 'Student Experience Fee', amount: 100 }
    ];
    const totalAncillary = ancillaryFees.reduce((acc, item) => acc + item.amount, 0);
    const invoiceTotal = finalAmount + totalAncillary;

    const handlePaymentComplete = async (details: {
        method: string;
        country: string;
        currency: string;
        fxMetadata: any;
    }) => {
        console.log('PaymentView: handlePaymentComplete called', details);
        setIsProcessing(true);
        setError(null);
        try {
            const supabase = createClient();
            const { data, error: functionError } = await invokeEdgeFunction('process-tuition-payment', {
                body: {
                    offerId: admissionOffer.id,
                    applicationId: application.id,
                    amount: invoiceTotal,
                    invoiceType: rawInvoiceType,
                    details: {
                        method: details.method,
                        country: details.country,
                        currency: details.currency,
                        fxMetadata: details.fxMetadata
                    }
                }
            });

            if (functionError) {
                console.error('PaymentView: Edge function call failed', functionError);
                throw new Error(functionError.message || 'Failed to process payment');
            }

            const result = data;
            console.log('PaymentView: Result from edge function', result);

            if (!result.success) {
                console.error('PaymentView: Processing failed', result.error);
                throw new Error(result.error);
            }

            // Success!!
            console.log('PaymentView: Success! Reinforcing application status update...');

            // Extra safety: Update application status directly from client to ensure DB is in sync
            // before redirecting, just in case edge function update had any replication lag or issue.
            await supabase
                .from('applications')
                .update({
                    status: 'PAYMENT_SUBMITTED',
                    updated_at: new Date().toISOString()
                })
                .eq('id', application.id);

            console.log('PaymentView: Status reinforced. Redirecting to dashboard...');
            // Force full page reload to ensure all states (DB, Cache, UI) are completely fresh
            window.location.href = '/portal/dashboard';
        } catch (e: any) {
            console.error('Payment Error (Caught in View):', e);
            setError(e.message || 'Payment failed');
            setIsProcessing(false);
        }
    };

    if (application.status === 'ENROLLED' || application.status === 'PAYMENT_SUBMITTED') {
        const isEnrolled = application.status === 'ENROLLED';
        return (
            <div className="max-w-md mx-auto mt-6 md:mt-12 bg-white p-6 md:p-12 rounded-4px text-center shadow-sm animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-neutral-50 border border-neutral-100 text-black force-circle flex items-center justify-center mx-auto mb-8">
                </div>
                <h2 className="text-2xl font-normal text-black mb-4 tracking-tighter">
                    {isEnrolled ? 'Tuition Paid Successfully' : 'Payment Verification Pending'}
                </h2>
                <p className="text-sm text-black mb-8 max-w-[280px] mx-auto leading-relaxed">
                    {isEnrolled
                        ? <>Your enrollment is now confirmed. Welcome to <span className="font-semibold text-black">Kestora University</span>.</>
                        : <>Your payment has been recorded and is currently under review. <span className="font-semibold text-black">Access to student services is paused</span> until our finance team verifies the transaction.</>
                    }
                </p>
                <div className="flex flex-col items-center gap-3">
                    {isEnrolled && (
                        <button
                            onClick={() => router.push(`/portal/application/receipt?id=${application.id}`)}
                            className="w-fit min-w-[240px] h-[48px] bg-black text-white px-8 rounded-4px text-[11px] font-normal uppercase tracking-widest transition-all hover:bg-neutral-800 shadow-lg shadow-black/5"
                        >
                            View Receipt
                        </button>
                    )}
                    <button
                        onClick={() => router.push('/portal/dashboard')}
                        className={`w-fit min-w-[240px] h-[48px] px-8 rounded-4px text-[11px] font-normal uppercase tracking-widest transition-all ${isEnrolled ? 'bg-white text-black border border-neutral-200 hover:bg-neutral-50' : 'bg-black text-white hover:bg-neutral-800 shadow-lg shadow-black/5'}`}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-6 md:py-12 px-4 font-rubik text-black">
            <div className="mb-6 md:mb-12 text-center md:text-left bg-neutral-50 md:bg-transparent rounded-4px p-6 md:p-0 border-none">
                <div className="mb-4 flex justify-center md:justify-start">
                    <Image
                        src="https://cdn.brandfetch.io/id1L6oKjVX/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667924686641"
                        alt="Flywire Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto object-contain"
                    />
                </div>
                <h1 className="text-[20px] md:text-[24px] font-normal text-black leading-tight md:leading-none">Tuition Payment via Flywire</h1>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mt-4">
                    <p className="text-[11px] text-black font-normal uppercase tracking-widest">
                        Official SIS Gateway
                    </p>

                    <div className="flex items-center gap-2 opacity-100 transition-all">
                        <span className="text-[11px] text-black font-normal uppercase tracking-widest">Via Flywire Gateway</span>
                    </div>
                </div>
            </div>

            {/* Payment Summary Header */}
            <div className="mb-12 px-2 md:px-0">
                <div className="p-6 md:p-8 bg-neutral-50 rounded-4px">
                    <h2 className="text-sm font-normal mb-2 uppercase tracking-widest text-neutral-500">Invoice Type</h2>
                    <div className="font-normal text-2xl md:text-3xl mb-1 uppercase tracking-tighter text-black">{invoiceTypeLabel}</div>
                    <p className="text-sm text-neutral-600 leading-relaxed mt-2 max-w-2xl">
                        This invoice has been prepared for your {invoiceTypeLabel.toLowerCase()} by the finance department. 
                        Payment of this amount is required to proceed with your enrollment.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Invoice / Summary */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-4 md:p-8 rounded-4px">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                            <div>
                                <div className="text-[11px] font-normal text-black uppercase tracking-widest mb-1">Student Details</div>
                                <div className="font-normal text-black uppercase tracking-tight">{application.personal_info?.firstName} {application.personal_info?.lastName}</div>
                                <div className="text-sm text-black mt-1">{application.contact_details?.email}</div>
                            </div>
                            <div className="sm:text-right w-full sm:w-auto">
                                <div className="text-[11px] font-normal text-black uppercase tracking-widest mb-1">Payment Reference</div>
                                <div className="font-mono text-[13px] text-black bg-neutral-50 px-3 py-1.5 rounded-4px inline-block break-all leading-none">
                                    {(() => {
                                        let hash = 0;
                                        const str = admissionOffer.id;
                                        for (let i = 0; i < str.length; i++) {
                                            hash = ((hash << 5) - hash) + str.charCodeAt(i);
                                            hash |= 0;
                                        }
                                        const positiveHash = Math.abs(hash);
                                        return positiveHash.toString().padEnd(13, '0').slice(0, 13);
                                    })()}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-black font-normal uppercase tracking-wider">{invoiceTypeLabel}</span>
                                <span className="font-normal text-black text-right">€ {finalAmount.toLocaleString()}</span>
                            </div>
                            {ancillaryFees.map((fee) => (
                                <div key={fee.name} className="flex justify-between text-sm">
                                    <span className="text-black font-normal uppercase tracking-wider">{fee.name}</span>
                                    <span className="font-normal text-black">€ {fee.amount.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between text-sm">
                                <span className="text-black font-normal uppercase tracking-wider">Services Fee</span>
                                <span className="font-normal text-black">€ 0.00</span>
                            </div>
                            <div className="flex justify-between pt-2 font-normal text-lg text-black">
                                <span>TOTAL</span>
                                <span className="font-normal">€ {invoiceTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkout Logic */}
                <div className="lg:col-span-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-normal uppercase tracking-widest border border-red-100 flex items-center gap-3">
                            {error}
                        </div>
                    )}

                    <PayGoWireCheckout
                        amount={invoiceTotal}
                        currency="EUR"
                        onPaymentComplete={handlePaymentComplete}
                        isProcessing={isProcessing}
                        paymentReference={(() => {
                            let hash = 0;
                            const str = admissionOffer.id;
                            for (let i = 0; i < str.length; i++) {
                                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                                hash |= 0;
                            }
                            const positiveHash = Math.abs(hash);
                            return positiveHash.toString().padEnd(13, '0').slice(0, 13);
                        })()}
                    />
                </div>
            </div>
        </div>
    );
}
