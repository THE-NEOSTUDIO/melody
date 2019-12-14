import React, {Component} from 'react';
import {connect} from "../../common/context";
import {INSTRUMENTS} from "../../common/constants/instruments";
import './energetic-theme.scss';

class NeoRhythmCanvas extends Component {

  instrumentIndex = 0;
  showTempo = true;

  state = {
    start: false
  };

  // TODO 播放的状态不是很统一……

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

  resetAll() {
    this.props.context.setContext({reset: true});
    this.setState({start: false})
  }

  play() {
    const {player} = this.props;
    this.state.start ? player.stop() : player.play();
    this.setState(({start}) => {
      return {
        start: !start
      }
    })
  }

  render() {
    const {theme, sound} = this.props.context;
    const {start} = this.state;
    return (
      <div className="neo-player-controller">
        <div className={theme}>
          <div className="neo-player-controller border-all">
            <div onClick={() => this.play()} className={`neo-btn-${start ? 'start': 'pause'} border-all`}>{/*开始暂停*/}</div>
            <div onClick={this.changeInstrument.bind(this)}
                 className={`neo-instrument-selection-btn-${sound} border-all`}>{/*乐器选择*/}</div>
            <div className="neo-tempo-btn border-all">
              <div className="tempo-container">

              </div>
            </div>
            <div onClick={() => this.resetAll()} className="neo-restart-btn border-all">{/*重试按钮*/}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(NeoRhythmCanvas);
