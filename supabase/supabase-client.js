(function () {
  const config = window.MeridianSupabaseConfig;

  if (!config || !config.url || !config.anonKey) {
    console.warn("Supabase config is missing. Using static fallback.");
    window.MeridianSupabase = null;
    return;
  }

  if (!window.supabase || !window.supabase.createClient) {
    console.warn("Supabase browser library is missing. Using static fallback.");
    window.MeridianSupabase = null;
    return;
  }

  window.MeridianSupabase = window.supabase.createClient(
    config.url,
    config.anonKey
  );
})();
