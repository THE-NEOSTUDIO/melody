/*
* Playing Logic Here
* */
import Tone from "tone/Tone";
import {Component} from 'react';

class NeoPlayer extends Component {

  constructor(props) {
    Tone.Transport.bpm.value = 200;
    super(props);
    this.index = 0;
    let drumControlled = false;
    this.bpm = 200;
    this.rhythmNotePad = [[], [], [], [], [], [], [], []]; // 乐句
    this.drumNotePad = [[], [], [], [], [], [], [], []]; // 鼓点
    this.rhythm = new Tone.Part((time, chord) => {
      if (this.rhythmNotePad.find(part => part.length > 0)) {
        drumControlled = false;
      }
      !props.loading && window.sampler.triggerAttackRelease(chord, window.sampler.duration).toMaster();
      !drumControlled && this.setIndex();
    }).start(0);
    this.rhythm.loop = true;
    this.rhythm.loopEnd = "2m";
    this.rhythm.humanize = true;
    this.drum = new Tone.Part((time, chord) => {
      // 声音部分为空，则键盘弹奏
      if (!this.rhythmNotePad.find(part => part.length > 0)) {
        drumControlled = true;
        this.setIndex();
      } else {
        drumControlled = false;
      }
      !props.loading && window.drum.triggerAttackRelease(chord, window.drum.duration).toMaster();
    }).start(0);
    this.drum.loop = true;
    this.drum.loopEnd = "2m";
    this.drum.humanize = true;

    // save
    this.results = undefined;
  }

  /* tap a note */
  tap(note, at) {
    window.sampler.triggerAttackRelease(note, window.sampler.duration).toMaster();
    this.setRhythmNote(note, at);
    this.rhythmNotePad.forEach((chord, index) => {
      this.rhythm.at(`0:${Math.floor(index)}:0`, chord)
    });
  }

  unTap(note, at) {
    this.removeRhythmNote(note, at);
    this.rhythmNotePad.forEach((chord, index) => {
      this.rhythm.at(`0:${Math.floor(index)}:0`, chord)
    });
  }

  unDrumming(level, at) {
    this.removeDrumNote(level, at);
    this.drumNotePad.forEach((chord, index) => {
      this.drum.at(`0:${Math.floor(index)}:0`, chord)
    });
  }

  /* drumming high or low */
  drumming(level, at) {
    window.drum.triggerAttackRelease(level, window.drum.duration).toMaster();
    this.setDrumNote(level, at);
    this.drumNotePad.forEach((chord, index) => {
      this.drum.at(`0:${Math.floor(index)}:0`, chord)
    });
  }

  setRhythmNote(note, at) {
    if (!this.rhythmNotePad[at] || this.rhythmNotePad[at].find(saved => saved === note)) {
      return null;
    }
    this.rhythmNotePad[at].push(note);
  }

  removeRhythmNote(note, at) {
    if (!this.rhythmNotePad[at] || !this.rhythmNotePad[at].find(saved => saved === note)) {
      return null;
    }
    this.rhythmNotePad[at] = this.rhythmNotePad[at].filter(saved => saved !== note);
  }

  setDrumNote(note, at) {
    if (!this.drumNotePad[at] || this.drumNotePad[at].find(saved => saved === note)) {
      return null;
    }
    this.drumNotePad[at].push(note);
  }

  removeDrumNote(note, at) {
    if (!this.drumNotePad[at] || !this.drumNotePad[at].find(saved => saved === note)) {
      return null;
    }
    this.drumNotePad[at] = this.drumNotePad[at].filter(saved => saved !== note);
  }

  setBPM(value) {
    Tone.Transport.bpm.value = 2 * value;
    this.bpm = 2 * value;
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
    this.props.setColumnIndex && this.props.setColumnIndex(undefined);
    this.index = 0;
  }

  reset() {
    Tone.Transport.stop();
    this.drum.removeAll();
    this.rhythm.removeAll();
    this.drumNotePad = [[], [], [], [], [], [], [], []];
    this.rhythmNotePad = [[], [], [], [], [], [], [], []];
    this.props.setColumnIndex && this.props.setColumnIndex(undefined);
    this.index = 0;
  }

  setIndex() {
    if (this.index > 7 || this.index === undefined) {
      this.index = 0;
    }
    this.props.setColumnIndex && this.props.setColumnIndex(this.index++);
  }

  render() {
    return null;
  }
}

export default NeoPlayer;
