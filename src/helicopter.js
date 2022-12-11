class Helicopter {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = 100
    this.y = 0
    this.y0 = ctx.canvas.height

    this.w = 100
    this.h = 40

    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.ax = 0
    this.g = 0.1

    this.img = new Image()
    this.img.src = "https://2.bp.blogspot.com/-P6ZbLE-rnFM/WPTQh65UtMI/AAAAAAAABF8/9iYl-cIUEtIhj2JDTixyqZNeBn183AdmQCLcB/s1600/helicopter-spritesheet.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.weapon = new Weapon(this)

  }

  draw() {
    this.ctx.drawImage(
      this.img,
      0, 
      this.img.frameIndex * this.img.height / this.img.frames,
      this.img.width,
      this.img.height / this.img.frames,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.weapon.clearBullets();

    this.weapon.draw()
  }

  animate() {
    if (this.ay === 0) {
      this.img.frameIndex = 0
      return
    }

    this.tick++

    if (this.tick > 1) {
      this.tick = 0;
      this.img.frameIndex++

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0
      }
    }
  }

  isFloor() {
    // TODO: check if floor
  }

  move() {
    this.vx += this.ax
    this.vy += this.ay + this.g
    this.y += this.vy
    this.x += this.vx

    if (this.y >= this.y0 - this.h) {
      this.y = this.y0 - this.h
      this.vy = 0
    }

    if (this.x <= 0) {
      this.vx = 0
      this.x = 0
      }

    if (this.y <= 0) {
      this.vy = 0;
      this.y = 0
    }

    if (this.x + this.w >= ctx.canvas.width) {
      this.vx = 0;
      this.x = ctx.canvas.width - this.w
    }

    this.weapon.move();

  }

  onKeyEvent(event) {
    if (event.type === "keydown") {
      switch(event.keyCode) {
        case UP: 
          this.ay = -0.12;
          break;
        case RIGHT:
          this.ax = 0.15;
          break;
        case LEFT: 
          this.ax = -0.12;
          break;
        case SPACE:
          this.weapon.shoot();
      }
    } else {
      switch(event.keyCode) {
        case UP: 
          this.ay = 0;
          break;
        case RIGHT:
          this.ax = 0;
          break;
        case LEFT: 
          this.ax = 0;
          break;          
        case SPACE:
          this.weapon.shoot(0);
      }
      }
    }
  }

