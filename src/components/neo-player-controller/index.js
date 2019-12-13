import React, {Component} from 'react';
import {connect} from "../../common/context";
import {INSTRUMENTS} from "../../common/constants/instruments";
import './energetic-theme.scss';

class NeoRhythmCanvas extends Component {

  instrumentIndex = 0;
  start = false;

  // 更改乐器
  changeInstrument() {
    const {setContext} = this.props.context;
    if (this.instrumentIndex >= INSTRUMENTS.length) {
      this.instrumentIndex = 0;
    }
    setContext({
      sound: INSTRUMENTS[this.instrumentIndex++]
    })
  }

  render() {
    const {theme, sound} = this.props.context;
    const {player} = this.props;
    return (
      <div className="neo-player-controller">
        <div className={theme}>
          <div className="neo-player-controller border-all">
            <div onClick={() => {
              this.start ? player.stop() : player.play();
              this.start = !this.start;
            }} className="neo-start-or-pause-btn border-all">开始 / 暂停
            </div>
            <div onClick={this.changeInstrument.bind(this)}
                 className="neo-instrument-selection-btn border-all">{sound}</div>
            <div className="neo-tempo-btn border-all">{/*选择节奏按钮*/}</div>
            <div onClick={() => this.props.context.setContext({reset: true})}
                 className="neo-restart-btn border-all">{/*重试按钮*/}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(NeoRhythmCanvas);
