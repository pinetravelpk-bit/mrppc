# MrPPC.pk Next.js theme

A complete Next.js App Router project, converted from the approved animated homepage. Uses Next.js 16.4.0, React 19.2 and standard CSS. No paid plugins or page builders.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Production build and hosting

```bash
npm run build
```

The project uses `output: 'export'` and produces a static site in `out/`. Upload the contents of `out/` to a static web host with directory-index support. For a local production preview, serve `out/` with a static server. `next start` is not used with a static export.

The included source also works as a normal Next.js project. If adding server actions or an API-backed form, remove `output: 'export'` and deploy using a supported Next.js server host.

## Pages

- `/`: animated homepage
- `/services/`: PPC service directory
- `/services/google-ads/`
- `/services/meta-ads/`
- `/services/tiktok-ads/`
- `/services/amazon-ads/`
- `/services/ebay-ads/`
- `/services/etsy-ads/`
- `/services/microsoft-ads/`
- `/services/linkedin-ads/`
- `/services/youtube-ads/`
- `/services/display-remarketing/`
- `/about/`
- `/our-approach/`
- `/contact/`
- Custom 404, robots.txt and sitemap.xml

## Where to edit

- `lib/services.js`: all service-page copy, FAQs, titles and platform definitions
- `app/page.jsx`: homepage content
- `app/globals.css`: theme, responsive layouts and animation styles
- `components/HeroMotion.jsx`: five-slide carousel, magnifier sweep, object orbits and motion controls
- `components/Header.jsx` and `Footer.jsx`: navigation and shared footer
- `components/BriefForm.jsx`: downloadable campaign brief
- `public/assets/`: images and layered sprite sheets

## Motion

The first slide has a rising growth arrow. The social slide keeps the phone still while hearts, play symbols and rings orbit. The search slide moves the lens across fixed cards. Commerce objects orbit a stationary bag with depth switching. Graph bars grow sequentially while a line draws and a ring rotates. Slides run for 7.6 seconds; manual selection, touch swipe, pause and reduced-motion support are included. React cleans up timers, animation frames and listeners during navigation.

## Before launching on your own domain

Set `NEXT_PUBLIC_SITE_URL` to the final domain before building. See `.env.example`. This value controls canonical URLs, the sitemap and service structured data.

The contact form downloads a text brief locally. It does not send an enquiry or book a call. Add verified contact information and connect a form backend if enquiry delivery is required. No business email, phone number, pricing, certification or performance result has been fabricated.

## Checks

Production build, exported page and local asset references, service-page metadata and route coverage were checked. Browser-based visual QA was not available in this environment.

## Platform-specific service design

Each service page has one fixed animated campaign scene, platform colours and a keyboard-accessible campaign journey. Google and Microsoft use search scenes; Meta and LinkedIn have feed scenes; TikTok and YouTube use video scenes; Amazon, eBay and Etsy each have a storefront treatment; Display & Remarketing has an animated audience journey. These are illustrative creative concepts, not live platform accounts or campaign results.

Edit platform visual settings and journey copy in `lib/platforms.js`, hero composition in `components/PlatformHero.jsx`, and the journey in `components/PlatformExperience.jsx`.
