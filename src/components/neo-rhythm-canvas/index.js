import React, {Component} from 'react';
import {connect} from "../../common/context";
import './energetic-theme.scss';

class NeoRhythmCanvas extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-rhythm-canvas">
        <div className={theme}>
          <canvas className="neo-rhythm-canvas">{/*画布*/}</canvas>
        </div>
      </div>
    )
  }
}

export default connect(NeoRhythmCanvas);
