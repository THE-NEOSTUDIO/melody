import React, {Component} from 'react';
import img from "./save-tem.png";

export default class extends Component{
  render() {
    return (
      <div style={{
        margin: '0 auto',
        background: `url("${img}") no-repeat center`,
        backgroundSize: 'cover',
        width: '3.69rem',
        height: '.63rem'
      }}>

      </div>
    )
  }
}
