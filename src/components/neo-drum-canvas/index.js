import React, {Component} from 'react';
import {connect} from "../../common/context";
import './energetic-theme.scss';

class NeoDrumCanvas extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-drum-canvas">
        <div className={theme}>
          <canvas className="neo-drum-canvas">{/*画布*/}</canvas>
        </div>
      </div>
    )
  }
}

export default connect(NeoDrumCanvas);
