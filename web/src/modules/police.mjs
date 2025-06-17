import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { Application, Container, Graphics, Sprite, Texture } from "pixi.js";

gsap.registerPlugin(PixiPlugin, ScrambleTextPlugin, SplitText);

PixiPlugin.registerPIXI({
  Application,
  Container,
  Graphics,
  Sprite,
});

console.clear();

const MULTIPLY = 'multiply';

const gridSize = 11;
const numContainers = gridSize * gridSize;
const circD = 64;
const circOffsetX = 0.11111;
const circOffsetY = 0.15873;
const color1 = 0xFE3A2D;
const color2 = 0x23395B;
const color3 = 0x1C7C54;
//const color1 = 0x01AFF6;
//const color2 = 0xF20085;
//const color3 = 0xFFD036;
const animDuration = 1.5;

const stage = document.querySelector('.stage');
const app = new Application();

// Pre-create containers array for better memory management
const containers = [];
let circleTexture;

async function init() {
  await app.init({
    width: 716,
    height: 724,
    backgroundColor: 0xDAE0D2,
    antialias: true,
    // Performance optimizations
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    powerPreference: "high-performance"
  });

  gsap.set(stage, { autoAlpha: 1 });
  stage.appendChild(app.canvas);

  app.ticker.stop();
  gsap.ticker.add(() => {
    app.ticker.update();
  });

  // Create circle texture with higher quality
  circleTexture = createCircleTexture();

  // Batch create all containers
  createContainers();

  // Add all containers at once
  app.stage.addChild(...containers);
  app.stage.x = 2;
}

function createCircleTexture() {
  const g = new Graphics();
  // Use higher resolution for better quality when scaled
  const scale = 2;
  g.circle(circD * scale / 2, circD * scale / 2, circD * scale / 2)
    .fill({ color: 0xFFFDF8 });

  return app.renderer.generateTexture(g, {
    resolution: scale,
    width: circD * scale,
    height: circD * scale
  });
}

function createContainers() {
  // Pre-allocate exact array size
  containers.length = numContainers;

  let containerIndex = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const container = new Container();

      // Create all three circles at once
      const sprites = createCircleSprites();

      // Position circles
      sprites[1].x = -circOffsetX * circD;
      sprites[1].y = circOffsetY * circD;

      sprites[2].x = circOffsetX * circD;
      sprites[2].y = circOffsetY * circD;

      // Add all children at once
      container.addChild(...sprites);

      // Position container
      container.x = i * circD + circD / 2 + i * 2;
      container.y = j * circD + circD / 2 + j * 2;

      containers[containerIndex++] = container;
    }
  }
}

function createCircleSprites() {
  const colors = [color1, color2, color3];
  const sprites = new Array(3);

  for (let i = 0; i < 3; i++) {
    const sprite = new Sprite(circleTexture);
    sprite.anchor.set(0.5);
    sprite.tint = colors[i];
    sprite.blendMode = MULTIPLY;
    sprites[i] = sprite;
  }

  return sprites;
}

// Optimized animation with single timeline
let mainTimeline;
function animate() {
  // Split text only when needed
  const bandText = new SplitText('.band', {
    type: "chars",
    charsClass: "char",
    position: "relative"
  });

  mainTimeline = gsap.timeline({ delay: 0.4 })
    .from(containers, {
      pixi: { scale: 0, rotation: 360 },
      duration: 2,
      ease: 'power4',
      stagger: {
        each: 0.2,
        grid: [gridSize, gridSize],
        from: [0, 1]
      }
    })
    .to(containers, {
      duration: animDuration,
      ease: 'sine.inOut',
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: false,
        grid: [gridSize, gridSize],
        from: [0, 1],
        onStart: function () {
          const children = this.targets()[0].children;

          // Start from scale 0 to avoid artifacts
          gsap.set(children, { pixi: { scale: 0 } });

          // Animate from 0 to 1 and back to 0
          gsap.to(children, {
            pixi: { scale: 1.5 },
            duration: animDuration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        }
      }
    }, 0.01)
    .from('.band .char', {
      duration: 2,
      y: 150,
      stagger: 0.05,
      scrambleText: {
        text: "x",
        chars: "lowerCase",
        speed: 0.3,
        delimiter: " ",
        tweenLength: false
      },
      ease: 'expo'
    }, 0.5)
    .from('.details span', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'expo',
      stagger: 0.1
    }, 0.9);
}

// Debounced resize for better performance
let resizeTimeout;
function resize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const vh = window.innerHeight;
    const sh = stage.offsetHeight;
    const scaleFactor = Math.min(vh / sh, 1);
    gsap.set(stage, { scale: scaleFactor });
  }, 150);
}

// Cleanup function
function cleanup() {
  if (mainTimeline) {
    mainTimeline.kill();
  }
  if (circleTexture) {
    circleTexture.destroy(true);
  }
  containers.forEach(container => {
    container.destroy({ children: true });
  });
  containers.length = 0;
}

window.addEventListener('resize', resize);

