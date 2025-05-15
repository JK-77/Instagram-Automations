# 🚀 Slide — Smart Instagram DM Automation + AI-Powered Analytics

![Slide Logo](https://img.shields.io/badge/built%20with-AI%20+%20Next.js-blueviolet)  
_**A modern, intelligent, and affordable way to automate Instagram DMs and track engagement like a pro.**_

🌐 [Live Demo / Presentation](https://instagram-automation.my.canva.site/)

---

## 📌 Overview

**Slide** is an AI-powered SaaS platform that automates Instagram DMs and provides smart engagement analytics using advanced models like **Gemini AI** and **DistilBERT**. With an intuitive interface and seamless integration, Slide empowers creators, small businesses, and agencies to respond faster, analyze engagement, and make smarter content decisions.

---

## ✨ Key Features

- 🔁 **Automated DM/Comment Replies** via custom triggers
- 🤖 **Gemini-Powered Smart Replies** trained on your brand’s products
- 🧠 **Sentiment Detection with DistilBERT** (Positive, Neutral, Negative)
- 📊 **Real-Time Analytics Dashboard**: KPIs, top DMs, user intent heatmap
- 🧩 **Trigger/Response Builder** (No-code)
- 🔐 **Auth with Clerk** + secure database entries
- 🧬 **PostgreSQL DB hosted on Neon with Prisma ORM**
- 🆓 **Freemium Model** (Basic automation free)

---

## 🧠 Why Slide?

> “Tired of repetitive Instagram DMs? Expensive chatbot tools? Slide gives you automation + analytics powered by AI — without burning your budget.”

Unlike tools like ManyChat, Slide is designed for affordability and flexibility — especially for **Indian users and small teams**.

---

## 🏗️ Tech Stack

| Layer        | Stack                           |
|--------------|----------------------------------|
| Frontend     | Next.js 14, Tailwind CSS         |
| Backend/API  | Node.js, Express.js              |
| Auth         | Clerk.dev                        |
| ORM          | Prisma                           |
| DB           | Neon (PostgreSQL)                |
| AI Models    | Gemini (text-based replies), DistilBERT (sentiment) |
| Deployment   | Vercel / Render / Railway        |

---

## 🧪 Use Case: UrbanStep (Shoe Brand Example)

**Prompt to train Gemini:**
> “You are UrbanStep’s DM assistant. Help users with sneakers, boots, loafers (UK 6–11) in colors like black, white, navy. Mention offers like FLAT10, locations in Mumbai, Pune, Indore. Payment via UPI, COD, or card. Suggest trending shoes. If size is unavailable, offer alternatives.”

---

## 🔐 Authentication & Database

- **User Auth**: Secured with [Clerk](https://clerk.dev)  
  → Sign in with Google, GitHub, OTP, etc.  
- **DB**: PostgreSQL hosted on [Neon](https://neon.tech)
- **Schema**: Managed with Prisma ORM  
  → Models: `User`, `Trigger`, `Message`, `Response`, `Feedback`, `AnalyticsEvent`

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/slide.git
cd slide
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
