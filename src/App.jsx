/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: App JSX Element
 * @Last Modified time: 2019-12-09 00:08
 */
import React, {PureComponent} from 'react';

import {ENERGETIC} from "./common/constants/theme";
import './App.scss';
import Context from './common/context';

import NeoHeader from './components/neo-header';
import NeoRhythmSection from './components/neo-rhythm-section';
import NeoRhythmCanvas from './components/neo-rhythm-canvas';
import NeoDrumSection from './components/neo-drum-section';
import NeoDrumCanvas from './components/neo-drum-canvas';
import NeoPlayerController from './components/neo-player-controller';
import NeoFooter from './components/neo-footer';
import KonvaStage from "./common/components/canvas/neo-rhythm-maker";


export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      setContext: this.setState.bind(this),
      theme: ENERGETIC,
      konvaDebug: false,
    }
  }

  render() {
    const {theme,konvaDebug} = this.state;
    return (
      <Context.Provider value={this.state}>
        {
          !konvaDebug ?
            (
              <div className={`neo neo-${theme}`}>
                <NeoHeader/>
                <NeoRhythmSection/>
                <NeoRhythmCanvas/>
                <NeoDrumSection/>
                <NeoDrumCanvas/>
                <NeoPlayerController/>
                <NeoFooter/>
              </div>
            )
            :
            <div className="konvaDebug">
              <KonvaStage width={window.innerWidth} height={window.innerHeight}/>
            </div>
        }
      </Context.Provider>
    )
  }
}
