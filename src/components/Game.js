import { Component } from "react";
import Board from './Board';
import Tetris from '../Tetris';

class Game extends Component {
  state = {tetris: new Tetris(), ditchInterval: false};
  steps = 0;
  interval = 900;

  componentDidMount() {
    this.tid = window.setTimeout(this.intervalFunc, this.interval);
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.clearTimeout(this.tid);
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleReset = () => {
    this.setState({tetris: new Tetris(), ditchInterval: false})
    this.steps = 0;
    this.interval = 900;
    window.clearTimeout(this.tid);
    this.tid = window.setTimeout(this.intervalFunc, this.interval);
  }

  intervalFunc = () => {
    let { tetris, ditchInterval } = this.state;
    if(!ditchInterval && !tetris.done) {
      tetris.down();
      this.setState({ tetris });
      ++this.steps;
      if(this.steps % 6 === 0) --this.interval;
    }

    this.tid = window.setTimeout(this.intervalFunc, this.interval);
    console.log(this.interval);
  }

  handleKeyPress = (e) => {
    let k = e.key;
    let { tetris } = this.state;
    if(tetris.done) return;
    if(k === "ArrowLeft") {
      tetris.left();
      this.setState({ditchInterval: true});
      window.setTimeout(() => this.setState({ditchInterval: false}), 50);
    }
    else if(k === "ArrowUp") {
      tetris.rotate();
      this.setState({ditchInterval: true});
      window.setTimeout(() => this.setState({ditchInterval: false}), 50);
    }
    else if(k === "ArrowRight") {
      tetris.right();
      this.setState({ditchInterval: true});
      window.setTimeout(() => this.setState({ditchInterval: false}), 50);
    }
    else if(k === "ArrowDown") {
      tetris.down();
      this.setState({ditchInterval: true});
      ++this.steps;
      if(this.steps % 6 === 0) --this.interval;
      window.setTimeout(() => this.setState({ditchInterval: false}), 50);
    }
  }

  render() {
    let { tetris } = this.state;
    return (
      <div className="game">
        <Board board={tetris.board} rows={tetris.rows} cols={tetris.cols} />
        <div id="bottom" style={{textAlign: "center"}}>
          <p id="score">Score: {tetris.score}</p>
          <button id="pabtn" onClick={this.handleReset}>Play Again</button>
        </div>
      </div>
    );
  }
}

export default Game;