# NextExperiment

An uncertainty-aware assistant for a research student's next experiment: fit your measured data, rank a finite list of feasible conditions, reveal or add a result, and repeat.

**Public website:** https://qizhang1102.github.io/co2rr-cross-study_Hackathon/

No registration, GPU, API key, backend, or external language model. CSV parsing, Gaussian process fitting, charts, reports and optional event records run in the browser. Only public or simulated data are permitted in this Hackathon version.

## Run locally

Node.js 22+ (validated with Node 24.11.0). No npm dependencies are needed.

```sh
git clone https://github.com/QiZhang1102/co2rr-cross-study_Hackathon.git
cd co2rr-cross-study_Hackathon
npm test
npm run dev
# http://127.0.0.1:4173; if occupied: PORT=4187 npm run dev
```

`npm run build` creates the static `dist/` folder with content-addressed JS/CSS paths and a build ID, so published revisions do not reuse stale script URLs. `SERVE_DIST=1 npm run dev` serves that exact output. Use an HTTP server, not a `file://` URL, for ES modules.

## Try the workflow

1. **Try a CO₂RR example** starts the default public replay with three revealed conditions, seed 42 and six total conditions of budget.
2. Inspect predicted mean, model standard deviation and expected improvement. Reveal the recommendation, choose an alternative, or manually select another candidate. Hidden outcomes never enter fitting or selection.
3. At budget completion, run Random / GP mean / GP-EI comparisons with identical starting IDs and total budgets. Results are calculated each time, never hard-coded.
4. Download recommendations, known measurements, comparison traces, or a standalone HTML decision report (printable to PDF with your browser).
5. **Use your own data** accepts two CSVs or a clearly marked simulated sample. Map measured and candidate variables separately; select maximize/minimize and describe the source, units and fixed context. Exclude infeasible rows, add public/simulated results, and refit.

Tasks stay in memory and clear on reload. Export before closing or replacing a task. Both modes retain their current task when switching tabs within a page.

## CSV contract

See [`public/examples/`](public/examples/). Templates contain headers only; replace them and add data. Examples are fabricated teaching values, not CO₂RR measurements.

- 1–3 numeric condition variables; one numeric measured target. Arbitrary column names and separate candidate-column mapping are supported.
- 2–200 distinct measured conditions (at least 3 recommended); up to 1,000 distinct candidates; at most 30 columns and 1 MB per file.
- Unknown candidate targets **must be empty**, never zero. Omit the target column or map its empty column. Matching target names are checked even if “No target column” is selected.
- Missing/invalid numbers, duplicate conditions, malformed rows and conflicting mappings are errors. Explicit numerical zero measurements are valid.
- Candidates matching measured coordinates are automatically ineligible, regardless of their IDs. Duplicate replicates must be combined explicitly by the researcher, only when comparable.
- Use consistent units, potential reference, assay/cell/electrolyte/catalyst context. The app cannot infer scientific compatibility. Do not mix incompatible measurements.
- Unmapped metadata columns are ignored. Do not include identifying or sensitive data.

## Method and research boundary

