# Model contract

The recommender input contains only `observations: [{id,x,y}]`, `candidates: [{id,x}]`, optional exclusions, coordinate-only domain, seed, direction, policy and an outcome-independent public FE prior. Candidate `y` values are rejected. The replay controller owns its outcomes in private fields, reveals only the selected row, and constructs fresh input objects. The scorer has no data-module import and cannot access the controller's oracle. `compare` makes three independent controllers with the same seed, initial IDs, budget, geometry and model settings. A policy accesses only its own revealed observations. The UI enables comparison only after the participant's budget is finished.

Static deployment does not make public data cryptographically secret: source inspection can reveal all historical values. The guarantee is algorithmic isolation, covered by perturbation tests, not an anti-cheating security claim.

## GP

For each coordinate use `(x-min)/(max-min)` across the supplied known candidate/observation geometry; constant dimensions use span 1. The custom task freezes this domain on import, so feasibility exclusions do not change normalization. It contains coordinates, never targets. The isotropic Matérn 5/2 covariance is `(1+r+r²/3)exp(-r)`, `r=sqrt(5)||x-x'||/0.35`. Add `0.03²` to the training diagonal. Cholesky factorization yields the posterior mean and latent posterior variance, with a `1e-12` variance floor. Model SD excludes additional future measurement noise.

Public FE: center 50, output scale 100, matching the original protocol's center .5 on FE/100. Custom/synthetic: center = mean of this task's observed outcomes; scale = population SD. If SD is zero, use `max(1,abs(center)*0.1)` in target units. Refit after every new measured result. No likelihood optimization, pretrained weights, external model calls, kernel search, or hidden-value normalization.

For maximize, improvement = `mean-best`; for minimize, `best-mean`. EI = improvement × Φ(z) + SD × φ(z), z=improvement/SD. Φ uses the Abramowitz–Stegun approximation (approximately 7.5e-8 maximum absolute CDF error). GP mean uses the direction-aware posterior mean. Random policy takes the first remaining item in a seeded Fisher–Yates permutation (Mulberry32). GP ties follow the same outcome-independent permutation. This PRNG differs from the original NumPy generator; old reference metrics are neither copied nor claimed to reproduce bit-for-bit.

The UI shows up to three individually ranked choices, while the internal ranking covers all eligible candidates. It does not optimize a joint batch. Reasons are transparent heuristics about predicted performance or distance from observations; they are not generated scientific explanations.

## Limits

Two observations allow fitting but trigger a warning. Up to 200 training points and 1,000 candidates keep cubic fitting manageable on a laptop. Uncertainty is uncalibrated; the GP is unbounded, so FE predictions/SD can exceed 0–100. Fixed hyperparameters, sparse one-variable sweeps, biased publication, no raw replicates and unknown measurement noise limit usefulness. Feasibility beyond user exclusions and compatibility beyond declared context are not inferred. Never interpret a replay query as a physical experiment, a validated wet-lab suggestion, a success probability or a health recommendation.
