# Real-user trial kit

No participants have been recruited or contacted by the implementation agent. No testimonials, completion counts or savings are fabricated. Recruitment and independent-person confirmation belong to the organizer.

## Invitation text (organizer sends; not sent automatically)

> I am testing NextExperiment, a free browser tool that helps research students choose a next experiment from a finite candidate list. Could you try a 7–10 minute task with public or simulated data and give candid feedback? No registration or API key is needed. Please do not use private lab or patient data. Optional event records stay on your device and can be downloaded and voluntarily shared with me; they contain no experiment tables. You can participate without enabling records. Website: https://next-experiment-co2rr.zq20021102mia.chatgpt.site

## Target participants

Research students or early-career researchers who plan or interpret small experiments. Confirm this role and that each invitee is a distinct person through your existing relationship or a brief organizer check. Do not publish names, emails or private conversations. Use opaque IDs (P01, P02…) and keep any private contact mapping outside the public repository.

## Tasks (do not coach unless stuck)

1. Open the website. In your own words, what will it help you do?
2. Optional: allow local trial records after reading the notice. Development and recording sessions must check the QA box; genuine participants leave it unchecked.
3. Start the CO₂RR example. Identify the current best result, next recommended condition and model SD.
4. Explain whether the recommended value is already measured and whether SD is a success probability.
5. Reveal a historical result. Make one manual candidate choice, finish the budget, then run the paired comparison. Explain what is and is not concluded.
6. Download both example CSVs. Switch to your own data, upload both, map the two variables and target, select simulated origin, describe the units, and validate.
7. Exclude one candidate. Add a synthetic value for another available candidate and verify the curve updates.
8. Download the recommendations and decision report. Open them and check that the selected condition matches the page.
9. Use Feedback to download your responses. If willing, share the feedback and optional trial-record JSON with the organizer through an existing agreed channel.

Do not require personal information or the participant's uploaded dataset as evidence. Observer notes or a consented screenshot of the synthetic task can supplement an event record.

## Questions

- Was the next action clear? Where did you hesitate?
- What did you think model SD meant before and after reading the explanation?
- Did you notice that these were historical measurements, not new experiments?
- Could you tell which dataset was public and which was simulated?
- Did exclusions and the new result change the recommendation as expected?
- Would this be useful in your work? What would prevent you from relying on it?
- What is the single most useful improvement?

Record actual quotes only with permission; otherwise paraphrase and label them as observer notes. Do not infer time saved from task duration. An optional stopwatch records observed completion time, not savings versus a baseline.

## Counting and evidence

Use `participant-ledger.csv` and `feedback-template.csv` (headers only). Do not prefill ten successful rows.

- **Page visits:** opt-in page-view events, not all website traffic.
- **Sessions:** random session IDs; a reload/new page can produce another session.
- **Confirmed independent users:** distinct, organizer-confirmed eligible people with evidence of actual use. Count each once even across multiple sessions/devices.
- **Exclude:** developer/agent QA, demonstrations, bots, staff simulations, duplicate people, sessions without confirmed actual use.
- Consent to local recording does not automatically consent to publishing screenshots or quotes. Ask separately and record permission.
- Import volunteered records into the local summarizer. It deduplicates event IDs and excludes QA flags, but cannot prove independent humans. Compare against the participant ledger.
- Store volunteered records outside this public repository. Publish only a redacted summary with real counts, dates, tasks, method of confirmation, and limitations.

## Suggested recruitment schedule

By Nov 11: first 3–4 trials and urgent usability fixes. By Nov 13: at least 10 confirmed independent target users, deduplicated evidence and honest feedback summary. Nov 14 morning: freeze deployed build, record/verify 3-minute video and submission links. Submission deadline supplied by the organizer: Nov 14, 2026 at 12:00 noon America/Los_Angeles (PST). Confirm actual competition rules and Health & Bio eligibility directly with organizers; do not imply a clinical application.
