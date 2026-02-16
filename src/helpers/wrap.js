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

    force3D: true,
    willChange: "transform",
  });
}

export function wrap_chars(el) {
  // el.chars.forEach((char) => {
  //   const wrapper = document.createElement("span");
  //   wrapper.style.cssText = `
  //     overflow-y: hidden;
  //     perspective: 1000px;
  //     background-color:aqua;
  //   `;
  //   wrapper.classList.add("char-wrapper");
  //   char.parentNode.insertBefore(wrapper, char);
  //   wrapper.appendChild(char);
  // });

  gsap.set(el.chars, {
    y: "100%",
    force3D: true,
    rotateX: 60,
  });
}

export default { wrap_lines, wrap_chars };
