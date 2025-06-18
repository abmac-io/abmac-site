import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

console.clear();

const stage = document.querySelector(".stage");
let gltl = gsap.timeline({ delay: 1 });
let bandST = new SplitText(".name", {
  type: "chars",
  charsClass: "bandChar",
  position: "absolute",
});

function intro() {
  let tl = gsap.timeline({
    delay: 1,
    defaults: {
      duration: 2,
      ease: "power4",
    },
  });
  tl.from(".names", {
    x: function (i) {
      if (i % 2 == 0) {
        return 1000;
      }
      return -1000;
    },
    stagger: 0.15,
  }).from(
    "p span",
    {
      y: 70,
      stagger: 0.1,
    },
    2,
  );

  return tl;
}

function outro() {
  let tl = gsap.timeline({
    delay: 1,
    defaults: {
      duration: 2,
      ease: "power4",
    },
  });
  tl.from(".names", {
    x: function (i) {
      if (i % 2 == 0) {
        return -1000;
      }
      return 1000;
    },
    stagger: 0.15,
  }).from(
    "p span",
    {
      y: 70,
      stagger: 0.1,
    },
    2,
  );

  return tl;
}

function loopAnim() {
  let tl = gsap.timeline({
    repeat: -1,
  });

  tl.to(".names", {
    y: -102,
    duration: 5,
    ease: "none",
  })
    .from(
      ".name__end--red .bandChar",
      {
        y: 120,
        duration: 3,
        ease: "power4",
        stagger: 0.05,
      },
      1,
    )
    .from(
      ".name__end--blue .bandChar",
      {
        y: 120,
        duration: 3,
        ease: "power4",
        stagger: 0.05,
      },
      1.3,
    )
    .from(
      ".band:nth-of-type(5) .name--blue .bandChar",
      {
        y: -120,
        duration: 2,
        ease: "power4.inOut",
        stagger: -0.05,
      },
      0,
    )
    .to(
      ".band:nth-of-type(6) .name--blue .bandChar",
      {
        y: 120,
        duration: 2,
        ease: "power4.inOut",
        stagger: -0.05,
      },
      0,
    );

  return tl;
}

function init() {
  gsap.set(stage, { autoAlpha: 1 });
  gsap.set(".content", { rotate: -25 });
  stage.onclick = () => {
    gltl.add(outro());
    //gltl.restart();
  };

  gltl.add(intro());
  gltl.add(loopAnim(), 0);
}

function resize() {
  let vh = window.innerHeight;
  let sh = stage.offsetHeight;
  let scaleFactor = vh / sh;
  if (scaleFactor < 1) {
    gsap.set(stage, { scale: scaleFactor });
  } else {
    gsap.set(stage, { scale: 1 });
  }
}

window.onresize = resize;

window.onload = () => {
  init();
  resize();
  // GSDevTools.create();
};
