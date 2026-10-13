import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// Publishable key is safe for browser use; RLS controls its database access.
// ANON fallback keeps existing local configuration working during migration.
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || ''

export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null
