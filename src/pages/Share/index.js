import React, {useState} from "react";
import './index.scss';
import neoPosterGenerator from '../../common/components/canvas/neo-poster-generator';
import qrcode from './qrcode.png';
import {getShortLink} from "../../common/constants/short-link";

let startTime = undefined;
let endTime = undefined;
let flag = false;
let loaded = false;

export default function () {

  const sentence = window.sentence_results;
  const sound = window.sound_results;

  // TODO 容错 （没有音乐或祝福的情况下有一个默认值避免回流无声音无祝福）
  const url = `${window.location.href}?context=${encodeURIComponent(sound)}&refluence=1&wish=${encodeURIComponent(sentence)}`;

  const [base64URL, setBaseURL] = useState('');
  const [follow, setFollow] = useState(false);

  getShortLink(url).then(({data}) => {
    neoPosterGenerator(data.ShortUrl || url).then(res => {
      if (loaded) {
        return;
      }
      loaded = true;
      setBaseURL(res);
    });
  });
  return (
    <div className="share-container">
      <div className="img-container">
        <img
          onTouchStart={() => startTime = (new Date()).valueOf()}
          onTouchEnd={() => {
            endTime = (new Date()).valueOf();
            if (endTime - startTime > 600) {
              setFollow(true)
            }
          }}
          src={base64URL} width="349" height="518"/>
      </div>
      {
        follow
          ? (
            <div className="follow-modal">
              <div className="follow-text">长按二维码关注公众号<br/>参与更多活动</div>
              <img src={qrcode}
                   style={{
                     width: '2.88rem',
                     height: '2.88rem'
                   }}
              />
              <div onClick={() => {
                setFollow(false);
              }} className="follow-btn">{/*关注完成*/}</div>
            </div>
          ) : null
      }
    </div>
  )
}
