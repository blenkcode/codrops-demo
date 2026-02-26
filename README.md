# Building Asynchronous Page Transitions in Vanilla JavaScript

Smooth, cinematic page transitions are a hallmark of premium web experiences. Libraries like Barba.js have popularized the pattern, but the underlying mechanics are surprisingly approachable. In this tutorial, we'll build a lightweight async page transition system from scratch using vanilla JavaScript, GSAP, and Vite.
By the end, you'll have a fully functional SPA router with crossfade transitions between pages — no framework required.

![Image](https://tympanus.net/codrops/wp-content/uploads/2026/02/Group-170.webp)

[Article on Codrops](https://tympanus.net/codrops/?p=10920)

[Demo](https://framework-ten-lilac.vercel.app/)

## What We're Building

A minimal single-page application with:

- A custom client-side router that intercepts link clicks and manages navigation via the History API
- An async transition engine that animates between the current and next page simultaneously
- A transition registry that maps specific page-to-page transitions, giving you full creative control
- A component-based architecture using Web Components for persistent UI elements like headers
- Here's the key idea: instead of instantly swapping page content, we clone the page container, inject the new content into the clone, animate both containers (old out, new in), then remove the old one. This gives us true crossfade transitions where both pages coexist in the DOM during the animation.

## Installation

```bash
npm install
npm run dev
```

## License

[MIT](LICENSE)
