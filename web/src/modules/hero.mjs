import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  let split = SplitText.create(".hero-text", {
    type: "chars, words, lines",
    wordsClass: "word++",
    autoSplit: true,
    onSplit: (self) => {
      return gsap.from(self.chars, {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => {
          split.revert()
        }
      })
    }
  });
})

