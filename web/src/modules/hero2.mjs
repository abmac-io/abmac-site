import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

document.fonts.ready.then(() => {
  let split = SplitText.create(".hero-text", {
    type: "chars, words",
    autoSplit: true,
    onSplit: (self) => {
      return gsap.from(
        self.chars,
        {
          opacity: 0,
          duration: 1,
          stagger: 0.005,
          scrambleText: {
            text: "x",
            chars: "upperAndLowerCase",
            revealDelay: 0,
            speed: 1,
            delimiter: " ",
            tweenLength: true,
          },
          //ease: "expo",
          onComplete: () => {
            split.revert();
          },
        },
        0.5,
      );
    },
  });
});
