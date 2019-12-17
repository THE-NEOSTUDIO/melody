/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: App JSX Element
 * @Last Modified time: 2019-12-09 00:08
 */
import React, {PureComponent} from 'react';
import {parseUrl} from "./common/utils";
import MainPage from './pages/MainPage/index';
import RefluenceMainPage from './pages/RefluenceMainPage/index';
import RefluencePlayer from './pages/RefluencePlayer/index';
import Maker from './pages/Maker/index';
import Share from './pages/Share/index';

const queries = parseUrl();

export default class App extends PureComponent {

  state = {
    step: 0, // step:0 首页
    refluence: queries && queries.refluence === '1' // 是否回流
  };

  setStep(step) {
    this.setState({step});
  }

  componentDidUpdate() {
    this.renderPage();
  }

  renderPage(step, refluence) {
    if (!refluence) {
      switch (step) {
        case 0:
          return <MainPage setStep={this.setStep.bind(this)}/>;
        case 1:
          return <Maker setStep={this.setStep.bind(this)}/>;
        case 2:
          return <Share setStep={this.setStep.bind(this)}/>;
      }
    } else {
      switch (step) {
        case 0:
          return <RefluenceMainPage setStep={this.setStep.bind(this)}/>;
        case 1:
          return <RefluencePlayer setStep={this.setStep.bind(this)}/>;
        case 3:
          return <Maker setStep={this.setStep.bind(this)}/>;
        case 4:
          return <Share setStep={this.setStep.bind(this)}/>
      }
    }
  }

  render() {
    const {step, refluence} = this.state;
    return (
      <div className="bounce-disabled-container">
        {
          this.renderPage(step, refluence)
        }
      </div>
    )
  }
}
