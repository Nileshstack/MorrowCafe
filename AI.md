# AI Use Reflection

## Tools used

- GitHub Copilot in VS Code for code assistance and documentation drafting.
- Next.js 14, React 18, TypeScript, and Tailwind CSS 3 for the application.
- `lucide-react` for the step icons.
- Lighthouse CLI 12.8.2 with Microsoft Edge for the local production audit.
- VS Code browser/Playwright tools for responsive, form, keyboard, and animation checks.
- npm and PowerShell for dependency installation, development, lint, build, and audit commands.

## What AI helped with

AI helped build and refine the café campaign page, responsive layout, phone claim form, mock Route Handler, success experience, accessibility details, and this project documentation. It also helped construct the Lighthouse run and browser checks; the reported scores were read from the generated Lighthouse JSON, not estimated.

## One useful thing it got right

Keeping the landing page server-rendered while isolating form submission, clipboard behavior, and scroll observation in small client components kept the interactive behavior local rather than turning the whole page into a client component.

## One thing AI got wrong that I fixed

An early browser test typed into the claim form before React hydration had completed. AI initially treated the resulting disabled-submit state as an application state bug. I waited for hydration and retested the values and validation before treating it as a code defect. I also discarded an initial Lighthouse run whose PowerShell argument parsing produced an empty category set, then reran Lighthouse with its default categories and recorded the actual report values.

## What I personally reviewed

- The API's validation, response codes, generated-code behavior, and lack of durable storage.
- Mobile/tablet/desktop layout, touch sizes, form retry behavior, and keyboard focus transitions.
- Contrast findings and reduced-motion behavior.
- Lighthouse JSON output, including its measured category scores, metrics, and remaining opportunities.
- README statements about omitted production concerns so the mock is not described as a production redemption system.