import { Component } from "react";
import Board from './Board';
import Tetris from '../Tetris';

class Game extends Component {
  state = {tetris: new Tetris(), ditchInterval: false};

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      let { tetris, ditchInterval } = this.state;
      if(ditchInterval || tetris.done) return;
      tetris.down();
      this.setState({ tetris });
    }, 900);

    document.addEventListener("keydown", (e) => {
      let k = e.key;
      let { tetris } = this.state;
      if(tetris.done) return;
      if(k === "ArrowLeft") tetris.left();
      else if(k === "ArrowUp") tetris.rotate();
      else if(k === "ArrowRight") tetris.right();
      else if(k === "ArrowDown") tetris.down();
      this.setState({ditchInterval: true});
      window.setTimeout(() => this.setState({ditchInterval: false}), 50);
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  handleReset = () => {
    this.setState({tetris: new Tetris(), ditchInterval: false})
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