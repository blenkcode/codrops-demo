import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(SplitText);

export const customEases = {
  pageTransition: CustomEase.create(
    "pageTransition",
    "M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1",
  ),
};

export { gsap, SplitText };

export default { gsap, customEases, SplitText };
