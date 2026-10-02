# WorldShield — Security Assessment & Validation Platform

> Evidence-First, Version-Aware Security Assessment for Smart India Hackathon 2026 (Problem Statement 26163)

---

## 📁 Project Structure

```
WorldShield/
├── frontend/               ← React 19 + TypeScript + Vite + Tailwind v4
│   ├── src/
│   │   ├── app/            ← Router configuration
│   │   ├── components/     ← Reusable UI components
│   │   ├── data/           ← Local mock data (fallback)
│   │   ├── lib/            ← API client (fetchApi)
│   │   ├── pages/          ← Page-level components
│   │   └── types/          ← TypeScript types (frontend + API)
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts      ← Proxies /api → backend:8000 (no CORS in dev)
│
├── backend/                ← FastAPI + SQLAlchemy + Alembic + SQLite
│   ├── app/
│   │   ├── api/v1/         ← Route handlers (projects, targets, assessments, findings)
│   │   ├── core/           ← Config, database, exceptions, logging
│   │   ├── models/         ← SQLAlchemy ORM models
│   │   ├── repositories/   ← CRUD data access layer
│   │   └── schemas/        ← Pydantic request/response schemas
│   ├── migrations/         ← Alembic migration versions
│   ├── scripts/
│   │   └── seed_demo.py    ← Seeds World Monitor benchmark data
│   ├── alembic.ini
│   ├── requirements.txt
│   └── worldshield.db      ← SQLite database (auto-created)
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 20+

### 1. Backend Setup

```powershell
cd backend

# Create virtual environment
python -m venv .venv
.\.venv\Scripts\activate        # Windows
# source .venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Seed demo data (World Monitor benchmark dataset)
python scripts/seed_demo.py

# Start API server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Backend runs at: **http://127.0.0.1:8000**
API Docs (Swagger): **http://127.0.0.1:8000/docs**

### 2. Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install

# Start dev server (proxies /api to backend automatically)
npm run dev
```

Frontend runs at: **http://localhost:5174**

> **Note**: The Vite dev server proxies all `/api` requests to `http://127.0.0.1:8000` — no CORS configuration needed in development.

---

## 🔑 Key APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects/` | List all projects |
| GET | `/api/v1/targets/` | List all targets |
| GET | `/api/v1/assessments/` | List all assessments |
| GET | `/api/v1/findings/` | List all findings |
| GET | `/api/v1/findings/?assessment_id=<id>` | Findings for an assessment |
| GET | `/health` | Health check |
| GET | `/docs` | Interactive API docs |

---

## 🧭 Security Assessment Workflow

```
ASSESS → DISCOVER → DETECT → COLLECT EVIDENCE
  → VALIDATE SAFELY → ASSESS RISK → REMEDIATE → RETEST → REPORT
```

**Core Principle**: `DETECTED ≠ CONFIRMED`
Findings require evidence or controlled validation before being confirmed.

**Hard Boundary**: No modification of production systems; no exploitation; controlled isolated validation only.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS v4, Radix UI |
| Backend | Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.x |
| Database | SQLite (dev) → PostgreSQL (prod) |
| Migrations | Alembic |
| HTTP Client | httpx |
