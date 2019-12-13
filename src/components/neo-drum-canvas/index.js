import React, {Component} from 'react';
import {connect} from "../../common/context";
import NeoDrumMaker from "../../common/components/canvas/neo-durm-maker";
import './energetic-theme.scss';
import {transformRemToPixel} from "../../common/utils";

class NeoDrumCanvas extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-drum-canvas">
        <div className={theme}>
          <NeoDrumMaker player={this.props.player} editable={true} width={transformRemToPixel(3.69)} height={window.innerHeight * 0.13475} />
        </div>
      </div>
    )
  }
}

export default connect(NeoDrumCanvas);
