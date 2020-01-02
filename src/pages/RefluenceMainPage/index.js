import React from "react";
import NeoListener from "../../common/components/audio/neo-listener";
import {parseUrl} from "../../common/utils";
import neoCubePictureMaker from "../../common/components/canvas/neo-cube-picture-maker";

const queries = parseUrl().context;

let listener = undefined;

if (queries) {
  listener = new NeoListener(JSON.parse(decodeURIComponent(queries)))
}

export default function () {

  let a = neoCubePictureMaker({width: 1200, height: 1200, rhythmNotes: JSON.parse(decodeURIComponent(queries)).rhythmNotes});

  return (
    <div
      style={{height: '100vh', width: '100vw', color: 'white', fontSize: '.5rem'}}
      onClick={() => {
      if (listener.ready) {
        listener.play()
      }
    }}>
      {JSON.stringify(parseUrl())}
    </div>
  )
}
