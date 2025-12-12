// listening hours from Mon to Sun
let musicHours = [1.5, 2.2, 1.8, 2.5, 3.2, 4.0, 3.5] 
let offsets = [] //offset values for floating animation

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");  

  for (let i = 0; i < musicHours.length; i++) {
    offsets[i] = random(100);
  }
}

function draw() {
  background(200, 220, 255)
  
  // headphone background
  push()
  noFill()
  stroke(232, 241, 255, 120)
  strokeWeight(28)
  arc(width / 2, 280, 380, 360, PI, TWO_PI)

  noStroke()
  fill(232, 241, 255, 120)
  rect(100, 300, 120, 160, 40) 
  rect(380, 300, 120, 160, 40) 
  pop()
  
  // bar chart
  noStroke()
  fill(50, 100, 200)
  textAlign(CENTER)

  for (let i = 0; i < musicHours.length; i++) {
    // calculate bar height
    let baseHeight = map(musicHours[i], 0, 5, 0, height - 180)

    // noise for floating animation
    let fluctuation = map(noise(offsets[i]), 0, 1, -5, 5)
    let barHeight = baseHeight + fluctuation
    offsets[i] += 0.02 // control floating speed

    // draw each bar
    let x = 70 * i + 60
    rect(x, height - barHeight - 120, 40, barHeight, 10)

    // hour
    fill(20)
    text(musicHours[i] + "h", x + 20, height - 90)
    fill(50, 100, 200)
  }

  // day 
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  fill(30)
  textSize(14)
  for (let i = 0; i < dayNames.length; i++) {
    let x = 70 * i + 80
    text(dayNames[i], x, height - 60)
  }

  // title
  fill(0)
  textSize(18)
  text("Weekly Music Listening Time", width / 2, 40)
}