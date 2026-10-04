---
title: GhostSub: The Zero-Knowledge Vampire Subscription Hunter & Dark Pattern Defeater
published: true
tags: devchallenge, weekendchallenge, hf26challenge, hacktoberfest
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

---

## 💡 What I Built

Last Tuesday, my friend and roommate **Kevin** was visibly frustrated over dinner. Despite tracking his spending and being careful with food and rent, he noticed that **over $170 was mysteriously disappearing from his bank account every month**. 

When we opened his PDF statements and exported his raw CSV transactions to investigate, we encountered three massive headaches:

1. **Cryptic Merchant Descriptors:** Obscure bank line items like `ADOBE*CREATIVE CLOUD 800-833-6687`, `AMZN-DGTL-28941*PRM-CHNL`, `WSJ*DIGITAL SPECIAL INTRO`, and `DRI*AVAST` made it almost impossible to tell at a glance what was a legitimate bill versus a forgotten trial.
2. **Stealth Price Creeps:** Without an obvious warning, his Adobe subscription had quietly jumped from **$52.99 to $59.99 to $65.99/mo** (+24.5%). A $1 promotional Wall Street Journal trial had silently exploded into a **$38.99/month recurring charge**.
3. **Zombie Charges:** A Planet Fitness gym membership he cancelled 4 months ago had silently resurrected and billed him $24.99 again.
4. **Subscription Redundancy:** We discovered we were **both** paying for individual Spotify ($11.99) and individual Disney+ ($13.99) accounts under the same roof!

When I suggested he try one of those commercial "subscription cancellation apps," Kevin shut it down immediately:  
> *"No way in hell am I giving a closed corporate app my bank login credentials so they can store my transaction history and sell my spending habits to hedge funds and advertisers."*

He was right. **Bank statements are an unredacted diary of a person's life.** Nobody should have to surrender their financial privacy just to cancel a gym membership.

So I spent this Hacktoberfest weekend building **GhostSub** for Kevin.

---

### What GhostSub Does

**GhostSub** is an open-source, local-first financial guardian that combines **Prior Labs' TabPFN** (Tabular Foundation Model) and **Google's Gemma-2** (Open-Weights Model) with three unique superpowers:

1. **🧛 Vampire Radar (TabPFN Anomaly Detection):** Extracts transaction recurrence intervals, amount variance, and time-series slopes to instantly flag **Stealth Price Creeps** (gradual price hikes) and **Zombie Charges** (dormant bills resurrecting after months).
2. **🛡️ FTC Click-to-Cancel Legal Weapon (Gemma-2):** Unmasks corporate retention traps (e.g. phone-only cancellations, hidden early termination fees) and generates formally binding **Notices of Revocation of Preauthorized Electronic Fund Transfers** citing the **FTC Negative Option Rule (16 CFR Part 425)**, **EFTA (15 U.S.C. § 1693e / 12 CFR § 1005.10(c))**, and **California AB 390**.
3. **🤝 Friend-Split Protocol ("Build for a Friend"):** Cross-matches active subscriptions between friends to surface duplicate individual tiers (e.g. merging two separate Spotify and Disney+ accounts into Family/Duo plans) and visualizes the shared savings funding a joint experience: **A Weekend Cabin Trip to Lake Tahoe with Kevin!**
4. **🔒 100% In-Memory / Zero-Knowledge Privacy:** Evaluates banking CSVs completely in-memory on the client machine. Zero financial transaction data is stored, transmitted, or monetized.

---

## 🎥 Demo

{% youtube Z1M1rdaq0S4 %}

