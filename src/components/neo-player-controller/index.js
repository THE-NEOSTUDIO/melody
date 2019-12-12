import React, {Component} from 'react';
import {connect} from "../../common/context";
import './energetic-theme.scss';

class NeoRhythmCanvas extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-player-controller">
        <div className={theme}>
          <div onClick={() => {
            this.props.context.setContext({
              sound: 'wood'
            })
          }} className="neo-player-controller"></div>
        </div>
      </div>
    )
  }
}

export default connect(NeoRhythmCanvas);
