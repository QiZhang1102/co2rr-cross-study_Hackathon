# Verification record

Build date: 2026-11-09. Node 24.11.0 on macOS. Browser: Google Chrome via supported computer-use controls. All browser activity in this record is developer QA, not independent target-user evidence.

## Core checks

`npm test` runs built-in Node tests for: Cholesky reference solve, Matérn kernel invariants, analytical EI, maximize/minimize symmetry, exclusion and already-measured filtering, candidate-target rejection, hidden-outcome perturbation isolation, reveal-only training, seeded paired starts and exact budget, repeated-selection prevention, invalid data, constant targets, CSV quoting/BOM/newlines, row/schema errors, blank-vs-zero handling, duplicate rows, imported overlap, CSV/report consistency, HTML/formula escaping, consent-only events, storage denial, separate potential references and numerical fit-failure messaging. Latest actual log is `docs/core-tests.txt`.

`npm run build` produces static files without runtime dependencies.

## Local browser checks completed

- Homepage and initial empty state loaded on HTTP localhost.
- One-click RHE public case: 3 known conditions, 5 unknown candidates. First recommendation L06, predicted mean displayed 48.0728, CSV value 48.072780801494716.
- Downloaded actual recommendation CSV through browser; inspected file bytes and matched page rounding.
- Revealed L06 = 15.9; manually revealed L01 = 52.5; completed six-condition budget and ran paired policy comparison. Known-row counts advanced 3→4→6; best displayed 52.5.
- Uploaded actual measured-example.csv and candidates-example.csv through the native file picker, verified 3 measured / 5 candidates, mapped columns, declared simulated source and fitted.
- Custom recommendation C3 changed to C2 after excluding C3. Added C2 = 65, observed four known rows and best 65. Actual downloaded known-result CSV and report included C2=65 and source description.
- At 390×844 viewport, document width was 390px, without page overflow; chart and add-result form were visually inspected. Tables scroll within their own containers.

Browser extension upload API lacked local-file URL access; the native system picker succeeded, without changing extension permissions. The download event API timed out, but the native download and exact downloaded file contents were independently verified. These were automation limitations, not application file-import failures.

## Original Sites production verification

**Verified public URL:** https://next-experiment-co2rr.zq20021102mia.chatgpt.site

Sites version 3 succeeded, deployment `appgdep_6af24c13b1f88191bb87a1d341a13a87`, source commit `72743bc49746e6f0c46d5a172bca8c39426571bd`. Public access was explicitly enabled. A cookie-free curl request returned HTTP 200 and the application, and a fresh browser tab required no account or API key. Runtime build ID: `5451698ce3dc`.

All eight deployed JS/CSS runtime files were fetched anonymously and byte-compared with local source: exact matches. Per-file SHA-256 values are in `production-integrity.json`. Native browser use and the final saved files verified:

| Online check | Actual outcome |
| --- | --- |
| One-click default replay | Three starting observations, L06 recommended; historical reveal updates to four observations |
| Manual selection and budget | L01 manually revealed as 52.5; six-condition budget stops further reveals |
| Paired comparison | Random 52.5, GP mean 52.5, GP-EI 44.8 for seed 42 / budget 6; same L03, L08, L02 start |
| Final-build replay | Complete six-condition algorithm path and comparison repeated after build-ID confirmation |
| Real CSV file input | Both example CSVs selected through the native file chooser on final build; 3 measured and 5 candidate rows |
| Mapping error | Duplicate mapped condition rejected with readable error, corrected mapping fits successfully |
| Exclusion and refit | C3 excluded, C2 selected, synthetic result 65 added, best updates to 65 and four known rows |
| Invalid result | NaN rejected; observation count stays three |
| Final export consistency | C4 predicted mean displayed 47.6195; actual downloaded CSV retains full precision, report rounds consistently; known CSV includes C2=65 |
| Mobile 390×844 | Page width 390 with no overall overflow; homepage, form, chart and result update inspected |
| Mobile minimization | Simulated sample switched to minimize; new synthetic result 10 changes best from 35 to 10; CSV download succeeds |
| Exhausted candidates | Exclude all unmeasured rows → no eligible candidates; re-enable C3 → recommendation returns |
| Feedback | Structured feedback JSON downloaded, explicitly flagged development QA |
| Optional events | 16 actual QA-only events exported, all marked development_test; summarizer excludes all 16, reports zero non-test sessions and no confirmed-human count |
| Console | No browser error logs on final fresh verification tab |
| Privacy cleanup | QA local event records cleared; final visible app has recording off and no stored visits/sessions |