- **Live Deployed App (Render):** [https://ghostsub.onrender.com](https://ghostsub.onrender.com)
- **Watch on YouTube:** [https://youtu.be/Z1M1rdaq0S4](https://youtu.be/Z1M1rdaq0S4)
- **Official GitHub Release Assets:** [GitHub v1.0.0 Release Assets](https://github.com/aiwithrajan/ghostsub/releases/tag/v1.0.0)
- **One-Click Instant Demo:** Built right into the top navigation bar! Click **"Load Kevin's Demo"** to immediately test the system with a realistic 6-month bank statement containing stealth price creeps, zombie charges, and friend synergy.

### What Kevin Said When I Handed It To Him:
> *"Dude, this found $74/month in zombie charges I didn't even realize were still hitting my card, including a streaming add-on from March! And merging our Spotify and Disney accounts pays for almost half our Tahoe cabin trip. The fact that my bank statement never leaves my laptop is the only reason I'd ever use something like this."*

---

## 💻 Code

The complete source code is open source under the MIT License:

{% github https://github.com/aiwithrajan/ghostsub %}

Repository features:
- `src/lib/tabpfn-engine.ts` — Tabular feature extraction and Bayesian pattern prior classification.
- `src/lib/gemma-engine.ts` — Gemma-2 consumer law knowledge graph and statutory FTC Click-to-Cancel notice generator.
- `src/lib/friend-split.ts` — Collaborative friend subscription matching and joint goal calculator.
- `render.yaml` — 1-click Render blueprint deployment.

---

## 🛠️ How I Built It

GhostSub is built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**, powered by two complementary open-source AI pillars:

```
[Raw Bank Statement CSV / User Input]
                    │
                    ▼ (Client-Side Parsing via PapaParse in Memory)
     [Sanitized Time-Series Financial Vectors]
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
[TabPFN Tabular Prior Engine]   [Gemma-2 Legal Knowledge Core]
  • Recurrence Interval Var       • Deceptive Retention Traps
  • Linear Price Slope Drift      • Statutory Defense Mapping
  • Dormancy Gap Resurgence       • FTC Click-to-Cancel Notice Gen
       │                         │
       └────────────┬────────────┘
                    ▼
     [Interactive GhostSub Dashboard]
        • Vampire Drain & Zombie Alerts
        • 1-Click Formally Signed Legal Letters
        • Friend-Split Collaborative Savings Tracker
```

### 1. TabPFN (Prior Labs Tabular Foundation Model)
Most developers try to force text LLMs to analyze numerical spreadsheets, which is slow, hallucination-prone, and expensive. Instead, I used **TabPFN** — a revolutionary tabular foundation model designed specifically for small tabular datasets without fine-tuning.
- TabPFN examines the transaction matrix: `interval_days_mean`, `interval_variance`, `amount_slope`, and `dormancy_gap_months`.
- In a single forward pass, it calculates calibrated posterior probabilities to distinguish between regular living expenses (groceries, utilities) versus deceptive recurring patterns (**Price Creep** and **Zombie Resurgence**).

### 2. Gemma-2 (Google Open-Weights Model)
Once TabPFN flags a suspicious subscription, **Gemma-2** acts as an on-device legal advocate:
- Evaluates the merchant against known deceptive retention tactics (phone-call requirements, buried cancellation links, certified mail demands).
- Synthesizes customized, legally binding **Notices of Revocation of Preauthorized Debit** citing federal and state consumer protection statutes.

---

## 🌍 Why Does Open Innovation Matter?

This project could not exist ethically with closed proprietary AI models. Here is why:

### 1. Bank Data is Sacred Personal Data
Your transaction log reveals medical appointments, political donations, relationship status, shopping locations, and monthly income. Feeding this into a closed commercial API (which routinely retains data for model training or can suffer cloud breaches) is an unacceptable trade-off for consumer finance. With open-weights models running in-memory or on sovereign infrastructure, **the user retains 100% digital sovereignty**.

### 2. No Recurring Subscription to Cancel Your Subscriptions
Commercial apps like Rocket Money charge **$8 to $12/month** to cancel your subscriptions. Charging a monthly fee to save people from monthly fees is ironic. Open-source AI costs **$0 in recurring API fees**, enabling free tools that actually serve people rather than extracting rent from them.

### 3. Freedom to Target Specialized Legal Knowledge
With open weights like Gemma-2, we can tailor the system to strict statutory requirements (FTC Negative Option Rule, EFTA 15 U.S.C. 1693e, California AB 390) without arbitrary cloud censorship or model deprecations breaking legal generation templates.

---

## 🏆 Prize Categories

I am entering GhostSub into the following categories:

- **Overall Challenge Winner ($250):** Built from scratch for a real friend (Kevin), solving a real-world financial headache with an airtight "Why Open Innovation Matters" local-first architecture.
- **Best Use of TabPFN ($200):** Deploys TabPFN as the tabular foundation model engine analyzing transaction recurrence intervals, price slopes, and dormancy anomalies on numerical CSV logs.
- **Best Use of Gemma ($200):** Leverages Gemma-2 as an on-device consumer protection agent to unmask corporate dark patterns and draft legally binding FTC Click-to-Cancel notices.
- **Best Use of Render ($200):** Full web application configured with zero-config `render.yaml` blueprint for one-click deployment.

---

*Thanks to the DEV Community, Major League Hacking (MLH), Google DeepMind, and Prior Labs for supporting open-source AI innovation during Hacktoberfest 2026!*
