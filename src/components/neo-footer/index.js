/*
 * @Author: jujube
 * @Date: 2019-12-10 20:20
 * @Description: Footer Element
 * @Last Modified time: 2019-12-09 00:08
 */
import React, {Component} from 'react';
import {connect} from "../../common/context";
import {ENERGETIC} from "../../common/constants/theme";
import './energetic-theme.scss';

class NeoHeader extends Component {

  stopAndSave() {
    const {player} = this.props;
    if (
      !player.rhythmNotePad.find(part => part.length > 0)
      && !player.drumNotePad.find(part => part.length > 0)
    ) {
      return null;
    }

    player.stop();

    window.sound_results = JSON.stringify({
      bpm: window.player.bpm,
      rhythmNotes: window.player.rhythmNotePad,
      drumNotes: window.player.drumNotePad,
      soundType: this.props.context.sound
    });
    this.props.setStep(2);
  }

  render() {
    const {theme} = this.props.context;
    return (
      <div className="neo-footer">
        <div
          style={{display: theme === ENERGETIC ? 'flex' : 'none'}}
          className={theme}
        >
          {/*ENERGETIC THEME*/}
          <div className="neo-footer-left-element">{/*左侧元素*/}</div>
          <div className="neo-footer-main-element">
            <div onClick={()=>this.stopAndSave()} className="title">{/*保存*/}</div>
            <div className="subtitle">{/*Save*/}</div>
          </div>
          <div className="neo-footer-right-element">{/*右侧元素*/}</div>
        </div>
      </div>
    );
  }
}

export default connect(NeoHeader);
