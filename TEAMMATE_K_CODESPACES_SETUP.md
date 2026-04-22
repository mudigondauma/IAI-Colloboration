# TEAMMATE_K_CODESPACES_SETUP.md

## Purpose

This file helps K set up the repo and Supabase safely inside GitHub Codespaces.

Use this together with:

- [TEAMMATE_K_SUPABASE_STEP_BY_STEP.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/TEAMMATE_K_SUPABASE_STEP_BY_STEP.md:1)

This file is about environment setup, not product logic.

## The Main Idea

K should treat Codespaces as:

- the place to run the repo
- the place to preview the static app over HTTP
- the place to create local, non-committed Supabase config

K should **not** treat Codespaces as a place to hardcode project secrets into committed files.

## Step 1. Open The Repo In Codespaces

In GitHub:

- open the repository
- start a new Codespace

Wait for the workspace to finish loading before changing files.

## Step 2. Read The Right Files First

Read in this order:

1. [START_HERE.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/START_HERE.md:1)
2. [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
3. [TEAMMATE_K_SUPABASE_STEP_BY_STEP.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/TEAMMATE_K_SUPABASE_STEP_BY_STEP.md:1)
4. this file

## Step 3. Preview The App Correctly

Do **not** test the Supabase integration from `file://`.

Inside Codespaces, run a simple local server from the repo root:

```bash
python3 -m http.server 8000
```

Then use the forwarded Codespaces port preview for port `8000`.

Why this matters:

- the current app is static
- Supabase browser reads should be tested over HTTP
- this is closer to the real browser behavior than opening `index.html` directly

## Step 4. Set Up Supabase Project Config Safely

K will need:

- the Supabase project URL
- the Supabase anon key

K should **not** use:

- the Supabase service role key
- any admin key in browser code

### Recommended local pattern

If K needs a local config file during integration, use:

- `supabase-config.local.js`

This file should be local-only and ignored by git.

Example shape:

```js
window.MeridianSupabaseConfig = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
};
```

Do not commit real project values into the repo.

## Step 5. Keep Browser Configuration Separate From Product Logic

K should keep these responsibilities separate:

- config loading
- Supabase client creation
- row fetching
- row mapping
- runtime cache patching
- rendering

That means:

- `supabase-client.js` should only create/export the client
- repositories should only fetch rows
- mappers should shape the data
- runtime code should patch `runtimeData`
- UI render code should stay in the current app files

## Step 6. First Codespaces Success Criteria

Before K moves on, confirm all of these:

- the app loads in the Codespaces forwarded port preview
- the static app still works before any live integration
- schema runs in Supabase
- seed runs in Supabase
- the first live board snapshot data can be fetched without breaking the page
- the app still has a static fallback if live reads fail

## Step 7. What K Should Not Do

K should **not** do these things during the first integration slice:

- do not redesign the UI
- do not replace the entire static data model
- do not wire Delivery first
- do not remove static fallback
- do not commit project-specific local config
- do not use the service role key in browser code
- do not change metric meaning without following the metric protocol

## Step 8. If Something Fails

If K sees a blank page or broken preview:

check in this order:

1. is the app being served over HTTP, not `file://`?
2. is the forwarded port open?
3. did the local config load?
4. is K using the anon key, not the service role key?
5. did the schema and seed both run?
6. is the app still able to render from static fallback?

## Practical Reminder

The goal is not “make the whole app live.”

The goal is:

- make one small read path live
- keep the UI stable
- keep the repo safe
- avoid secret leakage

