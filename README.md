# Two Worlds, One Journey — Final Field Archive Edition

A three-page, responsive final release that extends the original project into a polished, interactive front-end experience. The project keeps the same subject and page set: a personal story connecting Afghanistan and Kazakhstan. The instructor approved a separate repository for the Final release.

## Creative direction: a living field archive

The visual concept is an editorial field journal rather than a conventional travel site. It combines archival-paper texture, cartographic coordinates, photographic contact sheets, country-coloured passport marks and a drawn route. The Afghanistan side uses warm clay and heritage tones; the Kazakhstan side introduces cooler blue-green accents. The visual system is original CSS, not a downloaded website template.

## Pages

- `index.html` — The Story: editorial cover, real Bamiyan and Astana photographs, personal introduction, a switchable two-world lens, country sections, a drawn route and featured places.
- `roots.html` — The Places: a searchable 13-place photographic atlas, country filters, category filters, sort, saved-only view, add-to-route controls, cultural object studies and image credits.
- `journey.html` — My Journey: personal timeline, route planner, interactive map, live passport stamps, print view, seven-field validated form and jQuery FAQ accordion.

## Technologies

- HTML5 semantic structure and accessible controls.
- CSS3: custom properties, Grid, Flexbox, media queries, transitions, keyframe animation, reduced-motion handling and print styling.
- Bootstrap 5.3.3: responsive navigation and Bootstrap form components; the visual design is substantially customized.
- JavaScript: split into named files under `js/`; the place collection is an array of 13 objects, each with more than four properties, rendered into the DOM.
- jQuery 3.7.1: controlled smooth scrolling, an accessible one-open accordion, photo lightbox transitions, horizontal route exploration, atlas update feedback, passport microinteractions and animated form validation/success feedback. Reduced-motion preferences are respected.
- Leaflet 1.9.4 and OpenStreetMap: interactive map with approximate place pins and a route overlay.
- Google Fonts: Cormorant Garamond, Manrope, Playfair Display and DM Sans.

## Main interactions

1. **Two-world lens (Home):** switching between Afghanistan and Kazakhstan changes the selected photograph, short narrative, coordinates and link to the filtered atlas.
2. **Place atlas (Places):** search, country filter, category filter, sort and saved-only filter update the list without reloading the page. Empty results have a designed reset state.
3. **Route planner (Journey):** places can be added, removed and reordered. JavaScript calculates the number of stops, suggested exploring time, straight-line distance and the Afghanistan/Kazakhstan time split. The selected route is saved in `localStorage`.
4. **Two-world passport (Journey):** every saved place becomes a country-coloured stamp. Progress updates with the route; the button opens a paper-friendly print view. This is a creative keepsake, not an official travel document.
5. **Message form (Journey):** seven fields are checked in JavaScript, including name length, email, phone digits, future date, integer day range, required selection and message length. Each error appears below its field. A successful client-side validation displays a message and resets the form; no data is sent to a server.
6. **jQuery effects:** smooth scrolling, a one-open-at-a-time accordion, photo lightbox fades and a success-message slide effect.

## Photographs and credits

Photographs show named locations or cultural objects in Afghanistan and Kazakhstan, including Bamiyan, Band-e-Amir, Darul Aman Palace, Herat Citadel, the Blue Mosque in Mazar-e-Sharif, the Minaret of Jam, Baiterek, Khan Shatyr, Astana, a Kazakh yurt, Zenkov Cathedral and Charyn Canyon. A small object-study gallery shows a historical Herat carpet and a Kazakh dombra. They are not generic landscape placeholders.

Images are loaded from Wikimedia Commons file URLs, so an internet connection is required. The creator, source page and applicable licence are listed in `images/PHOTO_SOURCES.md` and in the visible Photo Credits section on the Places page. Keep those credits when publishing. The project also credits Bootstrap, jQuery, Leaflet, OpenStreetMap, Google Fonts and OpenAI ChatGPT as a coding/documentation assistant.

