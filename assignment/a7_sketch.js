// scene1
let sceneNum = 1;
let overlayAlpha = 255;
let img;
let scene2bg;
let cabinetImg;
let bedImg;
let eeveeGif;
let bowlImg;
let playerImg;
let scene3bgImg;
let eeveeBodyImg;
let pawImg;
let scene4bgImg;

// scene2
let player, eevee, furns = [], bowl;
let scene2Init = false;
let bedIndex = 1;

// scene3
let baseX = 120;
let baseY = 220;
let maxArm;
let toyR = 12;
let pawEnd = { x: baseX, y: baseY };
let scene3Init = false;
let timeLeft = 15;
let caughtFlash = 0;

function preload() {
  // 这里用相对路径指向 a7_assets 文件夹
  img         = loadImage("a7_assets/scene1bg.jpg");
  scene2bg    = loadImage("a7_assets/scene2bg.jpg");
  cabinetImg  = loadImage("a7_assets/cabinet.png");
  bedImg      = loadImage("a7_assets/bed.png");
  bowlImg     = loadImage("a7_assets/bowl.png");
  eeveeGif    = loadImage("a7_assets/eevee_run.gif");
  playerImg   = loadImage("a7_assets/player.png");

  scene3bgImg   = loadImage("a7_assets/scene3bg.jpg");
  eeveeBodyImg  = loadImage("a7_assets/eevee_body.png");
  pawImg        = loadImage("a7_assets/paw.png");
  scene4bgImg   = loadImage("a7_assets/scene4bg.jpg");
}

function setup() {
  const canvas = createCanvas(600, 400);
  // 关键：让画布进入 <div id="sketch-container">
  canvas.parent("sketch-container");

  maxArm = sqrt(width * width + height * height);
  textFont("Georgia");
}

function setTextStyle(size, alignX, alignY) {
  stroke(255);
  strokeWeight(4);
  fill(0);
  textSize(size);
  textAlign(alignX, alignY);
}

function draw() {
  background(220);

  if (sceneNum === 1) sceneOne();
  else if (sceneNum === 2) sceneTwo();
  else if (sceneNum === 3) sceneThree();
  else if (sceneNum === 4) sceneFour();

  setTextStyle(18, RIGHT, TOP);
  text("Scene " + sceneNum, width - 12, 10);
}

// ---------- scene 1 ----------
function sceneOne() {
  background(255);
  if (img) {
    image(img, 0, 0, width, height);
  }

  // 黑色遮罩
  noStroke();
  fill(0, overlayAlpha);
  rect(0, 0, width, height);

  if (overlayAlpha > 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Click to wake up", width / 2, height / 2);
  } else {
    sceneNum = 2;
  }
}

function mousePressed() {
  if (sceneNum === 1) {
    overlayAlpha = max(0, overlayAlpha - 40);
  }
}

// 跳场景测试用
function keyPressed() {
  if (key === "3") {
    sceneNum = 3;
    scene3Init = false;
  }

  if (key === "4") {
    sceneNum = 4;
  }
}

// ---------- scene 2 ----------
function sceneTwo() {
  if (!scene2Init) initScene2();

  if (scene2bg) {
    image(scene2bg, 0, 0, width, height);
  } else {
    background(210);
  }

  // cabinet
  if (cabinetImg) {
    image(cabinetImg, furns[0].x, furns[0].y, furns[0].w, furns[0].h);
  } else {
    fill(255);
    rect(furns[0].x, furns[0].y, furns[0].w, furns[0].h);
  }

  // bed
  if (bedImg) {
    image(bedImg, furns[1].x, furns[1].y, furns[1].w, furns[1].h);
  } else {
    rect(furns[1].x, furns[1].y, furns[1].w, furns[1].h);
  }

  // bowl
  if (bowlImg) {
    imageMode(CENTER);
    image(bowlImg, bowl.x, bowl.y, bowl.r * 1.5, bowl.r * 1.5);
    imageMode(CORNER);
  } else {
    fill(230, 80, 80);
    circle(bowl.x, bowl.y, bowl.r * 1.5);
  }

  // Eevee 跟随
  eevee.follow(player);
  eevee.move();
  eevee.draw();

  // player
  player.update();
  player.draw();

  // 碰到 Eevee 会变慢
  if (dist(eevee.x, eevee.y, player.x, player.y) < eevee.r + player.r) {
    player.slowTimer = 90;
  }

  // 碰家具就重置
  for (let i = 0; i < furns.length; i++) {
    if (i === bedIndex) continue;
    if (circleRectCollide(player.x, player.y, player.r, furns[i])) {
      player.reset();
    }
  }

  // 到猫碗附近提示 SPACE 进入 scene3
  if (dist(player.x, player.y, bowl.x, bowl.y) < player.r + bowl.r) {
    setTextStyle(16, CENTER, TOP);
    text("Press SPACE to feed and go to Scene 3", width / 2, 10);

    if (keyIsDown(32)) {
      sceneNum = 3;
      scene3Init = false;
    }
  }
} // ← 这里结束 sceneTwo，注意这个大括号！

function initScene2() {
  furns = [
    { x: 400, y: 40, w: 200, h: 150 }, // cabinet
    { x: 400, y: 240, w: 150, h: 170 } // bed
  ];
  bedIndex = 1;

  // 玩家从床中央开始
  let bx = furns[bedIndex].x + furns[bedIndex].w / 2;
  let by = furns[bedIndex].y + furns[bedIndex].h / 2;
  player = new Player(bx, by);

  bowl = { x: 80, y: 60, r: 30 };

  // Eevee 初始位置右上角，r = 30
  eevee = new Eevee(520, 90, 30);
  scene2Init = true;
}

