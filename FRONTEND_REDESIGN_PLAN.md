# Frontend Redesign Plan

## Pages Found
- `/` home
- `/portfolio` public work archive
- `/portfolio/[slug]` project detail
- `/case-studies` case study archive
- `/case-studies/[slug]` case study detail
- `/blog` thinking library
- `/blog/[slug]` article page with TipTap rich HTML support
- `/contact` contact form
- `/book` booking/start-project route
- `/login` and `/admin/*` are present but not part of this redesign

## Components To Modify
- Public shell: `Navbar`, `FooterSection`, global public tokens
- Home: replace old marketing-automation sections with Hazem editorial landing sections
- Work: rebuild `portfolio/page.tsx` and `portfolio/[slug]` around CMS data
- Case studies: keep Supabase fetching and redesign presentation
- Blog: update listing cards and article typography without removing TipTap rendering
- Contact/booking: visual refresh only; keep existing form and booking actions

## Design System Changes
- Dark-first editorial system using Deep Charcoal, Bone, and controlled green accents
- Poppins for Latin UI/display and Cairo for Arabic statements
- Shared section rhythm, editorial labels, buttons, cards, dividers, grids, and empty states
- Restrained motion through existing GSAP/Reveal utilities only

## Risks
- Existing public data may have invalid image values; pages need safe image fallbacks
- Current `.next` build cache has hit disk-space limits before; build may require freeing disk space
- Some old public pages still mention Mekky; priority is requested core public routes
- Admin CSS uses global tokens, so global token changes must avoid breaking admin readability

## Implementation Order
1. Add public design foundation and navigation/footer update.
2. Rebuild home page around Hazem positioning.
3. Rebuild work archive and project detail using Supabase with constants fallback.
4. Rebuild case study archive/detail presentation.
5. Rebuild blog listing/article typography while preserving sanitized TipTap output.
6. Refresh contact and booking surfaces without changing integrations.
7. Run responsive pass and validation: build, admin audit, route checks.
