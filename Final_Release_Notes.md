# Final release notes

## Instructor feedback implemented

1. The photo-credit accordions on the Places page now use jQuery slide animations with a single-open pattern, keyboard-friendly native details/summary semantics, reduced-motion support and `.stop(true, true)` queue control.
2. The Journey form validates Full name and Phone number with stronger rules and field-level error messages. Full name requires at least two name parts and supports Unicode scripts; phone requires 7–15 digits and permits common international formatting.
3. The map section now appears before the My route section in the Journey page. The user can explore the map before reviewing the selected route.
4. Travel Marks use a smooth stamp-press animation when collected and an ink-release animation when removed. Passport stamp elements update in place to keep interactions stable.
5. The passport print stylesheet isolates the passport and provides a compact A4 grid, addressing the previously observed multi-page print preview.

## Verification

Run `node --check` on every file in `js/`. Manually test the published site at 375px, 768px and 1280px in light and dark modes. Check accordion keyboard controls, name/phone validation, map/route interaction, saved state, passport animations, print preview, browser console and image loading.

## Navigation and section order refinement
- Restored the Travel Marks / passport spread to its original position in the Journey narrative.
- Kept the requested section order for the route planner: the interactive map now comes immediately before My Route.
- Added scroll-aware navigation styling: My Route receives its own underline while its section is in view, while My Journey remains marked as the current page.
