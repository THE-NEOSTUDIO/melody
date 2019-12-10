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
      <div className="neo-rhythm-section">
        <div style={{display: theme === ENERGETIC ? 'flex' : 'none'}} className={theme}>
          {/*ENERGETIC主题色*/}
          <div className="neo-rhythm-section-left-element">{/*左侧元素*/}</div>
          <div className="neo-rhythm-section-main-element">
            <div className="title">{/*新年音乐卡片*/}</div>
            <div className="subtitle">{/*rhythm icon*/}</div>
          </div>
          <div className="neo-rhythm-section-right-element">{/*右侧元素*/}</div>
        </div>
        {/*TODO 其他主题*/}
      </div>
    );
  }
}

export default connect(NeoRhythmSection);
