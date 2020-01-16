import React, {useState, useEffect} from "react";
import NeoListener from "../../common/components/audio/neo-listener";
import {parseUrl} from "../../common/utils";
import refluenceGenerator from "../../common/components/canvas/neo-poster-generator/refluence";
import './index.scss'

const queries = parseUrl().context;

let listener = undefined;

if (queries) {
  listener = new NeoListener(JSON.parse(decodeURIComponent(queries)))
}

let loaded = false;
let status = false;

export default function ({startPlay, setStep}) {

  const [play, setPlay] = useState(false);

  if (!loaded) {
    loaded = true;
    let container = document.createElement('div');
    refluenceGenerator(container, parseUrl())
      .then(() => {
        document.querySelector(".canvas-container").append(container);
      });
  }


  return (
    <div className="refluence-container">
      <div className="title">{/*霓虹制造局*/}</div>
      <div className="title-line">{/*line*/}</div>
      <div className="tip-top">{/*tip*/}</div>
      <div className="canvas-container">
        {/*canvas*/}
        <div className="play-controller">
          <div onTouchStart={() => {
            if (!status && listener.ready) {
              setPlay(true);
              status = true;
              listener.play()
            } else {
              status = false;
              setPlay(false);
              listener.stop()
            }
          }} className={`${play ? 'pause' : 'play'}-btn`}>{/*play*/}</div>
        </div>
      </div>
      <div className="tip-under">{/*tip*/}</div>
      <div className="under-line">{/*line*/}</div>
      <div onTouchStart={() => {
        listener.reset();
        startPlay();
      }} className="save-btn">{/*save*/}</div>
    </div>
  )
}
