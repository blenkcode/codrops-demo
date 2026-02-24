import { defaultTransition } from "./animations/index";

import { alternativeTransition } from "./animations/alternative.js";
export const transitionRegistry = {
  "home-to-about": defaultTransition,

  "about-to-home": defaultTransition,

  default: defaultTransition,
};

export function getTransition(currentNamespace, nextNamespace) {
  const key = `${currentNamespace}-to-${nextNamespace}`;
  const transition = transitionRegistry[key] || transitionRegistry.default;

  return transition;
}
