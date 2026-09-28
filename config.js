// Put your Supabase values here.
// IMPORTANT: use ONLY the Publishable key (sb_publishable_...).
// NEVER put your sb_secret_... key in this file.

const SUPABASE_URL = "https://xjbmsyullhtnfejqfbxd.supabase.co;
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HzSAvrrIcIkS5q5dPgPf9g_0keTFjua";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
