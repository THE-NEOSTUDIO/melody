/*
* Playing Logic Here
* */
import Tone from "tone/Tone";

class NeoPlayer {
  rhythmNotePad = [[], [], [], [], [], [], [], []]; // 乐句
  drumNotePad = [[], [], [], [], [], [], [], []]; // 鼓点

  /* tap a note */
  tap(note, at) {
    window.sampler.triggerAttackRelease(note, window.sampler.duration).toMaster();
    this.setRhythmNote(note, at)
  }

  unTap(note, at) {
    this.removeRhythmNote(note, at)
  }

  unDrumming(level, at) {
    this.removeDrumNote(level, at);
  }

  /* drumming high or low */
  drumming(level, at) {
    window.drum.triggerAttackRelease(level, window.drum.duration).toMaster();
    this.setDrumNote(level, at);
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

  // 开始
  play(handlerForEachNote) {

  }

  // 暂停
  pause() {

  }

  // 终止
  stop() {

  }

}

const player = new NeoPlayer();

Object.defineProperty(window, "player", {
  value: player,
  writable: false,
  enumerable: false,
  configurable: false
});

export default player;
