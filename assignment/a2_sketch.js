//Click the mouse to get interaction
let baseW = 150
let baseH = 130
let minScale = 0.5
let maxScale = 2.2

// redom eyes
  let eyesParams
  const EyesR = {
  eyeScale:    [1.7, 2.4],
  eyeTiltGain: [0.5, 1.1],
  irisScale:   [0.50, 1.25],
  pupilScale:  [0.45, 1.2],
};

function newEyes(seed) {
  if (seed !== undefined) randomSeed(seed)

  const etg = random(EyesR.eyeTiltGain[0], EyesR.eyeTiltGain[1])

  const irisMax  = min(EyesR.irisScale[1],  etg)
  const pupilMax = min(EyesR.pupilScale[1], etg)

  eyesParams = {
  eyeScale:    random(EyesR.eyeScale[0], EyesR.eyeScale[1]),
  eyeTiltGain: etg,
  irisScale:   random(EyesR.irisScale[0],  irisMax),
  pupilScale:  random(EyesR.pupilScale[0], pupilMax),
  }

}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-container");

  angleMode(RADIANS);
  ellipseMode(CENTER);
  newEyes();
}

function draw() {
  background(242, 211, 211)
  
    //background
  push()
  const topR =204
  const topG =224
  const topB =255 
  const bottomR =252
  const bottomG =174
  const bottomB =174
  
  const topColor = color(topR, topG, topB);
  const bottomColor = color(bottomR, bottomG, bottomB);

  for(let y = 0; y < height; y++) {
    const lineColor = lerpColor(topColor, bottomColor, y/height);
    stroke(lineColor);
    line(0, y, width, y);
    }
  pop()  //bgend

  
  translate(width/2, height/2)
  let dx = mouseX-width/2
  let dy = mouseY-height/2
  let ang = atan2(dy, dx)

  let d = dist(width/2,height/2,mouseX,mouseY)
  let maxD = dist(0, 0,width / 2,height / 2)
  let t = constrain(d /maxD,0,1)
  let s = lerp(minScale, maxScale, t)

  rotate(ang)
  scale(s)

  drawCatFace(baseW,baseH,ang)
}

