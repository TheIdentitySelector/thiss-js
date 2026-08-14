# Design updates, August 2026

Source: Figma file `WmAc45HqRaiJNNw5yErYKN` ("Seamless Access"), canvas "Demo"
(`2458:7680`). Designer notes (Slack, 2026-08-11):

> Introduce a demo bar. The "hide bar" toggle makes it smaller (see figma).
> Introduce a more complex panel for choosing institute at SP2.
> Introduce an "advanced integration" discovery page (sizing in my figma is a
> bit off, but just use the normal discovery page css/js of standard). If it
> looks and behaves the same as standard it's fine — it just looks encapsulated
> on the site of the SP, so it feels and looks advanced. No special css needed.

New frames since the June implementation (node ids):

| Frame | Node | Shows |
|---|---|---|
| Demo-site | `2543:9402` | SP1 with demo toolbar; Integration Mode = Advanced, Example = Content Site 1 |
| Demo-site | `2543:9643` | Same; Integration Mode = Standard, Example = Standard Button; button is the standard teal one |
| Demo-site | `2543:9779` | Same, with the "Advanced instructions" modal open |
| Demo-site | `2627:898` | Same, Integration Mode dropdown open: Advanced / Standard / Limited |
| Frame 3539 | `2543:9495` | Toolbar hidden: only a small teal chip (temple icon + caret) top-right |
| SP 2 - No access | `2459:12145` | Updated: rich "View full article" access panel (new children `2627:8694`, `2627:8676`, `2627:8747`) |
| SP 2 - Authentication - Advanced mode | `2627:8751` | Prinsen chrome around an embedded standard discovery widget (`2627:12202`) |

## Item 1 — Demo toolbar

A teal bar rendered above the publisher header on both SPs (public and secure
pages). Contents, left to right:

- Temple icon + "Seamless Access - Demo".
- "Integration Mode" chip + dropdown: Advanced / Standard / Limited.
- "Example" chip + dropdown: Content Site 1 / (presumably Content Site 2) / Standard Button.
- Checkbox "Hide demo toolbar".
- "Documentation ⓘ" link, right-aligned.

Hidden state (frame `2543:9495`): the bar is replaced by a small teal chip at
the top-right of the publisher header. Clicking the chip restores the bar.
State persists in `localStorage`.

The "Advanced instructions" modal already exists on both SPs (commit
`58176ee`, node `2543:10166`). The Figma modal (`2543:9779`) matches it. Keep
it; optionally add a toolbar affordance to reopen it.

Proposed control semantics (to be confirmed):

- **Example** navigates between demo properties: Content Site 1 → sp1,
  Content Site 2 → sp2, Standard Button → a minimal page with only the
  standard button.
- **Integration Mode** changes how the button/discovery is wired on the
  current page. Standard: the standard thiss.js button (teal) with full-page
  discovery redirect — the current behavior. Advanced: custom-branded button
  (purple on SP1, magenta on SP2) and, on SP2, the embedded discovery page of
  item 3. Limited: SeamlessAccess limited integration; scope to be decided —
  can ship as a disabled entry first.

Since sp1 and sp2 use separate config trees (a deliberate decision in
plan.md), the toolbar ships as one CSS+JS asset duplicated into each SP's
`html/` tree, or bind-mounted from a shared dir; prefer a shared dir mounted
into both containers to avoid drift.

## Item 2 — SP2 richer access panel (no-access page)

Replace the current "Authenticate for full-text" card on
`sp2/html/index.html.tmpl` with the Figma "View full article" panel:

- White card, heavy black top border: title "View full article", subtitle
  "Get access to the full-text by authenticating with your institute".
- The SeamlessAccess button (magenta `#731963` styling in the design) showing
  the remembered institution ("Access through University of Stadionia").
  **Constraint carried over from the June work:** this is the thiss.js
  DiscoveryComponent rendered into `<div id="login">` — keep the existing
  embed script and `${SP2_HOST}`/`${SP2_ENTITYID}` template vars; do not
  hardcode a look-alike.
- "Add or change institution" link under the button.
- Below, a pale panel with two columns of dummy links:
  - "Other log in options": Log in on Andaliz · Access code · AKS member
    access. (The design says "Andaliz" inside the Prinsen site — likely a
    copy slip; ask the designer, default to "Log in on Prinsen".)
  - "Purchase options": Purchase article (PDF) · Purchase journal issue
    (PDF) · Rent article (20 days access).
- Footer line: "If you have any problems gaining access, contact our support
  desk."

