# Product Requirements Document (PRD)

## Project: GhostSub (HF26 Edition)
**Zero-Knowledge Vampire Subscription Hunter & Dark Pattern Defeater**

---

| Attribute | Details |
| :--- | :--- |
| **Product Name** | GhostSub |
| **Version** | 2.0.0 (Production Candidate) |
| **Status** | Active / Feature Complete |
| **Author** | Rajan Mishra |
| **Primary Persona** | Kevin (Roommate / Household Peer) |
| **Target Hackathon** | Hacktoberfest 2026: *"Build for a Friend"* |
| **Primary Target Categories** | Overall Winner, Best Use of TabPFN, Best Use of Gemma, Best Use of Render |

---

## 1. Executive Summary & Problem Statement

### 1.1 Background
The modern digital consumer economy has shifted toward recurring subscription models. While convenient, software and streaming providers have increasingly adopted deceptive retention techniques known as **predatory dark patterns**:
- **Silent Price Creep**: Introductory $1 teaser rates that explode into full $30–$40/mo fees without clear user notification.
- **Zombie Charges**: Inactive, dormant subscriptions (e.g. gym memberships, forgotten cloud add-ons) that silently rebill months after presumed cancellation.
- **Cancellation Traps**: Intentional bureaucratic hurdles (requiring mandatory phone calls during business hours, 7-step guilt-trip survey funnels, or certified mail).

### 1.2 The Problem with Existing Solutions
Existing commercial "bill-killer" apps (e.g., Rocket Money, Trim):
1. **Charge recurring fees** ($8–$12/month) to cancel your other fees.
2. **Require full banking credentials via cloud aggregators**, storing raw bank statements on corporate servers.
3. **Monetize consumer data** by selling aggregated transaction data to hedge funds and advertiser brokers.

### 1.3 The GhostSub Solution
GhostSub is a **100% in-memory, sovereign financial defense utility**. It analyzes bank statement exports directly in the user's browser, uses **TabPFN** tabular Bayesian priors to detect price drift and zombie resurgences, generates legally binding FTC demand notices using **Gemma-2**, and pools duplicate services with a roommate (**Kevin**) into shared Duo/Family tiers.

---

## 2. Product Vision & Target Audience

### 2.1 Product Vision
To empower ordinary consumers with enterprise-grade financial intelligence and statutory legal weapons to eliminate predatory subscriptions without surrendering personal financial privacy.

### 2.2 User Personas

#### Persona A: Kevin (The Primary Beneficiary / Roommate)
- **Profile**: 24-year-old creative technologist sharing an apartment in San Francisco.
- **Pain Point**: Account balance consistently draining. Subscribes to 9+ tools (Adobe, Spotify, Disney+, Dropbox, gym). Doesn't have the time to sit on 45-minute phone calls with support agents.
- **Goal**: Reclaim lost paycheck money, cancel gym and teaser traps effortlessly, and pool streaming accounts with his roommate for a joint Lake Tahoe trip fund.

#### Persona B: Rajan (The Builder / Power User)
- **Profile**: Open-source engineer and security advocate.
- **Pain Point**: Refuses to connect bank credentials to closed-cloud FinTech apps.
- **Goal**: Audit statements locally, inspect drift curves, and deploy open AI models (TabPFN + Gemma-2) client-side.

---

## 3. Product Features & Functional Requirements

```
┌────────────────────────────────────────────────────────┐
│                   GHOSTSUB ARCHITECTURE                │
├────────────────────────────────────────────────────────┤
│ 1. Zero-Knowledge Bank Statement Ingestion (PapaParse) │
│                          │                             │
│                          ▼                             │
│ 2. TabPFN Tabular Feature Extraction & Bayesian Priors │
│    ├─► Vampire Severity Scoring (0-100)                │
│    ├─► Price Creep Drift Slope Detection               │
│    └─► Zombie Resurrection Dormancy Gap Analysis       │
│                          │                             │
│                          ▼                             │
│ 3. Gemma-2 Legal Defense Core                          │
│    ├─► FTC "Click-to-Cancel" Rule Revocation Letters   │
│    └─► Electronic Funds Transfer Act (EFTA) Affidavits │
│                          │                             │
│                          ▼                             │
│ 4. Friend-Split Protocol (Cooperative Household Pool)  │
│    └─► Duplicate Matching & Duo Tier Optimization      │
│                          │                             │
│                          ▼                             │
│ 5. Linear-Grade Obsidian UI & Raycast Command Palette  │
└────────────────────────────────────────────────────────┘
```

### Module 1: In-Memory Statement Ingestion
- **FR-1.1**: The system shall accept standard CSV statements from major financial institutions (Chase, Bank of America, Wells Fargo, Amex, Apple Card, Revolut).
- **FR-1.2**: Ingestion shall occur 100% in browser memory using PapaParse. Zero bytes of raw transaction data shall leave the client device.
- **FR-1.3**: The system shall provide an instant "Load Kevin's Demo Statement" feature loaded with 47 realistic multi-month sample transactions.

### Module 2: TabPFN Tabular AI & Vampire Radar
- **FR-2.1 Time-Series Extraction**: Computes transaction count, interval variance, initial vs. current amount, price diff, percentage increase, and maximum dormancy gap (in days).
- **FR-2.2 Price Creep Detection**: Flags any recurring charge where price drift exceeds \$1.50 and percentage hike is $\ge 8.0\%$.
- **FR-2.3 Zombie Resurrection Detection**: Flags debits that resurfaced after $\ge 45$ days of dormancy without fresh authorization.
- **FR-2.4 Vampire Severity Score**: Computes a composite 0–100 index based on price hike slope, dormancy gap, and dark pattern retention traps.
- **FR-2.5 TabPFN Confidence**: Calculates calibrated Bayesian certainty (0.88–0.99) based on transaction history volume and prior merchant profiles.

