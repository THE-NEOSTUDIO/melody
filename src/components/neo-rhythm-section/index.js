/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: Header Element
 * @Last Modified time: 2019-12-09 00:08
 */
import React, {Component} from 'react';
import {connect} from "../../common/context";
import {ENERGETIC} from "../../common/constants/theme";
import './energetic-theme.scss';

class NeoRhythmSection extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className={`neo-rhythm-section neo-rhythm-section-${ENERGETIC}`}>
        <div
          style={{display: theme === ENERGETIC ? 'block' : 'none'}} /* ENERGETIC主题色 */
          className={`neo-header-main-element neo-header-main-element-${theme}`
          }>
          <div className="title">{/*霓虹制造局*/}</div>
          <div className="subtitle">{/*NEO STUDIO*/}</div>
        </div>
        {/*TODO 其他主题*/}
      </div>
    );
  }
}

export default connect(NeoRhythmSection);
