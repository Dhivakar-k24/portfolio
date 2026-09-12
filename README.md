# Dhivakar K — Personal Portfolio

A modern, responsive, dark-themed personal portfolio built with plain HTML5, CSS3, and JavaScript (no frameworks, no build step). Theme concept: **"Compiled Dark"** — a code-editor-inspired look, with a live syntax-highlighted profile card, mono "code comment" section labels, and teal → violet gradient accents.

## Folder Structure

```
portfolio/
├── index.html                 # All page content/sections
├── css/
│   └── style.css              # Design tokens, layout, responsive rules, animations
├── js/
│   └── script.js              # Theme toggle, typing effect, reveal animations,
│                               # project filter, contact form, nav/scroll behavior
├── assets/
│   ├── images/
│   │   ├── profile-placeholder.svg
│   │   ├── projects/           # Project preview images (SVG placeholders included)
│   │   └── certificates/       # Certificate preview images (SVG placeholders included)
│   └── resume/
│       └── (add) Dhivakar_K_Resume.pdf
└── README.md
```

## Before You Deploy — Replace Placeholders

1. **Profile photo** — replace `assets/images/profile-placeholder.svg` with a real photo (recommended: square, 480×480px+, `.jpg`/`.png`/`.webp`). Update the `src` in the `.avatar-img` tag in `index.html` if you change the filename/extension.
2. **Resume** — add your real PDF to `assets/resume/Dhivakar_K_Resume.pdf` (the download buttons already point to this exact path/filename).
3. **Project images** — swap the SVGs in `assets/images/projects/` for real screenshots of each project.
4. **Certificates** — swap the SVGs in `assets/images/certificates/` for scanned/exported certificate images. To add a **new** certificate later, duplicate one `.cert-card` block in the Certificates section of `index.html` and update its image, title, issuer, and links.
5. **Contact details** — update the email, phone number, LinkedIn, and GitHub links in the Hero and Contact sections of `index.html` (search for `dhiva2430@gmail.com`, `+91 00000 00000`, and the LinkedIn/GitHub URLs).
6. **Contact form backend (optional)** — the form currently opens the visitor's email client via a `mailto:` link (no backend required, works immediately). If you want it to submit silently in the background instead, connect it to a service like **Formspree**, **Web3Forms**, or **EmailJS** and replace the `submit` handler in `js/script.js` with a `fetch()` call to that service.

## Run Locally

No build tools needed. Either:

- Open `index.html` directly in a browser, **or**
- Serve it locally for accurate relative-path behavior:
  ```bash
  cd portfolio
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio` or `Dhivakar-k24.github.io` for a root-level personal site).
2. Push this folder's contents to the repository root:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/Dhivakar-k24/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. Wait 1–2 minutes — GitHub will publish the site at:
   - `https://Dhivakar-k24.github.io/portfolio/` (if repo is named `portfolio`), or
   - `https://Dhivakar-k24.github.io/` (if the repo is named exactly `Dhivakar-k24.github.io`)
7. Every time you `git push` updates to `main`, GitHub Pages redeploys automatically within a minute or two.

## Features Implemented

- Sticky, blur-backdrop navigation bar with active-section highlighting
- Mobile hamburger menu with slide-down navigation
- Dark/light theme toggle (persisted via `localStorage`)
- Typing animation cycling through role titles in the hero
- Scroll-reveal animations (IntersectionObserver-based, no layout jank)
- Animated counters and animated skill proficiency bars
- Project filter (All / Machine Learning / Web Development)
- Certificate cards with View/Download actions, easy to extend
- Accessible, validated contact form with inline status messaging
- Scroll progress bar, back-to-top button, smooth scrolling throughout
- Fully responsive: desktop → tablet → mobile (down to ~360px width)
- Respects `prefers-reduced-motion` for accessibility
