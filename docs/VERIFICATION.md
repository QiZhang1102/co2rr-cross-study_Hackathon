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

## Production verification

Pending deployment and independent public-browser verification. Replace this section only after successful deployment and actual online checks.

## Not claimed

No physical experiments, patient data, ten-user milestone, real testimonials, prospective yield improvements, elapsed-time savings, calibrated probabilities, completed demo recording or completed competition submission. Optional records are browser-local and cannot certify independent users. Static source inspection can reveal public replay data; algorithm inputs remain isolated.
