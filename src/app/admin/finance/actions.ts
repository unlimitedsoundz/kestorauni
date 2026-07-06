import { createClient } from '@/utils/supabase/client';
// Action triggered from Finance Admin UI

export async function pushInvoice(applicationId: string, customFee: number, invoiceType: string) {
    const supabase = createClient();
    const ANCILLARY_FEES_TOTAL = 700;
    const ANCILLARY_FEES = [
        { name: 'Student Activity Fee', amount: 100 },
        { name: 'Technology Fee', amount: 100 },
        { name: 'Athletics and Recreation Fee', amount: 100 },
        { name: 'Convocation Fee', amount: 100 },
        { name: 'Student Counselling Fee', amount: 100 },
        { name: 'Program Transcript Fee', amount: 100 },
        { name: 'Student Experience Fee', amount: 100 }
    ];

    // Verify application exists and is in a valid state
    const { data: offer, error: offerError } = await supabase
        .from('admission_offers')
        .select('*')
        .eq('application_id', applicationId)
        .single();

    if (offerError || !offer) {
        throw new Error('Admission offer not found for this application');
    }

    const totalWithAncillary = customFee + ANCILLARY_FEES_TOTAL;

    // Update the offer with new custom fee and mark as invoiced
    const { error: updateError } = await supabase
        .from('admission_offers')
        .update({
            tuition_fee: totalWithAncillary,
            invoice_type: invoiceType,
            invoice_pushed: true,
            invoice_sent_at: new Date().toISOString()
        })
        .eq('application_id', applicationId);

    if (updateError) {
        console.error('Error updating admission offer:', updateError);
        throw new Error('Failed to push invoice');
    }

    // Fetch application and user data to send email notification
    const { data: application, error: appError } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(title),
            user:profiles(first_name, last_name, email, id)
        `)
        .eq('id', applicationId)
        .single();

    if (appError || !application) {
        console.error('Error fetching application data:', appError);
        // Don't throw error here, invoice is already pushed
        return { success: true };
    }

    // Trigger Invoice Ready via Edge Function instead of local sendEmail
    try {
        console.log(`[pushInvoice] Triggering notification for application: ${applicationId}`);
        const { data, error } = await supabase.functions.invoke('send-notification', {
            body: {
                applicationId: applicationId,
                type: 'INVOICE_READY',
                additionalData: {
                    amount: customFee,
                    currency: 'EUR',
                    invoiceType: invoiceType,
                    ancillaryFees: ANCILLARY_FEES
                }
            }
        });

        if (error) {
            console.error('[pushInvoice] Edge function error:', error);
        } else {
            console.log('[pushInvoice] Edge function triggered successfully:', data);
        }
    } catch (notifyError) {
        console.error('[pushInvoice] Failed to invoke notification edge function:', notifyError);
        // Don't fail the push if notification fails
    }

    return { success: true };
}

export async function getSystemSetting(key: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error) {
        console.error(`Error fetching setting ${key}:`, error);
        return null;
    }
    return data.value;
}

export async function updateSystemSetting(key: string, value: string) {
    const supabase = createClient();
    const { error } = await supabase
        .from('system_settings')
        .update({ value, updatedAt: new Date().toISOString() })
        .eq('key', key);

    if (error) {
        console.error(`Error updating setting ${key}:`, error);
        throw new Error(`Failed to update setting ${key}`);
    }
    return { success: true };
}
