# SEO launch checklist

The site handles relevance and technical SEO. Ranking at the top also needs the steps below, most of which happen outside the code.

## 1. Before launch (in code — 15 minutes)

- [ ] `src/lib/site.ts`: real brand `name`, `email`, `phone` (+977 format), `address.street`, `geo` (from Google Maps), `hours`, `sameAs` (all social and directory profile URLs).
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the hosting environment. Without it, canonicals and the sitemap point at localhost.
- [ ] Replace sample content: portfolio projects, team, About FAQ answers. Never publish invented results or reviews.
- [ ] Read every page in `src/content/` and remove any process promise you won't keep (call times, invoicing currency, response times).
- [ ] Add a share image: `src/app/opengraph-image.png` (1200×630).

## 2. Launch week

- [ ] Google Search Console: verify the domain, submit `https://yourdomain.com/sitemap.xml`.
- [ ] Bing Webmaster Tools: import from Search Console (Bing also powers some AI search answers).
- [ ] Test 3 pages in Google's Rich Results Test (FAQ, breadcrumbs, organization).
- [ ] Google Business Profile: create/claim it in Kathmandu with the **exact same** name, address and phone as `site.ts`. Category: "Internet marketing service" (+ "Website designer"). This is the single biggest lever for "agency in Kathmandu" and map results.

## 3. First 3 months (authority — what moves you past competitors)

- [ ] Reviews: ask every happy client for a Google review. Aim for a steady stream, not a burst.
- [ ] Directory profiles with the same NAP details: Clutch, GoodFirms, DesignRush, Sortlist, LinkedIn company page, Facebook page, plus Nepali business directories. Add each URL to `sameAs`.
- [ ] Real case studies: one page per project with the client's permission, results and a quote. These rank for "[service] for [industry]" searches and win international trust.
- [ ] Content: one useful article every 1–2 weeks answering what clients ask (e.g. "How much does a website cost in Nepal?", "Hiring an offshore agency from Nepal: what to expect"). Link each to the matching service page.
- [ ] Links: guest posts, partnerships, local press, tech community events in Kathmandu, and international client sites ("Website by …" credit links).

## 4. Measure monthly

- [ ] Search Console → Performance: queries, positions and clicks for "agency Nepal", "SEO services Nepal", "web development company Nepal", and each market page.
- [ ] Improve pages that rank 5–20: expand content, add FAQs from real client questions, add internal links.

Realistic timeline: Nepal-specific terms typically take 2–4 months to reach page one with steady work; international competitive terms take longer and depend mostly on case studies, reviews and links.
