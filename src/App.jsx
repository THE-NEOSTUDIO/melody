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
import './App.scss';

import {SOUND_MAP} from "./common/constants/type-map";
import {GET_RHYTHM_API_LIST, GET_DRUM_API_LIST} from "./common/constants/api";
import neoFetch from 'axios';

const queries = parseUrl();

export default class App extends PureComponent {

  loadingTimer; // loading timer

  state = {
    step: 0, // step:0 首页
    refluence: queries && queries.refluence === '1', // 是否回流
    loading: true,
    loadingAnimation: false,
  };

  // 预先加载所有资源
  initAPIs() {
    let APIs = [];
    for (let key in SOUND_MAP) {
      APIs = [...APIs, ...GET_RHYTHM_API_LIST(key)]
    }
    APIs = [...APIs, ...GET_DRUM_API_LIST()];
    return Promise.all(APIs.map(url => neoFetch({url, method: 'get', responseType: 'arraybuffer'})));
  }

  componentDidMount() {
    // 第一次进入必loading
    this.setLoading(true);
    this.initAPIs().then(() => {
      setTimeout(() => {
        this.setAnimation();
        setTimeout(() => {
          this.setLoading(false);
          this.setState({loadingAnimation: false})
        }, 400);
      }, 1500);
    }).catch(e => {
      // TODO error handle
      console.log(e);
      // 动画时长
      this.setAnimation();
      setTimeout(() => {
        this.setLoading(false);
        this.setState({loadingAnimation: false})
      }, 400);
    });
  }

  setAnimation() {
    this.setState({loadingAnimation: true})
  }

  // 设置步骤
  setStep(step) {
    this.setState({step});
  }

  // 设置loading
  setLoading(loading) {
    if (loading) {
      // 750ms 触发 loading
      this.loadingTimer = setTimeout(() => {
        this.setState({loading})
      }, 500);
    } else {
      clearTimeout(this.loadingTimer);
      this.setState({loading});
    }
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
          return <Maker setLoading={this.setLoading.bind(this)} setStep={this.setStep.bind(this)}/>;
        case 2:
          return <Share setStep={this.setStep.bind(this)}/>;
      }
    } else {
      switch (step) {
        case 0:
          return <RefluenceMainPage setStep={this.setStep.bind(this)}/>;
        case 1:
          return <RefluencePlayer setStep={this.setStep.bind(this)}/>;
        case 2:
          return <Maker setLoading={this.setLoading.bind(this)} setStep={this.setStep.bind(this)}/>;
        case 3:
          return <Share setStep={this.setStep.bind(this)}/>
      }
    }
  }

  render() {
    const {step, refluence, loading, loadingAnimation} = this.state;
    return (
      <div
        className={`bounce-disabled-container bounce-disabled-container-${loading ? 'loading' : ''} loading-${loadingAnimation ? 'animated' : 'null'}`}>
        <div className="loading-item">{/*loading spinning*/}</div>
        {
          this.renderPage(step, refluence)
        }
      </div>
    )
  }
}
