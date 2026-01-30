import { createClient } from '@supabase/supabase-js'

// Este cliente tiene permisos de SUPER ADMIN. Solo úsalo en Server Actions.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)