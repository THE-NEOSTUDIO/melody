import React, {Component} from 'react';
import {connect} from "../../common/context";
import {INSTRUMENTS} from "../../common/constants/instruments";
import VerticalSlider from "./range";
import './energetic-theme.scss';

class NeoRhythmCanvas extends Component {

  instrumentIndex = 0;

  state = {
    start: false,
    showTempo: false,
    tempoAnimationClassName: '',
  };

  // TODO 播放的状态不是很统一……
  // TODO 时间允许的话引入css-animation库控制动画

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showTempo !== this.state.showTempo) {
      this.setState({
        tempoAnimationClassName: this.state.showTempo ? '-show' : '-hide'
      })
    }
  }

  // 更改乐器
  changeInstrument() {
    const {setContext} = this.props.context;
    this.instrumentIndex++;
    if (this.instrumentIndex >= INSTRUMENTS.length) {
      this.instrumentIndex = 0;
    }
    setContext({
      sound: INSTRUMENTS[this.instrumentIndex]
    })
  }

  resetAll() {
    console.log(1);
    this.props.context.setContext({reset: true});
    this.setState({start: false})
  }

  play() {
    const {player} = this.props;
    if (
      !player.rhythmNotePad.find(part => part.length > 0)
      && !player.drumNotePad.find(part => part.length > 0)
    ) {
      return null;
    }
    this.state.start ? player.stop() : player.play();
    this.setState(({start}) => {
      return {
        start: !start
      }
    })
  }

  render() {
    const {player} = this.props;
    const {theme, sound} = this.props.context;
    const {start, showTempo, tempoAnimationClassName} = this.state;
    return (
      <div className="neo-player-controller">
        <div className={theme}>
          <div className="neo-player-controller border-all">
            <div onClick={() => this.play()}
                 className={`neo-btn-${start ? 'start' : 'pause'} border-all`}>{/*开始暂停*/}</div>
            <div onClick={this.changeInstrument.bind(this)}
                 className={`neo-instrument-selection-btn-${sound} border-all`}>{/*乐器选择*/}</div>
            <div
              onClick={() => this.setState({showTempo: !showTempo})}
              className="neo-tempo-btn border-all">
              <div
                className={`tempo-container${tempoAnimationClassName}`}>
                <div className="tempo-range">
                  <VerticalSlider player={player}/>
                </div>
                <div className="inside-tempo">{/*{/*节奏选择*/}</div>
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
