import { gsap } from "../lib/index.js";
import { getTransition } from "./registry.js";
import { defaultTransition } from "./animations/default.js";
export async function executeTransition({
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
  const images = nextContainer.querySelectorAll("img");
  if (images.length > 0) {
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve();
            img.onload = resolve;
            img.onerror = resolve;
          }),
      ),
    );
  }

  if (nextModule.init) {
    nextModule.init({ container: nextContainer });
  }

  // const transitionFn = getTransition(currentNamespace, nextNamespace);
  const timeline = await defaultTransition(currentContainer, nextContainer);

  await timeline.then();

  currentContainer.remove();
  gsap.set(nextContainer, {
    clearProps: "clipPath,position,top,left,width,height,zIndex,opacity",
    force3D: true,
  });
}