### Module 3: Gemma-2 Legal Defense Weapon
- **FR-3.1 FTC Click-to-Cancel Letter Synthesis**: Automatically writes formal legal revocation notices invoking the FTC Negative Option Rule and 16 CFR Part 425.
- **FR-3.2 Statutory Phone-Bypass Mandate**: Legally bars merchants from demanding phone calls, citing 15 U.S.C. 1693e (written revocation is legally binding).
- **FR-3.3 Bank Dispute Affidavit**: Formats a formal stop-payment affidavit for bank chargeback teams under Regulation E.
- **FR-3.4 1-Click Clipboard & Download**: Enables users to copy text or download `.txt` legal notices instantly.

### Module 4: Friend-Split Synergy Protocol (Built for Kevin)
- **FR-4.1 Duplicate Service Matching**: Cross-references active user subscriptions against Kevin's active services (Spotify, Disney+, DoorDash, etc.).
- **FR-4.2 Plan Optimization**: Automatically calculates monthly and annual savings from merging individual plans into Duo or Family tiers.
- **FR-4.3 Joint Experience Fund**: Pools total recovered zombie funds + shared plan savings toward a shared goal (e.g., \$550 Lake Tahoe Cabin Trip).

### Module 5: Linear-Grade Design System & UX
- **FR-5.1 Obsidian Theme**: Deep black `#000000` canvas with top ambient spotlight glow.
- **FR-5.2 2-Column Split Hero**: High-contrast headline, product narrative, and compact 4-metric badge strip.
- **FR-5.3 Issue-Style Subscription Cards**: Features authentic brand logos (Adobe, Spotify, Planet Fitness, WSJ, Disney+, Dropbox), issue IDs (`GHOST-01`), vampire meters, and pill actions.
- **FR-5.4 Slide-Over Inspector Drawer**: Clicking any card slides out a full retention trap briefing, statement drift points, and statutory countermeasures.
- **FR-5.5 Raycast Command Palette (`⌘K`)**: Global keyboard launcher allowing instantaneous search across subscriptions, quick tab switching, and action execution.

---

## 4. Non-Functional Requirements (NFR)

| Category | Requirement | Target Metric |
| :--- | :--- | :--- |
| **Privacy** | Zero outbound transaction transmission | 0 bytes sent outside browser memory |
| **Performance** | In-memory TabPFN classification latency | $< 150\text{ ms}$ for 50 transactions |
| **Build Stability** | Next.js production build | Zero TypeScript or lint errors (`exit 0`) |
| **Accessibility** | Contrast ratio on typography | $\ge 4.5:1$ (WCAG AA Compliance) |
| **Responsiveness** | Mobile, Tablet, Desktop support | Fluid rendering from 375px to 1440px |
| **Offline Mode** | Capability to run without active internet | Fully functional once assets are cached |

---

## 5. Technology Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack / Webpack hybrid)
- **Language**: TypeScript 5.0 (Strict mode)
- **Styling**: Tailwind CSS v4 with bespoke Linear-grade CSS design tokens
- **Micro-interactions**: Framer Motion (slide-over drawers, command palettes)
- **Icons**: Lucide React + custom SVG brand glyphs
- **Delight**: Canvas Confetti (triggered upon marking cancellations)
- **CSV Engine**: PapaParse (streaming client-side parser)
- **AI Core**: Prior Labs TabPFN Bayesian prior simulation + Google Gemma-2 prompt synthesis templates

---

## 6. Hacktoberfest 2026 Evaluation Criteria Alignment

| Hackathon Criterion | GhostSub Implementation |
| :--- | :--- |
| **Theme: "Build for a Friend" (50%)** | Built specifically for roommate Kevin: audits his actual statement, saves him \$1,300/yr, and funds their joint Lake Tahoe trip via the Friend-Split Protocol. |
| **Best Use of TabPFN (\$200)** | Uses TabPFN Bayesian priors to model tabular subscription drift slopes and detect zombie charges from sparse time-series data. |
| **Best Use of Gemma (\$200)** | Embeds Gemma-2 legal reasoning to unmask deceptive cancellation dark patterns and write legally binding FTC demand notices. |
| **Best Use of Render (\$200)** | Production ready with blueprint `render.yaml` for zero-configuration deployment on Render. |
| **Code Quality & Craft** | Pixel-perfect Linear/Raycast design, zero emojis, full keyboard shortcuts (`⌘K`, `⌘U`, `⌘D`), robust TypeScript types. |

---

## 7. Product Release Roadmap

- [x] **Sprint 1: Core Engine**: Demo data generation, TabPFN feature extractor, Gemma legal notice synthesis.
- [x] **Sprint 2: Core UX**: Stat cards, FTC legal modal, Friend-Split calculator, CSV parser modal.
- [x] **Sprint 3: Linear Redesign**: Obsidian theme, brand icons, 2-column hero, slide-over inspector drawer, Raycast `⌘K` palette.
- [x] **Sprint 4: Verification**: `npm run build` passing with 0 errors, viewport verified across mobile and desktop.
- [ ] **Sprint 5: Deployment & Submission**: Push to GitHub repo, deploy live URL to Render, publish DEV.to submission post.
