import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
export const customEases = {
  transition: CustomEase.create(
    "transition",
    "M0,0 C0.369,0.024 0.198,0.709 0.454,0.9 0.577,0.992 0.818,1.001 1,1 ",
  ),
  transitionText: CustomEase.create(
    "transitionText",
    "M0,0 C0.253,0.315 0.194,0.377 0.284,0.653 0.393,0.986 0.622,0.979 1,1  ",
  ),
  pageTransition: CustomEase.create(
    "pageTransition",
    "M0,0 C0.43,0.01 0.525,0.67 0.683,0.818 0.875,0.998 1,1 1,1 ",
  ),
};

export { gsap, SplitText, ScrollTrigger, ScrollToPlugin };

export default { gsap, customEases, SplitText, ScrollTrigger, ScrollToPlugin };
