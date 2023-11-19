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
        normal: 'assets/bear/normal.png',
        sweating: 'assets/bear/sweating.png',
        moreSweating: 'assets/bear/moreSweating.png',
        notbad: 'assets/bear/notbad.png',
        scream: 'assets/bear/scream.png',
        perfect: 'assets/bear/perfect.png',
        disappointed: 'assets/bear/disappointed.png',
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
    this.text = {
      position: {
        x: 110,
        y: 50
      },
      font: "Monospace",
      size: 25,
      color: "#bdbdbd"
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