## Run locally

Open `index.html` in a browser, or start a local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. The external library and photograph URLs need an internet connection. The route planner, saved route and passport operate in the browser and do not use a backend.

## Deploying

The instructor approved using a separate repository for the Final release. The approved repository is:

`https://github.com/ehsan08-lmy/2Worlds_1Journey`

The deployed GitHub Pages site is:

`https://ehsan08-lmy.github.io/2Worlds_1Journey/`

Copy the final project files into that repository, review the changes, then commit and push them before the deadline. The ZIP itself has not been pushed to GitHub.

## New files

- `css/fieldbook.css` — Field Archive visual identity, page-specific design, animation, responsive and print rules.
- `js/experience.js` — the two-world lens interaction.
- `js/passport.js` — live passport stamps, progress and print view.

## Verification notes

All JavaScript files pass `node --check`. Static checks confirm that all three pages have unique IDs, all local CSS/JS references exist, all static images have alt text, same-page anchors resolve, and all 13 place objects contain the required data fields. A browser-based responsive check could not be completed in the current tool environment, so open the site in Chromium/Chrome and verify it at 375px, 768px and 1280px before submission. Also inspect the external Commons images while online, and capture fresh screenshots for the required Endterm report.


## Visual refinement update

- The old continuous ticker has been replaced with a kinetic route constellation: an animated waypoint moves along a drawn route, while each named destination is a keyboard-accessible link into the searchable atlas.
- The two-world passport is now a photographic stamp collection. Each stamp uses the actual photograph associated with its place and can add/remove that place from the visitor's saved route.
- The message form now includes an animated completion meter for its seven required fields, cascading field entrances, clearer validation feedback and an animated success note.
- Country and category filters have a more expressive active state; the control frame pulses and the result count fades between updates.
- The three page-hero sections use subtle, named-location photographs beneath high-contrast overlays so the imagery adds atmosphere without reducing readability.
- Decorative sticker and photo-caption colors are fixed to accessible high-contrast pairs in both themes.


## Final release: Endterm defense feedback addressed

- **Places / photo credits:** the Afghanistan and Kazakhstan photo-credit panels now open and close with a controlled jQuery `slideDown` / `slideUp` animation. They retain native `<details>` semantics for keyboard use and graceful no-JavaScript fallback; only one credit group remains open at a time. Repeated activation clears queued effects with `.stop(true, true)`.
- **Form validation:** Full name now requires at least a first and last name, permits Unicode letters (including Cyrillic and Persian/Dari scripts), and allows internal hyphens and apostrophes. Phone validation checks 7–15 digits, accepts an optional leading plus and common separators, and rejects malformed parentheses or letters. Errors remain inline and accessible.
- **Journey order:** the interactive map now appears before the “My route” editor so visitors can explore the map first and then review or adjust their route. The passport follows the route editor.
- **Travel marks:** passport stamps now animate on both collection and removal with a smoother ink-press / ink-release response. Existing DOM nodes are updated in place, and jQuery effects are stopped before restarting so rapid interactions do not queue up. Reduced-motion preferences are respected.
- **Passport printing:** print rules isolate the passport instead of merely hiding the rest of the page, with a compact four-column A4 layout intended to avoid the previous multi-page blank output.

## Final checks before publishing

Test all three pages at 375px, 768px and 1280px in both light and dark modes. Verify that the photo-credit panels expand/collapse with keyboard and pointer input, the Full name and Phone fields show the correct inline errors, map pins add places, route items can be reordered and removed, passport stamps respond to collection changes, and the passport print preview is compact. Confirm there are no console errors or missing local assets.

### Journey page section navigation
The Travel Marks passport spread is kept in its original place in the Journey narrative. The map is followed by the My Route builder. While the My Route section is in view, the top navigation underlines the My Route link as the current section; My Journey remains identified as the current page.
