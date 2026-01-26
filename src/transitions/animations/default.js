import { gsap, customEases } from "../../lib/index.js";
import ENTER from "../../animations/Enter.js";

export async function defaultTransition(currentContainer, nextContainer) {
  const content = nextContainer.querySelector("#page_content");

  gsap.set(nextContainer, {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
    willChange: "transform, clip-path",
  });

  // gsap.set(content, {
  //   y: "40vh",
  //   force3D: true,
  //   willChange: "transform",
  // });

  const enterData = ENTER(nextContainer, 0.4);

  const tl = gsap.timeline({ defaults: { force3D: true } });

  tl.to(
    currentContainer,
    {
      y: "-30vh",
      opacity: 0.4,
      duration: 0.8,
      ease: customEases.pageTransition,
    },
    0,
  )

    .to(
      nextContainer,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        force3D: true,
        ease: customEases.pageTransition,
      },
      0,
    );

  if (enterData?.tweens) {
    enterData.tweens.forEach((tween) => {
      tl.to(tween.target, tween.vars, tween.position);
    });
  }

  if (enterData?.splitInstance) {
    tl.eventCallback("onComplete", () => {
      nextContainer._splitInstance = enterData.splitInstance;
    });
  }

  return tl;
}
