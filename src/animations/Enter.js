import { wrap_chars, wrap_lines } from "../helpers/wrap";
import { gsap, SplitText, customEases } from "../lib";

const ENTER = (nextContainer, delay = 0) => {
  const t = nextContainer?.querySelector("h1") || document.querySelector("h1");
  const img =
    nextContainer?.querySelector(".img_hero") ||
    document.querySelector(".img_hero");

  if (!t) return [];

  gsap.set(t, { opacity: 1 });

  const s = new SplitText(t, { type: "chars" });

  wrap_chars(s, true);

  const tweens = [];

  tweens.push({
    target: s.chars,
    vars: {
      rotateX: 0,
      y: 0,
      duration: 1.9,
      stagger: {
        each: 0.032,
      },
      ease: "expo.out",
    },
    position: delay,
  });
  tweens.push({
    target: img,
    vars: {
      y: 0,

      duration: 1.9,

      ease: "expo.out",
    },
    position: delay,
  });

  return { tweens, splitInstance: s };
};

export default ENTER;
