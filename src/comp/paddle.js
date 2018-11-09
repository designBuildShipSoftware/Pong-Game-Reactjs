import React, { Component } from 'react';


export class Paddle extends Component {
  render() {
    let style = {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        background: 'red',
        position: 'absolute',
        top: this.props.y + 'px', 
        left: this.props.x + 'px'
      };
    
    return (
      <div style={style}>
      </div>
    );
  }
}

export default Paddle;
