# RecallIQ — Adaptive Knowledge-Retention Platform

> **"Remember More. Forget Less."**

RecallIQ is a modern, adaptive learning and retention platform designed to solve the cognitive decay of human memory. Unlike generic LMSs or traditional quiz apps that merely display static percentage scores (e.g., *"You scored 80%"*), RecallIQ identifies **what a student is most likely to forget next** using algorithmic metacognitive calibration and Ebbinghaus forgetting curve modeling.

---

## ⚡ The RecallIQ Closed Learning Loop

```
Study Topic 
  ↳ Rate Prior Confidence (0–100%)
  ↳ Take Adaptive Quiz (Difficulty-weighted questions)
  ↳ Confidence Gap Analysis (|Confidence - Accuracy|)
  ↳ Mastery Score Calculation (M = w1·A + w2·R + w3·D + w4·C)
  ↳ Memory Strength & Forgetting Curve R(t) = e^(-t/S)
  ↳ Forgetting Risk Prediction (LOW / MEDIUM / HIGH)
  ↳ Personalized Spaced Revision Center
  ↳ Interactive Re-Quiz & Retention Elevation Tracking
```

---

## 🚀 Live Demo & Repository

- **GitHub Repository:** [https://github.com/ARJUNkathayat/RecallQ-project](https://github.com/ARJUNkathayat/RecallQ-project)
- **Author:** [Arjun Kathayat](https://github.com/ARJUNkathayat)

---

## 🛠️ Technology Stack

### Frontend (`client/`)
- **Framework:** Next.js 16 (React 19, TypeScript)
- **Styling:** Tailwind CSS with custom glassmorphism & blueprint grid tokens
- **Animations:** Framer Motion (staggered entrance, hover lifts, micro-interactions)
- **Smooth Scrolling:** Lenis smooth inertial scrolling engine
- **Analytics & Visualizations:** Recharts (interactive retention decay curves)
- **Icons:** Lucide React
- **Celebration Feedback:** Canvas Confetti

### Backend (`server/`)
- **Runtime:** Node.js with Express.js REST API (TypeScript)
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens) with bcrypt password hashing
- **Input Validation:** Zod schema parsing
- **Security:** CORS, environment variable isolation, sanitized outputs

---

## 📐 Mathematical Engines

### 1. Weighted Mastery Formulation
$$M = w_1 A + w_2 R + w_3 D + w_4 C$$

- $A \in [0, 100]$: Raw quiz accuracy.
- $R \in [0, 100]$: Spaced revision historical performance.
- $D \in [0, 100]$: Normalized topic difficulty.
- $C \in [0, 100]$: Metacognitive calibration index ($100 - |Confidence - Accuracy|$).
- *Configurable weights:* $w_1 = 0.40, w_2 = 0.25, w_3 = 0.20, w_4 = 0.15$.

### 2. Ebbinghaus Forgetting & Memory Strength Model
$$R(t) = e^{-\frac{t}{S}}$$

- $t$: Elapsed days since last revision or quiz.
- $S$: Memory strength factor derived from difficulty, revision repetition count ($N_{rev}$), and confidence calibration penalty.
- **Risk Categorization:**
  - **HIGH RISK:** $R(t) < 50\%$ or ($|Confidence - Accuracy| \ge 25\%$ with $t \ge 2\text{ days}$).
  - **MEDIUM RISK:** $50\% \le R(t) < 75\%$.
  - **LOW RISK:** $R(t) \ge 75\%$.
- **Next Revision Scheduling:** $t_{rev} = -S \cdot \ln(0.70)$.

---

## 🌐 Deployment Instructions

### 1. Backend on Render (`render.yaml` included)
1. Push this repository to GitHub.
2. Sign in to [Render](https://render.com).
3. Click **New +** → **Blueprint** and connect `https://github.com/ARJUNkathayat/RecallQ-project`.
4. Render automatically detects `render.yaml`:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
5. Supply your PostgreSQL `DATABASE_URL` (Neon, Supabase, or Render PostgreSQL).

### 2. Frontend on Vercel
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New Project** and import `ARJUNkathayat/RecallQ-project`.
3. Set **Root Directory** to `client`.
4. In Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL (e.g., `https://recallq-api.onrender.com`).
5. Click **Deploy**.

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/ARJUNkathayat/RecallQ-project.git
cd RecallQ-project
```

### 2. Start the Backend Server
```bash
cd server
npm install
npx prisma generate
npm run dev
# Server runs on http://localhost:5000
```

### 3. Start the Next.js Client
```bash
cd ../client
npm install
npm run dev
# Client runs on http://localhost:3000
```

---

## 📄 License
MIT © 2026 [Arjun Kathayat](https://github.com/ARJUNkathayat). Built with precision for modern learners.