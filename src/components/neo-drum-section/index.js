import React, {Component} from 'react';
import {connect} from "../../common/context";
import './energetic-theme.scss';

class NeoDrumSection extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-drum-section">
        <div className={theme}>
          <div className="neo-drum-section-main-element">
            <div className="subtitle">{/*subtitle icon*/}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(NeoDrumSection);
