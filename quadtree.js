class Point {
  constructor(x, y,userData) {
    this.x = x;
    this.y = y;
    this.userData=userData;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (
      point.x >= this.x - this.w && point.x < this.x + this.w && point.y >= this.y - this.h && point.y < this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    let qt_northeast=new QuadTree(ne, this.capacity);    
    this.northeast = qt_northeast

    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    let qt_northwest=new QuadTree(nw, this.capacity);
    this.northwest = qt_northwest
    
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    let qt_southeast=new QuadTree(se, this.capacity);
    this.southeast =qt_southeast
    
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    let qt_southwest=new QuadTree(sw, this.capacity);
    this.southwest =qt_southwest
    
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.northeast.insert(point)) {
        return true;
      } else if (this.northwest.insert(point)) {
        return true;
      } else if (this.southeast.insert(point)) {
        return true;
      } else if (this.southwest.insert(point)) {
        return true;
      }
    }
  }

  show() {
    stroke(255);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    for (let p of this.points) {
      strokeWeight(2);
      point(p.x, p.y);
    }

    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
  }
}
