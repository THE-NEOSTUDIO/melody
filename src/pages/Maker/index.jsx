/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: App JSX Element
 * @Last Modified time: 2019-12-09 00:08
 */
import React, {PureComponent} from 'react';

import {ENERGETIC} from "../../common/constants/theme";
import {INSTRUMENTS} from "../../common/constants/instruments";
import './index.scss';
import Context from '../../common/context';

import NeoHeader from '../../components/neo-header';
import NeoRhythmSection from '../../components/neo-rhythm-section';
import NeoRhythmCanvas from '../../components/neo-rhythm-canvas';
import NeoDrumSection from '../../components/neo-drum-section';
import NeoDrumCanvas from '../../components/neo-drum-canvas';
import NeoPlayerController from '../../components/neo-player-controller';
import NeoFooter from '../../components/neo-footer';
import NeoSoundGenerator from "../../common/components/audio/neo-sound-generator";
import NeoPlayer from "../../common/components/audio/neo-player";


export default class Index extends PureComponent {

  player = undefined;

  constructor(props) {
    super(props);
    this.state = {
      setContext: this.setState.bind(this),
      theme: ENERGETIC,
      konvaDebug: false,
      // 滑动点亮盒子相关
      active: false,
      row: undefined,
      column: undefined,
      columnIndex: undefined,
      // Sound相关
      sound: INSTRUMENTS[0], // 默认声音类型
      loading: false, // 是否正在加载
      initialized: false,
      error: false,
      reset: false, // 是否需要重置
      // TODO initialize状态
    }
  }

  // 播放作品时 当前播放的行数
  setColumnIndex(index) {
    this.setState({
      columnIndex: index
    })
  }

  render() {
    const {theme, loading} = this.state;
    return (
      <Context.Provider value={this.state}>
        {
          <div className={`neo neo-${theme}`}>
            <NeoHeader/>
            <NeoRhythmSection/>
            <NeoRhythmCanvas player={this.player}/>
            <NeoDrumSection/>
            <NeoDrumCanvas player={this.player}/>
            <NeoPlayerController player={this.player}/>
            <NeoFooter/>
            <NeoSoundGenerator/>
            <NeoPlayer
              ref={player => {
                this.player = player;
                window.player = player;
              }}
              loading={loading}
              setColumnIndex={this.setColumnIndex.bind(this)}
            />
          </div>
        }
      </Context.Provider>
    )
  }
}
