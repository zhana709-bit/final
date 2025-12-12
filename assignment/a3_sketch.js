//Eevee Experimental Clock 
//Sleep=Night (0-4) & Afternoon (12-17)
//Avoiding the mouse while sleeping
//Follow the mouse when awake
let baseW = 220 
let baseH = 190

// motion speed
let posX = 0
let posY = 0
let velX = 0
let velY = 0


const maxSpeed = 4
const accelGain = 0.9   
const friction = 0.90  
const springK  = 0.01  

function setup() {
  createCanvas(400, 400)
  angleMode(RADIANS)
  ellipseMode(CENTER)
  posX = width/2
  posY = height/2
}

function draw() {
  //time
  const h = hour()  
  const m = minute()
  const s = second()

  // Sleeptime: 00:00-04:59 and 12:00-17:59
  const isSleep = (h >= 0 && h < 5) || (h >= 12 && h < 18)

  //bg
  drawBackgroundSectors()
  drawHourDividers() // Hourly dividing line

  // label
  drawLabelBox(isSleep)

  // pointer
  push()
  translate(width/2, height/2)
  drawHands(h, m, s)
  pop()

  //Chasing dynamics
  const dx = mouseX - posX
  const dy = mouseY - posY
  const distVal = max(1, sqrt(dx*dx + dy*dy))
  const dirX = dx / distVal
  const dirY = dy / distVal

  // Sleep: Stay away Awakening: Get close
  let ax = (isSleep ? -dirX : dirX) * accelGain
  let ay = (isSleep ? -dirY : dirY) * accelGain

  // scope
  const cx = width/2
  const cy = height/2
  ax += (cx - posX) * springK
  ay += (cy - posY) * springK

  // speed
  velX = (velX + ax) * friction
  velY = (velY + ay) * friction
  const sp = sqrt(velX*velX + velY*velY)
  if (sp > maxSpeed) {
    velX = velX / sp * maxSpeed
    velY = velY / sp * maxSpeed
  }

  // Scope setting
  posX += velX
  posY += velY
  const margin = 40
  posX = constrain(posX, margin, width - margin)
  posY = constrain(posY, margin, height - margin)

  //Eevee face（
  push()
  translate(posX, posY)
  drawCatFace(baseW, baseH, isSleep)
  pop()

  // Blue layer during sleep（
  if (isSleep) {
    drawSleepOverlay()
  }

  //text
  drawLabelText(isSleep, posX, posY)
}

  //bg
function drawBackgroundSectors() {
  push()
  translate(width/2, height/2)

  //radius
  const R = sqrt(sq(width) + sq(height)) * 0.55

  noStroke()
  for (let hh = 0; hh < 24; hh++) {
    const sleep = (hh >= 0 && hh < 5) || (hh >= 12 && hh < 18)
    if (sleep) fill(200, 220, 255)     // blue
    else       fill(255, 245, 180)     // yellow

    const a1 = hourToAngle(hh)
    const a2 = hourToAngle(hh + 1)

    beginShape()
    vertex(0, 0)
    vertex(cos(a1) * R, sin(a1) * R)
    vertex(cos(a2) * R, sin(a2) * R)
    endShape(CLOSE)
  }
  pop()
}

function drawHourDividers() {
  push()
  translate(width/2, height/2)

  stroke(120, 120, 120, 120)  
  strokeWeight(1.2)

  const R = sqrt(sq(width) + sq(height)) * 0.6
  for (let hh = 0; hh < 24; hh++) {
    const a = hourToAngle(hh)
    line(0, 0, cos(a) * R, sin(a) * R)
  }
  pop()
}

  // 24-hour clock
function hourToAngle(h24) {
  const ratio = (h24 % 24) / 24
  return -HALF_PI + TWO_PI * ratio
}

   //pointer
function drawHands(h, m, s) {
  const hourFloat = (h % 24) + m / 60 + s / 3600
  const minFloat  = m + s / 60
  const secFloat  = s

  const aHour = hourToAngle(hourFloat)
  const aMin  = -HALF_PI + TWO_PI * (minFloat / 60)
  const aSec  = -HALF_PI + TWO_PI * (secFloat / 60)

  stroke(0)

  //hour
  strokeWeight(4)
  line(0, 0, cos(aHour) * 120, sin(aHour) * 120)

  //m
  strokeWeight(3)
  line(0, 0, cos(aMin)  * 150, sin(aMin)  * 150)

  //s
  strokeWeight(2)
  line(0, 0, cos(aSec)  * 180, sin(aSec)  * 180)

  //axis
  noStroke()
  fill(0)
  ellipse(0, 0, 6, 6)
}

  //Eevee
