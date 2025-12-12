function setup() {

  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-container");
  noSmooth();
}

function draw() {
  background(220);
  
  //background
  push()
  const topR =204
  const topG =224
  const topB =255 
  const bottomR =10
  const bottomG =70
  const bottomB =161
  
  const topColor = color(topR, topG, topB);
  const bottomColor = color(bottomR, bottomG, bottomB);

  for(let y = 0; y < height; y++) {
    const lineColor = lerpColor(topColor, bottomColor, y/height);
    stroke(lineColor);
    line(0, y, width, y);
    }
  pop()
  
  //cloud
  
  push()
  noStroke()
  fill(255)
  translate(20,5)
  rect(40,40,100,30,30)
  ellipse(60,50,40,40)
  ellipse(90,40,50,50)
  pop()
  
  //waves middle
  
  push()
  translate(4,-40)

  stroke(255,255,255,30)  
  noFill()            
  strokeWeight(4) 
  ellipse(380, 320, 10, 10)
  ellipse(380, 320, 30, 30)
  ellipse(380, 320, 50, 50)
  ellipse(380, 320, 70, 70)
  
  ellipse(330, 310, 30, 30)
  ellipse(330, 310, 45, 45)
  
  
  ellipse(280, 340, 30, 30)
  ellipse(280, 340, 50, 50)
  ellipse(280, 340, 70, 70)
  ellipse(280, 340, 90, 90)
  
  ellipse(160, 400, 10, 10)
  ellipse(160, 400, 30, 30)
  ellipse(160, 400, 50, 50)
  ellipse(160, 400, 70, 70)
  ellipse(160, 400, 90, 90)
  ellipse(160, 400, 110, 110)
  ellipse(160, 400, 130, 130)
  
  ellipse(226, 360, 20, 20)
  ellipse(226, 360, 5, 5)
  
  ellipse(40, 400, 10, 10)
  ellipse(40, 400, 30, 30)
  ellipse(40, 400, 50, 50)
  ellipse(40, 400, 70, 70)
  ellipse(40, 400, 90, 90)
  
  ellipse(0, 320, 10, 10)
  ellipse(0, 320, 30, 30)
  ellipse(0, 320, 50, 50)
  ellipse(0, 320, 70, 70)
  
  ellipse(5, 224, 10, 10)
  ellipse(5, 224, 30, 30)
  ellipse(5, 224, 50, 50)
  ellipse(5, 224, 70, 70)
  ellipse(5, 224, 90, 90)
  ellipse(5, 224, 110, 110)
  
  ellipse(85, 270, 10, 10)
  ellipse(85, 270,30, 30)
  ellipse(85, 270,50, 50)
  
  
  ellipse(0, 150, 10, 10)
  ellipse(0, 150, 30, 30)
  
  ellipse(170, 320, 10, 10)
  ellipse(170, 320, 30, 30)
  pop()

   //waves bottom
  push()
  noFill()          
  stroke(255)         
  strokeWeight(4) 
  ellipse(380, 320, 10, 10)
  ellipse(380, 320, 30, 30)
  ellipse(380, 320, 50, 50)
  ellipse(380, 320, 70, 70)
  
  ellipse(330, 310, 30, 30)
  ellipse(330, 310, 45, 45)
  
  
  ellipse(280, 340, 30, 30)
  ellipse(280, 340, 50, 50)
  ellipse(280, 340, 70, 70)
  ellipse(280, 340, 90, 90)
  
  ellipse(160, 400, 10, 10)
  ellipse(160, 400, 30, 30)
  ellipse(160, 400, 50, 50)
  ellipse(160, 400, 70, 70)
  ellipse(160, 400, 90, 90)
  ellipse(160, 400, 110, 110)
  ellipse(160, 400, 130, 130)
  
  ellipse(226, 360, 20, 20)
  ellipse(226, 360, 5, 5)
  
  ellipse(40, 400, 10, 10)
  ellipse(40, 400, 30, 30)
  ellipse(40, 400, 50, 50)
  ellipse(40, 400, 70, 70)
  ellipse(40, 400, 90, 90)
  
  ellipse(0, 320, 10, 10)
  ellipse(0, 320, 30, 30)
  ellipse(0, 320, 50, 50)
  ellipse(0, 320, 70, 70)
  
  ellipse(5, 224, 10, 10)
  ellipse(5, 224, 30, 30)
  ellipse(5, 224, 50, 50)
  ellipse(5, 224, 70, 70)
  ellipse(5, 224, 90, 90)
  ellipse(5, 224, 110, 110)
  
  ellipse(85, 270, 10, 10)
  ellipse(85, 270,30, 30)
  ellipse(85, 270,50, 50)
  ellipse(85, 270, 70, 70)
  
  ellipse(0, 150, 10, 10)
  ellipse(0, 150, 30, 30)
  
  ellipse(170, 320, 10, 10)
  ellipse(170, 320, 30, 30)
  pop()

  
  //island
  
  push()
  noStroke();
  //scale(1.1); 
  //dark brown
  fill(138,102,71,120)
   translate(width/2,height/2)
   rotate(radians(-70));
   ellipse(2,1,130,180 )

  //light brown
    fill(172,137,112,225)
   rotate(radians(0));
   ellipse(6,0,110,170 )
  
  
  
  //green
  fill(155,217,139)
   rotate(radians());
   ellipse(10,-5,110,160 )
  //midrib
  beginShape()
    rotate(radians(-160));
  vertex(10,-20)
  vertex(30,100)
  vertex(10,100)
  endShape()
  
  pop()
  
  push()
  noStroke();
  
  // tree
  push()
   translate(-20, -20);  
    //tree1 
  fill(120, 74, 53)
  rect(155,150,20,35,30)
  
  fill(68, 133, 83)
  rect(140,105,50,65,30)
   stroke(247, 241, 158);
   strokeWeight(3);
    line(150, 120, 150, 155);
    line(165, 110, 165, 165);
    line(180, 120, 180, 160);
    line(155, 115, 175, 115);
    line(145, 130, 185, 130);
    line(145, 145, 185, 145);
    line(155, 160, 175, 160);
  
  

  //tree 2
  noStroke();
  fill(120, 74, 53)
  rect(190,180,20,30,30)
  
  fill(84, 150, 100)
  rect(170,140,60,50,70)
  
  fill(247, 183, 119)
  circle(180,155,10)
  circle(200,145,10)
  circle(220,155,10)
  circle(190,165,10)
  circle(210,170,10)
  circle(195,180,10)
  
  //tree 3
  push()
  translate(-15,-3)
  //
  fill(120, 74, 53)
  rect(275,225,20,30,30)
  push()
  scale(1.1) 
  fill(86, 143, 96)
  beginShape();
  curveVertex(230, 210)//a
  curveVertex(290,210)//c
  curveVertex(230, 210)//a
  curveVertex(260,170)//b
  curveVertex(290,210)//c
  curveVertex(230, 210)//a
  curveVertex(230, 210)//a
  endShape(close);
  pop()
  
  //tree 3 point
  fill(247, 90, 79)
  //point1
  push();
 translate(290, 200);  
 rotate(2.5);             
 ellipse(0, 0, 8, 16); 
pop(); 

    //point2
  push();
 translate(265, 222);  
 rotate(4);             
 ellipse(0, 0, 8, 16); 
 pop(); 
  
      //point3
  push();
 translate(285, 218);  
 rotate(9);             
 ellipse(0, 0, 8, 16); 
   pop(); 
  
        //point4
  push();
 translate(305, 223);  
 rotate(6);             
 ellipse(0, 0, 8, 16); 
   pop(); 
  
  
        //point5
  push();
  translate(273, 205);  
  rotate(4);             
  ellipse(0, 0, 8, 16); 
  pop()//4 point 5
  
  pop()//4 tree 3
  
  pop()//4 all tree
  
  //fish
  push()
  //#1
  push( )
  push()
  fill(220, 230, 245)
  translate(430, 340);  
  rotate(2)
  rect(0,0,150,150,40)  
  rect(0,100,20,60,10)  
  ellipse(140,160,90,60)
  
  pop()// 4 fish#1
  push()
  stroke(95, 152, 237)
  strokeWeight(2)
  fill(255)
  ellipse(350,340,50,50)
  fill(48, 84, 138)
  strokeWeight(4)
  line(240,380,220,370)
  line(240,390,210,385)
  line(240,400,215,400)
  noFill()
  
  push()
  translate(340, 340);
  rotate(-0.1)
  arc(3,-5, 100, 100, HALF_PI, PI, OPEN);
  pop()
  
  pop()
  
  fill(0)
  ellipse(355,335,35,35)
  
  fill(48, 84, 138);
  arc(300, 370, 100, 100, HALF_PI, PI, PIE)
  
  
  push()
  translate(400,350);
  rotate(0.4)
  fill(48, 84, 138)
  ellipse(0,0,20,10)
  pop()
  
  //line
  push()
  stroke(220, 230, 245)
  strokeWeight(2);
  line(296,375,260,380)
  line(296,375,265,399)
  line(296,375,275,440)
  pop()
  
  
  //fish 2
  push()
  fill(205, 222, 247)
  translate(190, 390)
  rotate(2.9)
  rect(0,0,150,150,30)  
  ellipse(140,140,70,90)
  ellipse(5,15,10,10)
  ellipse(8,10,10,10)
  
  pop()
  fill(255)
  stroke(71, 107, 161)
  strokeWeight(2)
  ellipse(150,360,50,50)
  noStroke()
  fill(0)
  ellipse(160,355,30,30)
  
  push()//fin
  fill(48, 84, 138)
  noStroke()
  arc(110,350,150, 150, PI, PI + PI/2.5, PIE)
  pop()
  
  push()
  stroke(205, 222, 247)
  strokeWeight(4)
  line(98,340,75,290)
  line(98,340,55,315)
  line(98,340,50,340)
  pop()//fin
  
  push()
  noFill()
  stroke(48, 84, 138)
  strokeWeight(3)
  arc(185, 380, 150, 150, PI, PI + PI/3, OPEN)
  pop()
  
  stroke(48, 84, 138)
  strokeWeight(4)
  line(40,290,5,260)
  line(39,300,0,285)
  line(39,310,0,310)
  
  pop()// 4 fish 2
  
  
  pop()// 4 all fish
  
  //seagull#1
  //aa bcd dd
  
  translate(0,0)
  rotate(radians(7))
  
  push()
  noFill()
  stroke(255)      
  strokeWeight(3)

  beginShape()
  curveVertex(350-10,50)//a
  curveVertex(350-10,50)//a
  curveVertex(355-10,45)
  curveVertex(360-10,40)
  curveVertex(363-10,45)
  curveVertex(370-10,60)
  curveVertex(380-10,50)
  curveVertex(390-10,60)//d
  curveVertex(390-10,60)//d
  endShape()
  
  stroke(0)    
  beginShape()
  curveVertex(350-10,50)//a
  curveVertex(350-10,50)//a
  curveVertex(355-10,45)
  curveVertex(355-10,45)
  endShape()
  
  beginShape()
  curveVertex(387-10,55)
  curveVertex(387-10,55)
  curveVertex(390-10,60)//d
  curveVertex(390-10,60)//d
  endShape()
  pop()
  
  fill(240, 234, 153)
  ellipse(360,60,10,5)
  //seagull#1 end
  
  
  //seagull#2
  translate(-60,-100)
  rotate(radians(7))
  
  push()
  noFill()
  stroke(255)      
  strokeWeight(3)

  beginShape()
  curveVertex(350-10,50)//a
  curveVertex(350-10,50)//a
  curveVertex(355-10,45)
  curveVertex(360-10,40)
  curveVertex(363-10,45)
  curveVertex(370-10,60)
  curveVertex(380-10,50)
  curveVertex(390-10,60)//d
  curveVertex(390-10,60)//d
  endShape()
  
  stroke(0)    
  beginShape()
  curveVertex(350-10,50)//a
  curveVertex(350-10,50)//a
  curveVertex(355-10,45)
  curveVertex(355-10,45)
  endShape()
  
  beginShape()
  curveVertex(387-10,55)
  curveVertex(387-10,55)
  curveVertex(390-10,60)//d
  curveVertex(390-10,60)//d
  endShape()
  pop()
  
  fill(240, 234, 153)
  ellipse(360,60,10,5)
  //seagull#2 end
  
  
  pop() 
  
}