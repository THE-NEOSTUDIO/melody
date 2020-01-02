import React, {useState} from "react";
import neoPosterGenerator from '../../common/components/canvas/neo-poster-generator';

// let startTime = undefined;
// let endTime = undefined;

export default function () {

  const sentence = window.sentence_results;
  const sound = window.sound_results;

  // TODO 容错 （没有音乐或祝福的情况下有一个默认值避免回流无声音无祝福）
  const url = `${window.location.href}?context=${encodeURIComponent(sound)}&refluence=1&wish=${encodeURIComponent(sentence)}`;

  console.log(url);

  const [a, setA] = useState('');
  neoPosterGenerator(url).then(res=>setA(res));
  return (
    <div>
      <img src={a} alt=""/>
    </div>
  )
}
