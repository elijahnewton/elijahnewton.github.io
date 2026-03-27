# EliteTech Solutions – Uganda's Top IT Partner

A static marketing and business website for **EliteTech Solutions**, showcasing IT services, completed projects, company information, and contact details. Built with plain HTML, CSS, and JavaScript – no build step required.

---

## Features

- **Responsive design** powered by [Tailwind CSS](https://tailwindcss.com/) (loaded via CDN)
- **Animated sidebar navigation** with smooth open/close transitions
- **Icon set** via [Lucide Icons](https://lucide.dev/) (loaded via CDN)
- **Multi-page layout** with dedicated pages for each section of the business
- Custom CSS animations and hover effects in `styles.css`
- Lightweight JavaScript interactions in `script.js`

---

## Pages

| File             | Description                                      |
|------------------|--------------------------------------------------|
| `index.html`     | Home page – hero section, highlights, and CTA    |
| `services.html`  | IT services offered by EliteTech Solutions       |
| `projects.html`  | Portfolio of completed projects                  |
| `about-us.html`  | Company background, mission, and team            |
| `contact-us.html`| Contact form and business contact details        |

---

## Project Structure

```
elijahnewton.github.io/
├── index.html        # Home page
├── services.html     # Services page
├── projects.html     # Projects / portfolio page
├── about-us.html     # About Us page
├── contact-us.html   # Contact Us page
├── styles.css        # Custom styles and animations
└── script.js         # Navigation toggle and UI interactions
```

---

## Running Locally

Because the site uses browser APIs and links between pages, open it through a local web server rather than directly from the filesystem.

**Using Python (recommended – no dependencies):**

```bash
# Python 3
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

**Using Node.js (`npx serve`):**

```bash
npx serve .
```

**Using the VS Code Live Server extension:**

Right-click `index.html` → *Open with Live Server*.

---

## Deployment (GitHub Pages)

This repository is already configured to serve as a GitHub Pages site at  
`https://elijahnewton.github.io`.

To deploy your own fork:

1. Fork or push the repository to your GitHub account.
2. Go to **Settings → Pages** in the repository.
3. Under **Source**, select the `main` (or `master`) branch and the root folder (`/`).
4. Click **Save**. GitHub will publish the site and display the URL.

Any subsequent push to the selected branch will automatically redeploy the site.

---

## Customization

### Editing content
- Open the relevant HTML file (e.g., `services.html`) in any text editor.
- Update text, headings, or card content directly in the HTML.

### Updating styles
- Global colors, fonts, and layout tweaks belong in `styles.css`.
- Tailwind utility classes can be added or swapped inline in the HTML; refer to the [Tailwind docs](https://tailwindcss.com/docs) for available classes.

### Replacing icons
- Icons are rendered by Lucide. Swap `data-lucide="<icon-name>"` attributes to any name listed in the [Lucide icon library](https://lucide.dev/icons/).

### Social / external links
- Placeholder `href="#"` links in the footer of `index.html` should be replaced with real social-media profile URLs.

---

## Contact

For enquiries about this project or EliteTech Solutions:

- **Email:** [musiitwaelijah@gmail.com](mailto:musiitwaelijah@gmail.com)
- **GitHub:** [elijahnewton](https://github.com/elijahnewton)
