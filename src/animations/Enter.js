import { wrap_chars, wrap_lines } from "../helpers/wrap";
import { gsap, SplitText, customEases } from "../lib";

const ENTER = (nextContainer) => {
  const t = nextContainer.querySelector("h1");
  const co = nextContainer.querySelector(".page_content");
  const ps = nextContainer.querySelector(".p_anim");

  if (!t) return;

  const tl = gsap.timeline({
    defaults: {
      force3D: true,
    },
  });
  gsap.set(t, { opacity: 1 });

  const s = new SplitText(t, { type: "chars" });
  const p = new SplitText(ps, { type: "lines" });

  wrap_chars(s, true);
  wrap_lines(p);

  tl.to(
    s.chars,
    {
      rotateX: 0,
      y: 0,
      duration: 1.2,
      stagger: {
        each: 0.036,
        ease: "power1.inOut",
      },
      ease: "power3.out",
    },
    0.3,
  )
    .to(
      co,
      {
        y: 0,
        duration: 1.4,

        ease: customEases.pageTransition,
      },
      0,
    )

    .to(
      p.lines,
      {
        y: 0,

        stagger: 0.06,
        duration: 1.8,
        force3D: true,
        ease: "power3.out",
      },
      0.45,
    );
};
export default ENTER;
