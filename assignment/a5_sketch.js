let gap1 = 10      // bottom spacing
let gap2 = 19;     // top spacing (slightly different -> moiré)
let thinW = 4
let thickW = 20;    
let heavyEvery = 8
let alphaVal = 140

const BG = [245, 242, 234] 

let PAL = [
  [15, 40, 71],
  [135, 191, 211],
  [59, 181, 212],
  [224, 72, 122],
  [240, 107, 93],
  [217, 190, 106],
  [179, 196, 200]
];

function setup() {
  let canvas = createCanvas(400, 400);  
  canvas.parent("sketch-container");   

  pixelDensity(4);
  noFill();
}

function draw() {
  background(...BG)

  // offset seting
  let maxOffset = 60
  let dx = map(mouseX, 0, width,  -maxOffset, maxOffset);
  let dy = map(mouseY, 0, height, -maxOffset, maxOffset);

  // bottom no offset
  drawGrid(gap1, 0, 0, 0, false, thinW, thickW)   
  drawGrid(gap1, 0, 0, HALF_PI, false, thinW, thickW)

  // top offset with mouse
  push()
  translate(dx, dy)
  drawGrid(gap2, 1, 0, 0, true, thinW, thickW)        
  drawGrid(gap2, 1, 2, HALF_PI, true, thinW, thickW)  
  pop()
}

  // Paralle Line
function drawGrid(step, cOff=1, paletteShift=0, angle=0, translucent=true, thinLine=4, thickLine=20) { //Control line spacing, color, transparency, and thickness
  push()
  translate(width/2, height/2)
  rotate(angle)
  let size = max(width, height)

  for (let i = -size; i <= size; i += step) {
    // Limit the idx within the range of the PAL color palette
    let idx = ((i/step)|0 + cOff + paletteShift) % PAL.length
    if (idx < 0) idx += PAL.length


    let col = color(...PAL[idx])
    col.setAlpha(translucent ? alphaVal : 255)
    stroke(col)

    // heavy line/ thin line
    let isHeavy = (abs((i/step)|0) % heavyEvery === 0) 
    
    console.log(isHeavy)
    strokeWeight(isHeavy ? thickLine : thinLine)

    line(i, -size, i, size)
  }
  pop()
}