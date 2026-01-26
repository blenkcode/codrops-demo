import { gsap, customEases } from "../../lib/index.js";
import ENTER from "../../animations/Enter.js";
export async function defaultTransition(currentContainer, nextContainer) {
  const content = nextContainer.querySelector("#page_content");

  gsap.set(nextContainer, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    willChange: "clip-path",
    width: "100%",
    height: "100vh",
    zIndex: 10,
  });

  gsap.set(content, { y: "40vh", force3D: true });

  const tl = gsap.timeline();

  tl.to(
    currentContainer,
    {
      y: "-30vh",
      duration: 1.3,
      force3D: true,
      ease: customEases.pageTransition,
    },
    0,
  )
    .to(
      currentContainer,
      {
        opacity: 0.25,
        duration: 0.6,
        force3D: true,
        ease: "none",
      },
      0,
    )

    .to(
      content,
      {
        y: 0,
        duration: 1.3,
        force3D: true,
        ease: customEases.pageTransition,
      },
      0,
    )
    .to(
      nextContainer,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.3,
        force3D: true,
        ease: customEases.pageTransition,
      },
      0,
    );
  tl.add(() => {
    ENTER(nextContainer);
  }, 0);

  return tl;
}
