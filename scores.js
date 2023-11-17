function drawBoard() {

}

function showScores(totalCoins) {
  let top = 50
  let left = 50
  let bottom = canvas.height - 50
  let right = canvas.width - 50

  c.strokeStyle = '#bdbdbd'
  c.lineWidth = 2
  c.fillStyle = '#bdbdbd'
  c.font = '20px monospace'

  c.moveTo(left, top)
  c.lineTo(left, bottom)
  c.lineTo(right, bottom)
  c.lineTo(right, top)
  c.lineTo(left, top)

  c.moveTo(left, bottom - 70)
  c.lineTo(right, bottom - 70)

  c.stroke()


  let coins = [...totalCoins];
  let category = ['Perfect', 'Enough', 'Less'];
  let currency = ['Gold', 'Silver', 'Bronze']
  let [perfect, enough, less] = currency.map(c => coins.filter(e => e.type === c))

  let amount = [perfect, enough, less].map(e => e.length)

  let point = [perfect, enough, less].map(el => el.map(e => e.value).reduce((a, b) => a + b, 0))
  let total_point = point.reduce((a, b) => a + b, 0)

  amount.forEach((item, i) => {
    c.fillText(item, right - 200, top + 50 * (i + 1))
  })

  point.forEach((item, i) => {
    c.fillText(item, right - 100, top + 50 * (i + 1))
  })

  category.forEach((item, i) => {
    c.fillText(item, left + 30, top + 50 * (i + 1))
  })

  c.fillText('Total', left + 30, bottom - 30)
  c.fillText(total_point, right - 100, bottom - 30)
}