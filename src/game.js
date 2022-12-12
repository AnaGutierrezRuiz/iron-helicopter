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
    this.intervalId = setInterval( () => {
      this.clear();
      this.draw();
      this.move();
      this.animate();
      this.addObstacle();
      this.checkCollisions();
    }, 1000 / 60 )
  }

  clearObstacles() {
    this.obstacles.filter(o => o.isVisible);
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
    const hel = this.helicopter;
    this.obstacles.forEach( o => {
      const colX = hel.x + hel.w >= o.x && hel.x <= o.x + o.w;
      const colY = hel.y <= o.y + o.h && hel.y + hel.h >= o.y;
      if(colX && colY) {
        this.gameOver();
      }
    })
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