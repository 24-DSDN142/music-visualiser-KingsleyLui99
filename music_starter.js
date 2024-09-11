let backgroundImage;
let isFirstRun = true;

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // Load image on first run
  if (isFirstRun) {
    backgroundImage = loadImage('cyberpunk.jpg');
    isFirstRun = false;
  }

  // Clear background
  background(0);

  // Draw vibrating background
  drawVibratingBackground(vocal, counter);

  // Draw top equalizer
  drawTopEqualizer(vocal, drum, bass, other);

  // Draw shapes
  drawShapes(vocal, drum, bass, other, counter);

  // Draw bottom equalizer
  drawBottomEqualizer(vocal, drum, bass, other);

  // Draw text
  drawSongText(words, vocal);
}

function drawVibratingBackground(vocal, counter) {
  push();
  
  // Create zoom effect
  let zoomAmount = map(sin(counter * 0.1), -1, 1, 1, 1.05);
  
  // Create offset effect
  let xOffset = map(cos(counter * 0.05), -1, 1, -10, 10);
  let yOffset = map(sin(counter * 0.05), -1, 1, -10, 10);
  
  // Add some randomness based on vocal
  let vocalEffect = map(vocal, 0, 100, 0, 5);
  xOffset += random(-vocalEffect, vocalEffect);
  yOffset += random(-vocalEffect, vocalEffect);

  // Apply effects
  translate(width/2, height/2);
  scale(zoomAmount);
  translate(-width/2 + xOffset, -height/2 + yOffset);

  // Draw background
  image(backgroundImage, 0, 0, width, height);
  
  pop();
}

function drawTopEqualizer(vocal, drum, bass, other) {
  let barWidth = width / 4;
  let maxHeight = height / 6;
  let volumes = [vocal, drum, bass, other];
  let colors = [
    color(0, 255, 255),   // Cyan
    color(0, 191, 255),   // Deep Sky Blue
    color(30, 144, 255),  // Dodger Blue
    color(65, 105, 225)   // Royal Blue
  ];

  for (let i = 0; i < 4; i++) {
    let barHeight = map(volumes[i], 0, 100, 0, maxHeight);
    fill(colors[i]);
    rect(i * barWidth, 0, barWidth, barHeight);
  }
}

function drawShapes(vocal, drum, bass, other, counter) {
  let shapeSize = map(drum, 0, 100, 5, 20);
  let shapeColor = map(bass, 0, 100, 100, 255);
  let rotationAmount = map(other, 0, 100, 0, PI/4);

  for (let i = 0; i < 20; i++) {
    push();
    translate(random(width), random(height));
    rotate(rotationAmount * noise(i, counter * 0.01));
    fill(shapeColor, 0, shapeColor, 200);
    
    if (i % 2 === 0) {
      triangle(-shapeSize/2, shapeSize/2, shapeSize/2, shapeSize/2, 0, -shapeSize/2);
    } else {
      rect(0, 0, shapeSize, shapeSize);
    }
    pop();
  }

}

function drawBottomEqualizer(vocal, drum, bass, other) {
  let barWidth = width / 4;
  let barHeight = height / 6;
  let volumes = [vocal, drum, bass, other];
  let colors = [
    color(255, 20, 147),  // Deep Pink
    color(218, 112, 214), // Orchid
    color(138, 43, 226),  // Blue Violet
    color(186, 85, 211)   // Medium Orchid
  ];

  for (let i = 0; i < 4; i++) {
    let barLength = map(volumes[i], 0, 100, 0, barWidth);
    fill(colors[i]);
    rect(i * barWidth, height - barHeight, barLength, barHeight);
  }
}

function drawSongText(words, vocal) {
  let textMovement = map(vocal, 0, 100, -50, 50);
  textFont('Verdana');
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255);
  text(words, width/2 + textMovement, height - height/12);
}