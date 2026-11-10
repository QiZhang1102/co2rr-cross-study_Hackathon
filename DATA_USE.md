# Data source, rights and scope

## Public historical facts

Li, J. et al. **Electrochemical acetate production from high-pressure gaseous and liquid CO₂.** Nature Catalysis (2023). DOI [10.1038/s41929-023-01046-8](https://doi.org/10.1038/s41929-023-01046-8).

Two independent cases in `src/data.js`:

| Case | Public source | Numeric inputs | Target | Fixed context |
| --- | --- | --- | --- | --- |
| `li_rhe` | [Fig. 3a/c](https://www.nature.com/articles/s41929-023-01046-8/figures/3) | pressure (atm), pre-equilibration (h) | acetate FE (%) | −0.91 V vs RHE, solution B, 1 h assay |
| `li_potential` | [Fig. 2c](https://www.nature.com/articles/s41929-023-01046-8/figures/2) | potential (V vs Ag/AgCl) | acetate FE (%) | 58 atm CO₂, 1 h pre-equilibration, solution B, 1 h assay |

Solution B = 6 M KOH + 0.8 M H₃BO₃; SW-Cu(OH)₂/Cu-derived cathode. Figure 3 consists of separate one-variable sweeps, not a joint factorial study. The shared 58 atm / 1 h / 52.5% reference is included once in the RHE pool. No cross-scale potential conversion is performed. No mixture with other catalysts, electrolytes, papers or objectives.

On 2026-11-09, publicly accessible publisher image bytes were retrieved for checking only, and explicit printed FE labels were visually verified. No bar-height digitization or invented results. SHA-256:

- Fig. 2: `fb70489017712151aaefd613939452767714956f2ceb4af39b89a53022da4948`
- Fig. 3: `bdea7f3ca7fa8b42815f8c51210d2f78220fe5c22caf2ce4c0b2bc3ccbde91c6`

The publisher article is not marked open access. This repository includes a small independently checked set of numerical factual observations with attribution; **not** the figures, captions, PDF, full tables or manuscript. The application MIT license does not cover the publication or grant third-party figure redistribution rights. Link to the publisher for original material. Raw replicate-level data were not obtained. Labels represent reported means, not independent physical runs; model SD must not be confused with the figure's experimental error bars.

## Simulated data

The synthetic surface and all downloadable example CSV values are invented demonstration data, labeled as simulated. Surface: `40 + 35 exp(-((x1−.65)²+(x2−.35)²)/.1) + 5 sin(6 x1)`, sampled on a 5×4 grid. It has no physical units or experimental validation. No simulated number is presented as a published CO₂RR measurement.

## User imports

Only public or simulated data are allowed for this Hackathon build. The user declares the source and compatibility context. Files are processed in memory in their browser and are not uploaded by application code. The app cannot independently verify declarations. Missing candidate outcomes stay unknown. No confidential, patient, identifying, or unpublished private lab data should be used.

## Excluded material

No full private repository, source attachments, credentials, raw workbooks, patient data, scraped user data, underlying manuscript or old research outcome claims are included. The original Wang Group workbook was described in the original project's sources but is not used here. Its Apache-2.0 declaration does not relicense unrelated publications, and is not asserted as a license for Li et al.
