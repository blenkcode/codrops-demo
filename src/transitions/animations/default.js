import { gsap, customEases } from "../../lib/index.js";

export function defaultTransition(currentContainer, nextContainer) {
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

  const tl = gsap.timeline();

  tl.to(
    currentContainer,
    {
      y: "-30vh",
      opacity: 0.4,
      duration: 0.75,
      force3D: true,
      ease: customEases.pageTransition,
    },
    0,
  )

    .to(
      nextContainer,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        force3D: true,

        ease: customEases.pageTransition,
      },
      0,
    );

  return tl;
}
