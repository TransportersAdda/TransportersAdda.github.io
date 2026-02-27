import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// You'll need to set these in your Supabase project settings -> Edge Functions -> Secrets
const WHATSAPP_API_URL = Deno.env.get('WHATSAPP_API_URL')
const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_TOKEN')

serve(async (req) => {
  // Get the payload from the database trigger
  const { record } = await req.json()

  // Only proceed if the bid was accepted
  if (record.status !== 'Accepted') {
    return new Response('Not an acceptance event', { status: 200 })
  }

  // 1. Fetch Vendor phone number from the profiles table
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Use service role to bypass RLS
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('phone')
    .eq('id', record.vendor_id)
    .single()

  if (!profile || !profile.phone) {
    return new Response('Vendor phone not found', { status: 404 })
  }

  // 2. Call WhatsApp API (Example placeholder - replace with actual API call)
  const response = await fetch(WHATSAPP_API_URL!, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: profile.phone,
      type: 'template',
      template: {
        name: 'bid_accepted_notification',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: record.amount.toString() }
            ]
          }
        ]
      }
    }),
  })

  return new Response('Notification sent', { status: 200 })
})
