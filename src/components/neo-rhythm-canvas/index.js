import React, {Component} from 'react';
import {connect} from "../../common/context";
import './energetic-theme.scss';
import NeoRhythmMaker from "../../common/components/canvas/neo-rhythm-maker-hooks";
import {transformRemToPixel} from "../../common/utils";


class NeoRhythmCanvas extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-rhythm-canvas">
        <div className={theme}>
          <NeoRhythmMaker player={this.props.player} editable={true} width={transformRemToPixel(3.69)} height={window.innerHeight * 0.40425}/>
        </div>
      </div>
    )
  }
}

export default connect(NeoRhythmCanvas);
