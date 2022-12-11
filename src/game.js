class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0

    this.bg = new Background(ctx)
    this.helicopter = new Helicopter(ctx)
    this.obstacles = []
  }

  start() {
    // TODO: loop. clear, draw, move, addObstacle, checkCollisions, clearObstacles
  
    this.intervalId = setInterval( () => {
      this.clear();
      this.draw();
      this.move();
      this.animate();
      this.addObstacle();
    }, 1000 / 60 )
  }

  clearObstacles() {

    //FALTA METER EL CLEAR
  }

  addObstacle() {
    // TODO: add new Obstacle every 100 ticks
    this.tick--   
    if (this.tick <= 0) {
      this.tick = 100 + Math.random() * 40
      this.obstacles.push(new Obstacle(this.ctx))
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.bg.draw();
    this.helicopter.draw();
    this.obstacles.forEach(o => o.draw())
  }

  move() {
    this.bg.move();
    this.helicopter.move();
    this.obstacles.forEach( o => o.move())

  }

  animate() {
    this.helicopter.animate()
  }

  checkCollisions() {
    // TODO: check helicopter on floor?
    // TODO: iterate obstacles. check colX and colY
  }

  onKeyEvent(event) {
    this.helicopter.onKeyEvent(event);
    
  }

  gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}