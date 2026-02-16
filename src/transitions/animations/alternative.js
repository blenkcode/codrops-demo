import { gsap, customEases } from "../../lib/index.js";

export function alternativeTransition(currentContainer, nextContainer) {
  gsap.set(nextContainer, {
    opacity: 1,
    position: "fixed",
    top: 0,

    left: 0,
    width: "100%",
    height: "100vh",
    x: "100%",
    zIndex: 10,
  });

  const tl = gsap.timeline();

  tl.to(
    currentContainer,
    {
      x: "-50%",
      scale: 0.8,
      opacity: 0.4,
      duration: 1.5,
      force3D: true,
      ease: customEases.pageTransition2,
    },
    0,
  )

    .to(
      nextContainer,
      {
        x: 0,
        duration: 1.5,

        force3D: true,
        ease: customEases.pageTransition2,
      },
      0,
    );

  return tl;
}
