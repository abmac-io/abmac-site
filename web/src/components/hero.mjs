import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

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
          amount: 0.25
        },
        scrambleText: {
          text: 'x',
          chars: "upperAndLowercase",
          speed: 0.5,
          delimite: " ",
          tweenLength: true
        },
        onComplete: () => {
          split.revert()
        }
      })
    }
  });
})

