# Lynx Gallery - Threading Playground

A playground project for recreating the [Lynx Gallery Tutorial](https://lynxjs.org/guide/start/tutorial-gallery) to understand threading concepts in Lynx JS. This project demonstrates the dual-thread architecture of Lynx by comparing background thread and main thread implementations.

## Purpose

This project serves as a learning exercise to explore how Lynx JS handles threading, specifically:

- Understanding the difference between background thread and main thread execution
- Comparing scrollbar responsiveness between background thread and main thread implementations
- Demonstrating how main thread scripting (MTS) can improve UI responsiveness

**Article:** [Article link will be added here]

## Related Projects

### React Native Clone

There is a separate React Native implementation of this gallery example that demonstrates JavaScript thread blocking behavior:

**Repository:** [react-native-lynx-gallery-example-clone](https://github.com/lukasz-app/react-native-lynx-gallery-example-clone)

The React Native version includes a "Jammer" button that intentionally blocks the main JavaScript thread for 10 seconds, showcasing how synchronous blocking operations affect UI responsiveness in React Native.

### Jammer Branch

On a separate branch (this is `main`), there will be an implementation that attempts to break the background thread using a Jammer function, further exploring threading behavior in Lynx JS.

## Features

- **Auto-scrolling gallery** with a 2-column masonry (waterfall) layout
- **Interactive heart icons** on each image (like/unlike functionality with animations)
- **Dual scrollbar implementation:**
  - Background thread scrollbar (standard React state updates)
  - Main thread scrollbar (MTS - Main Thread Scripting) for improved responsiveness
- **Image gallery** with local furniture images
- **Custom scrollbar styling** with animated gradient effects

## Prerequisites

- Node.js >= 18
- pnpm (or npm/yarn)
- LynxExplorer app installed on your device (iOS/Android)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

Or if you prefer npm:

```bash
npm install
```

### 2. Run the Development Server

```bash
pnpm run dev
```

Or with npm:

```bash
npm run dev
```

### 3. View the App

1. The development server will start and display a QR code in the terminal
2. Open the **LynxExplorer** app on your device
3. Scan the QR code to view the gallery

The page will auto-update as you edit files.

## Project Structure

```
src/
├── App.tsx              # Main app component
├── Gallery.tsx          # Gallery component with dual scrollbar implementation
├── ImageCard.tsx        # Individual image card with like functionality
├── LikeIcon.tsx         # Like icon component with animation
├── Scrollbar.tsx        # Background thread scrollbar implementation
├── ScrollbarMTS.tsx     # Main thread scrollbar implementation (MTS)
├── utils.ts             # Utility functions (e.g., size calculations)
├── Pictures/            # Local image assets
└── App.css              # Styles for the gallery
```

## Key Concepts Demonstrated

### Dual-Thread Architecture

Lynx uses a dual-thread architecture:

- **Background Thread**: Runs React/JavaScript logic
- **Main Thread**: Handles UI rendering and touch interactions

### Main Thread Scripting (MTS)

The project demonstrates how to use MTS to improve scrollbar responsiveness by executing scrollbar updates directly on the main thread, avoiding the latency of background thread communication.

### Thread Comparison

The gallery displays two scrollbars side-by-side:

- **Left scrollbar**: Main thread implementation (smooth and responsive)
- **Right scrollbar**: Background thread implementation (may lag during scrolling)

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run test` - Run tests
- `pnpm run format` - Format code with Biome
- `pnpm run check` - Check code with Biome

## References

- **Lynx Gallery Tutorial:** https://lynxjs.org/guide/start/tutorial-gallery
- **Lynx Documentation:** https://lynxjs.org/
- **React Native Clone:** https://github.com/lukasz-app/react-native-lynx-gallery-example-clone
- **Article:** [Article link will be added here]

## License

This project is for educational purposes and learning about Lynx JS threading concepts.
