import { gsap } from "../lib/index";

export function wrap_lines(el) {
  el.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
      overflow: hidden;
      line-height: 100%;
      transform: translateZ(0);
      backface-visibility: hidden;
      margin-bottom: 0.1rem;
    `;
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.set(el.lines, {
    y: "100%",
    z: 0,
    force3D: true,
    willChange: "transform",
  });
}

export function wrap_chars(el, z) {
  el.chars.forEach((char) => {
    const wrapper = document.createElement("span");
    wrapper.style.cssText = `
      overflow: hidden;
      transform: translateZ(0);
      backface-visibility: hidden;
      display: inline-block;
      perspective: 1000px;
    `;
    wrapper.classList.add("char-wrapper");
    char.parentNode.insertBefore(wrapper, char);
    wrapper.appendChild(char);
  });

  if (z) {
    gsap.set(el.chars, {
      y: "70%",
      force3D: true,
      rotateX: 80,
      willChange: "transform",
    });
  } else {
    gsap.set(el.chars, {
      y: "100%",
      force3D: true,
      willChange: "transform",
    });
  }
}

export default { wrap_lines, wrap_chars };
