import {GET_RHYTHM_API_LIST, GET_DRUM_API_LIST} from "../constants/api";
import fetch from 'axios';
import Tone from "tone/Tone";

export default class NeoBuffer {

  constructor(context) {
    this.context = context;
    this.urls = GET_RHYTHM_API_LIST('marimba');
    // this.urls = GET_DRUM_API_LIST();
  }

  loadSound(url) {
    fetch({url, method: 'get', responseType: 'arraybuffer'})
      .then(({data}) => Tone.context.decodeAudioData(data))
      .then(buffer => {
        const pitchShift = new Tone.PitchShift().toMaster();
        pitchShift.pitch = +0;
        const source = new Tone.BufferSource(buffer).connect(pitchShift).start();
      })
  }

  loadAll() {
    this.loadSound(this.urls[0], 1);
  }

  loaded() {

  }

  getSoundByIndex(index) {
    return this.buffer[index];
  }
}
