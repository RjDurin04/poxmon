# Pokémon Data Browser

A high-fidelity web application for browsing the PokeAPI, built with Next.js 15 and Tailwind CSS v4. This project provides a functional interface for displaying Pokémon data, moves, abilities, and other directory information with a focus on high-performance interactivity and clear data presentation.

## 🌐 Design Principles

The project implements a professional, data-driven design:
- **Data-Dense Interface**: High information density focusing on PokeAPI resource attributes.
- **Technical Typography**: Bold, condensed headers and monospaced data identifiers.
- **Modern UI Components**: Clean lines, subtle gradients, and glassmorphic textures using Tailwind CSS.
- **Strict 5-Row Layout**: Directory pages are engineered to maintain exactly **5 rows** of records across all device viewports for a consistent layout.
- **History-Based Navigation**: Functional "Back" component that utilizes browser history for navigation between listings and detail views.

## 🚀 Functional Features

- **Data Directories**: Functional listings for Moves, Abilities, Types, Items, Berries, Games, Regions, and Locations.
- **Client-Side Filtering**: Instant search functionality for all directory results.
- **Resource Details**: Detailed displays for individual Pokémon and other API resources, including statistics and relationships.
- **Responsive Grid**: Optimized for all device resolutions.
- **Interactive Transitions**: Staggered entry animations and layout transitions powered by Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [PokeAPI](https://pokeapi.co/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📦 Project Structure

```text
├── app/                  # Next.js App Router (Pages & Layouts)
├── components/           # Functional & High-Fidelity UI Components
│   ├── ui/               # Base Atomic UI Components
│   └── *Client.tsx       # Interactive Directory Client Engines
├── lib/                  # Utility functions and API wrappers
│   ├── api.ts            # PokeAPI Data Fetching Logic
│   └── utils.ts          # Styles & Class Management
├── public/               # static assets and fonts
└── tailwind.config.ts    # Custom Design Tokens & Tokens
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm / pnpm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RjDurin04/poxmon.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the registry at `http://localhost:3000`.

## 📜 License
Internal Project - All Rights Reserved.

---
*Built for the Pokémon Technical Registry Project.*
