# Agent Instructions

Welcome, Agent! When working on this codebase, please observe the following guidelines and instructions.

## Running Tests

This project uses Vitest and React Testing Library.
To run the unit test suite, use the following command:

```bash
npm run test
```

Please ensure that all tests pass after making changes.

## Linting and Formatting

This project enforces code quality and formatting rules. Before finalizing your changes, you should run the linter and formatter:

- **Linter (ESLint):**

  ```bash
  npm run lint
  ```

- **Code Formatter (Prettier):**
  This project uses Prettier for code formatting (see `prettier` in `package.json`). You can check whether files are formatted with:
  ```bash
  npm run format:check
  ```
  To format files locally, run:
  ```bash
  npm run format
  ```
  Prettier is also run on staged files via `lint-staged`/Husky (pre-commit), so changes will be auto-formatted on commit if staged.

## Visualizing the Webpage

When you make changes to the frontend that affect the UI, you should visualize the webpage to ensure it looks correct on both computer (desktop) and phone (mobile) screens.

To do this, use the `frontend_verification_instructions` tool to get detailed instructions on how to write a Playwright script. You can configure Playwright to take screenshots of your changes in different viewport sizes, such as:

- **Desktop (Computer Screen):** Typical viewport size (e.g., 1280x720 or 1920x1080)
- **Mobile (Phone Screen):** Typical mobile viewport size (e.g., 375x667 or 414x896)

By generating these screenshots, you can visually verify that your frontend changes are responsive and render correctly across devices.
