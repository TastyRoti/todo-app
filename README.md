# TODO App

Todo web application for junior full-stack developer test task for Automaze done by Yehor Markin

**Live demo:** https://todo-app-psi-eight-14.vercel.app

**Backend API:** https://todo-backend-6jsa.onrender.com/docs

Make sure that backend api is running in the first place, then visit live demo url, because it may shutdown after it's been inactive for some time due to Render's free subscription plan.
## Features

- Display, add, and remove tasks
- Search tasks by title
- Mark tasks as done
- Filter by status (all / done / undone)
- Assign priority (1–10) and sort ascending/descending
- Bonus: due dates and categories (with full CRUD on categories)

## Tech Stack

**Backend:** Python, FastAPI, SQLAlchemy, SQLite, Pytest 

**Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui 

**Testing:** Pytest (backend regression tests), Playwright (E2E tests)

**CI/CD:** GitHub Actions (tests run on every PR, merges blocked on failure), auto-deploy via Render (backend) and Vercel (frontend)


## AI Workflow

For this task I used Claude free version only. Since my background is mostly in Spring Boot and Laravel, new tools like FastAPI, Next.js, and Playwright were relatively new for me. I used it as a personal mentor. Claude helped me to understand  new stack by drawing direct parallels to what I already knew when I was working with Spring/Laravel. Fro example it explained FastAPI’s Depends() through Spring’s Dependency Injection. In this way, we built backend models, set up a proper GitHub Actions CI/CD workflow.
In the end, every line of code in this repository was reviewed and manually tested. Sometimes I stopped and doubleasked questions about some topics which i did not understand from the 1st time. So basically I used AI as a teacher.
