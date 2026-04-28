# 🧮 Salary Tax Calculator (Cambodia)

A bilingual **Cambodian Salary Tax Calculator** built with **Next.js 15** and **TypeScript**. It calculates your after-tax take-home salary following **GDT Prakas 575** (income tax) and **NSSF** (pension fund) regulations.

🌐 **Live Demo:** [salary-tax-calculate.vercel.app](https://salary-tax-calculate.vercel.app)

---

## ✨ Features

- 🇰🇭🇬🇧 **Bilingual** — Full support for English and Khmer (ខ្មែរ)
- 💱 **Dual Currency** — Calculate in USD or Cambodian Riel (KHR ៛)
- 📊 **Accurate Tax Logic** — Based on GDT Prakas 575 progressive tax brackets
- 🏦 **NSSF Pension Fund** — Deduction calculated based on official NSSF exchange rate
- 👪 **Dependant Deductions** — Subtract 150,000 KHR per registered dependant
- 🌙 **Dark Mode** — System-aware theme with manual toggle
- ✅ **Form Validation** — Built with `react-hook-form` + `zod` for robust input validation
- ⚡ **Fast & Lightweight** — Static rendering, no backend required

---

## 🧾 Tax Calculation Logic

Income tax is computed in **Cambodian Riel (KHR)** using the following progressive brackets per **GDT Prakas 575**:

| Taxable Income (KHR/month) | Tax Rate |
|---|---|
| 0 – 1,500,000 | 0% |
| 1,500,001 – 2,000,000 | 5% |
| 2,000,001 – 8,500,000 | 10% |
| 8,500,001 – 12,500,000 | 15% |
| 12,500,001+ | 20% |

**Taxable income** = (Gross Salary + Other Income) − (150,000 × Number of Dependants)

**NSSF pension fund** deduction is 2% of the salary capped between 400,000 KHR and 1,200,000 KHR (per the NSSF exchange rate).

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) |
| Form validation | [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Font | [Kantumruy Pro](https://fonts.google.com/specimen/Kantumruy+Pro) (Google Fonts) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
salary-tax-calculate/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout (metadata, theme, language providers)
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── TaxCalculator.tsx   # Main calculator form & result display
│   │   ├── InputField.tsx      # Reusable form input component
│   │   ├── CurrencyToggle.tsx  # USD / Riel toggle
│   │   ├── LanguageProvider.tsx # i18n context (EN/KM translations)
│   │   ├── LanguageToggle.tsx  # Language switcher button
│   │   ├── ThemeProvider.tsx   # next-themes wrapper
│   │   ├── ThemeToggle.tsx     # Dark/light mode button
│   │   └── Tooltip.tsx         # Hover tooltip for field hints
│   └── utils/
│       └── taxCalculations.ts  # Pure tax & NSSF calculation logic
├── public/                     # Static assets (favicon, OG image)
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/samneng/salary-tax-calculate.git
cd salary-tax-calculate

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📦 Available Scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Build the production bundle
npm run start    # Start the production server (after build)
```

---

## 🔒 Security

This project follows security best practices:

| Area | Measure |
|---|---|
| **XSS Prevention** | No use of `dangerouslySetInnerHTML` — all links are rendered as safe React elements |
| **Type Safety** | All form inputs typed with `UseFormRegisterReturn` from react-hook-form — no `any` types |
| **Input Validation** | All user inputs validated with Zod schema before processing |
| **Dependency hygiene** | Dependencies kept up-to-date; run `npm audit` regularly |
| **No secrets** | Fully client-side app — no API keys, no `.env` files needed |
| **Gitignore** | `.env*`, build artifacts, editor files, and OS metadata are excluded from git |

> **Note on `npm audit`:** Two `moderate` advisories may appear related to an old `postcss` version bundled **inside** Next.js's internal build toolchain. These are not exploitable at runtime and cannot be patched without a breaking downgrade. They are tracked upstream by the Next.js team.

---

## 🌍 Internationalization (i18n)

Translations are managed in `src/components/LanguageProvider.tsx` via a simple key-value context. Currently supported languages:

- 🇬🇧 **English** (`en`)
- 🇰🇭 **Khmer** (`km`)

To add a new language, extend the `translations` object and the `Language` type.

---

## 📖 References

- [GDT Prakas 575 — Salary Tax](https://www.tax.gov.kh/)
- [NSSF Pension Fund Regulations](https://www.nssf.gov.kh/)
- [NBC Exchange Rate](https://www.nbc.gov.kh/english/economic_research/exchange_rate.php)
- [NSSF Exchange Rate](https://www.nssf.gov.kh/exchange-rate/)

---

## 👤 Author

**Ung Samneng** — Web Developer based in Phnom Penh, Cambodia

- 🌐 Portfolio: [samneng-portfolio.vercel.app](https://samneng-portfolio.vercel.app)
- 💬 Telegram: [@ungsamneng](https://t.me/ungsamneng)
- 🤖 Telegram Bot: [@samneng_bot](https://t.me/samneng_bot)

---

## 📄 License

Personal project — all rights reserved by Ung Samneng.
