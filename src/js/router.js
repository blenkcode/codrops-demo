import { gsap } from "../lib/index.js";

const routes = {
  "/": {
    namespace: "home",
    loader: () => import("../pages/home/home.js"),
  },
  "/about": {
    namespace: "about",
    loader: () => import("../pages/about/about.js"),
  },
};

let executeTransitionModule = null;
let enterModule = null;

class Router {
  constructor() {
    this.currentPage = null;
    this.currentNamespace = null;
    this.isTransitioning = false;
    this.abortController = null;
    this.cache = new Map();
  }

  async init() {
    executeTransitionModule = await import("../transitions/pageTransition.js");
    enterModule = await import("../animations/Enter.js");

    this.loadInitialPage();
    this.setupPrefetch();

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();

        if (this.isTransitioning) return;

        const path = new URL(link.href).pathname;
        this.navigate(path);
      }
    });

    window.addEventListener("popstate", () => {
      const path = window.location.pathname;

      if (this.isTransitioning) {
        this.abortTransition();
        this.loadPageInstantly(path);
      } else {
        this.handlePopstate(path);
      }
    });
  }

  setupPrefetch() {
    const prefetchedPaths = new Set();

    document.addEventListener("mouseover", (e) => {
      if (!e.target?.closest) return;

      const link = e.target.closest("a");
      if (!link?.href) return;
      if (!link.href.startsWith(window.location.origin)) return;

      const path = new URL(link.href).pathname;
      if (path === window.location.pathname) return;
      if (prefetchedPaths.has(path)) return;

      this.prefetch(path);
      prefetchedPaths.add(path);
    });
  }

  async prefetch(path) {
    if (this.cache.has(path)) return;

    const route = routes[path];
    if (!route) return;

    try {
      const pageModule = await route.loader();
      this.cache.set(path, {
        module: pageModule,
        namespace: route.namespace,
      });
    } catch (error) {
      this.cache.delete(path);
    }
  }

  runEnterAnimation(container, delay = 0) {
    const enterData = enterModule.default(container, delay);

    if (!enterData?.tweens) return;

    const tl = gsap.timeline({ defaults: { force3D: true } });

    enterData.tweens.forEach((tween) => {
      tl.to(tween.target, tween.vars, tween.position);
    });

    if (enterData?.splitInstance) {
      tl.eventCallback("onComplete", () => {
        container._splitInstance = enterData.splitInstance;
      });
    }

    return tl;
  }

  async loadInitialPage() {
    const path = window.location.pathname;
    const route = routes[path] || routes["/"];

    const pageModule = await route.loader();
    const content = document.getElementById("page_content");
    content.innerHTML = pageModule.default();

    const container = document.querySelector('[data-transition="container"]');
    container.setAttribute("data-namespace", route.namespace);

    if (pageModule.init) {
      pageModule.init({ container });
    }

    this.runEnterAnimation(container, 0);

    this.currentPage = pageModule;
    this.currentNamespace = route.namespace;
  }

  async navigate(path) {
    if (this.isTransitioning) return;

    const currentPath = window.location.pathname;
    if (currentPath === path) return;

    window.history.pushState({}, "", path);
    await this.performTransition(path);
  }

  async handlePopstate(path) {
    await this.performTransition(path);
  }

  abortTransition() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }

    executeTransitionModule.killActiveTimeline();

    this.isTransitioning = false;
  }

  async loadPageInstantly(path) {
    const route = routes[path] || routes["/"];
    if (!route) return;

    if (this.currentPage?.cleanup) {
      this.currentPage.cleanup();
    }

    let pageData = this.cache.get(path);

    if (!pageData) {
      const pageModule = await route.loader();
      pageData = {
        module: pageModule,
        namespace: route.namespace,
      };
    }

    const wrapper = document.querySelector('[data-transition="wrapper"]');
    const allContainers = wrapper.querySelectorAll(
      '[data-transition="container"]',
    );

    allContainers.forEach((container, index) => {
      if (index > 0) {
        container.remove();
      }
    });

    const container = wrapper.querySelector('[data-transition="container"]');

    gsap.killTweensOf(container);
    gsap.set(container, { clearProps: "all" });

    const content = container.querySelector("#page_content");
    if (content) {
      content.innerHTML = pageData.module.default();
    } else {
      container.innerHTML = `<main id="page_content" class="page_content">${pageData.module.default()}</main>`;
    }

    container.setAttribute("data-namespace", pageData.namespace);

    if (pageData.module.init) {
      pageData.module.init({ container });
    }

    this.runEnterAnimation(container, 0);

    this.currentPage = pageData.module;
    this.currentNamespace = pageData.namespace;

    window.dispatchEvent(
      new CustomEvent("route-changed", {
        detail: { path, namespace: pageData.namespace },
      }),
    );

    window.scrollTo(0, 0);
  }

  async performTransition(path) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.abortController = new AbortController();

    try {
      const route = routes[path] || routes["/"];

      if (!route) return;

      if (this.currentNamespace === route.namespace) return;

      if (this.currentPage?.cleanup) {
        this.currentPage.cleanup();
      }

      let pageData = this.cache.get(path);

      if (!pageData) {
        const pageModule = await route.loader();
        pageData = {
          module: pageModule,
          namespace: route.namespace,
        };
      }

      await executeTransitionModule.executeTransition({
        currentNamespace: this.currentNamespace,
        nextNamespace: pageData.namespace,
        nextHTML: pageData.module.default(),
        nextModule: pageData.module,
        signal: this.abortController.signal,
      });

      this.currentPage = pageData.module;
      this.currentNamespace = pageData.namespace;

      window.dispatchEvent(
        new CustomEvent("route-changed", {
          detail: { path, namespace: pageData.namespace },
        }),
      );
    } finally {
      this.isTransitioning = false;
      this.abortController = null;
    }
  }
}

export const router = new Router();
