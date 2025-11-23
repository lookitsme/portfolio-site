This repository is a small monorepo for a personal portfolio site. The goal of this file is to give AI coding agents the immediate, actionable context needed to be productive here.

Key high-level architecture
- Monorepo with two top-level apps: `frontend` (Next.js + React) and `backend` (Sanity Studio). They are coupled for typesafety and fast iteration.
- Content flow: editors use the Sanity Studio (`backend`) to author content. The frontend (`frontend`) fetches content via `@sanity/client` and relies on generated TypeScript types to keep the stacks in sync.
- Heavy use of 3D and realtime rendering in the frontend via `three`, `@react-three/fiber`, and `@react-three/drei`. Many UI components are in `frontend/src/` (e.g. `ThreeCanvas.tsx`, `SceneDirector.tsx`, `ProjectEntry.tsx`).

Important files & locations (jump-to)
- Sanity schemas: `backend/schemas/*` (e.g. `post.ts`, `project.ts`, `author.ts`). When changing schema, run type generation.
- Sanity config: `backend/sanity.json`, `backend/sanity-codegen.config.ts`.
- Sanity scripts: `backend/package.json` (scripts: `dev`, `build`, `build:types`).
- Frontend entry: `frontend/pages/index.tsx`, `frontend/pages/[scene].tsx`, `_app.tsx`.
- Frontend source: `frontend/src/` contains 3D scenes, controllers and many custom hooks.
- Generated types used by the frontend: `frontend/generatedSanitySchemaTypes.ts` (output of `sanity-codegen`).

Developer workflows (exact commands)
- Use yarn (repo README and package.json use `yarn`). From two shells:
  - Backend (Sanity Studio):
    - cd backend; yarn dev    # start Sanity Studio for content editing
    - cd backend; yarn build  # build Sanity Studio for deploy
    - cd backend; yarn build:types  # run `sanity-codegen` to produce types for the frontend
  - Frontend (Next.js):
    - cd frontend; yarn dev   # run Next.js dev server
    - cd frontend; yarn build # production build (useful for catching deploy issues)

What to do when you change a Sanity schema
1. Edit or add files under `backend/schemas/`.
2. Run `cd backend && yarn build:types` to regenerate TypeScript types used by the frontend.
3. Commit the generated types (check `frontend/generatedSanitySchemaTypes.ts`) so the frontend stays type-locked to the schema.

Project-specific conventions & patterns
- Tailwind is used for styling (see `frontend/tailwind.config.js`). Prefer utility classes for layout.
- State: `zustand` is used for app-level state. Look for stores under `frontend/src`.
- 3D scene orchestration: `ThreeCanvas.tsx`, `SceneController.tsx`, `SceneDirector.tsx` coordinate scenes — modify these for any scene-level behavior.
- Small custom hooks and utilities are in `frontend/src/` (e.g. `useImgElement.ts`, `usePlayAllVideosOnClickInLowPowerMode.ts`). Follow existing naming and file placement conventions.

Integration notes & gotchas
- The backend `backup` script uses UNIX `date` formatting; it may not run on native Windows PowerShell without adjustments.
- The frontend relies on the codegen output; failing to regenerate types after schema changes is the most common source of runtime type errors.
- Many third-party libs (three, drei, react-spring, framer-motion) are used — prefer not to replace them without a good reason.

Quick tasks examples (concrete edits)
- Add a new field to a Sanity `project`:
  - Edit `backend/schemas/project.ts` -> run `cd backend && yarn build:types` -> update any frontend references using the new field (types will guide edits).
- Debug a 3D scene that doesn't render:
  - Inspect `frontend/src/ThreeCanvas.tsx` and `frontend/src/SceneDirector.tsx`, run `cd frontend && yarn dev`, open browser console for GLSL/three errors.

If anything here is incomplete or you want more specific patterns (tests, CI, deployment hooks), tell me which area and I will expand the instructions.

Generated/Updated by: AI assistant — please review for accuracy and add any missing commands you use locally.