// ---------- scene 3 ----------
function sceneThree() {
  const armBaseX = 160;
  const armBaseY = height - 130;

  if (!scene3Init) {
    timeLeft = 15;
    pawEnd.x = armBaseX;
    pawEnd.y = armBaseY;
    scene3Init = true;
  }

  if (scene3bgImg) {
    image(scene3bgImg, 0, 0, width, height);
  } else {
    background(225);
  }

  let dx = mouseX - armBaseX;
  let dy = mouseY - armBaseY;
  let d = sqrt(dx * dx + dy * dy);
  if (d === 0) d = 1;

  let len = min(d, maxArm);

  let noiseA = noise(frameCount * 0.01) * TWO_PI * 2;
  let offR = 90;
  let targetX = armBaseX + (dx / d) * len + cos(noiseA) * offR;
  let targetY = armBaseY + (dy / d) * len + sin(noiseA) * offR;

  pawEnd.x = lerp(pawEnd.x, targetX, 0.2);
  pawEnd.y = lerp(pawEnd.y, targetY, 0.2);

  let armDx = pawEnd.x - armBaseX;
  let armDy = pawEnd.y - armBaseY;
  let armLen = sqrt(armDx * armDx + armDy * armDy);
  let armAngle = atan2(armDy, armDx);

  push();
  translate(armBaseX, armBaseY);
  rotate(armAngle);

  if (pawImg) {
    imageMode(CORNER);
    let targetThickness = 80;
    let srcH = pawImg.height;
    let s = targetThickness / srcH;
    scale(s);

    let drawW = armLen / s;
    let drawH = srcH;

    image(pawImg, 0, -drawH / 2, drawW, drawH);
    imageMode(CORNER);
  } else {
    noStroke();
    fill(139, 109, 78);
    let armThickness = 60;
    rectMode(CORNER);
    rect(0, -armThickness / 2, armLen, armThickness, armThickness / 2);
  }

  pop();

  if (eeveeBodyImg) {
    imageMode(CENTER);
    image(eeveeBodyImg, 300, height - 200, 600, 400);
    imageMode(CORNER);
  }

  fill(220, 60, 60);
  circle(mouseX, mouseY, toyR * 2);

  let caught = dist(pawEnd.x, pawEnd.y, mouseX, mouseY) < toyR + 20;
  if (caught) {
    timeLeft = 15;
    caughtFlash = 20;
  }

  timeLeft -= deltaTime / 1000;
  timeLeft = max(0, timeLeft);

  setTextStyle(20, RIGHT, TOP);
  text(ceil(timeLeft) + " s", width - 12, 36);

  if (caughtFlash > 0) {
    caughtFlash--;
    textAlign(CENTER, TOP);
    text("Caught!", width / 2, 10);
  }

  if (timeLeft <= 0) {
    sceneNum = 4;
    scene3Init = false;
  }
}

// ---------- scene 4 ----------
function sceneFour() {
  if (scene4bgImg) {
    image(scene4bgImg, 0, 0, width, height);
  } else {
    background(235);
  }

  setTextStyle(22, CENTER, CENTER);
  text("Eevee is happy now", width / 2, height / 2 + 90);
}

// ---------- Player ----------
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.baseSpeed = 3;
    this.speed = this.baseSpeed;
    this.spawnX = x;
    this.spawnY = y;
    this.slowTimer = 0;
  }

  update() {
    if (this.slowTimer > 0) {
      this.slowTimer--;
      this.speed = this.baseSpeed * 0.5;
    } else {
      this.speed = this.baseSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }

  draw() {
    imageMode(CENTER);
    if (playerImg) {
      image(playerImg, this.x, this.y, this.r * 3, this.r * 3);
    } else {
      noStroke();
      fill(60, 190, 60);
      circle(this.x, this.y, this.r * 3);
    }
    imageMode(CORNER);
  }

  reset() {
    this.x = this.spawnX;
    this.y = this.spawnY;
  }
}

// ---------- Eevee ----------
class Eevee {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = 3.0;
    this.steer = 0.06;
    this.wobbleT = random(1000);
  }

  follow(target) {
    let dx = target.x - this.x;
    let dy = target.y - this.y;

    let d = sqrt(dx * dx + dy * dy);
    if (d === 0) d = 1;

    let ux = dx / d;
    let uy = dy / d;

    this.wobbleT += 0.01;
    let ang = noise(this.wobbleT) * TWO_PI * 2;
    let nx = cos(ang) * 1.1;
    let ny = sin(ang) * 1.1;

    this.vx = lerp(this.vx, (ux + nx) * this.maxSpeed, this.steer);
    this.vy = lerp(this.vy, (uy + ny) * this.maxSpeed, this.steer);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.r) this.vx *= -1;
    if (this.x > width - this.r) this.vx *= -1;
    if (this.y < this.r) this.vy *= -1;
    if (this.y > height - this.r) this.vy *= -1;
  }

  draw() {
    imageMode(CENTER);
    push();
    translate(this.x, this.y);
    let angle = atan2(this.vy, this.vx);
    rotate(angle + PI);
    image(eeveeGif, 0, 0, this.r * 4, this.r * 4);
    pop();
    imageMode(CORNER);
  }
}

// ---------- 碰撞检测 ----------
function circleRectCollide(cx, cy, cr, rectObj) {
  const rx = rectObj.x;
  const ry = rectObj.y;
  const rw = rectObj.w;
  const rh = rectObj.h;

  let nx = constrain(cx, rx, rx + rw);
  let ny = constrain(cy, ry, ry + rh);

  return dist(cx, cy, nx, ny) < cr;
}