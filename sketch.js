let qt;
let count=0;

function setup() {
  createCanvas(400, 400);
  background(255);
  let boundary = new Rectangle(200, 200, 200, 200);
  qt = new QuadTree(boundary, 4);
  /*console.log(qt)
  for (let i = 0; i < 3; i++) {
    let p = new Point(Math.random()*400, Math.random()*400);
    qt.insert(p);
  }*/
}

function draw() {
  background(0);
  stroke(0, 255, 0);
  rectMode(CENTER);
  
  if(mouseIsPressed){
    for (let i = 0; i < 1; i ++) {
      let m = new Point ( mouseX + random ( -5 ,5) , mouseY + random ( -5 ,5) );
      qt. insert (m);
    }
  }
  
  /*
    let range = new Rectangle(mouseX, mouseY, 25, 25);
    if (mouseX < width && mouseY < height) {
    rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = qt.query(range);
    for (let p of points) {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }*/

  background(0);
  qt.show();

}
