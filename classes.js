class Sprite {
  constructor({ position, width, height, color, src }) {
    this.position = position
    this.width = width
    this.height = height
    this.color = color
    this.src = src
    this.image = new Image()
    this.image.src = `assets/${this.src}`
  }

  draw() {
    if (!this.src) {
      c.fillStyle = this.color
      c.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    } else {
      c.drawImage(
        this.image,
        0, 0,
        this.image.width,
        this.image.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  }
}

class Bear {
  constructor({ position, width, height, expression, paths }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this._expression = expression;
    this.images = {}
    this.paths = paths
    for (const key in this.paths) {
      this.images[key] = new Image()
      this.images[key].src = `assets/bear/${this.paths[key]}`
    }
    this.image = this.images[this._expression]
  }

  set expression(newExpression) {
    this._expression = newExpression;
    this.image = this.images[this._expression]
  }

  draw() {
    c.drawImage(
      this.image,
      0, 0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}


class Glass {
  constructor({ position, width, sizes, src, color }) {
    this.sizes = [...sizes]
    this.height = this.sizes[getRandom({
      min: 0,
      max: this.sizes.length - 1
    })]
    this.width = width
    this.currentPosition = position
    this.image = new Image()
    this.image.src = `assets/${src}`
    this.color = color

    this.position = {
      x: position.x,
      y: position.y - this.height
    }
    this.beer = {
      position: { y: this.position.y + this.height - 5 },
      height: 0
    }
    this.foam = {
      position: { y: this.position.y + this.height - 5 },
      height: 0
    }
    this.target = {
      position: {
        y: this.position.y + this.height - getRandom({
          min: 55,
          max: this.height - 25
        })
      },
      height: 5
    }
    this.liquid = { height: 0 }
  }

  slide(direction) {
    let target = direction == 'out' ? -this.width : this.currentPosition.x
    let n = 20
    if (this.position.x >= target) {
      this.position.x -= n
      this.foam.position.x -= n
      this.beer.position.x -= n
    }
  }

  drawLiquid() {
    c.fillStyle = this.color.beer
    c.fillRect(
      this.currentPosition.x + 10,
      100, 5,
      this.liquid.height
    )
  }


  drawObject({ color, position, height }) {
    c.fillStyle = color
    c.fillRect(
      this.position.x + 12 / 2,
      position.y,
      this.width - 12,
      height
    )
  }

  draw() {
    this.drawObject({
      color: this.color.bg,
      position: this.position,
      height: this.height - 3
    })
    this.drawLiquid()
    this.drawObject({
      color: this.color.foam,
      position: this.foam.position,
      height: this.foam.height
    })
    this.drawObject({
      color: this.color.beer,
      position: this.beer.position,
      height: this.beer.height
    })
    this.drawObject({
      color: this.color.target,
      position: this.target.position,
      height: this.target.height
    })

    c.drawImage(
      this.image,
      0, 0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )

    this.slide('in')
  }
}

class Clock {
  constructor({ position, width, height, src, time = 0 }) {
    this.position = position
    this.width = width
    this.height = height
    this.time = time
    this.image = new Image()
    this.image.src = `assets/${src}`
  }

  draw() {
    c.drawImage(
      this.image,
      0, 0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )

    c.fillStyle = '#fff'
    c.font = "30px monospace";

    c.fillText(
      this.time <= 9 ? '0' + this.time : this.time,
      this.position.x + this.width / 2 - 17.5,
      this.position.y + this.height / 2 + 20
    )
  }
}

class Text {
  constructor({ position, font, message = "" }) {
    this.position = position;
    this.message = message;
    [this.size, this.font, this.color] = font
  }

  draw() {
    c.fillStyle = this.color
    c.font = `${this.size}px ${this.font}`

    c.fillText(
      this.message,
      this.position.x,
      this.position.y
    )
  }
}

class Button {
  constructor({ position, width, height, color, font, message }) {
    this.position = position
    this.width = width
    this.height = height
    this.color = color
    this.message = message
    this.font = font

    this.eventHendler()
  }

  eventHendler() {
    canvas.addEventListener("click", (event) => {
      const mouseX = event.clientY
      const mouseY = -(event.clientX - canvas.height)

      if (this.isInsideButton(mouseX, mouseY)) {
        this.resolvePromise()
      }
    })
  }

  isInsideButton(x, y) {
    return (
      x > this.position.x &&
      x < this.position.x + this.width &&
      y > this.position.y &&
      y < this.position.y + this.height
    )
  }

  init() {
    return new Promise((resolve) => {
      this.resolvePromise = resolve
    })
  }

  draw() {
    c.fillStyle = this.color
    let radius = 10
    let top = this.position.y
    let bottom = this.position.y + this.height
    let left = this.position.x
    let right = this.position.x + this.width

    c.beginPath();
    c.moveTo(left + radius, top);
    c.lineTo(right - radius, top);
    c.quadraticCurveTo(right, top, right, top + radius);
    c.lineTo(right, bottom - radius);
    c.quadraticCurveTo(right, bottom, right - radius, bottom);
    c.lineTo(left + radius, bottom);
    c.quadraticCurveTo(left, bottom, left, bottom - radius);
    c.lineTo(left, top + radius);
    c.quadraticCurveTo(left, top, left + radius, top);
    c.closePath();
    c.fill()

    new Text({
      position: {
        x: this.position.x + this.font[0],
        y: this.position.y + this.font[0] * 1.5
      },
      font: this.font,
      message: this.message,
    }).draw()
  }
}