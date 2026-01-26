import { gsap } from "../../lib/index";
import template from "./about.html?raw";

export default function AboutPage() {
  return template;
}

export function init(options = {}) {
  return [];
}

export function cleanup() {
  const container = document.querySelector('[data-transition="container"]');

  if (container?._splitInstance) {
    const h1 = container.querySelector("h1");

    if (h1) {
      gsap.set(h1.querySelectorAll(".char-wrapper > *"), { clearProps: "all" });
    }

    // container._splitInstance.revert();
    container._splitInstance = null;

    if (h1) {
      const wrappers = h1.querySelectorAll(".char-wrapper");
      wrappers.forEach((wrapper) => {
        const char = wrapper.firstChild;
        wrapper.parentNode.insertBefore(char, wrapper);
        // wrapper.remove();
      });
    }
  }
}
