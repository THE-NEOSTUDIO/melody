/*
* Reference Logic Here
* */
import Tone from "tone/Tone";
import {GET_DRUM_API_LIST, GET_RHYTHM_API_LIST} from "../../../constants/api";
import neoFetch from "axios";

let hasStarted = false;

class NeoListener {

  ready = false;

  static init() {
    /* init window sampler object */
    Object.defineProperty(window, "sampler1", {
      value: new Tone.Sampler(),
      writable: true,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(window, "drum1", {
      value: new Tone.Sampler(),
      writable: true,
      enumerable: true,
      configurable: true
    });
    /* duration for sampler */
    Object.defineProperty(window.sampler1, "duration", {
      value: '2n',
      writable: true,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(window.drum1, "duration", {
      value: '2n',
      writable: true,
      enumerable: true,
      configurable: true
    });
  }

  /* 设置不同乐器的不同ADSR */
  static setRhythmADSREnvelope(sound) {
    switch (sound) {
      case "piano":
        window.sampler1.volume.value = -5;
        window.sampler1.release = 1;
        window.sampler1.duration = '2n';
        break;
      case "synthesizer":
        window.sampler1.volume.value = -5;
        window.sampler1.attack = 0.6;
        window.sampler1.release = 0.4;
        window.sampler1.duration = '12n';
        break;
      case "wood":
        window.sampler1.volume.value = -5;
        window.sampler1.attack = 0.6;
        window.sampler1.release = 0.6;
        window.sampler1.duration = '4n';
        break;
      case "marimba":
        window.sampler1.volume.value = -5;
        window.sampler1.release = 0.6;
        window.sampler1.duration = '2n';
        break;
      case "string":
        window.sampler1.volume.value = -5;
        window.sampler1.release = 0.6;
        window.sampler1.duration = '2n';
    }
  }

  static setDrumADSREnvelope() {
    window.drum1.volume.value = -5;
  }

  /* 将Buffer保存至采样机 */
  static saveSoundBufferToSampler(key, buffer) {
    return new Promise((resolve) => {
      window.sampler1.add(key, buffer, function () {
        resolve(true)
      });
    })
  }

  static saveSoundBufferToDrumMachine(key, buffer) {
    return new Promise((resolve) => {
      window.drum1.add(key, buffer, function () {
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
          NeoListener.saveSoundBufferToSampler('C3', C3Buffer),
          NeoListener.saveSoundBufferToSampler('D#3', Ds3Buffer),
          NeoListener.saveSoundBufferToSampler('F#3', Fs3Buffer),
          NeoListener.saveSoundBufferToSampler('A3', A3Buffer),
          NeoListener.saveSoundBufferToSampler('C4', C4Buffer),
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
          NeoListener.saveSoundBufferToDrumMachine('C3', low);
          NeoListener.saveSoundBufferToDrumMachine('C4', high);
        })
        .then(resolve)
    })
  }

  constructor({bpm, rhythmNotes, drumNotes, soundType}) {

    NeoListener.init();

    // bpm confirmed
    Tone.Transport.bpm.value = bpm || 200;

    // sounds
    this.rhythmNotePad = rhythmNotes || [[], [], [], [], [], [], [], []]; // 乐句
    this.drumNotePad = drumNotes || [[], [], [], [], [], [], [], []]; // 鼓点

    // Tone part
    this.rhythm = new Tone.Part((time, chord) => {
      window.sampler1.triggerAttackRelease(chord, window.sampler1.duration).toMaster();
    }).start(0);
    this.drum = new Tone.Part((time, chord) => {
      window.drum1.triggerAttackRelease(chord, window.drum1.duration).toMaster();
    }).start(0);

    // Loop settings
    this.rhythm.loop = true;
    this.drum.loop = true;

    // Loop length
    this.rhythm.loopEnd = "2m";
    this.drum.loopEnd = "2m";

    // humanize
    this.rhythm.humanize = true;
    this.drum.humanize = true;

    this.rhythmNotePad.forEach((chord, index) => {
      this.rhythm.at(`0:${Math.floor(index)}:0`, chord)
    });
    this.drumNotePad.forEach((chord, index) => {
      this.drum.at(`0:${Math.floor(index)}:0`, chord)
    });

    this.loadSoundAndGenerateSoundMap(soundType)
      .then(() => {
      });


  }

  // 开始
  play() {
    if (
      !this.rhythmNotePad.find(part => part.length > 0)
      && !this.drumNotePad.find(part => part.length > 0)
    ) {
      return null;
    }
    Tone.Transport.start();
  }

  // 终止
  stop() {
    Tone.Transport.stop();
  }

  reset() {
    Tone.Transport.stop();
    this.drum.removeAll();
    this.rhythm.removeAll();
    this.drumNotePad = [[], [], [], [], [], [], [], []];
    this.rhythmNotePad = [[], [], [], [], [], [], [], []];
  }

  loadSoundAndGenerateSoundMap(soundType) {
    NeoListener.setRhythmADSREnvelope(soundType);
    NeoListener.setDrumADSREnvelope();
    // set App Context
    return Promise.all([NeoListener.generateRhythmSound(soundType), NeoListener.generateDrumSound()])
      .then(() => {
        this.ready = true
      })
      .catch(e => console.log(e))
  }

}

export default NeoListener;
