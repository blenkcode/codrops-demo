const metaConfig = {
  home: {
    title: "Building Asynchronous Page Transitions in Vanilla JavaScript",
    description: "In this tutorial, we'll build a lightweight async page transition system from scratch using vanilla JavaScript, GSAP, and Vite",

  },
  about: {
  title: "Building Asynchronous Page Transitions in Vanilla JavaScript",
    description: "In this tutorial, we'll build a lightweight async page transition system from scratch using vanilla JavaScript, GSAP, and Vite",

  },
 
};

export function updateMetaTags(namespace) {
  const meta = metaConfig[namespace];
  
  if (!meta) return;

  // Title
  document.title = meta.title;

  // Description
  updateOrCreateMeta('name', 'description', meta.description);

  // Keywords
//   updateOrCreateMeta('name', 'keywords', meta.keywords);

  // Open Graph
//   updateOrCreateMeta('property', 'og:title', meta.title);
//   updateOrCreateMeta('property', 'og:description', meta.description);
//   updateOrCreateMeta('property', 'og:image', meta.ogImage);
//   updateOrCreateMeta('property', 'og:url', window.location.href);
//   updateOrCreateMeta('property', 'og:type', 'website');

//   updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
//   updateOrCreateMeta('name', 'twitter:title', meta.title);
//   updateOrCreateMeta('name', 'twitter:description', meta.description);
//   updateOrCreateMeta('name', 'twitter:image', meta.ogImage);
}

function updateOrCreateMeta(attr, key, content) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

export default { updateMetaTags, metaConfig };