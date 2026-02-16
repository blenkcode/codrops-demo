import { wrap_chars, wrap_lines } from "../helpers/wrap";
import { customEases, gsap, SplitText } from "../lib";

const ENTER = (nextContainer, delay = 0) => {
  const t = nextContainer?.querySelector("h1") || document.querySelector("h1");
  const content =
    nextContainer?.querySelector(".hero_content") ||
    document.querySelector(".hero_content");
  const linesRight =
    nextContainer?.querySelectorAll(".inner_linesright") ||
    document.querySelectorAll(".inner_linesright");
  const ps =
    nextContainer?.querySelectorAll(".anim_p") ||
    document.querySelectorAll(".anim_p");
  const ps2 =
    nextContainer?.querySelectorAll(".anim_p2") ||
    document.querySelectorAll(".anim_p2");
  const linesLeft =
    nextContainer?.querySelectorAll(".inner_linesleft") ||
    document.querySelectorAll(".inner_linesleft");

  if (!t) return null;

  gsap.set(t, { opacity: 1 });

  const s = new SplitText(t, { type: "chars" });
  const p = new SplitText(ps, { type: "lines" });
  const ptwo = new SplitText(ps2, { type: "lines" });
  wrap_chars(s);
  wrap_lines(p);
  wrap_lines(ptwo);
  // gsap.set(img, {
  //   y: "120%",
  //   force3D: true,
  //   willChange: "transform",
  //   backfaceVisibility: "hidden",
  // });

  // gsap.set(ps, {
  //   opacity: 0,
  //   willChange: "opacity",
  // });
  gsap.set(linesRight, {
    x: "-100%",
    force3D: true,

    backfaceVisibility: "hidden",
  });

  gsap.set(linesLeft, {
    x: "-100%",
    force3D: true,

    backfaceVisibility: "hidden",
  });
  gsap.set(content, { opacity: 1 });
  const tl = gsap.timeline({
    defaults: {
      force3D: true,
      lazy: false,
    },
  });

  tl.to(
    s.chars,
    {
      rotateX: 0,
      y: 0,
      force3D: true,
      duration: 2.1,
      stagger: 0.035,
      ease: "expo.out",
    },
    delay,
  )
    .to(
      p.lines,
      {
        y: 0,
        duration: 1.65,
        stagger: {
          amount: 0.08,
          from: "end",
        },
        force3D: true,
        ease: "power3.out",
      },
      delay + 0.2,
    )
    .to(
      ptwo.lines,
      {
        y: 0,
        duration: 1.65,
        stagger: {
          amount: 0.08,
          from: "end",
        },
        force3D: true,
        ease: "power3.out",
      },
      delay + 0.2,
    )

    .to(
      linesRight,
      {
        x: 0,
        duration: 1,
        stagger: {
          amount: 0.25,
          from: "start",
        },
        ease: "power2.inOut",
      },
      0,
    )
    .to(
      linesLeft,
      {
        x: 0,
        duration: 1,
        stagger: {
          amount: 0.25,
          from: "start",
        },
        ease: "power2.inOut",
      },
      0,
    );

  return { timeline: tl, splitInstance: s };
};

export default ENTER;
