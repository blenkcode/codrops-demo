import { gsap } from "../lib/index.js";
import { getTransition } from "./registry.js";

export async function executeTransition({
  currentNamespace,
  nextNamespace,
  nextHTML,
  nextModule,
}) {
  const currentContainer = document.querySelector(
    '[data-transition="container"]',
  );
  const wrapper = document.querySelector('[data-transition="wrapper"]');

  const nextContainer = currentContainer.cloneNode(false);
  nextContainer.setAttribute("data-namespace", nextNamespace);

  const content = document.createElement("main");
  content.id = "page_content";
  content.className = "page_content";
  content.innerHTML = nextHTML;
  nextContainer.appendChild(content);

  wrapper.appendChild(nextContainer);

  if (nextModule.init) {
    nextModule.init({ container: nextContainer });
  }

  const transitionFn = getTransition(currentNamespace, nextNamespace);
  const timeline = await transitionFn(currentContainer, nextContainer);

  await timeline.then();

  currentContainer.remove();
  gsap.set(nextContainer, { clearProps: "all" });
  gsap.set(nextContainer, { force3D: true });
  window.scrollTo(0, 0);
}
