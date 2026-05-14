# Deploy and waitlist

**Deploy:** GitHub **Settings → Pages → Source: GitHub Actions**; **Actions → Workflow permissions: Read and write**. Pushes to `main` run `.github/workflows/deploy-github-pages.yml` (artifact path `.`).

**Waitlist:** `index.html` posts to Supabase RPC `submit_waitlist_signup` using the public anon key. In the Supabase dashboard: allow CORS for `https://findmeirl.app` (and `www` if used); ensure the RPC exists and `GRANT EXECUTE ... TO anon` (migration `082_waitlist_signups_landing.sql` in the backend/app repo).
