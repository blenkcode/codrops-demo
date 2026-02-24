import { gsap } from "../lib";

class Link extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleHoverIn = this.handleHoverIn.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
  }

  connectedCallback() {
    this.render();
    if (this.link) {
      this.link.addEventListener("click", this.handleClick);
      this.link.addEventListener("mouseenter", this.handleHoverIn);
      this.link.addEventListener("mouseleave", this.handleHoverOut);
    }
  }

  disconnectedCallback() {
    if (this.link) {
      this.link.removeEventListener("click", this.handleClick);
      this.link.removeEventListener("mouseenter", this.handleHoverIn);
      this.link.removeEventListener("mouseleave", this.handleHoverOut);
    }
  }

  isSamePage() {
    const href = this.link.getAttribute("href");
    const currentPath = window.location.pathname;

    const normalize = (path) => {
      let normalized = path.replace(/\/+/g, "/").replace(/\/$/, "");

      if (!normalized.startsWith("/") && !normalized.startsWith("http")) {
        const base = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
        normalized = base + normalized;
      }

      normalized = normalized
        .replace(/\/index\.html$/, "")
        .replace(/^index\.html$/, "/");

      return normalized || "/";
    };

    const current = normalize(currentPath);
    const target = normalize(href);

    if (current.startsWith("mail:to") || current.startWidth("https://")) {
      return false;
    }

    return current === target;
  }

  handleHoverIn() {
    const line = this.querySelector(".line_a_inner");

    if (!line) {
      this.link.style.cursor = "default";
      return;
    }

    this.link.style.cursor = "pointer";
    gsap.set(line, { x: "-101%" });
    gsap.killTweensOf(line);
    gsap.to(line, { x: 0, duration: 0.8, ease: "power3.out" });
  }

  handleHoverOut() {
    const line = this.querySelector(".line_a_inner");

    if (!line) return;

    gsap.killTweensOf(line);
    gsap.to(line, { x: "101%", duration: 0.5, ease: "power3.out" });
  }

  handleClick(e) {
   

    if (this.isSamePage()) {
      e.preventDefault();
    }
  }

  render() {
    const href = this.getAttribute("href");
    const text = this.textContent.trim();
    const blank = this.getAttribute("target") || null;
    const rel = this.getAttribute("rel") || null;
    this.innerHTML = /*html*/ `
      <a href="${href}" ${rel ? `rel="${rel}"` : ""} ${blank ? `target="${blank}"` : ""} class="links items_anim">
        ${text}
        <div class="line_a">
          <div class="line_a_inner"></div>
        </div>
      </a>
    `;

    this.link = this.querySelector("a");
  }
}

customElements.define("link-c", Link);
