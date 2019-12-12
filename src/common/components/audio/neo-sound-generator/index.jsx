import React, {Component} from 'react';
import {connect} from "../../../context";
import {GET_RHYTHM_API_LIST, GET_DRUM_API_LIST} from "../../../constants/api";
import neoFetch from 'axios';
import Tone from 'tone/Tone';

// no-render
class NeoSoundGenerator extends Component {

  static setRhythmADSREnvelope(sound) {
    switch (sound) {
      case "piano":
        window.sampler.volume.value = -5;
        window.sampler.release = 0.6;
        window.sampler.duration = '2n';
        break;
      case "synthesizer":
        window.sampler.attack = 0.6;
        window.sampler.volume.value = -5;
        window.sampler.release = 0.4;
        window.sampler.duration = '12n';
        break;
      case "wood":
        window.sampler.attack = 0.6;
        window.sampler.volume.value = -5;
        window.sampler.release = 0.6;
        window.sampler.duration = '4n';
        break;
      case "marimba":
        window.sampler.volume.value = -5;
        window.sampler.release = 0.6;
        window.sampler.duration = '2n';
        break;
      case "string":
        window.sampler.volume.value = -5;
        window.sampler.release = 0.6;
        window.sampler.duration = '2n';
    }
  }

  static saveSoundBufferToSampler(key, buffer) {
    return new Promise((resolve) => {
      window.sampler.add(key, buffer, function () {
        resolve(true)
      });
    })
  }

  constructor(props) {
    super(props);
  }

  init() {
    Object.defineProperty(window, "sampler", {
      value: new Tone.Sampler(),
      writable: true,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(window.sampler, "duration", {
      value: '2n',
      writable: true,
      enumerable: true,
      configurable: true
    });
  }

  reset() {
    window.sampler = null;
  }

  componentDidMount() {
    this.reset();
    this.init();
    this.loadSoundAndGenerateSoundMap(true);
  }

  componentDidUpdate(props) {
    const {loading, setContext} = props.context;
    // prohibit multiple-fetch
    if (loading) {
      return null;
    }

    setContext({
      loading: true
    });

    this.reset();
    this.init();
    this.loadSoundAndGenerateSoundMap();
  }

  loadSoundAndGenerateSoundMap(isMounting) {
    const {sound, setContext} = this.props.context;

    // initializing hook
    NeoSoundGenerator.setRhythmADSREnvelope(sound);


    // set App Context
    Promise.all([this.generateRhythmSound(), this.generateDrumSound()])
      .then(() => {
        isMounting ?
          setContext({
            initialized: true,
            loading: false
          }) :
          setContext({
            loading: false
          })
      }).catch(e => {
      console.log(e);
    })
  }

  generateRhythmSound() {
    const {sound} = this.props.context;
    console.log(sound);
    return new Promise((resolve) => {
      const APIs = GET_RHYTHM_API_LIST(sound);
      if (APIs && APIs.length > 0) {
        // 主逻辑 axios兼容性好，这里选择axios
        return Promise.all(APIs.map(url => neoFetch({url, method: 'get', responseType: 'arraybuffer'})))
          .then(results => results.map(result => result.data))
          .then(resources => Promise.all(resources.map(data => Tone.context.decodeAudioData(data))))
          .then(([C3Buffer, Ds3Buffer, Fs3Buffer, A3Buffer, C4Buffer]) => Promise.all([
            NeoSoundGenerator.saveSoundBufferToSampler('C3', C3Buffer),
            NeoSoundGenerator.saveSoundBufferToSampler('D#3', Ds3Buffer),
            NeoSoundGenerator.saveSoundBufferToSampler('F#3', Fs3Buffer),
            NeoSoundGenerator.saveSoundBufferToSampler('A3', A3Buffer),
            NeoSoundGenerator.saveSoundBufferToSampler('C4', C4Buffer),
          ]));
      } else {
        resolve([]);
      }
    })
  }

  generateDrumSound() {
    const {sound} = this.props.context;
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  render() {
    return null;
  }
}


export default connect(NeoSoundGenerator);
