import { gsap } from "../lib/index.js";
import ENTER from "../animations/Enter.js";
import { getTransition } from "./registry.js";

let activeTimeline = null;

export function killActiveTimeline() {
  if (activeTimeline) {
    activeTimeline.kill();
    activeTimeline = null;
  }
}

export async function executeTransition({
  currentNamespace,
  nextNamespace,
  nextHTML,
  nextModule,
  signal,
}) {
  killActiveTimeline();

  if (signal?.aborted) {
    throw new DOMException("Transition aborted", "AbortError");
  }

  const currentContainer = document.querySelector(
    '[data-transition="container"]',
  );
  const wrapper = document.querySelector('[data-transition="wrapper"]');

  gsap.killTweensOf(currentContainer);
  if (wrapper) {
    const allContainers = wrapper.querySelectorAll(
      '[data-transition="container"]',
    );
    allContainers.forEach((container) => {
      gsap.killTweensOf(container);
      gsap.killTweensOf(container.querySelector("#page_content"));
    });
  }

  const nextContainer = currentContainer.cloneNode(false);
  nextContainer.setAttribute("data-namespace", nextNamespace);

  const content = document.createElement("main");
  content.id = "page_content";
  content.className = "page_content";
  content.innerHTML = nextHTML;
  nextContainer.appendChild(content);

  wrapper.appendChild(nextContainer);

  if (signal?.aborted) {
    nextContainer.remove();
    throw new DOMException("Transition aborted", "AbortError");
  }

  const transitionFn = getTransition(currentNamespace, nextNamespace);

  activeTimeline = await transitionFn(currentContainer, nextContainer);

  if (signal) {
    signal.addEventListener("abort", () => {
      killActiveTimeline();
    });
  }

  activeTimeline.eventCallback("onComplete", () => {
    activeTimeline = null;
  });

  activeTimeline.eventCallback("onInterrupt", () => {
    activeTimeline = null;
  });

  await activeTimeline.then();

  if (signal?.aborted) {
    throw new DOMException("Transition aborted", "AbortError");
  }

  currentContainer.remove();
  gsap.set(nextContainer, { clearProps: "all" });

  if (nextModule.init) {
    nextModule.init();
  }

  const finalContainer = document.querySelector(
    '[data-transition="container"]',
  );
  finalContainer.setAttribute("data-namespace", nextNamespace);

  window.scrollTo(0, 0);
}
