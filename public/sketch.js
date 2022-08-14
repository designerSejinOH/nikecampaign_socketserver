var socket;
let c = 0;
let x, y;
let sg;
let cg;
let evalue;
var aValue = false;
let aC = 255;
let r = 0;
let obj1;
let obj2;
let txt;
let a, b;
let how;
let font;
let tt = 0;

function preload() {
  // Load model with normalise parameter set to true
  obj1 = loadModel('airforce1.obj', true);
  obj2 = loadModel('airforce2.obj', true);
  img0 = loadImage('earth0.jpg');
  img1 = loadImage('earth1.jpg');
  img2 = loadImage('earth2.jpg');
  img3 = loadImage('earth3.jpg');
  img4 = loadImage('earth4.jpg');
  img5 = loadImage('earth5.jpg');
  font = loadFont('HelveticaNeueLTStdBdEx 1.woff');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  pixelDensity(displayDensity());
  sg = createGraphics(windowWidth, windowHeight, WEBGL);
  cg = createGraphics(windowWidth, windowHeight);
  socket = io.connect('172.16.100.118:8080');
  socket.on('mouse', newDrawing);
  imageMode(CENTER);
  rectMode(CENTER);
  sg.textFont(font);
  sg.textAlign(CENTER);
  sg.textSize(10);
  txt = img0;
  x = 0;
  y = 0;
  a = 15;
  b = -15;
}

function newDrawing(data) {
  x -= 0;
  y += data.y;
  r -= data.y;
  how = r;
  console.log(how);
  sg.background(0, 0, 0);
  sg.noStroke();

  // sg.push();
  // sg.pop();
  sg.push();
  sg.pointLight(255, 255, 255, -width / 2, -height / 2, 50);
  // sg.rotateY(HALF_PI);
  // sg.rotateX(HALF_PI);
  sg.translate(0, 0, -500);

  let aa = map(sin(frameCount), -1, 1, 0, 1);

  // sg.rotateX(PI / 3);
  // sg.pop();

  sg.push();
  sg.rotateX(r);
  sg.lights();
  sg.translate(0, 0, 0);
  sg.texture(txt);
  sg.sphere(500);
  sg.pop();

  if (aa < 0.5) {
    b = 15;
    a = -15;
  } else {
    b = -15;
    a = 15;
  }



  sg.push();
  sg.translate(x, 0, 530);
  sg.push();
  sg.translate(-30, a, 0);
  sg.specularMaterial(255);
  sg.scale(1);
  sg.model(obj1);
  sg.pop();
  sg.push();
  sg.translate(30, b, 0);
  sg.specularMaterial(0);
  sg.scale(1);
  sg.model(obj2);
  sg.pop();
  sg.push();
  sg.lights();

  sg.fill(255);
  sg.translate(-450, 100, 0);
  sg.rect(-5, 0, 10, how * 3);
  sg.text('steps', 0, 20);
       if (how <= 0 && how > -15) {
         txt = img0;
       } else if (how <= -15 && how > -30) {
         txt = img1;
       } else if (how <= -30 && how > -45) {
         txt = img2;
       } else if (how <= -45 && how > -60) {
         txt = img3;
       } else if (how <= -60 && how > -75) {
         txt = img4;
       } else if (how <= -75) {
         txt = img5;
         sg.push()
         sg.translate( 450,-100, 100);
         sg.textAlign(CENTER);
         sg.rectMode(CENTER);
         sg.textSize(30);
         sg.fill(255);
         sg.rect(0, -10, 800, 50);
         sg.fill(0);
         sg.text('GREAT! Your Earth is healthier than ever', 0, 0);
         sg.pop();
       }
  sg.pop();
 
  sg.pop();

  sg.pop();

}

function newLink(value) {
  if (value.e > 1) {
    c = 255;
  } else {
    c = 0;
  }
}

function touchMoved() {
  let cx = map(mouseX, 0, width, 0, -10);
  let cy = map(abs(height / 2 - mouseY), 0, height / 2, 0, 0.5);


  console.log('Sendig: ' + cx + ',' + cy);
  var data = {
    x: cx,
    y: cy
  }

  socket.emit('mouse', data);
  cg.background(0);
  cg.noStroke();
  // cg.fill(0,10);
  // cg.rect(0, 0, width, height);
  cg.fill(100, 255, 100);
  cg.rectMode(CENTER);
  cg.rect(mouseX - 10, mouseY + 20, 10, 10);
  cg.rect(mouseX + 10, mouseY + 20, 10, 10);
  cg.rect(mouseX, mouseY, 40, 100);
  return false;
}

function draw() {
  //sending
  background(200);
  stroke(255, 100);
  line(0, height / 2, width, height / 2);
  // line(width / 2, 0, width / 2, height);
  image(cg, width / 2, height / 2);
  image(sg, width / 2, height / 2);
  // println(value);

}