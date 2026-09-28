// Put your Supabase values here.
// IMPORTANT: use ONLY the Publishable key (sb_publishable_...).
// NEVER put your sb_secret_... key in this file.

const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
