class Tetris {
  constructor() {
    this.rows = 20;
    this.cols = 10;
    this.pieces = ["I", "J", "L", "O", "S", "T", "Z"];
    this.board = Array(this.rows).fill().map(() => Array(this.cols).fill("0"));
    this.score = 0;
    this.spawnTetrimino();
    this.done = false;
  }

  getRandom = () => {
    const p = this.pieces[Math.floor(Math.random() * 7)];
    if(p === this.pid) return this.pieces[Math.floor(Math.random() * 7)];
    else return p;
  }

  drawTetrimino = () => {
    const t = this.getTetrimino(this.x, this.y, this.pid, this.rid);
    for(const block of this.tetrimino) {
      this.board[block[0]][block[1]] = "0";
    }
    for(const block of t) {
      this.board[block[0]][block[1]] = this.pid;
    }
    this.tetrimino = t;
  }

  getTetrimino = (x, y, pid, rid) => {
    if(pid === "I") {
      if(rid%2 === 1) return [[x-3,y], [x-2,y], [x-1,y], [x,y]];
      else return [[x,y-3], [x,y-2], [x,y-1], [x,y]];
    }
    else if(pid === "J")  {
      if(rid === 1) return [[x-2,y-1], [x-1,y-1], [x,y-1], [x,y-2]];
      if(rid === 2) return [[x-1,y-2], [x-1,y-1], [x-1,y], [x,y]];
      if(rid === 3) return [[x-2,y-1], [x-2,y-2], [x-1,y-2], [x,y-2]];
      if(rid === 0) return [[x-1,y-2], [x,y-2], [x,y-1], [x,y]];
    }
    else if(pid === "L") {
      if(rid === 1) return [[x-2,y-1], [x-1,y-1], [x,y-1], [x,y]];
      if(rid === 2) return [[x,y-2], [x,y-1], [x,y], [x-1,y]];
      if(rid === 3) return [[x-2,y-1], [x-2,y-2], [x-1,y-1], [x,y-1]];
      if(rid === 0) return [[x-1,y], [x-1,y-1], [x-1,y-2], [x,y-2]];
    }
    else if(pid === "O") {
      return [[x-1,y-1], [x,y-1], [x-1,y], [x,y]];
    }
    else if(pid === "S") {
      if(rid%2 === 0) return [[x,y-2], [x,y-1], [x-1,y-1], [x-1,y]];
      else return [[x-2,y-1], [x-1,y-1], [x-1,y], [x,y]];
    }
    else if(pid === "T") {
      if(rid === 0) return [[x-1,y-2], [x-1,y-1], [x-1,y], [x,y-1]];
      if(rid === 1) return [[x-2,y-1], [x-1,y-1], [x,y-1], [x-1,y]];
      if(rid === 2) return [[x,y-2], [x,y-1], [x,y], [x-1,y-1]];
      if(rid === 3) return [[x-2,y], [x-1,y], [x,y], [x-1,y-1]];
    }
    else if(pid === "Z") {
      if(rid%2 === 0) return [[x-1,y-2], [x-1,y-1], [x,y-1], [x,y]];
      else return [[x-2,y], [x-1,y], [x-1,y-1], [x,y-1]];
    }
  }

  spawnTetrimino = () => {
    this.pid = this.getRandom();
    this.rid = 0;
    this.x = (this.pid === "I") ? 0 : 1;
    this.y = 5;
    this.tetrimino = this.getTetrimino(this.x, this.y, this.pid, this.rid);
    for(const [x, y] of this.tetrimino) {
      if(this.board[x][y] !== "0") {
        this.done = true;
      }
    }
    this.drawTetrimino();
  }

  down = () => {
    if(this.x === this.rows-1) {
      this.updateScore();
      this.spawnTetrimino();
      return;
    }
    for(const [x, y] of this.tetrimino) {
      if(this.board[x+1][y] !== "0") {
        let flag = true;
        for(const block2 of this.tetrimino) {
          if(x+1 === block2[0] && y === block2[1]) {
            flag = false;
            break;
          }
        }
        if(flag) {
          this.updateScore();
          this.spawnTetrimino();
          return;
        }
      }
    }
    ++this.x;
    this.drawTetrimino();
  }

  isValidTetrimino = (t) => {
    for(const [x, y] of t) {
      if(x<0 || x>=this.rows || y<0 || y>=this.cols)
        return;
      
      if(this.board[x][y] !== "0") {
        let flag = true;
        for(const [a, b] of this.tetrimino) {
          if(a === x && b === y) {
            flag = false;
            break;
          }
        }
        if(flag) return false;
      }
    }
    return true;
  }

  rotate = () => {
    let t = this.getTetrimino(this.x, this.y, this.pid, (this.rid + 1) % 4);
    if(!this.isValidTetrimino(t)) return;
    this.rid = (this.rid + 1) % 4;
    this.drawTetrimino();
  }

  left = () => {
    let t = this.getTetrimino(this.x, this.y-1, this.pid, this.rid);
    if(!this.isValidTetrimino(t)) return;
    --this.y;
    this.drawTetrimino();
  }

  right = () => {
    let t = this.getTetrimino(this.x, this.y+1, this.pid, this.rid);
    if(!this.isValidTetrimino(t)) return;
    ++this.y;
    this.drawTetrimino();
  }

  updateScore = () => {
    for(let i=this.rows-1; i>=0; --i) {
      let flag = true;
      for(let j=0; j<this.cols; ++j) {
        if(this.board[i][j] === "0") {
          flag = false;
          break;
        }
      }
      if(flag) {
        this.board.splice(i, 1);
        this.board.splice(0, 0, Array(this.cols).fill("0"));
        ++this.score;
        ++i;
      }
    }
  }
}

export default Tetris;