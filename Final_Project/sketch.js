let h = 1200;
let w = 1200;

let starsX=[];
let starsY=[];


//loading image
let img;
function preload() {
  img = loadImage('spaceship.png');
  img.resize(10,10);
}

function setup() {
  background(255);
  createCanvas(w, h);
  frameRate(45);

  //creates and sets positions for the stars
  for(let i=0;i<500;i++){
    starsX.push(random(w));
    starsY.push(random(h));

  }


  sun = new Planet(100, 0, 0, random(TWO_PI));
  sun.spawnMoons(5, 1);
}

function draw() {
  background(0);
  fill(255);
  
  //redraws stars every iteration
  for(let i=0;i<500;i++){
    stroke(255, 240+random(150), 240+random(150));
    point(starsX[i],starsY[i]);

  }
  
  push();
    //centers planets
    translate(width / 2, height / 2);
  //calling class functions
    sun.show();
    sun.orbit();
  pop();
  
  
  //calls image as well as makes it follow mouse. Also creates a line that follows mouse
  push();
    image(img,mouseX-25, mouseY-60, 50, 75); 
    stroke('#e25822');
      strokeWeight(20);
    line(mouseX, mouseY, pmouseX, pmouseY);
  
  pop();
}

class Planet {
  constructor(radius, distance, orbitspeed, angle) {
    this.radius = radius;
    this.distance = distance;
    this.orbitspeed = orbitspeed;
    this.angle = angle;
    this.planets = [];
  }

  //function for simulating planets orbit around the "sun"
  orbit() {
    this.angle += this.orbitspeed;
    for (let i in this.planets) {
      this.planets[i].orbit();
    }
  }

  //function for spawning surrounding planets and moons
  spawnMoons(total, level) {
    for (let i = 0; i < total; i++) {
      let r = this.radius / (level * 2);
      let d = random(215, 325);
      let o = random(-0.03, 0.03);
      let a = random(TWO_PI);
      this.planets.push(new Planet(r, d / level, o, a));
      if (level < 3) {
        let num = Math.floor(random(0, 4));
        this.planets[i].spawnMoons(num, level + 1);
      }
    }
  } 

  show() {
    push();
    fill('hsla(150, 100%, 50%, 0.5)');
    rotate(this.angle);
    translate(this.distance, 0);
    ellipse(0, 0, this.radius * 2);
    for (let i in this.planets) {
      this.planets[i].show();
    }
    pop();
  }
}