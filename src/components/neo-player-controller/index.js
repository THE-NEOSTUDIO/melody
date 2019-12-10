import React, {Component} from 'react';
import {connect} from "../../common/context";
import './energetic-theme.scss';

class NeoRhythmCanvas extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-player-controller">
        <div className={theme}>
          <canvas className="neo-player-controller">{/*controller*/}</canvas>
        </div>
      </div>
    )
  }
}

export default connect(NeoRhythmCanvas);
