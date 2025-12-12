//Click to swing tail
let tailWiggle = false

function setup() {
  createCanvas(400, 600)
  noLoop()
}

function draw() {
  background(161, 159, 154)

  const skin   = color(250, 226, 202)
  const purple = color(145, 121, 200)
  const red    = color(230, 0, 20)
  const yellow = color(255, 236, 0)
  const black  = color(15)
  const beige  = color(249, 238, 219)

  // layer
  drawLower(width/2, 370, 1.0, black, beige)  
  drawUpper(width/2, 240, 1.0, red, yellow)  
  drawHead(width/2, 120, 1.0, purple, skin)  
}

function mousePressed(){
  tailWiggle = !tailWiggle
  redraw()
}

function drawUpper(x, y, sc, red, yellow){
  push()
  translate(x, y)
  scale(sc)

  noStroke()
  fill(yellow)
  circle(130, 10, 60)
  circle(-130, 10, 60)
  circle(-160, 60, 60)
  circle(160, 60, 60)

  fill(red)
  rectMode(CENTER)
  rect(0, 40, 250, 120, 5)

  pop()
}

function drawLower(x, y, sc, skirtColor, beige){
  push()
  translate(x, y)
  scale(sc)
  
  // tail with interaction
  push()
  rotate(radians(-25))
  noFill()
  stroke(beige)
  strokeWeight(20)   
  strokeCap(ROUND)   
  
  if (tailWiggle){
  
  bezier(0, 0, 
         -40, 10, 
         -10, -70, 
         -80, -10)
} else {
 
  bezier(0, 0, 
         -20, 30, 
         -40, -30, 
         -90, -40)
}
  pop()

  //legs
  fill(beige)
  noStroke()
  ellipse(-28, 90, 40, 80)
  ellipse(28, 90, 40, 80)
  
  //dress
  fill(skirtColor)
  rectMode(CENTER)
  rect(0, 20, 120, 120, 15)

  pop()
}

function drawHead(x, y, sc, purple, skin){
  push()
  translate(x, y)
  scale(sc)

  let dy = 15
  
  // shadow
  fill(220)
  noStroke()
  ellipse(0, 55 + dy, 200, 90)

  noFill()             
  stroke(0)           
  strokeWeight(2)      
  ellipse(0, 60 + dy, 140, 60)

  // Purple
  noStroke()
  fill(purple)
  ellipse(2, 0, 110, 120)
  rectMode(CENTER)
  rect(0, 45 + dy, 80, 58, 15)
  rect(0, 73 + dy, 100, 58, 25)
  rect(-120, 50 + dy, 40, 30, 5)
  rect(120, 50 + dy, 40, 30, 5)

  // face
  push()
  noStroke()
  fill(purple)
  circle(-48, -5 + dy, 40)
  circle(48, -5 + dy, 40)
  pop()

  fill(skin)
  stroke(232, 184, 123)
  strokeWeight(3)
  rect(0, 15, 80, 90, 25)

  // eyes
  stroke(0)
  strokeWeight(5)
  point(-12, -10 + dy)
  point(12, -10 + dy)

  push()
  translate(0, 20 + dy)
  rotate(radians(-20))   
  noFill()
  strokeWeight(3)
  arc(0, 0, 22, 14, 0, PI)
  pop()

  // helmet
  noFill()
  stroke(98, 113, 115, 240)
  strokeWeight(4)

  noFill()
  stroke(255)
  strokeWeight(25)
  arc(0, 72, 200, 90, 0, PI)

  noStroke()
  fill(242, 254, 255, 120)
  rect(0, 30, 200, 200, 90)

  fill(207, 190, 250)
  beginShape()
  vertex(-110, 25 + dy)
  vertex(-85, 25 + dy) 
  vertex(-85, 65 + dy)  
  vertex(-120, 65 + dy)  
  endShape(CLOSE)

  beginShape()
  vertex(110, 25 + dy)
  vertex(85, 25 + dy)
  vertex(85, 65 + dy)
  vertex(120, 65 + dy)
  endShape(CLOSE)

  pop()
}