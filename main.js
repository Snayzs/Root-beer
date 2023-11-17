const data = new Data()

let table = new Sprite(data.table)
let hand = new Sprite(data.hand)
let pipe = new Sprite(data.pipe)
let tin = new Sprite(data.tin)
let clock = new Clock(data.clock)
let glass = new Glass(data.glass)
let bear = new Bear(data.bear)
let text = new Text(data.text)

hand.position.y = glass.target.position.y - 58
glass.position.x = canvas.width

let isReset = false
let isStop = false
let isTouch = false
let time = 60
let coins = []
let frame = 0


function getRandom({ min, max }) {
  return Math.round(Math.random() * (max - min) + min)
}

function setTime(currentTime) {
  clock.time = currentTime
  if (currentTime > 0)
    setTimeout(() => setTime(currentTime - 1), 1000)
}
setTime(time)

function addCoin(type) {
  coins.push(data.coin[type])
}





//event handler
window.addEventListener('touchstart', () => {
  isTouch = true
})

window.addEventListener('touchend', () => {
  isTouch = false
})



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height)

  if (clock.time || !isStop) {
    let sprites = [bear, hand, table, glass, pipe, clock, tin, text]
    sprites.forEach(sprite => sprite.draw())
    reset()
    handleTouch()
  } else {
    showScores(coins)
  }

}
animate()



function reset() {
  if (frame > 10 && hand.position.y > glass.target.position.y - 58) {
    hand.position.y -= 6;
  }

  if (isStop && isReset) {
    switch (true) {
      case frame < 50:
        hand.position.y += 15;
        break;
      case frame > 50 && frame < 80:
        glass.slideOut();
        text.message = '';
        bear.position.y += 10;
        break;
      case frame > 100 && frame < 110:
        glass = new Glass(data.glass);
        glass.position.x = canvas.width;
        bear.expression = 'normal';
        break;
      case frame > 110 && frame < 140:
        bear.position.y -= 10;
        break;
      case frame > 140:
        isStop = false;
        isReset = false;
        frame = 0;
        break;
    }
    frame++;
  }
}




function handleTouch() {
  if (isStop) {
    isReset = true
    return
  }

  if (isTouch) {
    if (glass.liquid.height <= 220) {
      glass.liquid.height += 25
    }
    if (glass.liquid.height >= 100) {
      if (glass.foam.position.y > glass.position.y + 2) {
        adjustFoam(2)
      } else {
        isStop = true
        glass.liquid.height = 0

        bear.expression = 'scream'
        return
      }
    }
  } else {
    glass.liquid.height = 0
    if (glass.foam.position.y <= glass.beer.position.y) {
      adjustFoam(-1)
    }
  }

  if (glass.beer.position.y > glass.foam.position.y) {
    adjustBeer(0.5)
  }
  checkVolume()
}

function checkVolume() {
  //pastikan volume bir tidak kosong
  if (glass.beer.position.y == glass.position.y + glass.height - 5) return

  //cek target
  if (Math.floor(glass.beer.position.y + 1) == glass.foam.position.y) {
    isStop = true

    if (isAccording()) {
      bear.expression = 'perfect'
      text.message = 'Perfect Pour'
      addCoin('gold')
      return
    }
    if (isAccording(5)) {
      text.message = 'Close Enough'
      bear.expression = 'notbad'
      addCoin('silver')
      return
    }
    text.message = ' weak pour '
    bear.expression = 'disappointed'
    addCoin('bronze')
    return;
  }


  //cek volume bir dari ketinggian gelas
  if (isUnder(90)) {
    bear.expression = 'sweating'
  }
  if (isUnder(70)) {
    bear.expression = 'moreSweating'
  }
}

function adjustFoam(speed) {
  glass.foam.position.y -= speed
  glass.foam.height += speed
}

function adjustBeer(speed) {
  glass.beer.position.y -= speed
  glass.beer.height += speed
}

function isUnder(percent) {
  return glass.beer.position.y <= (table.position.y - glass.position.y) * percent / 100 + glass.position.y;
}

function isAccording(tolerant = 0) {
  return glass.beer.position.y <= glass.target.position.y + glass.target.height + tolerant &&
    glass.beer.position.y >= glass.target.position.y - tolerant
}