function drawCatFace(w,h,ang) {
  noStroke()
  
  //ears
  const earOuter = color(189,180,168)   //outside
  const earStroke = color(120,100,90)  //outline
  const earInner = color(237,200,190) //inside

  // left
  push()
  translate(-w*0.2,-h*0.6)
  rotate(-0.08)
  fill(earOuter)
  stroke(earStroke)
  strokeWeight(2)
  triangle(0, 0,-w * 0.14,h * 0.22,w * 0.14,h * 0.22)//outside
  noStroke()
  fill(earInner)
  triangle(0,h * 0.02,-w * 0.09,h * 0.18,w * 0.09,h * 0.18)//inside
  pop()

  // right
  push()
  translate( w*0.2,-h*0.6)
  rotate(0.08)
  fill(earOuter)
  stroke(earStroke)
  strokeWeight(2)
  triangle(0, 0,-w * 0.14,h * 0.22,w * 0.14,h * 0.22)//outside
  noStroke()
  fill(earInner)
  triangle(0,h *0.02, -w *0.09, h*0.18, w*0.09, h*0.18)//inside
  pop()
  
  //ears end

  // head
  fill(189,180,168)
  ellipse(0,0,w,h)

  // eyes
  const eyeScale =eyesParams.eyeScale
  const eyeX = w*0.22
  const eyeY =-h*0.10
  const eyeW = w*0.16*eyeScale
  const eyeH = h*0.12*eyeScale

  //Tilt limit
  let eyeTilt= constrain(ang * eyesParams.eyeTiltGain, -radians(60), radians(20))

  //Iris/pupil size
  const irisW = w * 0.16 * eyesParams.irisScale
  const irisH = h * 0.24 * eyesParams.irisScale
  const pupilW = w * 0.09 * eyesParams.pupilScale
  const pupilH = h * 0.16 * eyesParams.pupilScale

  // left eye
  push();
  translate(-eyeX, eyeY)
  rotate(-eyeTilt)
  fill(247, 245, 242); ellipse(0, 0, eyeW, eyeH)      //white
  fill(176, 219, 245); ellipse(0, 0, irisW,  irisH)   //iris 
  fill(56, 149, 224);  ellipse(0, 0, pupilW, pupilH)  //pupil
  pop()

  // right eye
  push()
  translate(eyeX, eyeY)
  rotate(eyeTilt)
  fill(247, 245, 242); ellipse(0, 0, eyeW, eyeH)    //white
  fill(176, 219, 245); ellipse(0, 0, irisW, irisH)  //iris 
  fill(56, 149, 224);  ellipse(0, 0, pupilW, pupilH)//pupil
  pop()
  
 

  // Chin circle+spiral
  
  //circle
  fill(250, 237, 217)
  const chinCX = -eyeX + 39
  const chinCY = -eyeY + 30
  const chinW  = w * 0.2
  const chinH  = h * 0.2
  ellipse(chinCX, chinCY, chinW, chinH)

  //Spiral restriction
  const r = 0.5 * min(chinW, chinH) * 0.9
  drawSpiral(chinCX, chinCY+2, r, 2)

  //mouth
  noFill()
  stroke(80)
  strokeWeight(2)
  arc(-w * 0.05, h * 0.08, w * 0.12, h * 0.12, 0.1, Math.PI / 4)
  arc( w * 0.07, h * 0.08, w * 0.12, h * 0.12, Math.PI / 3, Math.PI)
  
  /*I feel better without this
  // whiskers
  push()                       
  stroke(112)
  strokeWeight(1)
  noFill()
  const whiskerStartY = h * 0.04
  const whiskerLen    = w * 0.15 
  const whiskerRise   = h * 0.06
  const gapY          = h * 0.03

  //left
  for (let i = -1; i <= 1; i++) {
    const y0 = whiskerStartY + i * gapY;
    bezier(-w*0.04, y0,
           -w*0.1, y0- whiskerRise*0.2,
           -w*0.1, y0 - whiskerRise*0.4,
           -w*0.1 - whiskerLen, y0 - whiskerRise)

  }

  // right
  for (let i = -1; i <= 1; i++) {
    const y0 = whiskerStartY + i * gapY
    bezier(w*0.04, y0,
           w*0.1, y0 - whiskerRise*0.2,
           w*0.1, y0 - whiskerRise*0.8,
           w*0.1 + whiskerLen, y0 - whiskerRise)
  }
  */
  
    //nose
  fill(237, 174, 157)
  noStroke()
  let noseW = w * 0.08 * 2
  let noseH = h * 0.06 * 3
  arc(0, -2, noseW, noseH, 0, Math.PI, OPEN)

  //nostril
  fill(120, 80, 60)
  let nostrilW = w * 0.02
  let nostrilH = h * 0.02
  let nostrilOffset = w * 0.03
  ellipse(-nostrilOffset, h * 0.04, nostrilW * 2, nostrilH * 3)
  ellipse( nostrilOffset,  h * 0.04, nostrilW * 2, nostrilH * 3)
  pop()

  
  
}

  //spiral
function drawSpiral(cx, cy, r, turns) {
  noFill()
  stroke(186, 165, 134)
  strokeWeight(2)

  beginShape()
  const steps = 200
  for (let i = 0; i < steps; i++) {
    const t  = map(i, 0, steps, 0, turns * TWO_PI)
    const rr = map(i, 0, steps, 0, r)
    const x  = cx + cos(t) * rr
    const y  = cy + sin(t) * rr
    vertex(x, y)
  }
  endShape()
  

  
}

  //Random eyes
function mousePressed() { newEyes(); }
function keyPressed() {
   if (key === 'e' || key === 'E' || key === 'r' || key === 'R') newEyes();
   if (key === 's' || key === 'S') saveCanvas('face', 'png');
}