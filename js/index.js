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

class blocksC {
  constructor(width, height) {
    this.x = Math.random() * myCanvas.width;
    this.y = 0;
    this.widht = Math.random() * 200;
    this.height = Math.random() * 70;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.widht, this.height);
  }

  move() {
    this.y += 1;
  }
}

let c=0
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
      if (Math.random() * 1000 <= 5) {
      blocks.push(new blocksC(100, 50));
    }  
    for (bb of blocks) {
      bb.move();
      bb.draw();
      
      if ( car.x-3< bb.x+bb.widht/2 && car.x+3>bb.x-bb.widht/2 && car.y-17 >bb.y-(bb.height/2) && car.y-17< (bb.y)+(bb.height/2) ) {
        console.log("HIT HIT HIT")
        clearInterval(interval)
        console.log("BLOCKS",bb.x,bb.y)
        console.log("CAR",car.x, car.y)
        console.log(car.x)
        console.log(car.x+3)
        console.log(car.x-3)
        console.log(bb.x)
        console.log(bb.widht)
        console.log(bb.widht/2)
        console.log((bb.x+bb.widht/2))
        console.log(bb.x-bb.widht/2)

      }
      if (c%100 ==0){
        console.log("BLOCKS",bb.x,bb.x-bb.widht/2, bb.x+bb.widht/2 )
        console.log("CAR",car.x, car.y)
      }
    }
    c++

    let x = Math.floor(Math.random() * 100 + 1);

    //if(x%3==0)
  }, 1000 / 60);
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
