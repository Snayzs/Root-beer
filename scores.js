class Scores {
  constructor(coins) {
    this.coins = coins;
    this.initialize();
  }

  initialize() {
    this.top = 50;
    this.left = 50;
    this.bottom = canvas.height - 50;
    this.right = canvas.width - 50;

    this.calculateScores();
  }

  board() {
    c.strokeStyle = '#bdbdbd';
    c.lineWidth = 2;
    c.fillStyle = '#bdbdbd';
    c.font = '20px monospace';
    
    c.beginPath()
    c.moveTo(this.left, this.top);
    c.lineTo(this.left, this.bottom);
    c.lineTo(this.right, this.bottom);
    c.lineTo(this.right, this.top);
    c.lineTo(this.left, this.top);

    c.moveTo(this.left, this.bottom - 70);
    c.lineTo(this.right, this.bottom - 70);
    c.closePath();

    c.stroke();
  }

  calculateScores() {
    let coins = [...this.coins];
    let category = ['Perfect', 'Enough', 'Less'];
    let currency = ['Gold', 'Silver', 'Bronze'];
    let [perfect, enough, less] = currency.map(c => coins.filter(e => e.type === c));

    this.amount = [perfect, enough, less].map(e => e.length);

    this.point = [perfect, enough, less].map(el => el.map(e => e.value).reduce((a, b) => a + b, 0));
    this.totalPoint = this.point.reduce((a, b) => a + b, 0);
  }

  draw() {
    this.board();

    this.amount.forEach((item, i) => {
      c.fillText(item, this.right - 200, this.top + 50 * (i + 1));
    });

    this.point.forEach((item, i) => {
      c.fillText(item, this.right - 100, this.top + 50 * (i + 1));
    });

    ['Perfect', 'Enough', 'Less'].forEach((item, i) => {
      c.fillText(item, this.left + 30, this.top + 50 * (i + 1));
    });

    c.fillText('Total', this.left + 30, this.bottom - 30);
    c.fillText(this.totalPoint, this.right - 100, this.bottom - 30);
  }
}