The method follows the original [CO₂RR cross-study Phase 2](https://github.com/QiZhang1102/co2rr-cross-study) mathematical protocol: fixed Matérn 5/2 kernel, length scale 0.35 after coordinate range scaling, normalized observation-noise SD 0.03, and Expected Improvement. This is an independently authored JavaScript implementation of established methods, not a new algorithm or a wholesale migration of the private project.

Public FE cases preserve the original fixed prior center 50 / scale 100. Custom tasks fit their own observed target mean and population SD; constant targets use a documented fallback. There is no hidden-outcome hyperparameter selection. EI respects maximize/minimize; ties use a seeded outcome-independent order. Up to two alternatives are independent substitutes, not a jointly optimized batch.

The primary public pool contains eight compatible reported −0.91 V vs RHE conditions from Li et al. (2023), Figures 3a/c. A separate four-condition Figure 2c case preserves V vs Ag/AgCl. We intentionally do not join these reference scales into the original 11-condition modeling pool. A synthetic surface is available as a separate mode. Read [DATA_USE.md](DATA_USE.md) and [method details](docs/METHOD.md).

Model SD is uncalibrated model uncertainty, not experimental error or success probability. Predictions may exceed physical bounds. Historical reveals are not newly performed experiments; published means may summarize multiple replicates. A single finite-pool replay cannot demonstrate prospective yield gains, general superiority, or monetary savings. No patient data or clinical advice.

## Deploy

Any static HTTPS host can serve `dist/` without server configuration. Assets use relative paths, including GitHub Pages project paths.

- **Sites:** `.openai/hosting.json` records the existing project and static `dist` directory. Reuse that project ID; build, push the matching source to its source repository, save a version and deploy. The intended audience is public. Do not commit source credentials.
- **GitHub Pages (current public website):** `.github/workflows/pages.yml` builds and deploys `dist/`. **Settings → Pages → Source: GitHub Actions** is enabled. To publish future code changes, open **Actions → Deploy static site → Run workflow**, choose `main`, and run it. Deployment is manual; pushing code alone does not publish a new website. The public URL above passed online interaction checks; see the migration record below.
- **Other hosts:** build command `npm run build`; publish directory `dist`; no environment variables, paid services or API keys.

See [verification](docs/VERIFICATION.md) for actual deployment and browser checks. User-facing links are only complete once public access and interactive workflows are verified.

## Privacy and real-user evidence

Optional consent enables event names, timestamps, a random session ID, mode, and development-test flag in local storage. No table contents, numeric experiment values, filenames, IPs, names or emails are recorded by application code. Hosting providers may retain standard request logs. Feedback is explicitly downloaded locally, not transmitted.

There is **no central analytics database**. Each browser's event file is exportable, can be cleared, and may be lost if storage is cleared. Session IDs and page visits do not establish unique people. The organizer must match volunteered records to independently confirmed participants, deduplicate repeated sessions, and exclude QA/bots. No genuine users or testimonials are claimed by this repository.

Use the [trial guide](docs/USER_TRIAL.md), [blank participant ledger](docs/participant-ledger.csv), [feedback template](docs/feedback-template.csv), and evidence validation command:

```sh
node scripts/summarize-evidence.mjs /path/to/volunteered-records/*.json
```

The script reports event/session counts only and excludes flagged development tests; it never certifies unique participants.

## Submission materials

- [English 3-minute video script](docs/DEMO_SCRIPT_EN.md)
- [中文使用与演示说明](docs/GUIDE_ZH.md)
- [Trial tasks and feedback](docs/USER_TRIAL.md)
- [Source review and reuse record](docs/REUSE.md)
- [Actual verification record](docs/VERIFICATION.md)

Deadline supplied by the organizer: **November 14, 2026, 12:00 noon America/Los_Angeles (PST)**. The target is UCSD CES Health & Bio; this chemistry demonstrator has no validated health/clinical application. Confirm track eligibility with the organizers. A script is supplied; recording/submitting the video and recruiting ten real target users remain organizer tasks.

## Project map

| File | Responsibility |
| --- | --- |
| `src/gp.js` | GP, EI, seeded ranking; accepts revealed data only |
| `src/replay.js` | Private outcome oracle, reveal gate, paired policy controllers |
| `src/csv.js` | CSV parsing, numeric/schema validation and safe export |
| `src/data.js` | Independently checked public numeric facts and synthetic fixtures |
| `src/app.js`, `src/style.css` | Responsive task workflow, charts, feedback and downloads |
| `src/events.js`, `src/export.js` | Consent-only local event records and deterministic exports |
| `tests/core.test.mjs` | Leakage, numerical, reproducibility, validation and export tests |

New code and documentation: MIT. Third-party measurement facts retain attribution; underlying publications are not relicensed.
