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

class NeoHeader extends Component {
  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-header">
        <div
          style={{display: theme === ENERGETIC ? 'flex' : 'none'}}
          className={theme}
        >
          {/*ENERGETIC THEME*/}
          <div className="neo-header-left-element">{/*左侧元素*/}</div>
          <div className="neo-header-main-element">
            <div className="title">{/*霓虹制造局*/}</div>
            <div className="subtitle">{/*NEO STUDIO*/}</div>
          </div>
          <div className="neo-header-right-element">{/*右侧元素*/}</div>
        </div>
      </div>
    );
  }
}

export default connect(NeoHeader);
