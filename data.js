class Data {
  constructor() {
    this.table = {
      position: {
        x: 0,
        y: canvas.height - 50
      },
      width: canvas.width,
      height: 50,
      color: '#60666D'
    }
    this.glass = {
      position: {
        x: canvas.width - 220,
        y: this.table.position.y + 25
      },
      sizes: [80, 100, 120, 150, 170],
      width: 65,
      src: "glass.png",
      color: {
        bg: "#AFAFAF",
        beer: "#FFD700",
        foam: "#EEEEEE",
        target: "#545454"
      }
    }
    this.bear = {
      position: {
        x: 70,
        y: this.table.position.y - 250
      },
      expression: "normal",
      width: 250,
      height: 250,
      paths: {
        normal: 'normal.png',
        sweating: 'sweating.png',
        moreSweating: 'moreSweating.png',
        notbad: 'notbad.png',
        scream: 'scream.png',
        perfect: 'perfect.png',
        disappointed: 'disappointed.png',
      }
    }
    this.pipe = {
      position: {
        x: canvas.width - 240,
        y: 0
      },
      height: 250,
      width: 240,
      src: "pipe.png"
    }
    this.tin = {
      position: {
        x: 80,
        y: this.table.position.y - 60 + 20
      },
      height: 60,
      width: 60,
      color: "#fff"
    }
    this.hand = {
      position: {
        x: 220,
      },
      width: 250,
      height: 250,
      src: "hand.png"
    }
    this.clock = {
      position: {
        x: canvas.width - 120,
        y: this.table.position.y - 80 + 10
      },
      width: 100,
      height: 100,
      src: "clock.png",
      time: 60
    }
    this.bear_text = {
      position: {
        x: 110,
        y: 50
      },
      font: [25, 'monospace', '#bdbdbd'],
    }
    this.home_title = {
      position: {
        x: canvas.width / 2 - 150,
        y: 120
      },
      font: [50, 'Helvetica', '#bdbdbd'],
      message: "ROOTED BEAR"
    }
    this.loading = {
      position: {
        x: canvas.width / 2 - 100,
        y: canvas.height / 2
      },
      font: [30, 'monospace', '#bdbdbd'],
      message: 'Loading...'
    }
    this.highScores = {
      position: {
        x: canvas.width / 2 - 100,
        y: 150
      },
      font: [20, 'monospace', '#bdbdbd']
    }
    this.credit = {
      position: {
        x: canvas.width - 170,
        y: canvas.height - 20
      },
      font: [15, 'monospace', '#bdbdbd'],
      message: 'Credit Alex Susmam'
    }
    this.button = {
      position: {
        x: canvas.width / 2 - 40,
        y: 200
      },
      width: 100,
      height: 50,
      color: '#bdbdbd',
      font: [20, 'monospace', '#000'],
      message: 'START'
    }
    this.coin = {
      gold: {
        type: 'Gold',
        value: 8
      },
      silver: {
        type: 'Silver',
        value: 4
      },
      bronze: {
        type: 'Bronze',
        value: 1
      },
    }
  }
}