Also new in the frame: an author line under the hero ("Tianyi Hao; Alejandro
Sánchez-Postigo; Pavel Cheben; Alejandro Ortega-Moñux;").

## Item 3 — SP2 advanced-integration discovery page

New page on sp2 (proposal: `/discovery/`), frame `2627:8751`. Prinsen chrome
(white nav, magenta hero "Access to view full article", teal footer) around
the **standard discovery widget, unstyled** — the designer explicitly wants
the normal discovery page css/js, just encapsulated inside the SP's page.

Implementation candidates, to be settled by experiment:

1. An `<iframe>` onto `service.sa.org/ds/?entityID=…&return=…` sized as the
   card. Exact standard look for free. Risk: the ds page must break out of
   the frame (`window.top`) when returning the chosen entityID to the SP's
   discovery response endpoint; verify, since the SAMLDS SessionInitiator
   round trip must end in the top window.
2. Load the thiss.js discovery assets directly in the page inside a fixed-size
   container, configured with the same MDQ/search/persistence URLs the ds
   page uses. Heavier wiring, no frame-breaking concern.

Either way the SP's `shibboleth2.xml` SAMLDS discoveryURL then points at this
page (or the page is reached from the access panel and forwards to the
standard flow). The wiring, not the styling, is the work here.

## Order of work

1. Item 2 (self-contained page restyle, no new mechanics).
2. Item 1 toolbar markup/CSS + hide toggle (static behavior first, control
   semantics after confirmation).
3. Item 3 experiment (iframe vs inline assets), then wire the chosen variant.
4. Toolbar control semantics (mode/example switching) once 1–3 are settled.

## Decisions (confirmed 2026-08-11)

- "Log in on Andaliz" inside Prinsen treated as a copy slip: implement as
  "Log in on Prinsen". Flag to the designer for confirmation.
- Toolbar semantics as proposed: "Example" navigates sp1 / sp2 / bare-button
  page; "Integration Mode" swaps standard button + redirect vs. branded
  button + embedded discovery; "Limited" ships as a disabled entry until
  defined.
- Item 3 settled by experiment, iframe first.

Still open for the designer: what "Limited" mode should demo, and whether the
Example dropdown has a "Content Site 2" entry.

## Clarification (2026-08-14) — custom button and custom discovery page

New guidance on the advanced-integration mocks:

- The buttons on "SP 2 - Access" (`2460:12290`) and "SP 2 - No access"
  (`2459:12145`, instance `2627:8676` "Access") are **custom, non-standard
  buttons**. In advanced mode the SP renders its own button; it does not embed
  the thiss.js DiscoveryComponent. The June constraint ("do not hardcode a
  look-alike") applies to **standard** mode only — that is exactly the
  difference the demo exists to show.
- "SP 2 - Authentication - Advanced mode" (`2627:8751`) is a **custom
  discovery page** owned by the SP. The functional box inside it looks and
  behaves the same as the standard SeamlessAccess DS; the point is that it is
  encapsulated in the SP's own page, so the integration feels advanced.

Implementation decisions:

- **Custom button.** SP-authored markup mirroring the standard button's
  anatomy (SA logo cell, divider, "Access through …" label) in Prinsen
  magenta `#731963`. Populated via thiss-ds: `PersistenceService.entities()`
  against `https://${SERVICE_HOST}/ps/` under the deployment's
  `DEFAULT_CONTEXT`; with a persisted choice the label is "Access through
  {institution}", otherwise "Access through your institution". Clicking goes
  to the SP's own discovery page `/discovery/`.
- **Mode switching.** Both SP2 pages read the toolbar state
  (`localStorage.saDemoToolbar`, default `advanced`) and listen for the
  toolbar's `sa:demo-mode` event: advanced shows the custom button, standard
  shows the thiss.js DiscoveryComponent in `#login` (rendered lazily on first
  use). This lands the first slice of item 4.
- **thiss-ds client.** The dist bundle
  `@theidentityselector/thiss-ds/dist/thiss-ds.js` (44 KB) is vendored into
  `demo-toolbar/` (the existing shared mount on both SPs). It claims the
  global `thiss`, same as thiss.js — pages load thiss-ds.js first, capture
  the global into `thissDS`, then load thiss.js.
- **Custom discovery page (iframe experiment).** `sp2/html/discovery/` wraps
  an `<iframe>` onto `https://${SERVICE_HOST}/ds/?entityID=…&return=…` in
  Prinsen chrome. The DS redirects the *iframe* to the return URL, so
  `return` points at `/discovery/return.html` on SP2, which breaks out via
  `window.top.location` to `Shibboleth.sso/Login?entityID={chosen}&target=…`
  (Shibboleth's SessionInitiator accepts a direct entityID, no SAMLDS round
  trip needed). `https://${SP2_HOST}/discovery/` is added to SP2's
  `discovery_responses` in metadata.json so the DS return-URL check passes.
- **DEFAULT_CONTEXT plumbing.** The thiss container's `DEFAULT_CONTEXT`
  (previously the Dockerfile default `local`, unset in compose) is now set
  explicitly in docker-compose.yml and exported to the templates via
  render.sh, so the SP pages query the same persistence context the DS
  writes.
