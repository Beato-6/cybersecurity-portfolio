# Cybersecurity & Penetration Testing Portfolio

Portfolio site for **Beatrice Mwende** — aspiring penetration tester and BSc Computer Security and Forensics
student at Meru University of Science and Technology.

Plain **HTML5, CSS3 and vanilla JavaScript**. No framework, no build step, no dependencies. Everything is
static, so it runs from a file server and deploys to GitHub Pages unchanged.

---

## Files

```
.
├── index.html      Page structure and all fixed copy (hero, about, skills, section headings)
├── style.css       Design tokens plus every component style
├── content.js      ← edit this to add projects, writeups, certificates, reports, links
├── script.js       Renders the collections and wires the interactions
├── README.md
└── assets/
    ├── favicon.svg
    ├── cv-placeholder.pdf    Sample CV — replace with your own PDF
    ├── fonts/                Self-hosted Inter and JetBrains Mono (latin subsets)
    └── images/               Hero artwork and the project diagrams used on the cards
```

Certificates are not committed yet. Create `assets/certificates/` when you have a file to add.

Fonts are self-hosted as `@font-face` declarations at the top of `style.css`. There is no Google Fonts
request, so the page loads no third-party resources at all and renders identically offline.

`content.js` loads before `script.js`, both with `defer`, at the end of `<body>`. Keep that order.

---

## Run locally

From the repository root:

```bash
python3 -m http.server 8000
```

Open **http://localhost:8000**. Serve the folder rather than double-clicking `index.html`, so relative
paths behave the same as production.

---

## Projects

Append an object to `SITE_CONTENT.projects` in `content.js`:

```js
{
  title: 'Internal Network Penetration Test',
  description: 'Two or three sentences describing what the work is and what it found.',
  contribution: 'What you personally did. This is the first field shown under the title.',
  technologies: ['Nmap', 'Burp Suite', 'BloodHound'],
  status: 'lab',              // 'in-progress' | 'documentation' | 'lab' | 'complete'
  featured: false,            // true sorts it to the top of the grid
  repositoryUrl: 'https://github.com/Beato-6/repo-name',  // omit unless the repo is public
  // demoUrl: 'https://…',    // omit unless it actually runs
  // detailId: 'idor',        // reuse a localReports id to attach a report button
  // image: 'assets/images/project-network.svg',
}
```

Rules that keep the page honest:

- Omit `repositoryUrl` when there is no public repository. The card then shows a plain
  "Repository not published yet" line instead of a dead button.
- `technologies` is a plain list of names you have actually used.
- The grid is two columns. If the total is odd, the last card runs full width and lays out as a
  horizontal card: diagram on the left, write-up on the right.

---

## Writeups (Medium articles)

Append to `SITE_CONTENT.writeups`:

```js
{
  title: 'IDOR on a Patient Records API',
  platform: 'PortSwigger Web Security Academy',
  summary: 'Access-control testing that confirmed a horizontal privilege escalation, and the server-side check that closes it.',
  techniques: ['Access control', 'Burp Suite Repeater', 'IDOR'],
  difficulty: 'Medium',          // optional
  publishedAt: '2026-03-14',     // optional, YYYY-MM-DD
  articleUrl: 'https://medium.com/@B3A70/article-slug',
}
```

Only entries with a real `articleUrl` render. While the array is empty the page shows
"No published writeups added yet." and the fixed **View All Writeups on Medium** button. That empty
state is intentional — do not add placeholder URLs to fill it.

The Medium and GitHub buttons in the section headings read their URLs from `mediumProfileUrl` and
`githubProfileUrl` at the bottom of `content.js`, so a profile change is a one-line edit.

Supporting platforms are free text in `platform`, so HTB, TryHackMe, PortSwigger, Active Directory labs
and personal labs all work the same way.

---

## Certificates

1. Put the PDF or image in `assets/certificates/`.
2. Add an entry to `SITE_CONTENT.certificates`:

```js
{
  title: 'Ethical Hacking',
  issuer: 'Cisco Networking Academy',            // only once confirmed
  earnedAt: '2025-06',                           // YYYY-MM or YYYY-MM-DD
  fileUrl: 'assets/certificates/ethical-hacking.pdf',
  verificationUrl: 'https://www.credly.com/badges/…',   // optional
}
```

Cards are numbered in the order they appear. Anything you leave out is shown as a plain state
("Issuer and date not yet provided", "Certificate not uploaded"). Nothing is invented, and no button
appears until `fileUrl` or `verificationUrl` exists.

---

## Local lab reports

The three sanitised reports and the phishing-detector breakdown live in `SITE_CONTENT.localReports`.
Each record has `id`, `title`, `area`, `summary` and `body`. `body` accepts HTML (`h4`, `p`, `ul`, `pre`,
`code`) and is sanitized before rendering — scripts, iframes, inline event handlers and `javascript:`
URLs are stripped.

To attach a report to a project, set that project's `detailId` to the report's `id`. A report that
appears only under "Local Lab Reports" needs no `detailId`.

---

## Resume / CV

1. Save your CV as a PDF in `assets/` (for example `assets/Beatrice-Mwende-CV.pdf`).
2. Update `SITE_CONTENT.resume`:

```js
resume: {
  fileUrl: 'assets/Beatrice-Mwende-CV.pdf',
  isPlaceholder: false,
  updatedAt: '2026-02-14',
},
```

`isPlaceholder: true` keeps a visible note that the current file is still the sample document. Set
`fileUrl: null` if no file exists at all — every CV button then renders disabled with a "CV not yet
available" note instead of a broken link.

---

## Project diagrams

Each card opens with a diagram at a fixed 16:9 ratio, so a missing file never shifts the layout:

```js
image: 'assets/images/project-network.svg',
```

The five bundled diagrams are hand-written SVG at a 600 × 340 viewBox: a classifier confidence readout,
a policy document, a proxy request/response pair, a subnet radar, and a hex plus chain-of-custody pair.
They use the same navy and blue values as `style.css`, so a new diagram should stay inside that palette.
Replace one, or point `image` at a screenshot instead.

---

## Deploy

GitHub Pages, branch `main`, folder `/ (root)`:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Published at `https://<user>.github.io/<repo>/`. All paths are relative, so subdirectory hosting works
without configuration.

---

## Constraints worth keeping

- **No upload interface.** A public static site cannot authenticate one. Content changes are made in
  `content.js` and deployed. This is deliberate.
- **No fabricated data.** Every claim comes from `content.js`; missing information is shown as missing.
- **No third-party requests.** Fonts are served from `assets/fonts/`; there are no trackers, CDNs or
  external scripts.
- **Accessibility.** Skip link, visible `:focus-visible` rings, `aria-current` on the active nav link,
  a native `<dialog>` that restores focus on close, and `prefers-reduced-motion` support.
- **Link hygiene.** Every outbound link uses `target="_blank" rel="noopener noreferrer"`, and links are
  omitted from the DOM when no URL is configured.
