import { Text, Sprite } from 'pixi.js';

// After splitting text with SplitText
const chars = document.querySelectorAll('.char');

chars.forEach((char, i) => {
  // Create a text object for each letter
  const text = new Text({
    text: char.textContent,
    style: {
      fontFamily: 'Arial',
      fontSize: 72,
      fill: 0x01AFF6, // or any color
    }
  });

  // Convert to texture
  const letterTexture = app.renderer.generateTexture(text);
  const letterSprite = new Sprite(letterTexture);

  // Apply blend mode
  letterSprite.blendMode = 'multiply';

  // Position with overlap
  letterSprite.x = i * 50; // Adjust spacing for overlap
  letterSprite.y = 100;

  // Add to stage
  app.stage.addChild(letterSprite);
});
