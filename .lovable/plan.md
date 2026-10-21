# LearnWise AI prototype

Build the uploaded brief as a frontend-only, responsive student learning demo with realistic shared sample data and no backend or claims of real AI.

## Experience
- Replace the placeholder at `/` with a complete dashboard and a collapsible desktop sidebar plus a usable mobile menu.
- Add routed pages for My Learning, topic details, Study Plan, Practice Quiz, Progress & Insights, and About the Project.
- Provide consistent demo metrics, performance charts, topic cards, clear sample-data labels, and navigation between related actions.
- Make the study plan locally interactive: generate rule-based priorities from lower scores and persist completed tasks safely in local storage.
- Make the multiple-choice quiz functional: one question at a time, previous/next, scoring, explanations, topic results, retry, and locally saved latest result.
- Explain the proposed research direction, roadmap, and prototype limitations without implying model integration.

## Design and implementation
- Use the existing TanStack Start, Tailwind v4, shadcn-style tokens, Lucide icons, and installed Recharts; add no dependency or backend.
- Define the visual system in `src/styles.css` and use reusable navigation, data, and page elements.
- Give each content route distinct title, description, Open Graph, and Twitter card metadata.
- Update the README with run instructions and a clear explanation of mock data and local demo persistence.

## Validation
- Run the existing route test and add focused tests for the quiz scoring and score-based study-plan priority rules.
- Verify build logs and use the running preview to check the dashboard and key interactive flows.
