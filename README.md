# Pokémon Data Application

A web application for browsing data from the PokeAPI, built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**.

## 🛠️ Technical Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [PokeAPI](https://pokeapi.co/)

## 🎨 UI & Design Specifications

The application uses a high-contrast, monochromatic theme with specific color tokens:
- **Primary Background**: `#0f172a`
- **Accent Color**: `#3b82f6`
- **Typography**: `Syncopate` for headers and `Space Grotesk` for data displays.
- **Layout Engineering**: Grid displays are implemented with a 5-row constraint across viewports to ensure consistent element visibility.
- **Interactivity**: UI elements include hover transitions, CSS-based glassmorphism, and Framer Motion for entrance animations.

## 🏗️ Architecture

### Data Fetching Layer
The application implements a central fetching utility in `lib/api/`:
- **Concurrency Management**: A custom queue limits active requests to 20 to prevent API rate limiting.
- **Retry Logic**: Implements exponential backoff for failed requests.
- **Caching**: Utilizes Next.js built-in fetch caching with revalidation patterns.
- **Type Safety**: End-to-end TypeScript interfaces for all API response structures.

### Component Structure
- **Data Services**: Modular services in `lib/services/` handle resource-specific transformations.
- **Client Components**: Interactive pages use client-side state for real-time filtering and pagination.
- **Server Components**: Initial data fetching is performed on the server for improved load times.

## 🚀 Application Features

- **Search & Filtering**: Real-time, client-side filtering for all data directories.
- **Data Directories**: Functional listings for:
  - Pokémon
  - Moves and Abilities
  - Items and Berries
  - Game Versions and Generations
  - Regions and Locations
- **Detail Views**: Comprehensive displays for individual resources including:
  - Base statistics and performance charts.
  - Evolutionary relationships.
  - Location and encounter data.

## 📦 Project Directory Structure

```text
├── app/                  # Route handlers, layouts, and page components
├── components/           # Reusable UI components
│   ├── ui/               # Base styled components
│   └── *Client.tsx       # State-managed directory engines
├── lib/                  # Application logic
│   ├── api/              # API client and networking utilities
│   ├── services/         # Resource-specific data processing
│   └── types/            # TypeScript interface definitions
├── public/               # Static assets
└── scripts/              # Build and utility scripts
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20.x or higher
- npm, pnpm, or yarn

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/RjDurin04/poxmon.git
   cd poxmon
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Access the application**: Open `http://localhost:3000` in your browser.

## 📜 License
Internal Project - All Rights Reserved.
Developed for the Pokémon Data Registry project.

