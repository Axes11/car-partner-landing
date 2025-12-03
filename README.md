# Car Partner Landing

Landing page for Car Partner service with multi-language support, Supabase integration, and review system.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.3 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**:
  - Styled Components 6.x
  - Tailwind CSS 4.x
- **Database & Storage**: Supabase
- **Email**: EmailJS
- **AI Validation**: Google AI Studio
- **Animations**: GSAP 3.13.0
- **Sliders**: Swiper 12.0.2
- **Icons**: Phosphor Icons
- **Analytics**: Vercel Speed Insights

## 📁 Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── cars/         # API for fetching cars
│   │   ├── reviews/      # API for reviews (GET/POST)
│   │   └── types/        # TypeScript types for API
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
│
├── components/            # UI components
│   ├── AboutUs/          # About Us block
│   ├── Advantages/       # Advantages block
│   ├── Footer/           # Footer
│   ├── Header/           # Header with navigation
│   ├── HowItWorks/       # How It Works block
│   ├── Modals/           # Modal windows
│   ├── Reviews/          # Reviews block
│   ├── Services/         # Services block
│   ├── Slider/           # Slider (cars/reviews)
│   └── Welcome/          # Welcome block
│
├── shared/               # Shared modules
│   ├── context/          # React contexts
│   │   ├── loadingContext.ts
│   │   ├── modalContext.ts
│   │   └── languageContext.ts
│   ├── providers/        # React providers
│   │   ├── languageProvider.tsx
│   │   ├── loadingProvider.tsx
│   │   └── modalProvider.tsx
│   ├── ui/               # Reusable UI components
│   └── utils/            # Utilities
│
├── lib/                  # Libraries and configurations
│   ├── supabaseClient.ts    # Supabase client (client-side)
│   ├── supabaseServer.ts    # Supabase client (server-side)
│   ├── rateLimit.ts         # Rate limiting for API
│   └── verifyReview.ts      # Review validation via Google AI
│
├── hooks/                # Custom React hooks
│   ├── useLanguage.ts
│   └── useModalScrollLock.ts
│
├── locales/              # Localization
│   ├── ua.js            # Ukrainian language
│   └── ru.js            # Russian language
│
├── assets/               # Static resources
│   ├── icons/           # Icons
│   └── imgs/            # Images
│
└── constants/            # Constants
    └── Colors.ts         # Color scheme
```

## 🏗️ Architectural Principles

### 1. **App Router Architecture**

The project uses Next.js 15 App Router with server and client components:

- `app/page.tsx` - home page (client component)
- `app/api/*` - API routes for server-side logic
- `app/layout.tsx` - root layout with global providers

### 2. **State Management**

Uses React Context API for global state:

- **LanguageContext** - interface language management
- **LoadingContext** - loading state
- **ModalContext** - modal windows management

### 3. **Styling Strategy**

Hybrid approach:

- **Styled Components** - for component styling
- **Tailwind CSS** - for utility classes
- Global styles in `globals.css`

### 4. **API Routes**

- `/api/cars` - fetching car list from Supabase
- `/api/reviews` - GET/POST for reviews with rate limiting and validation

### 5. **Internationalization**

Simple localization system via context:

- Localization files in `locales/`
- Language switcher in Header
- UA/RU support

## ⚙️ Project Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Variables Setup

Create `.env.local` file in the project root based on `env.example`:

```bash
cp env.example .env.local
```

Fill in the required variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
SUPABASE_AVATAR_BUCKET_URL=your_supabase_storage_bucket_url

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Google AI Studio (for review validation)
GOOGLE_AI_STUDIO_API=your_google_ai_studio_api_key
```

### 3. Supabase Setup

#### 3.1 Create Tables

Create the following tables in Supabase:

**Table `postgres_table_cars`:**

```sql
CREATE TABLE postgres_table_cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Table `postges_table_reviews`:**

```sql
CREATE TABLE postges_table_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  review TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3.2 Storage Setup

1. Create `avatar_imgs` bucket in Supabase Storage
2. Configure access policies:

   - **Public read access** for reading avatars
   - **Authenticated write access** for uploads (or use service role key)

3. Add `default.jpg` file to the bucket for default avatar

#### 3.3 Get Supabase Keys

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Settings → API
4. Copy:

   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_KEY` (⚠️ don't use on client!)

5. Settings → Storage → `avatar_imgs` → URL → `SUPABASE_AVATAR_BUCKET_URL`

### 4. EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create Email Service
3. Create Email Template
4. Get Public Key
5. Add values to `.env.local`

### 5. Google AI Studio Setup (Optional)

For review validation via AI:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `.env.local` as `GOOGLE_AI_STUDIO_API`

If not configured, review validation will work in basic mode.

### 6. Image Domain Configuration

In `next.config.ts`, Supabase domain is added for image optimization:

```typescript
images: {
  domains: ['fsjivvyugigwtlshjxld.supabase.co'],
}
```

If using a different Supabase project, update the domain.

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The project will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📝 Key Features

### 1. **Multi-language Support**

- Support for Ukrainian and Russian languages
- Language switcher in header
- Localized content for all blocks

### 2. **Review System**

- Display reviews from Supabase
- Add new reviews via form
- Upload avatars to Supabase Storage
- Content validation via Google AI (if configured)
- Rate limiting for spam protection

### 3. **Sliders**

- Car slider
- Reviews slider
- Uses Swiper for smooth animations

### 4. **Modal Windows**

- Modal windows for forms
- Scroll lock when modals are open
- Animations via GSAP

### 5. **Animations**

- GSAP for scroll animations
- Smooth transitions between sections
- Loading states

## 🔧 Development

### Adding a New Language

1. Create file `src/locales/{lang}.js`
2. Add structure like in `ua.js` or `ru.js`
3. Update `LanguageProvider` to support the new language

### Creating a New API Route

1. Create file `src/app/api/{route}/route.ts`
2. Export `GET`, `POST`, `PUT`, `DELETE` functions
3. Use `supabaseClient` or `supabaseServer` depending on needs

### Adding a New Component

1. Create folder in `src/components/{ComponentName}/`
2. Create file `{component-name}.tsx`
3. Use Styled Components or Tailwind for styling
4. Add localization via `useLanguage` hook

## 🐛 Troubleshooting

### Supabase Connection Error

- Check `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Make sure tables are created in the database

### Images Not Loading

- Check Storage bucket settings in Supabase
- Make sure access policies are configured correctly
- Check `SUPABASE_AVATAR_BUCKET_URL`

### EmailJS Not Working

- Check Service ID, Template ID, and Public Key are correct
- Make sure template is configured correctly

### TypeScript Errors

- Make sure all types are defined in `src/app/api/types/`
- Check `tsconfig.json` for correct path aliases

## 📦 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Add environment variables in Vercel Dashboard
3. Deployment will happen automatically

### Other Platforms

The project supports standard Next.js build, so it can be deployed on:

- Netlify
- AWS Amplify
- Railway
- Self-hosted (Node.js server)

## 📄 License

Private project

## 👥 Contacts

For questions and support, contact the development team.
