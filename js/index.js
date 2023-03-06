const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

let road = new Image();
road.src = "./images/road.png";

const blocks = [];

road.onload = () => {
  ctx.drawImage(road, 0, 0, 500, 700);
};

let carImg = new Image();
carImg.src = "./images/car.png";
/* window.onload = () => {
  ctx.drawImage(carImg, car.x, car.y, 50, 70);
}; */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

class blocksC {
  constructor(width, height) {
    this.x = 30+getRandom(10,400);
    this.y = 0;
    this.widht = getRandom(50,200);
    this.height = getRandom(10, 80);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.widht, this.height);
  }

  move() {
    this.y += 1;
  }
}

let score=0 
let c = 0;
class carC {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.drawImage(carImg, this.x, this.y, 50, 70);
  }

  moveLeft() {
    this.x -= 2;
  }
  moveRight() {
    this.x += 1;
  }
}

let car = new carC(225, 600);
//let block = new blocksC(100, 50,)
blocks.push(new blocksC(100, 50));

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

let counter = 0;
let level= 3;

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const interval = setInterval(() => {
    if (counter % 100 === 0) {
      document.addEventListener("keydown", (key) => {
        switch (key.code) {
          case "ArrowLeft":
            car.moveLeft();
          case "ArrowRight":
            car.moveRight();
        }
      });
    }

    counter++;
    ctx.drawImage(road, 0, 0, 500, 700);
    car.draw();
    if (Math.random() * 1000 <= level) {
      blocks.push(new blocksC(100, 50));
    }
    for (bb of blocks) {
      bb.move();
      bb.draw();

      if (
        (
          car.x > bb.x && car.x < bb.x + bb.widht ||
          car.x < bb.x && car.x + 50 > bb.x + bb.widht ||
          car.x + 50 > bb.x && car.x + 50 < bb.x + bb.widht
        )&&(
          (car.y > bb.y && car.y < bb.y + bb.height) ||
            (car.y + 70 > bb.y && car.y + 70 < bb.y + bb.height) ||
            (car.y < bb.y && car.y + 70 > bb.y + bb.height)
        ) 
      ) {
        console.log("HIT HIT HIT");
        gameOver()
        clearInterval(interval);
      }
      if (car.x<=30 ||car.x+50 >=465) {
        gameOver()
        
        clearInterval(interval);}
      if (c % 100000 == 0) {
        level++
      }
      if (c % 1000 == 0) {
        score++
      }

    }
    c++;
    ctx.fillStyle = 'orange';
    ctx.font = '40px Arial';  
    ctx.strokeText("Your score is " +score, 150, 50)

    let x = Math.floor(Math.random() * 100 + 1);

    //if(x%3==0)
  }, 1000 / 60);
}

function gameOver(){
  ctx.fillStyle ='black'
  ctx.fillRect(0,0 , 500, 700)
  ctx.fillStyle ='purple'
  

  ctx.fillText("You failed as usual!!", 50, 350)
  clearInterval(interval)
  blocks=[1,2,3]


}

/* 
const imageURL = ["./images/road.png","./images/car.png"];
const images = [];
let imageCount = 2;

function allLoaded(){
    // all images have loaded and can be rendered
    ctx.drawImage(images[1],0,0, 500, 700); // draw background
    ctx.drawImage(images[0],0,0, 500, 700); // draw foreground
}

// iterate each image URL, create, load, and add it to the images array
imageURL.forEach(src => {  // for each image url
     const image = new Image();
     image.src = src;
     image.onload = ()=>{ 
         imageCount += 1;
         if(imageCount === imageURL.length){ 
             allLoaded(); 
         }
     }
     images.push(image); 

}); */
