(function () {
  const config = window.MeridianSupabaseConfig;
  const hasValidConfig =
    config &&
    typeof config.url === "string" &&
    typeof config.anonKey === "string" &&
    config.url.trim() &&
    config.anonKey.trim() &&
    !config.url.includes("YOUR_PROJECT") &&
    !config.anonKey.includes("YOUR_SUPABASE_ANON_KEY");

  if (!hasValidConfig) {
    console.warn("Supabase config is missing or still using placeholders. Using static fallback.");
    window.MeridianSupabase = null;
    return;
  }

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.warn("Supabase browser library is missing. Using static fallback.");
    window.MeridianSupabase = null;
    return;
  }

  window.MeridianSupabase = window.supabase.createClient(config.url, config.anonKey);
})();
