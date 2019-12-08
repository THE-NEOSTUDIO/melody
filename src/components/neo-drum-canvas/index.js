import React, {Component} from 'react';
import img from "./drum-canvas-tem.png";

export default class extends Component{
  render() {
    return (
      <div style={{
        margin: '0 auto',
        marginTop: '0.02rem',
        background: `url("${img}") no-repeat center`,
        backgroundSize: 'cover',
        width: '3.69rem',
        height: '.91rem'
      }}>

      </div>
    )
  }
}