window.addEventListener('load', async () => {
  await init();
  resize();
  animate();
});

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);
//
//
//import { gsap } from "gsap";
//import { PixiPlugin } from "gsap/PixiPlugin";
//import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
//import { SplitText } from "gsap/SplitText";
//import { Application, Container, Graphics, Sprite } from "pixi.js";
//
//gsap.registerPlugin(PixiPlugin, ScrambleTextPlugin, SplitText);
//
//PixiPlugin.registerPIXI({
//  Application,
//  Container,
//  Graphics,
//  Sprite,
//});
//
//console.clear();
//
///const MULTIPLY = 'multiply';
//
//const gridSize = 11;
//const numContainers = gridSize * gridSize;
//const circD = 63; // circle diameter
//const circOffsetX = 0.11111; // circle2/3 x offset
//const circOffsetY = 0.15873; // circle2/3 y offset
//const color1 = 0x01AFF6; // blue
//const color2 = 0xF20085; // pink
//const color3 = 0xFFD036; // yellow
//const animDuration = .5;
//const bandText = new SplitText('.band', { type: "chars", charsClass: "char", position: "relative" });
//const detailsText = new SplitText('.details p', { type: "lines", charsClass: "line", position: "relative" });
//
//const stage = document.querySelector('.stage');
//const app = new Application();
//
//async function init() {
//  await app.init({
//    width: 716,
//    height: 724,
///    backgroundColor: 0xDAE0D2,
//    antialias: true
//  });
//
//  gsap.set(stage, { autoAlpha: 1 });
//  stage.appendChild(app.canvas);
//
//  app.ticker.stop(); // Stop Pixi ticker using stop() function
//
//  gsap.ticker.add(() => { // Now, use 'tick' from gsap
//    app.ticker.update();
//  });
//
//  // Create a white circle texture once
//  const circleTexture = (() => {
//    const g = new Graphics();
//    g.circle(circD / 2, circD / 2, circD / 2)
//      .fill({ color: 0xFFFFFF });
//    return app.renderer.generateTexture(g);
//  })();
//
//  for (let i = 0; i < gridSize; i++) {
//
//    for (let j = 0; j < gridSize; j++) {
//
//      const container = new Container();
//
//      const circContainer1 = new Container();
//      const circContainer2 = new Container();
//      const circContainer3 = new Container();
//
//      const circle1 = new Sprite(circleTexture);
//      circle1.anchor.set(0.5); // Center the sprite
//      circle1.tint = color1;
//      circle1.blendMode = MULTIPLY;
//
//      circContainer1.addChild(circle1);
//      circContainer1.x = 0;
//      circContainer1.y = 0;
//      container.addChild(circContainer1);
//
//      const circle2 = new Sprite(circleTexture);
//      circle2.anchor.set(0.5); // Center the sprite
//      circle2.tint = color2;
//      circle2.blendMode = MULTIPLY;
//
//      circContainer2.addChild(circle2);
//      circContainer2.x = -circOffsetX * circD;
//      circContainer2.y = circOffsetY * circD;
//      container.addChild(circContainer2);
//
//      const circle3 = new Sprite(circleTexture);
//      circle3.anchor.set(0.5); // Center the sprite
//      circle3.tint = color3;
//      circle3.blendMode = MULTIPLY;
//
//      circContainer3.addChild(circle3);
//      circContainer3.x = circOffsetX * circD;
//      circContainer3.y = circOffsetY * circD;
//      container.addChild(circContainer3);
//
//      app.stage.addChild(container);
//
//      // Position the 3 circle container
//      container.x = i * circD + circD / 2 + i * 2;
//      container.y = j * circD + circD / 2 + j * 2;
//    }
//
//  }
//
//  app.stage.x = 2;
//}
//
//function animate() {
//  gsap.timeline({ delay: 0.2 }).from(app.stage.children, {
//    pixi: { scale: 0, rotation: 360 },
//    duration: 2,
//    ease: 'power4',
//    stagger: {
//      each: 0.1,
//      grid: [gridSize, gridSize],
//      from: [0, 1]
//    }
//  })
//    .to(app.stage.children, {
//      duration: animDuration,
//      ease: 'sine.inOut',
//      stagger: {
//        each: 0.1,
//        repeat: -1,
//        yoyo: true,
//        grid: [gridSize, gridSize],
//        from: [0, 1],
//        onStart: function () {
//          gsap.to(this.targets()[0].children, {
//            pixi: { scale: 0.15 },
//            duration: animDuration,
//            ease: 'sine.inOut',
//            repeat: -1,
//            yoyo: true
//          })
//        }
//      }
//    }, 0.1)
//    .from('.band .char', {
//      duration: 2,
//      y: 150,
//      stagger: 0.05,
//      scrambleText: { text: "x", chars: "lowerCase", speed: 0.3, delimiter: " ", tweenLength: false },
//      ease: 'expo'
//    }, 0.5)
//    .from('.details span', {
//      duration: 1.5,
//      y: 50,
//      opacity: 0,
//      ease: 'expo',
//      stagger: 0.1
//    }, 0.9)
//}
//
//function resize() {
//  let vh = window.innerHeight;
//  let sh = stage.offsetHeight;
//  let scaleFactor = vh / sh;
//  if (scaleFactor < 1) {
//    gsap.set(stage, { scale: scaleFactor });
//  }
//  else {
//    gsap.set(stage, { scale: 1 });
//  }
//}
//
//window.onresize = resize;
//
//window.onload = async () => {
//  await init();
//  resize();
//  animate();
//};
