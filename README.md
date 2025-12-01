# 🎮 PokeTest

A modern Pokémon web application built with Next.js 16, Apollo GraphQL, and Tailwind CSS. Explore, search, and save your favorite Pokémon with an elegant and responsive interface.

## ✨ Features

- 📋 **Pokémon List**: Paginated navigation through all available Pokémon
- 🔍 **Complete Details**: View stats, types, moves, and sprites for each Pokémon
- ❤️ **Favorites System**: Save your favorite Pokémon with local persistence
- 🎨 **Modern UI**: Interface built with Tailwind CSS 4 and Radix UI components
- ⚡ **Optimized Performance**: Server-side rendering with Next.js 16
- 🧪 **Complete Testing**: Test suite with Vitest and Testing Library
- 📱 **Responsive**: Adaptive design for all devices

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with SSR and App Router
- **React 19** - UI library
- **TypeScript 5** - Static typing

### Data & State
- **Apollo Client** - GraphQL client for consuming PokeAPI
- **Jotai** - Atomic state management for favorites
- **Zod** - Schema validation and types

### Styling
- **Tailwind CSS 4** - CSS utility framework
- **Radix UI** - Accessible and unstyled components
- **Lucide React** - Modern icons
- **class-variance-authority** - Component variant management

### Testing & Quality
- **Vitest** - Fast testing framework
- **Testing Library** - React component testing
- **Biome** - Modern linter and formatter

## 📁 Project Structure

```
poketest/
├── app/                      # Next.js App Router
│   ├── [page]/              # Dynamic pagination routes
│   ├── favorites/           # Favorites page
│   ├── pokemon/[id]/        # Individual Pokémon details
│   ├── layout.tsx           # Main layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ErrorPage/           # Error component
│   ├── LikeButton/          # Favorites button
│   ├── Pagination/          # Page navigation
│   ├── PokemonList/         # Pokémon list and items
│   ├── PokemonStats/        # Stats visualization
│   ├── Topbar/              # Navigation bar
│   └── ui/                  # Base UI components
├── lib/                     # Utilities and configuration
│   └── apollo/              # Apollo GraphQL client
├── logic/                   # Business logic
│   ├── graphql/             # GraphQL queries
│   └── pokemon/             # Pokémon schemas and types
└── public/                  # Static files
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/javimrdev/poketest.git
cd poketest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter (Biome)
npm run format   # Format code with Biome
npm test         # Run tests with Vitest
```

## 🔌 GraphQL API

The project uses the [PokeAPI GraphQL Beta](https://graphql.pokeapi.co/v1beta2) to fetch Pokémon data.

### Main Queries:

- **GET_POKEMON_LIST**: Fetches paginated Pokémon list
- **GET_POKEMON_BY_ID**: Fetches complete details of a Pokémon
- **GET_POKEMON_BY_IDS**: Fetches multiple Pokémon by IDs (for favorites)

## 🧪 Testing

The project includes unit and integration tests for components and hooks:

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
```

Included tests:
- Components: `Pagination`, `PokemonList`, `LikeButton`
- Hooks: `useIsFavorite`, `usePokemonList`, `useToggleFavorite`

## 🎨 Main Components

### PokemonList
Displays the Pokémon list with pagination and favorites at the top.

### PokemonStats
Visualizes Pokémon stats with progress bars.

### LikeButton
Interactive button to add/remove Pokémon from favorites with local persistence.

### Pagination
Page navigation with previous/next controls and page selector.

## 🔧 Configuration

### Tailwind CSS
Configured with version 4 using `@tailwindcss/postcss`.

### Biome
Linting and formatting configuration in `biome.json`.

### TypeScript
Strict configuration in `tsconfig.json` with absolute paths.

## 📦 Main Dependencies

```json
{
  "@apollo/client": "^4.0.9",
  "jotai": "^2.15.1",
  "next": "16.0.5",
  "react": "19.2.0",
  "tailwindcss": "^4",
  "zod": "^4.1.13"
}
```

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the GraphQL API
- [Next.js](https://nextjs.org/) for the excellent framework
- [Vercel](https://vercel.com/) for hosting and deployment

---

Developed with ❤️ using Next.js and TypeScript
