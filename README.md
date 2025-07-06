# Professional Portfolio Website

A modern, full-stack portfolio website built with the latest web technologies. This project showcases your professional profile, projects, resume, and more, with a beautiful UI and robust admin dashboard.

---

## 🚀 Features

- **Animated Hero Section:** Eye-catching animated introduction with dynamic background and profile info.
- **About Section:** Highlights your journey, skills, and professional background with animated skill bars and badges.
- **Project Showcase:** Filterable, responsive project cards with categories, images, and links to code/live demos.
- **Admin Dashboard:** Secure admin area to manage projects, about info, and contact messages.
- **Contact Form:** Validated form with real-time feedback and server-side processing.
- **Resume/CV Section:** Timeline of education and experience, plus one-click resume download.
- **Responsive Navigation:** Sticky navbar with smooth scrolling and active section highlighting.
- **Beautiful Footer:** Animated, modern footer with links and copyright.
- **Reusable Components:** Modular, maintainable UI using Shadcn/ui and custom components.
- **Type-safe Backend:** Prisma ORM for database access and migrations.

---

## 📸 Screenshots

| Hero Section | Projects | About | Resume | Contact |
|-------------|----------|-------|--------|---------|
| ![Hero](./public/screenshots/hero.png) | ![Projects](./public/screenshots/projects.png) | ![About](./public/screenshots/about.png) | ![Resume](./public/screenshots/resume.png) | ![Contact](./public/screenshots/contact.png) |

---

## 📂 Directory Structure

```
/src
  ├── app           # Next.js App Router pages & layouts
  │   ├── admin     # Admin dashboard routes
  │   └── (auth)    # Authentication routes (login, register, etc.)
  ├── components    # Reusable UI components
  │   ├── about     # About section
  │   ├── admin     # Admin-specific
  │   ├── auth      # Auth forms
  │   ├── contact   # Contact form
  │   ├── footer    # Footer
  │   ├── hero      # Hero section
  │   ├── navbar    # Navigation
  │   ├── project   # Project showcase
  │   ├── resume    # Resume/CV
  │   └── ui        # Shadcn/ui components
  ├── contexts      # React context providers (e.g., auth)
  ├── lib           # Utilities (auth, prisma, utils)
  ├── theme         # Theme provider & config
/public             # Static assets (SVGs, images)
/prisma              # Database schema & migrations
```

---

## 🛠️ Tech Stack & Rationale

### **Frontend**
- **Next.js 14+ (App Router):**
  - *Why:* Best-in-class React framework for SSR, SSG, and API routes. App Router for modern routing and layouts.
  - *Where:* All page and layout logic (`/src/app`)
- **TypeScript:**
  - *Why:* Type safety for robust, maintainable code.
  - *Where:* Entire codebase
- **Tailwind CSS:**
  - *Why:* Utility-first CSS for rapid, responsive design.
  - *Where:* All styling (`tailwind.config.js`, component classes)
- **Shadcn/ui:**
  - *Why:* Beautiful, accessible, customizable UI components.
  - *Where:* `/src/components/ui`, imported in other components

### **Backend & Data**
- **Prisma ORM:**
  - *Why:* Type-safe database access, easy migrations, works great with PostgreSQL.
  - *Where:* `/src/lib/prisma.ts`, `/prisma/schema.prisma`, used in API routes and admin features
- **NextAuth.js** *(implied by auth context)*:
  - *Why:* Secure, flexible authentication for Next.js apps.
  - *Where:* `/src/contexts/auth-context.tsx`, `/src/lib/auth.ts`, auth routes

### **Forms & Validation**
- **React Hook Form:**
  - *Why:* Performant, easy-to-use forms with minimal re-renders.
  - *Where:* All forms (login, contact, admin, etc.)
- **Zod:**
  - *Why:* Type-safe schema validation for forms and API inputs.
  - *Where:* Form validation logic

### **Other**
- **React Context:**
  - *Why:* Global state management (e.g., auth, theme)
  - *Where:* `/src/contexts/`
- **ThemeProvider:**
  - *Why:* Easy dark/light theme switching
  - *Where:* `/src/theme/ThemeProvider.tsx`, `/src/theme/theme.tsx`

---

## ⚡ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn or pnpm
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values (database URL, NextAuth secrets, etc.)
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
6. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Deployment

- **Recommended:** [Vercel](https://vercel.com/) (zero config for Next.js)
- **Other options:** Netlify, custom VPS, Docker
- **Database:** Use a managed PostgreSQL (e.g., Supabase, Railway, Neon) in production

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

[MIT](LICENSE)

---

## 🙏 Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

> _Built with ❤️ and modern web technologies._
