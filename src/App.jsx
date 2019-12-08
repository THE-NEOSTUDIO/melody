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


export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      setContext: this.setState.bind(this),
      theme: ENERGETIC
    }
  }

  render() {
    const {theme} = this.state;
    return (
      <Context.Provider value={this.state}>
        <div className={`neo neo-${theme}`}>
          <NeoHeader/>
          <NeoRhythmSection/>
        </div>
      </Context.Provider>
    )
  }
}
