# WebForge AI frontend

## Run locally

```bash
npm install
npm run dev
```

The frontend uses `http://localhost:8005` for its backend while running in
development mode. Copy `.env.example` to `.env.local` to use a different backend
URL.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New Project** and import that repository.
3. Keep the detected Vite settings: build command `npm run build` and output
   directory `dist`.
4. In the Vercel project settings, add `VITE_API_BASE_URL` with the public URL
   of the deployed backend, such as `https://api.example.com` (no trailing
   slash), then redeploy.
5. Deploy to get a free `*.vercel.app` address. You can change its subdomain in
   the project's Domains settings.

The backend must be deployed separately and allow browser requests from the
Vercel site origin (CORS). The backend also needs to serve `/api/project` and
`/api/preview`. Without a deployed backend, the frontend can load, but project
generation and preview will not work.
