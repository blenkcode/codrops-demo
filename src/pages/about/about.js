import { gsap } from "../../lib/index";
import template from "./about.html?raw";
import ENTER from "../../animations/Enter";
export default function AboutPage() {
  return template;
}

export function init(options = {}) {
  const container =
    options.container ||
    document.querySelector('[data-transition="container"]');

  const enterData = ENTER(container, 0.32);

  if (enterData?.splitInstance) {
    container._splitInstance = enterData.splitInstance;
  }
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
