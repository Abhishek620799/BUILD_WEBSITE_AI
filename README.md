# WebForge AI frontend

## Run locally

```bash
npm install
npm run dev
```

Local development reads `.env.development`, which points the frontend to
`http://localhost:8005`. Production builds do not load that file. Copy
`.env.example` to `.env.local` only if you want to override the API URL locally.

## Deploy to GitHub Pages

The GitHub Actions workflow builds and publishes the static frontend on every
push to `main`. In the repository, open **Settings → Pages** and select
**GitHub Actions** as the build and deployment source. The public URL will be
`https://abhishek620799.github.io/BUILD_WEBSITE_AI/`.

To call a publicly reachable Spring Boot backend, add a repository variable
named `VITE_API_URL` under **Settings → Secrets and variables → Actions →
Variables**. Set it to the backend HTTPS origin, without a trailing slash or
`/api`, then rerun the deployment workflow. Do not set it to `localhost`.

The frontend's static UI can load without a backend. Project generation and the
preview iframe require the backend to be publicly reachable at `VITE_API_URL`.
The backend's public HTTPS origin cannot be `localhost`; a visitor's
`localhost` refers to their own device. For Vercel instead, import this
repository and configure the same `VITE_API_URL` environment variable in the
Vercel project settings.

## Spring Boot CORS

Add a configuration class to the Spring Boot backend and replace the example
origin with the exact Vercel origin:

```java
package your.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://YOUR-FRONTEND-DOMAIN.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

If Spring Security is enabled, also enable CORS in its `SecurityFilterChain`
with `http.cors(cors -> {})` (and ensure CSRF policy permits the API's POST
request as appropriate). Do not use `*` as the allowed origin. CORS is only a
browser access policy; it does not make a laptop-hosted backend reachable from
the public internet.
