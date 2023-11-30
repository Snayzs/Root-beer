const data = new Data()
let table = new Sprite(data.table)
let hand = new Sprite(data.hand)
let pipe = new Sprite(data.pipe)
let clock = new Clock(data.clock)
let glass = new Glass(data.glass)
let bear = new Bear(data.bear)
let bear_text = new Text(data.bear_text)
let loading = new Text(data.loading)
let buttonStart = new Button(data.button)
let home_title = new Text(data.home_title)
let credit = new Text(data.credit)
let highScores_text = new Text(data.highScores)


// Sound effect
let pour_sfx = new Howl(data.sounds.pour)
let scream_sfx = new Howl(data.sounds.scream)
pour_sfx.seek(0.5)

let isReset = false
let isStop = false
let isTouch = false
let isLoading = true
let isStart = false
let isPouring = true
let image_has_render = 0
let time = 60
let coins = []
let frame = 0
let highScores = localStorage.getItem('root_bear_highScores') || 0


hand.position.y = glass.target.position.y - 58
glass.position.x = canvas.width
highScores_text.message = 'high scores : $' + highScores


function getRandom({ min, max }) {
  return Math.round(Math.random() * (max - min) + min)
}

function setTime(currentTime) {
  clock.time = currentTime
  if (currentTime > 0)
    setTimeout(() => setTime(currentTime - 1), 1000)
}

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


//loading handler
for (const key in bear.images) {
  bear.images[key].addEventListener('load', () => {
    image_has_render++

    if (image_has_render === Object.keys(bear.images).length) {
      isLoading = false
    }
  })
}




function setPages() {
  switch (true) {
    case isLoading:
      loading.draw()
      break;

    case !isStart:
      home_title.draw()
      buttonStart.draw()
      highScores_text.draw()
      credit.draw()
      buttonStart.init().then(() => {
        setTime(time)
        isStart = true
      })
      break;

    case clock.time > 0:
      let sprites = [bear, hand, table, glass, pipe, clock, bear_text]
      sprites.forEach(sprite => sprite.draw())

      reset()
      handleTouch()
      break;

    case clock.time == 0:
      let scores = new Scores(coins)
      scores.draw()
      break;
  }
}




function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height)

  setPages()
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
        glass.slide('out');
        bear_text.message = '';
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
    pour_sfx.stop()
    return
  }

  if (isTouch) {
    if (isPouring) {
      pour_sfx.play()
      isPouring = false
    }

    if (glass.liquid.height <= 220) {
      glass.liquid.height += 25
    }

    if (glass.liquid.height >= 100) {
      if (glass.foam.position.y > glass.position.y + 2) {
        adjustFoam(1)
      } else {
        isStop = true
        glass.liquid.height = 0

        scream_sfx.play('auto')
        bear.expression = 'scream'
        return
      }
    }
  } else {
    glass.liquid.height = 0

    if (glass.foam.position.y <= glass.beer.position.y) {
      adjustFoam(-1)
      pour_sfx.pause()
      isPouring = true
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
    isPouring = true

    if (isAccording()) {
      bear.expression = 'perfect'
      bear_text.message = 'Perfect Pour'
      addCoin('gold')
      return
    }
    if (isAccording(5)) {
      bear_text.message = 'Close Enough'
      bear.expression = 'notbad'
      addCoin('silver')
      return
    }
    bear_text.message = ' weak pour '
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