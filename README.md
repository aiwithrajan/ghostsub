# 👻 GhostSub — Zero-Knowledge Vampire Subscription Hunter & Dark Pattern Defeater

> **A Hacktoberfest 2026 Weekend Challenge Entry: "Build for a Friend"**  
> *Built for Kevin (my roommate) to liberate $894/year in stealth subscription price creeps and zombie charges with 100% financial privacy.*

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/aiwithrajan/ghostsub)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2026-rose.svg)](https://hacktoberfest.com)

---

## 🌟 The Problem: Why I Built This For My Friend Kevin

Last Tuesday, my friend and roommate Kevin was venting over dinner. Despite budgeting diligently, he had nearly **$180 disappearing from his bank account every month** in charges he couldn't trace. 

When we looked at his raw banking statements, it was an absolute nightmare:
1. **Cryptic Merchant Encodings:** Cryptic descriptors like `DRI*AVAST`, `AMZN-DGTL-28941`, and `WSJ*DIGITAL` disguised what he was actually paying for.
2. **Stealth Price Creeps:** Adobe Creative Cloud had quietly crept from **$52.99 to $65.99/mo** without an obvious notification. An introductory $1 WSJ digital trial had exploded to **$38.99/mo**.
3. **Zombie Charges:** A Planet Fitness gym membership he cancelled 4 months ago had silently resurrected and billed him $24.99 again.
4. **Subscription Duplication:** We realized we were **both** paying for individual Spotify ($11.99) and individual Disney+ ($13.99) accounts in the exact same apartment!

When I told Kevin to use a commercial subscription tracking app, he refused: *"No way I'm giving a closed cloud company my bank credentials so they can sell my transaction history to ad brokers."*

He was right. **So I built GhostSub for him.**

---

## 🚀 What GhostSub Does

1. **🧛 Vampire Radar (TabPFN Anomaly Detection):**  
   Uses **Prior Labs' TabPFN** (Tabular Foundation Model) to extract recurrence intervals, variance, and linear dollar drift slopes. Spots:
   - **Stealth Price Creeps:** Flags accounts with upward price slopes.
   - **Zombie Resurrections:** Flags charges appearing after 60+ days of dormancy without fresh authorization.
   - **Vampire Score:** Quantifies the financial severity of each recurring drain.

2. **🛡️ FTC Click-to-Cancel Legal Armor (Gemma-2 Core):**  
   When companies use dark patterns (requiring phone calls during California office hours, in-person gym visits, or 5-screen guilt trip surveys), **Gemma-2** unmasks the deceptive tactic and generates a **formally signed Notice of Revocation of Preauthorized Debit** citing:
   - The **FTC Negative Option Rule ("Click-to-Cancel", 16 CFR Part 425)**
   - The **Electronic Fund Transfer Act (EFTA, 15 U.S.C. § 1693e / 12 CFR § 1005.10(c))**
   - **California Automatic Renewal Law (Cal. Bus. & Prof. Code § 17602)**
   - 1-click export to send to the merchant or your bank's dispute department to force an immediate stop-payment.

3. **🤝 Friend-Split Protocol ("Build for a Friend"):**  
   Compares your detected subscriptions with a friend's active subscriptions (e.g. Kevin) to uncover immediate family/duo tier merge savings:
   - Merges two individual Spotify + Disney+ accounts into Duo/Family plans, saving **$180/year**.
   - Directly funds a **Joint Friend Experience** (*"Weekend Cabin Trip to Lake Tahoe with Kevin"*).

4. **🔒 100% Sovereign / Zero-Knowledge Privacy:**  
   Processed entirely **in-memory** in your browser. Zero transaction logs, banking credentials, or personal names are ever transmitted to or stored on third-party corporate cloud servers.

---

## 🏗️ Architecture

```
[User Bank Statement CSV / Demo Dataset]
                    │
                    ▼ (In-Memory Parsing via PapaParse)
     [Sanitized Time-Series Financial Vectors]
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
[TabPFN Tabular Prior Engine]   [Gemma-2 Legal Knowledge Core]
  • Recurrence Interval Var       • Deceptive Dark Pattern Analysis
  • Linear Price Slope Drift      • Statutory Counter-Measures
  • Dormancy Gap Detection        • FTC Click-to-Cancel Notice Gen
       │                         │
       └────────────┬────────────┘
                    ▼
     [Interactive GhostSub Dashboard]
        • Vampire Drain & Zombie Alerts
        • 1-Click Formally Signed Legal Letters
        • Friend-Split Collaborative Savings Tracker
```

---

## ⚡ Quickstart

### Prerequisites
- Node.js 18+ (tested on Node v20 & v23)
- npm or yarn

### 1. Clone & Run Locally
```bash
git clone https://github.com/your-username/hacktoberfest-ghostsub.git
cd hacktoberfest-ghostsub/ghostsub

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Test in 1 Click
Click **"Load Kevin's Demo"** in the top navigation bar to instantly load the realistic 6-month transaction dataset with preloaded price creeps, zombie charges, and friend synergy.

---

## 🏆 Hacktoberfest 2026 Prize Categories Targeted

- 🥇 **Overall Challenge Winner** — Built for a real friend, solves an immediate real-world financial pain, and delivers a complete local-first privacy manifesto.
- 🎯 **Best Use of TabPFN ($200)** — Uses TabPFN's tabular foundation model to perform Bayesian pattern detection and drift slope analysis on tabular transaction records.
- 🎯 **Best Use of Gemma ($200)** — Deploys Gemma-2 as a specialized consumer legal agent unmasking corporate dark patterns and generating FTC Click-to-Cancel notices.
- 🎯 **Best Use of Render ($200)** — Zero-config deployment via `render.yaml` for instant live demo access.

---

## 📄 License

MIT License — free and open for everyone to protect their financial privacy.
