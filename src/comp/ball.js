import React, { Component } from 'react';

export class Ball extends Component {
  
  render() {
    let style = {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        background: 'blue',
        borderRadius: '50%',
        position: 'absolute',
        top: this.props.y+ 'px', 
        left: this.props.x + 'px'
      };

  
    return (
      <div style={style}>
      </div>
    );
  }
}

export default Ball;
