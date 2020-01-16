import React, {useState} from "react";
import './index.scss';

export default function ({setStep}) {

  const [animation, setAnimation] = useState(false);

  const go = () => {
    // setAnimation(true);
    // setTimeout(() => {
      setStep(1);
    // }, 400);
  };

  return (
    <div className={!animation ? 'main-page': 'main-page main-page-animated'}>
      <div className="card-container">
        <div className="title-img">{/*2020*/}</div>
        <div className="title">{/*happy new year*/}</div>
        <div className="main-dot">{/*新年*/}</div>
        <div className="sub-dot">{/*音乐卡片*/}</div>
        <div className="separate-line">{/*line*/}</div>
        <div className="slogan">{/*slogan*/}</div>
        <div onTouchStart={() => go()} className="pad">
          <div className="left-animation">{/*spinning*/}</div>
          <div className="right-element">{/*spinning*/}</div>
        </div>
        <div className="separate-line">{/*line*/}</div>
        <div onTouchStart={() => go()} className="start">{/*开始*/}</div>
        <div className="footer-chinese">{/*霓虹制造局*/}</div>
        <div className="footer-english">{/*neo studio*/}</div>
      </div>
    </div>
  )
}
