# NextExperiment — 3-minute demo script

Target duration: 180 seconds. Record the deployed public website, not localhost. Use only the built-in public replay and the labeled synthetic CSV sample. Suggested narration is approximately 375 words; allow time for clicks. Do not invent users or replace the evidence segment with a numerical claim until trials exist.

## 0:00–0:25 · The problem and promise

**Screen:** homepage, both entry buttons.

“Research students often have a few measurements and a long list of possible next experiments. NextExperiment helps them choose one next condition from a feasible candidate list—and understand what the model does and does not know. It runs in a browser, with no account, GPU, or API key.”

## 0:25–1:05 · Public historical replay

**Screen:** click Try a CO₂RR example; show starting results, recommendation, SD and source.

“Let's try a public carbon-dioxide electroreduction case. These values come from Li and colleagues' published figures. We keep the reported potential reference and experimental context together. Three conditions are initially known; our budget is six total conditions. A Gaussian process uses only revealed measurements to estimate the remaining candidates. Expected improvement balances predicted performance and uncertainty. This standard deviation is a model estimate, not a validated success probability.”

**Action:** reveal one recommendation; point out the changed curve and next recommendation.

“When I choose this condition, the application reveals its historical result. It has not performed a new experiment. The model refits, and the next recommendation changes.”

## 1:05–1:30 · Human choice and honest comparison

**Screen:** manually choose another candidate, finish the budget, run comparison.

“I can make my own choice instead. After the budget is complete, we compute random, GP-mean and GP-EI replays with exactly the same starting conditions and budget. These curves are calculated live. A small retrospective pool cannot establish general superiority or a percentage of experiments saved.”

## 1:30–2:15 · Import and iterate

**Screen:** Use your own data; Load simulated sample (or select both downloaded CSVs); show mapping, goal and source declaration; validate; exclude one row; add a synthetic result.

“For another task, I provide measured results and a candidate table. The app supports one to three numeric variables and a numeric target, with maximize or minimize. Unknown results stay blank, never zero. I confirm these are public or simulated data, map the columns, and exclude a condition I cannot run. Each task fits its own data. After I add a compatible public or simulated result, it recomputes the ranking.”

## 2:15–2:40 · Export and privacy

**Screen:** download recommendation CSV and decision report; briefly show report.

“The recommendation CSV and report preserve the source, known results, estimates, reasons, and limitations. Files are processed locally. Optional trial events contain only anonymous session activity; participants download and share them voluntarily. Session counts are not unique user counts.”

## 2:40–3:00 · Evidence and closing

**Screen:** show actual redacted participant ledger ONLY if trials have happened; otherwise show trial task sheet labeled ‘recruitment pending’.

“We evaluate the product with research students completing a replay, importing a sample, and explaining the uncertainty. [Insert only verified trial findings here, or say trials are pending.] NextExperiment turns existing evidence into a reviewable next decision, with the researcher in control.”

## Recording checklist

- Set browser zoom to 100%; use 1440×900 or similar desktop capture.
- Mark recording runs as development / QA if event collection is enabled. Never count the recording as an independent user trial.
- Hide unrelated browser tabs, personal files and account details.
- Use the actual deployed site. Verify downloads before recording.
- Keep the original potential-reference label visible in the public case.
- Add captions and preserve the simulated-data label.
- Record and submit the video yourself; this deliverable is the script, not a claimed completed recording.
