import {Component} from 'react';
import {connect} from "../../../context";
import {GET_RHYTHM_API_LIST, GET_DRUM_API_LIST} from "../../../constants/api";
import neoFetch from 'axios';
import Tone from 'tone/Tone';

// no-render
class NeoSoundGenerator extends Component {

  /* 设置不同乐器的不同ADSR */
  static setRhythmADSREnvelope(sound) {
    switch (sound) {
      case "piano":
        window.sampler.volume.value = -5;
        window.sampler.release = 1;
        window.sampler.duration = '2n';
        break;
      case "synthesizer":
        window.sampler.volume.value = -5;
        window.sampler.attack = 0.6;
        window.sampler.release = 0.4;
        window.sampler.duration = '12n';
        break;
      case "wood":
        window.sampler.volume.value = -5;
        window.sampler.attack = 0.6;
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

  static setDrumADSREnvelope() {
    window.sampler.volume.value = -5;
  }

  /* 将Buffer保存至采样机 */
  static saveSoundBufferToSampler(key, buffer) {
    return new Promise((resolve) => {
      window.sampler.add(key, buffer, function () {
        resolve(true)
      });
    })
  }

  static saveSoundBufferToDrumMachine(key, buffer) {
    return new Promise((resolve) => {
      window.drum.add(key, buffer, function () {
        resolve(true)
      });
    })
  }

  /* 获取指定音色 */
  static generateRhythmSound(sound) {
    return new Promise((resolve) => {
      const APIs = GET_RHYTHM_API_LIST(sound);
      // 主逻辑 axios兼容性好，这里选择axios
      Promise.all(APIs.map(url => neoFetch({url, method: 'get', responseType: 'arraybuffer'})))
        .then(results => results.map(result => result.data))
        .then(resources => Promise.all(resources.map(data => Tone.context.decodeAudioData(data))))
        .then(([C3Buffer, Ds3Buffer, Fs3Buffer, A3Buffer, C4Buffer]) => Promise.all([
          NeoSoundGenerator.saveSoundBufferToSampler('C3', C3Buffer),
          NeoSoundGenerator.saveSoundBufferToSampler('D#3', Ds3Buffer),
          NeoSoundGenerator.saveSoundBufferToSampler('F#3', Fs3Buffer),
          NeoSoundGenerator.saveSoundBufferToSampler('A3', A3Buffer),
          NeoSoundGenerator.saveSoundBufferToSampler('C4', C4Buffer),
        ]))
        .then(() => resolve())
    })
  }

  static generateDrumSound() {
    return new Promise(resolve => {
      const APIs = GET_DRUM_API_LIST();
      Promise.all(APIs.map(url => neoFetch({url, method: 'get', responseType: 'arraybuffer'})))
        .then(results => results.map(result => result.data))
        .then(resources => Promise.all(resources.map(data => Tone.context.decodeAudioData(data))))
        .then(([low, high]) => {
          NeoSoundGenerator.saveSoundBufferToDrumMachine('C3', low);
          NeoSoundGenerator.saveSoundBufferToDrumMachine('C4', high);
        })
        .then(resolve)
    })
  }

  /* 一些前置工作 */
  init() {
    /* init window sampler object */
    Object.defineProperty(window, "sampler", {
      value: new Tone.Sampler(),
      writable: true,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(window, "drum", {
      value: new Tone.Sampler(),
      writable: true,
      enumerable: true,
      configurable: true
    });
    /* duration for sampler */
    Object.defineProperty(window.sampler, "duration", {
      value: '2n',
      writable: true,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(window.drum, "duration", {
      value: '2n',
      writable: true,
      enumerable: true,
      configurable: true
    });
  }

  /* update时需要优先reset */
  reset() {
    // window.sampler = null;
  }

  componentDidMount() {
    this.init();
    this.loadSoundAndGenerateSoundMap(true);
  }

  componentDidUpdate(prevProps) {
    // sound未改变不重新fetch音频资源
    if (prevProps.context.sound === this.props.context.sound) {
      return null;
    }
    this.loadSoundAndGenerateSoundMap();
  }

  loadSoundAndGenerateSoundMap(mountingHook) {
    const {sound, loading, setContext} = this.props.context;
    if (loading) {
      return null;
    }
    setContext({
      loading: true
    }, () => {
      // initializing hook
      NeoSoundGenerator.setRhythmADSREnvelope(sound);
      NeoSoundGenerator.setDrumADSREnvelope();

      // set App Context
      return Promise.all([NeoSoundGenerator.generateRhythmSound(sound), NeoSoundGenerator.generateDrumSound()])
        .then(() => {
          setContext({
            loading: false
          })
        })
        .then(() => mountingHook ? setContext({initialized: true}) : null)
        .catch(() => setContext({error: true}))
    });
  }

  render() {
    return null;
  }
}


export default connect(NeoSoundGenerator);
