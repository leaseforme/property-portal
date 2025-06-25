# Property Portal

A multi‑role property management web app built with Next.js, Prisma, NextAuth, Stripe, SendGrid, and Twilio.

## Setup

1. **Clone the repo**
2. **Create a `.env` file** (copy from the snippet below) and fill in your secrets.
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```
5. **Start the dev server**
   ```bash
   npm run dev
   ```

### `.env` example
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/db
NEXTAUTH_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
SENDGRID_API_KEY=SG.xxxxx
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
```

## Deployment (DigitalOcean)

1. **Create a Postgres database** (Managed Database or inside a Droplet).
2. **Set environment variables** in App Platform or your Droplet.
3. **Build & start**
   ```bash
   npm run build
   npm start
   ```

---

### Roadmap / TODO
- Role‑based dashboards (Owner, Staff, Tenant, Applicant)
- Application approval flow
- Viewing scheduler
- Payment integration for application fees/deposits
- Email (SendGrid) & SMS (Twilio) notifications
