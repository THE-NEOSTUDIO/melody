import React, {useState} from "react";
import './index.scss';
import neoPosterGenerator from '../../common/components/canvas/neo-poster-generator';

let startTime = undefined;
let endTime = undefined;

export default function () {

  const sentence = window.sentence_results;
  const sound = window.sound_results;

  // TODO 容错 （没有音乐或祝福的情况下有一个默认值避免回流无声音无祝福）
  const url = `${window.location.href}?context=${encodeURIComponent(sound)}&refluence=1&wish=${encodeURIComponent(sentence)}`;

  const [base64URL, setBaseURL] = useState('');
  const [follow, setFollow] = useState(false);

  neoPosterGenerator(url).then(res => setBaseURL(res));
  return (
    <div className="share-container">
      <div className="img-container">
        <img src={base64URL} width="349" height="518" alt="分享图片"/>
      </div>
      {
        follow
          ? (
            <div className="follow-modal">

            </div>
          ) : null
      }
    </div>
  )
}
