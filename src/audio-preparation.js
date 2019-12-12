import StartAudioContext from './common/libraries/start-audio-context';
import domReady from './common/libraries/domready';
import Transport from 'tone/Tone/core/Transport';
import {isAndroid, isIOS} from "./common/utils";

// TODO 使用真实存在的元素（例如开始页）
var tapperElement = document.createElement("div");
tapperElement.style.position = 'absolute';
tapperElement.style.top = '0';
tapperElement.style.left = '0';
tapperElement.style.right = '0';
tapperElement.style.bottom = '0';
tapperElement.style.zIndex = '100';
document.body.appendChild(tapperElement);


// 点击某元素 初始化AudioContext
domReady(function () {
  if (isAndroid || !isIOS) {
    new StartAudioContext(Transport.context, tapperElement).then(() => {
      tapperElement.remove();
    })
  }
});
