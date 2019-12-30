import React from "react";
import NeoListener from "../../common/components/audio/neo-listener";
import {parseUrl} from "../../common/utils";

const queries = parseUrl().context;

let listener = undefined;

if (queries) {
  listener = new NeoListener(JSON.parse(JSON.parse(decodeURIComponent(queries))))
}

export default function () {

  return (
    <div
      style={{height: '100vh', width: '100vw'}}
      onClick={() => {
      if (listener.ready) {
        listener.play()
      }
    }}>
      播放
    </div>
  )
}
