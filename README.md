# 🎉 DevEvent - Developer Events Platform

> **The Hub for Every Dev Event You Can't Miss** - Discover, explore, and book hackathons, meetups, conferences, and more in one place.

DevEvent is a modern, full-stack web application built with Next.js 16 that connects developers with tech events. Whether you're looking for the next React Conf, a local JavaScript meetup, or an AI hackathon, DevEvent helps you discover and reserve your spot at exciting developer events.

## ✨ Features

### 🎯 Event Discovery
- **Browse Events**: View featured events on the homepage with beautiful event cards
- **Event Details**: Comprehensive event pages with full information including:
  - Event description and overview
  - Date, time, location, and mode (online/offline/hybrid)
  - Complete event agenda
  - Organizer information
  - Tags for easy categorization
- **Similar Events**: Intelligent recommendations based on event tags

### 📅 Event Booking
- Simple email-based booking system
- One booking per email per event (prevents duplicates)
- Real-time booking count display
- Form validation and error handling

### 🚀 Admin Features
- **Create Events**: RESTful API endpoint for event creation
- **Image Upload**: Automatic image upload and storage in `/public/images`
- **Data Validation**: Comprehensive validation for all event fields
- **Auto-slug Generation**: SEO-friendly URLs automatically generated from event titles

### ⚡ Performance & Optimization
- **Next.js Caching**: Implemented `cacheLife` for optimal performance
- **Database Indexing**: Optimized MongoDB queries with strategic indexes
- **Connection Caching**: MongoDB connection pooling to prevent multiple connections
- **Image Optimization**: Next.js Image component for optimized image delivery

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority`

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud instance)
- npm, yarn, pnpm, or bun

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dev-events-nextjs.git
cd dev-events-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

> 💡 See `env.example` for reference

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
dev-events-nextjs/
├── app/
│   ├── api/
│   │   └── events/          # Event API routes (GET, POST)
│   ├── events/
│   │   └── [slug]/          # Dynamic event detail pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage with featured events
│   └── globals.css          # Global styles
├── components/
│   ├── BookEvent.tsx        # Event booking form
│   ├── EventCard.tsx        # Event card component
│   ├── EventDetails.tsx     # Event detail page component
│   ├── Navbar.tsx           # Navigation component
│   └── ...
├── database/
│   ├── event.model.ts       # Event Mongoose schema
│   ├── booking.model.ts     # Booking Mongoose schema
│   └── index.ts             # Database exports
├── lib/
│   ├── actions/             # Server actions
│   │   ├── booking.actions.ts
│   │   └── event.actions.ts
│   ├── mongodb.ts           # MongoDB connection handler
│   └── constants.ts         # App constants
└── public/                  # Static assets
```

## 🗄️ Database Models

### Event Model
- Comprehensive event information (title, description, venue, location, date, time, mode, audience, agenda, tags, organizer)
- Auto-generated SEO-friendly slugs
- Data normalization for dates and times
- Unique indexes on slug and compound indexes for optimized queries

### Booking Model
- Links bookings to events via reference
- Email validation with RFC 5322 compliance
- Unique constraint on event-email combination (one booking per event per email)
- Indexed for fast queries

## 🔌 API Endpoints

### `GET /api/events`
Fetches all events, sorted by creation date (newest first).

**Response:**
```json
{
  "message": "Events fetched successfully",
  "events": [...]
}
```

### `POST /api/events`
Creates a new event with image upload.

**Request:** FormData with event fields and image file

**Response:**
```json
{
  "message": "Event Created Successfully",
  "event": {...}
}
```

### `GET /api/events/[slug]`
Fetches a single event by slug.

**Response:**
```json
{
  "event": {...}
}
```

## 🎨 Key Features in Detail

### Caching Strategy
- Uses Next.js `cacheLife` API for hour-based caching
- Reduces database queries and improves page load times
- Implements `'use cache'` directive for automatic cache management

### Image Handling
- Server-side image upload with sanitized filenames
- Automatic directory creation for uploads
- Unique filename generation using timestamps and random strings

### Similar Events Algorithm
- Finds events with matching tags
- Excludes the current event from results
- Leverages MongoDB's efficient array matching queries

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).