import React, {Component} from 'react';
import img from "./tem-drum.png";

export default class extends Component{
  render() {
    return (
      <div style={{
        margin: '0 auto',
        marginTop: '0.02rem',
        background: `url("${img}") no-repeat center`,
        backgroundSize: 'cover',
        width: '3.69rem',
        height: '.49rem'
      }}>

      </div>
    )
  }
}
