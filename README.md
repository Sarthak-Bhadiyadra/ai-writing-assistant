# AI Writing Assistant SaaS

A complete production-ready SaaS for AI-powered text rewriting.

## Features
- **Chrome Extension**: Select text on any website and instantly improve it.
- **Node.js Backend**: Secure API handling AI requests and billing.
- **Next.js Dashboard**: Manage usage, subscriptions, and account settings.
- **Payments**: Stripe integration for Pro and Team plans.

## Setup Instructions

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials:
   - Supabase URL/Keys
   - Stripe Secret Keys
   - xAI API Key (Grok)
4. `npm run dev`

### 2. Dashboard Setup
1. `cd dashboard`
2. `npm install`
3. Configure your `.env.local` with Supabase credentials.
4. `npm run dev`

### 3. Chrome Extension Setup
1. `cd extension`
2. `npm install`
3. `npm run build`
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the `extension` folder.

## Production Deployment

### Backend
Deploy to **Railway** or **Render**:
1. Connect your GitHub repo.
2. Add environment variables.
3. The included `Dockerfile` will handle the build.

### Dashboard
Deploy to **Vercel**:
1. Connect your repo.
2. Vercel will automatically detect the Next.js project.

### Database
Use **Supabase**:
1. Run the SQL in `database/schema.sql` in the Supabase SQL Editor.
2. Enable Row Level Security (RLS) as defined.

## Usage Limits
- **Free**: 30 improvements per day.
- **Pro**: Unlimited improvements.
- **Team**: Shared quota for up to 5 users.

## Security
- All AI calls are proxied through the backend.
- Rate limiting is enforced based on user plans.
- Input length is limited to 1000 characters to prevent abuse.