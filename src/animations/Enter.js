import { wrap_chars } from "../helpers/wrap";
import { gsap, SplitText } from "../lib";

const ENTER = (nextContainer, delay = 0) => {
  const t = nextContainer?.querySelector("h1") || document.querySelector("h1");
  const img =
    nextContainer?.querySelector(".img_hero_small") ||
    document.querySelector(".img_hero_small");
  const linesRight =
    nextContainer?.querySelectorAll(".inner_linesright") ||
    document.querySelectorAll(".inner_linesright");
  const ps =
    nextContainer?.querySelectorAll(".anim_p") ||
    document.querySelectorAll(".anim_p");
  const linesLeft =
    nextContainer?.querySelectorAll(".inner_linesleft") ||
    document.querySelectorAll(".inner_linesleft");

  const background =
    nextContainer?.querySelectorAll(".img_c") ||
    document.querySelectorAll(".img_c");

  if (!t || !ps.length || !linesRight.length || !linesLeft.length || !img)
    return null;

  gsap.set(t, { opacity: 1 });

  const s = new SplitText(t, { type: "chars" });

  wrap_chars(s, true);

  gsap.set(img, {
    y: "120%",
    force3D: true,
    willChange: "transform",
    backfaceVisibility: "hidden",
  });

  gsap.set(background, {
    opacity: 0,
    willChange: "opacity",
  });
  gsap.set(ps, {
    opacity: 0,
    willChange: "opacity",
  });
  gsap.set(linesRight, {
    x: "-100%",
    force3D: true,
    willChange: "transform",
    backfaceVisibility: "hidden",
  });

  gsap.set(linesLeft, {
    x: "100%",
    force3D: true,
    willChange: "transform",
    backfaceVisibility: "hidden",
  });

  const tl = gsap.timeline({
    defaults: {
      force3D: true,
      lazy: false,
    },
    delay,
  });

  tl.to(
    s.chars,
    {
      rotateX: 0,
      y: 0,
      duration: 2.1,
      stagger: 0.032,
      ease: "expo.out",
      immediateRender: false,
    },
    0,
  )
    .to(
      img,
      {
        y: 0,
        duration: 1.75,
        ease: "expo.out",
        immediateRender: false,
        onComplete: () => {
          gsap.set(img, { clearProps: "willChange" });
        },
      },
      0,
    )
    .to(
      ps,
      {
        opacity: 1,
        duration: 0.7,
        ease: "none",
        immediateRender: false,
        onComplete: () => {
          gsap.set(ps, { clearProps: "willChange" });
        },
      },
      0.9,
    )
    .to(
      background,
      {
        opacity: 0.17,
        duration: 0.8,
        ease: "none",
        immediateRender: false,
        onComplete: () => {
          gsap.set(ps, { clearProps: "willChange" });
        },
      },
      0,
    )
    .to(
      linesRight,
      {
        x: 0,
        duration: 1.5,
        stagger: {
          amount: 0.3,
          from: "end",
        },
        ease: "expo.out",
        immediateRender: false,
        onComplete: () => {
          gsap.set(linesRight, { clearProps: "willChange" });
        },
      },
      0,
    )
    .to(
      linesLeft,
      {
        x: 0,
        duration: 1.5,
        stagger: {
          amount: 0.3,
          from: "end",
        },
        ease: "expo.out",
        immediateRender: false,
        onComplete: () => {
          gsap.set(linesLeft, { clearProps: "willChange" });
        },
      },
      0,
    );

  return { timeline: tl, splitInstance: s };
};

export default ENTER;
