'use client';

import { createClient } from '@/utils/supabase/client';
import { CreditCard, Envelope, FileText, CheckCircle, Clock, CircleNotch as Loader2 } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { pushInvoice } from '../actions';
import { getProgramYears } from '@/utils/tuition';

export default function AdminInvoicesPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [customFee, setCustomFee] = useState<Record<string, number>>({});
    const [customInvoiceType, setCustomInvoiceType] = useState<Record<string, string>>({});
    const [overrideSettled, setOverrideSettled] = useState<Record<string, boolean>>({});

    // Default global fees reference, we could fetch from DB but keeping simple for now
    // A production scenario would fetch these from tuition_rates table
    const defaultFees: Record<string, number> = {
        'CERTIFICATE': 2500,
        'DIPLOMA': 2500,
        'ADVANCED_DIPLOMA': 2500,
        'BSc': 4000,
        'BACHELOR': 4000,
        'PG_DIPLOMA': 2500,
        'MASTERS': 6000,
        'MASTER': 6000,
    };

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const supabase = createClient();

            // Get all applications that have received an offer
            const { data, error } = await supabase
                .from('applications')
                .select(`
                    id,
                    personal_info,
                    status,
                    program:Course(title, duration),
                    offer:admission_offers(
                        id,
                        tuition_fee,
                        invoice_type,
                        invoice_pushed,
                        invoice_sent_at
                    )
                `)
                .in('status', ['OFFER_ACCEPTED', 'PAYMENT_SUBMITTED', 'ENROLLED', 'ADMISSION_LETTER_GENERATED']);

            if (error) {
                console.error("Error fetching applications:", error);
                return;
            }

            // Filter for only those with an offer, mapping fee values
            const formattedApps = data?.filter(app => app.offer && (Array.isArray(app.offer) ? app.offer.length > 0 : !!app.offer)).map(app => {
                const offer = Array.isArray(app.offer) ? app.offer[0] : app.offer;
                const program = (Array.isArray(app.program) ? app.program[0] : app.program) as any;
                const title = (program?.title || '').toUpperCase();
                
                const nationality = app.personal_info?.nationality;
                const isDomestic = nationality ? (nationality.toLowerCase().trim() === 'finland' || nationality.toLowerCase().trim() === 'finnish' || nationality.toLowerCase().trim() === 'eu' || nationality.toLowerCase().trim() === 'domestic') : false;

                let defaultFee = 2500;
                if (title.includes('CERTIFICATE') || title.includes('DIPLOMA') || title.includes('ADVANCED')) {
                    defaultFee = isDomestic ? 1500 : 2500;
                } else if (title.includes('BACHELOR') || title.includes('BSC')) {
                    defaultFee = isDomestic ? 2500 : 4000;
                } else if (title.includes('MASTER') || title.includes('MSC')) {
                    defaultFee = isDomestic ? 3500 : 6000;
                } else if (title.includes('POSTGRADUATE') || title.includes('PG')) {
                    defaultFee = isDomestic ? 3500 : 6000;
                }

                return {
                    ...app,
                    offer,
                    program, // override with single object
                    defaultFee
                };
            }) || [];

            setApplications(formattedApps);
        } catch (error) {
            console.error("Error in fetchApplications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleFeeChange = (appId: string, val: string) => {
        setCustomFee(prev => ({
            ...prev,
            [appId]: parseInt(val) || 0
        }));
    };

    // Compute the tuition amount that should be pre-filled for a given invoice type.
    // The stored offer tuition_fee / defaultFee is treated as the deposit (50% of first-year).
    const computeFeeForType = (app: any, type: string): number => {
        const base = app.offer?.tuition_fee || app.defaultFee || 0;
        const years = getProgramYears(app.program?.duration, app.program?.title);
        switch (type) {
            case 'FULL_PROGRAM_TUITION':
                return Math.round(base * 2 * years);
            case 'FIRST_YEAR_TUITION':
                return Math.round(base * 2);
            case 'TUITION_DEPOSIT':
            default:
                return Math.round(base);
        }
    };

    const handleInvoiceTypeChange = (appId: string, val: string) => {
        const app = applications.find(a => a.id === appId);
        setCustomInvoiceType(prev => ({
            ...prev,
            [appId]: val
        }));
        // Update the tuition amount input to the type-appropriate default
        if (app) {
            setCustomFee(prev => ({
                ...prev,
                [appId]: computeFeeForType(app, val)
            }));
        }
    };

    const handlePushInvoice = async (appId: string, currentFee: number) => {
        const feeToPush = customFee[appId] !== undefined ? customFee[appId] : currentFee;
        const invoiceType = customInvoiceType[appId] || 'TUITION_DEPOSIT';
        // Ancillary fees are only charged on the first (initial) invoice
        const app = applications.find(a => a.id === appId);
        const isFirstInvoice = !app?.offer?.ancillary_charged;
        const ancillaryTotal = isFirstInvoice ? 700 : 0;

        if (!confirm(`Are you sure you want to push a ${invoiceType.replace(/_/g, ' ')} invoice of €${feeToPush} (tuition)${isFirstInvoice ? ' + €700 ancillary' : ''} = €${feeToPush + ancillaryTotal} total to this student?`)) return;

        try {
            setActionLoading(appId);
            const result = await pushInvoice(appId, feeToPush, invoiceType);
            if (result.success) {
                alert("Invoice successfully pushed!");
                fetchApplications(); // Refresh list
            }
        } catch (error: any) {
            alert(`Failed to push invoice: ${error.message || 'Unknown error'}`);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-neutral-400" size={40} weight="bold" />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 leading-tight">Manage Invoices</h1>
                    <p className="text-neutral-500 text-sm mt-1">Review student offers and push custom tuition invoices.</p>
                </div>
            </div>

            <div className="bg-white border border-neutral-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="hidden md:table-header-group bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Applicant</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Program</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Status</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Fee (€ incl. €700 ancillary)</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 block md:table-row-group">
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-neutral-400 text-sm">
                                    No accepted offers pending invoices found.
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => {
                                const isPushed = app.offer.invoice_pushed;
                                const isEnrolledOrPaid = ['PAYMENT_SUBMITTED', 'ENROLLED', 'ADMISSION_LETTER_GENERATED'].includes(app.status);
                                const feeValue = customFee[app.id] !== undefined ? customFee[app.id] : (app.offer.tuition_fee || app.defaultFee);

                                return (
                                    <tr key={app.id} className="hover:bg-neutral-50 transition-colors block md:table-row p-4 md:p-0">
                                        <td className="block md:table-cell py-2 md:p-4">
                                            <div className="font-bold text-neutral-900 text-sm">
                                                {app.personal_info?.firstName} {app.personal_info?.lastName}
                                            </div>
                                            <div className="text-xs text-neutral-500">{app.personal_info?.email}</div>
                                        </td>
                                        <td className="block md:table-cell py-1 md:p-4 text-xs font-medium text-neutral-600">
                                            {app.program?.title}
                                        </td>
                                        <td className="block md:table-cell py-2 md:p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="md:hidden text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Status:</span>
                                                {isEnrolledOrPaid ? (
                                                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-none text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                                                        <CheckCircle size={10} weight="bold" /> Paid
                                                    </span>
                                                ) : isPushed ? (
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-none text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                                                        <Envelope size={10} weight="bold" /> Sent
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-none text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                                                        <Clock size={10} weight="bold" /> Wait
                                                    </span>
                                                )}
                                                {isEnrolledOrPaid && (
                                                    <label className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-bold uppercase cursor-pointer select-none">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!overrideSettled[app.id]}
                                                            onChange={(e) => setOverrideSettled(prev => ({
                                                                ...prev,
                                                                [app.id]: e.target.checked
                                                            }))}
                                                            className="rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 h-3.5 w-3.5 border-2"
                                                        />
                                                        Always Issue
                                                    </label>
                                                )}
                                            </div>
                                        </td>
                                        <td className="block md:table-cell py-2 md:p-4">
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    className="border border-neutral-300 rounded-none px-2 py-1.5 text-xs w-full disabled:opacity-50"
                                                    value={customInvoiceType[app.id] || app.offer.invoice_type || 'TUITION_DEPOSIT'}
                                                    onChange={(e) => handleInvoiceTypeChange(app.id, e.target.value)}
                                                    disabled={(isEnrolledOrPaid && !overrideSettled[app.id]) || actionLoading === app.id}
                                                >
                                                    <option value="TUITION_DEPOSIT">Deposit</option>
                                                    <option value="FIRST_YEAR_TUITION">1st Year</option>
                                                    <option value="FULL_PROGRAM_TUITION">Full</option>
                                                </select>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-neutral-900">€</span>
                                                    <input
                                                        type="number"
                                                        className="border border-neutral-300 rounded-none px-2 py-1.5 w-full md:w-24 text-sm disabled:opacity-50 font-bold"
                                                        value={feeValue}
                                                        onChange={(e) => handleFeeChange(app.id, e.target.value)}
                                                        disabled={(isEnrolledOrPaid && !overrideSettled[app.id]) || actionLoading === app.id}
                                                    />
                                                </div>
                                            </div>
                                            {isPushed && app.offer.invoice_sent_at && (
                                                <div className="text-[10px] text-neutral-400 mt-1">
                                                    Sent: {new Date(app.offer.invoice_sent_at).toLocaleDateString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="block md:table-cell pt-4 pb-2 md:p-4 text-right">
                                            <button
                                                onClick={() => handlePushInvoice(app.id, feeValue)}
                                                disabled={actionLoading === app.id || (isEnrolledOrPaid && !overrideSettled[app.id])}
                                                className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-widest transition-colors ${(isEnrolledOrPaid && !overrideSettled[app.id])
                                                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                                        : isPushed
                                                            ? 'bg-neutral-900 text-white hover:bg-neutral-700'
                                                            : 'bg-neutral-600 text-white hover:bg-neutral-700'
                                                    } ${actionLoading === app.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {actionLoading === app.id ? (
                                                    <Loader2 size={14} className="animate-spin" />
                                                ) : (
                                                    <FileText size={14} weight="bold" />
                                                )}
                                                {isEnrolledOrPaid && !overrideSettled[app.id] ? 'Settled' : (isPushed ? 'Resend' : 'Push')}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
