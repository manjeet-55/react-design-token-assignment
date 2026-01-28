# React Input Component

A design system Input component built with React, using design tokens for theming and styling.

## Features

- ✅ **Design Token System** - All styles use resolved design tokens (no hardcoded values)
- 🎨 **Theme Support** - Light and dark mode with automatic token switching
- ♿ **Accessible** - ARIA attributes, keyboard navigation, screen reader support
- 🎭 **Multiple States** - Default, focused, disabled, error states
- 🔧 **Customizable** - Leading/trailing icons, helper text, error messages
- 📚 **Storybook** - Interactive component documentation

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook
```

## Project Structure

```
src/
├── components/
│   └── Input/           # Input component
├── contexts/
│   └── ThemeContext.tsx # Theme management
├── tokens/
│   ├── resolver.ts      # Token resolution logic
│   ├── index.ts         # Pre-resolved tokens
│   └── tokensData/      # Design token JSON files
├── icons/               # Icon components
└── stories/             # Storybook stories
```

## Usage

```jsx
import Input from "./components/Input/Input";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Input
        label="Email"
        placeholder="you@example.com"
        helperText="We'll never share your email"
      />
    </ThemeProvider>
  );
}
```

## Design Tokens

The component uses a token-based design system with automatic theme resolution:

- **Colors**: Background, content, borders
- **Typography**: Font sizes, weights, families, line heights
- **Spacing**: Consistent spacing scale
- **Borders**: Radius, width, styles
- **Shadows**: Box shadow definitions

All tokens are resolved from JSON files and support both light and dark themes.

## Scripts

- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook (localhost:6006)
- `npm run build-storybook` - Build Storybook for deployment

## Tech Stack

- React 19
- Vite
- Storybook 10
- Design Tokens (JSON)