function drawCatFace(w, h, isSleep) {
  noStroke()

  //ears
  const earOuter = color(189, 180, 168)
  const earStroke = color(120, 100, 90)
  const earInner = color(237, 200, 190)

  // left ear
  push()
  translate(-w * 0.22, -h * 0.58)
  rotate(-0.08)
  fill(earOuter)
  stroke(earStroke)
  strokeWeight(2)
  triangle(0, 0, -w * 0.16, h * 0.25, w * 0.16, h * 0.25)
  noStroke()
  fill(earInner)
  triangle(0, h * 0.02, -w * 0.10, h * 0.19, w * 0.10, h * 0.19)
  pop()

  // right ear
  push()
  translate(w * 0.22, -h * 0.58)
  rotate(0.08)
  fill(earOuter)
  stroke(earStroke)
  strokeWeight(2)
  triangle(0, 0, -w * 0.16, h * 0.25, w * 0.16, h * 0.25)
  noStroke()
  fill(earInner)
  triangle(0, h * 0.02, -w * 0.10, h * 0.19, w * 0.10, h * 0.19)
  pop()

  // head
  fill(189, 180, 168)
  ellipse(0, 0, w, h)

  // eyes
  const eyeScale   = (1.7 + 2.4) / 2
  const irisScale  = (0.50 + 1.25) / 2
  const pupilScale = (0.45 + 1.2)  / 2

  const eyeX = w * 0.24
  const eyeY = -h * 0.08
  const eyeW = w * 0.18 * eyeScale

  const eyeH_awake = h * 0.14 * eyeScale
  const eyeH_sleep = 2                 

  const irisW  = w * 0.20 * irisScale
  const irisH  = h * 0.30 * irisScale
  const pupilW = w * 0.12 * pupilScale
  const pupilH = h * 0.20 * pupilScale

  const eyeH = isSleep ? eyeH_sleep : eyeH_awake

  // left eye
  push()
  translate(-eyeX, eyeY)
  fill(247, 245, 242)
  ellipse(0, 0, eyeW, eyeH)
  if (!isSleep) {
    fill(176, 219, 245) 
    ellipse(0, 0, irisW, irisH)
    fill(56, 149, 224)  
    ellipse(0, 0, pupilW, pupilH)
  }
  pop()

  // right eye
  push()
  translate(eyeX, eyeY)
  fill(247, 245, 242)
  ellipse(0, 0, eyeW, eyeH)
  if (!isSleep) {
    fill(176, 219, 245) 
    ellipse(0, 0, irisW, irisH)
    fill(56, 149, 224)  
    ellipse(0, 0, pupilW, pupilH)
  }
  pop()

  // Chin circle+spiral
  fill(250, 237, 217)
  const chinCX = -eyeX + 60
  const chinCY = -eyeY + 50
  const chinW  = w * 0.22
  const chinH  = h * 0.22
  ellipse(chinCX, chinCY, chinW, chinH)

  const r = 0.5 * min(chinW, chinH) * 0.9
  drawSpiral(chinCX, chinCY + 2, r, 2)

  // mouth
  noFill()
  stroke(80)
  strokeWeight(2.2)
  const mouthW = w * 0.10
  const mouthH = h * 0.08
  const mouthA1 = isSleep ? 0.02 : 0.08
  const mouthB1 = isSleep ? PI*0.60 : PI/4
  arc(-w * 0.05, h * 0.08, mouthW, mouthH, mouthA1, mouthB1)

  const mouthA2 = isSleep ? PI*0.62 : PI/3
  arc( w * 0.07, h * 0.08, mouthW, mouthH, mouthA2, PI)

  // Nose+nostrils
  fill(237, 174, 157)
  noStroke()
  const noseW = w * 0.16
  const noseH = h * 0.18
  arc(0, -2, noseW, noseH, 0, PI, OPEN)

  fill(120, 80, 60)
  const nostrilW = w * 0.04
  const nostrilH = h * 0.03
  const nostrilOffset = w * 0.05
  ellipse(-nostrilOffset, h * 0.04, nostrilW, nostrilH)
  ellipse( nostrilOffset,  h * 0.04, nostrilW, nostrilH)
}

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

function drawSleepOverlay() {
  noStroke()
  fill(15, 30, 60, 110)
  rect(0, 0, width, height)
}


// text
function drawLabelBox(isSleep) {
  const y = posY - baseH/2 - 40  
  push()
  rectMode(CENTER)
  noStroke()
  fill(255, 255, 255, 150)
  if (isSleep) {
    rect(width/2, y, 100, 36, 8)  
  } else {
    rect(width/2, y, 240, 36, 8)
  }
  pop()
}

// zzz& play
function drawLabelText(isSleep, x, yCat) {
  const y = yCat - baseH/2 - 40
  push()
  textAlign(CENTER, CENTER)
  fill(50)
  if (isSleep) {
    textSize(16) 
    text('Z', width/2 - 22, y)
    textSize(25) 
    text('z', width/2, y + 5)
    textSize(28) 
    text('Z', width/2 + 26, y)
  } else {
    textSize(30)
    text('play with me!', width/2, y)
  }
  pop()
}