A first online check exposed a stale-results empty-state bug; it was fixed. During publication, edge caches temporarily served previous assets despite the deployment success response. Content-addressed asset paths were added; verification waited for the final build ID and matching bytes. The final build was then exercised again, including actual CSV uploads. This is why deployment status alone was not used as acceptance evidence.

GitHub implementation commit: `a32801a7f1702f92b5307dc78608430985f0713a`. Its [Core integrity checks run](https://github.com/QiZhang1102/co2rr-cross-study_Hackathon/actions/runs/42766459877) completed successfully (tests and static build). Subsequent documentation-only commits record these results; they do not change the deployed runtime.

Browser screenshots are delivered alongside the final response. The local event log and feedback are QA artifacts, not testimonials. No real target-user trial was conducted.

## GitHub Pages migration verification

**Current public URL:** https://qizhang1102.github.io/co2rr-cross-study_Hackathon/

Verified November 9, 2026 (America/Los_Angeles), after enabling GitHub Actions as the Pages source. [Deployment run 42773789461](https://github.com/QiZhang1102/co2rr-cross-study_Hackathon/actions/runs/42773789461) completed successfully from commit `5b7050b80af54c7ca3a940a7fa4d2ed0c2ea537e`. The public app was opened in a separate in-app browser without GitHub login or an API key. The rendered build meta tag was `5451698ce3dc`, matching the existing runtime. No application code changed for this migration. `npm run check` passed all 27 tests and the static build before migration.

The following checks were actually repeated on the GitHub Pages URL, rather than inferred from the previous host:

| Check | Observed outcome |
| --- | --- |
| Initial page | Home and replay empty state render without authentication |
| One-click replay | 3 observations; L06 predicted mean 48.0728 |
| Reveal and refit | L06 historical result 15.9; count becomes 4 and next recommendation L05 |
| Budget and comparison | L05=8.3 and L07=22.3 complete budget 6; Random 52.5, GP mean 52.5, GP-EI 44.8 from the same L03/L08/L02 start |
| Actual CSV upload | Both local example files selected through file chooser; 3 measured / 5 candidates, blank candidate targets retained |
| Custom recommendation | Simulated source declared, mapping validated; C3 mean 57.3525 |
| Exclusion | Excluding C3 changes top choice to C2 |
| Add result | C2=65 produces 4 observations, best 65, updated chart and C4 mean 47.6195 |
| Real downloads | Recommendation CSV, known-result CSV and HTML report downloaded and inspected; CSV C4 mean 47.61950643107065 matches displayed rounding; measured C2 and excluded C3 are absent from recommendations; known CSV/report contain new result 65 |
| Desktop | 1440×900; document width 1440; CSV mapping, chart and results present |
| Mobile | 390×844; document width 390; home and recommendation card visually inspected |
| Goal on mobile | Switching imported task to minimize gives best 35, C5 recommendation and lower-is-better chart |
| Final page | Returned to clean homepage; viewport override reset |

Screenshots are supplied as `nextexperiment-github-pages-home.jpg`, `nextexperiment-github-pages-desktop.jpg`, `nextexperiment-github-pages-mobile.jpg` and `nextexperiment-github-pages-mobile-workspace.jpg` in the delivered outputs. This migration QA did not enable trial recording and does not count as an independent real user. The original host's historical verification and integrity record above remain unchanged; they are not mislabeled as checks of GitHub Pages.

## Not claimed

No physical experiments, patient data, ten-user milestone, real testimonials, prospective yield improvements, elapsed-time savings, calibrated probabilities, completed demo recording or completed competition submission. Optional records are browser-local and cannot certify independent users. Static source inspection can reveal public replay data; algorithm inputs remain isolated.
