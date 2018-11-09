import React, { Component } from 'react';
import './App.css';
import {Paddle} from './comp/paddle';
import {Ball} from './comp/ball';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ball: {width: 16, height: 16, x: 200, y: 100, dx: -2, dy: -1},  
      paddle: {width: 20, height: 50},
      leftPaddle: {x: 10, y: 10},
      rightPaddle: {x: 400 - 10 - 20, y: 10},
      keyMap: {},
      isPaused: true,
      score: {leftScore: 0, rightScore: 0}
    };
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  move() {
    this.detectCollision();
    this.setState(prevState => ({
      ball: {
        ...prevState.ball,
        x: this.state.ball.x + this.state.ball.dx,
        y: this.state.ball.y + this.state.ball.dy
      }
    }));
    
    this.detectPaddleCollision();
    this.movePaddle();
  }

  componentDidMount() {
    this.timerID = setInterval(() => {if(!this.state.isPaused) {this.move()}}, 15)
  }

  detectCollision() {
    if ( 
    ((this.state.ball.x <= this.state.leftPaddle.x + this.state.paddle.width) && 
    (this.state.ball.x > this.state.leftPaddle.x + this.state.paddle.width + this.state.ball.dx)&&
    (this.state.ball.y >= this.state.leftPaddle.y - this.state.ball.height) && 
    (this.state.ball.y <= this.state.leftPaddle.y + this.state.paddle.height)) ||
    ((this.state.ball.x >= this.state.rightPaddle.x-this.state.ball.width) && 
    (this.state.ball.x < this.state.rightPaddle.x - this.state.ball.width + this.state.ball.dx)&&
    (this.state.ball.y >= this.state.rightPaddle.y - this.state.ball.height) && 
    (this.state.ball.y <= this.state.rightPaddle.y + this.state.paddle.height))
    ) {
      this.setState(prevState => ({
        ball: {
          ...prevState.ball,
          dx: -this.state.ball.dx
        }
      })) 
    }

    if (this.state.ball.x <= 5) {
      this.setState({ball: Object.assign({}, this.state.ball, {x: 200, y: 100})});
      this.setState({score: Object.assign({}, this.state.score, {rightScore: this.state.score.rightScore + 1})})
    }
    if (this.state.ball.x >= 5 + 400 - this.state.ball.width) {
      this.setState({ball: Object.assign({}, this.state.ball, {x: 200, y: 100})});
      this.setState({score: Object.assign({}, this.state.score, {leftScore: this.state.score.leftScore + 1})})
    }

    if ((this.state.ball.y <= 5) || (this.state.ball.y >= 5 + 200 - this.state.ball.height)) {
      this.setState(prevState => ({
        ball: {
          ...prevState.ball,
          dy: -this.state.ball.dy
        }
      })) 
    }
  }

  detectPaddleCollision() {
    if (this.state.leftPaddle.y <= 0) {
      this.setState({leftPaddle: Object.assign({}, this.state.leftPaddle, {y: 0})})
    }
    if (this.state.rightPaddle.y <= 0) {
      this.setState({rightPaddle: Object.assign({}, this.state.rightPaddle, {y: 0})})
    }
    if (this.state.leftPaddle.y >= 200 - this.state.paddle.height) {
      this.setState({leftPaddle: Object.assign({}, this.state.leftPaddle, {y: 200 - this.state.paddle.height})})
    }
    if (this.state.rightPaddle.y >= 200 - this.state.paddle.height) {
      this.setState({rightPaddle: Object.assign({}, this.state.rightPaddle, {y: 200 - this.state.paddle.height})})
    }
  }

  movePaddle() {
    if(this.state.keyMap[85]) {
      this.setState({rightPaddle: Object.assign({}, this.state.rightPaddle, {y: this.state.rightPaddle.y-5})});
    }
    if(this.state.keyMap[74]) {
      this.setState({rightPaddle: Object.assign({}, this.state.rightPaddle, {y: this.state.rightPaddle.y+5})});
    }
    if(this.state.keyMap[82]) {
      this.setState({leftPaddle: Object.assign({}, this.state.leftPaddle, {y: this.state.leftPaddle.y-5})});
    }
    if(this.state.keyMap[70]) {
      this.setState({leftPaddle: Object.assign({}, this.state.leftPaddle, {y: this.state.leftPaddle.y+5})});
    }
  }

  handleOnKeyDown(e) {
    const keycode = e.keyCode;
    switch (keycode) {
    case 85: case 74: case 82: case 70:      
    this.setState({keyMap: Object.assign({}, this.state.keyMap, {[keycode]: true})});
    
     }

  }

  handleOnKeyUp(e) {
    const keycode = e.keyCode;
    switch (keycode) {
    case 85: case 74: case 82: case 70:      
    this.setState({keyMap: Object.assign({}, this.state.keyMap, {[keycode]: false})});
    }
  }

  handleClick() {
    this.setState({isPaused: !this.state.isPaused});
  }
      
  render() {
    
    return (
      <div className="App-table" tabIndex="0" onKeyDown={this.handleOnKeyDown} onKeyUp={this.handleOnKeyUp} onClick={this.handleClick}>
      <p align="center"><font size="4">{this.state.isPaused ? "Click to start. r, f, u, j move paddles" : ""}</font></p>
      <p align="center"><font size="4">{this.state.score.leftScore + " : " + this.state.score.rightScore}</font></p>
       <Paddle x={this.state.leftPaddle.x} y={this.state.leftPaddle.y} width={this.state.paddle.width} height={this.state.paddle.height}></Paddle>
       <Ball x={this.state.ball.x} y={this.state.ball.y} width={this.state.ball.width} height={this.state.ball.height}></Ball>
       <Paddle x={this.state.rightPaddle.x} y={this.state.rightPaddle.y} width={this.state.paddle.width} height={this.state.paddle.height}>
       </Paddle>
      </div>
    );
  }
}

export default App;
 