# Ruchit Radadiya — Shopify Frontend Developer & Web Designer Portfolio

A modern, high-converting, responsive personal portfolio website and ATS-compliant CV web page designed and built for **Ruchit Radadiya**.

---

## 🌟 What Has Been Built

1. **`index.html`** — The complete flagship portfolio website featuring:
   - **Hero Section**: High-converting introduction, live availability badge, direct CTAs, and a marquee covering 8 commercial sectors.
   - **Interactive Projects Showcase (11 Live Stores)**:
     - Real-time instant search (search by brand, tech, country, or category).
     - Filter tabs: *All Projects (11)*, *🇮🇳 India D2C (5)*, *🌍 International (6)*, *👗 Fashion & Jewellery*, *🏡 Home & Living*, and *✨ Specialty & Wellness*.
     - Detailed project cards with live store buttons (`amrutpushti.com`, `monorex.in`, `kraftkarat.com`, `sswai.co.in`, `thehouseofkundan.com`, `lumvia.ca`, `appointed.co`, `ka-pok.com`, `asociety.com`, `ava-may.de`, `cloudadventures.sk`).
     - Interactive **Case Study / Details Modal** with technical breakdowns.
   - **Shopify Skills & Technical Stack**: Dawn & Horizon theme customization, Liquid OS 2.0, Ajax Cart Drawers, Figma-to-Shopify pixel-perfect translation, and Core Web Vitals optimization.
   - **Shopify Liquid Architecture Playground**: Interactive code snippet viewer displaying modular Liquid schema, Ajax Cart Drawer fetch logic, and Made-to-Order conditional logic with 1-click copy.
   - **Full CV Timeline & Career History**: Tech Rabbit (Oct 2025 – Present) & Tsomo Spring Solutions (Apr 2024 – Oct 2025), Gujarat University BSc Microbiology, Tools & Languages.
   - **Interactive Contact & Hire Section**: One-click copy for email (`ruchitradadiya123@gmail.com`) and phone (`+91 74908 10349`), direct WhatsApp link, and pre-filled inquiry generator.
   - **Dark / Light Theme Toggle**: Persistent mode switcher saved in `localStorage`.

2. **`resume.html`** — Dedicated, clean, ATS-compliant & print-friendly CV:
   - Formatted for direct PDF download and browser printing (`Ctrl + P`).
   - Clean executive typography, full work experience, technical skills, and 11-store reference index.

3. **`assets/js/projects-data.js`** — Centralized data file containing complete structured metadata for all 11 live stores and profile information. Easily add a 12th or 13th project in the future by adding an entry to this array!

4. **`assets/js/app.js`** — Dynamic filtering, search, modal handling, code snippet switcher, clipboard copy, theme persistence, and scroll spy.

5. **`assets/css/style.css`** — Sleek glassmorphism effects, ambient glow, custom scrollbars, animations, and print stylesheets.

---

## 🚀 How to View Locally

### Option 1: Direct Browser Opening (No Server Needed)
Simply double-click **`index.html`** or right-click and choose **"Open with Chrome / Edge / Firefox"**. It will load immediately with zero installation required!

### Option 2: Run a Local Dev Server (Optional)
If you have Node.js installed, you can run:
```bash
npx serve .
# or
npx http-server
```
Then visit `http://localhost:3000` (or `http://localhost:8080`).

---

## 🌐 1-Click Free Deployment Options

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository (e.g., `ruchit-portfolio`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website is live worldwide at `https://<your-username>.github.io/ruchit-portfolio/`!

### Deploy to Vercel or Netlify
- Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
- No build command required (`dist` is not needed; it is pure static HTML/JS/CSS).

---

## 📁 Directory Structure

```
├── index.html                  # Main portfolio website
├── resume.html                 # Dedicated CV web page & PDF printer
├── assets/
│   ├── css/
│   │   └── style.css           # Custom styles, animations & theme variables
│   └── js/
│       ├── projects-data.js    # Data source for all 11 Shopify stores & CV
│       └── app.js              # Filtering, search, modal, and interactions
└── README.md                   # Documentation & guide
```

---

## 💼 Live Storefronts Included

| # | Brand | Region | Sector | Live Store URL |
|---|---|---|---|---|
| 1 | **Amrut Pushti** | India 🇮🇳 | Organic Superfoods · Wellness D2C | [amrutpushti.com](https://amrutpushti.com/) |
| 2 | **Monorex** | India 🇮🇳 | Metal Kitchenware (Copper, Brass, Bronze) | [monorex.in](https://monorex.in/) |
| 3 | **Kraft Karat** | India 🇮🇳 | Fashion & Bridal Jewellery | [kraftkarat.com](https://kraftkarat.com/) |
| 4 | **SSWAI** | India 🇮🇳 | Contemporary Women's Fashion & Living | [sswai.co.in](https://sswai.co.in/) |
| 5 | **The House of Kundan** | India 🇮🇳 | Kundan · Polki · Jadau Jewellery | [thehouseofkundan.com](https://thehouseofkundan.com/) |
| 6 | **Lumvia** | Canada 🇨🇦 | Ceramic Dinnerware & Home Decor | [lumvia.ca](https://lumvia.ca/) |
| 7 | **Appointed** | USA 🇺🇸 | Notebooks, Planners & Stationery | [appointed.co](https://appointed.co/) |
| 8 | **ka-pok** | Hong Kong 🇭🇰 | Multi-Brand Fashion Retail (340+ Labels) | [ka-pok.com](https://ka-pok.com/) |
| 9 | **A. Society** | Hong Kong 🇭🇰 | Eyewear Brand & Customizer | [asociety.com](https://asociety.com/) |
| 10 | **Ava & May** | Germany 🇩🇪 | Home Fragrance & Scented Candles | [ava-may.de](https://www.ava-may.de/) |
| 11 | **Cloud Adventures** | Slovakia 🇸🇰 | Scenic Flight Experience Booking | [cloudadventures.sk](https://www.cloudadventures.sk/) |

---

## 📬 How the Contact Form Works (100% Reliable Delivery)

The contact form is built with **multi-channel delivery** so messages are never lost regardless of what operating system or browser the visitor uses:

1. **Send via WhatsApp (Instant)**:
   - When a client enters their name, email, service, and requirements and clicks **"Send via WhatsApp"**, it immediately launches WhatsApp (Web or Mobile app) with their message pre-formatted to your number `+91 74908 10349`.
2. **Open in Gmail (Web)**:
   - Opens Gmail's compose window in a browser tab with `to=ruchitradadiya123@gmail.com`, subject line, and formatted body pre-filled. No desktop mail client required.
3. **Send Project Inquiry (Interactive Modal)**:
   - Validates the fields, automatically copies the proposal to the user's clipboard, and presents a confirmation modal with 1-click dispatch to WhatsApp, Gmail, or Default Mail.


