import React from "react";
import './index.scss';

export default function ({setStep}) {

  return (
    <div className="main-page">
      <div className="card-container">
        <div className="title-img">{/*2020*/}</div>
        <div className="title">{/*happy new year*/}</div>
        <div className="main-dot">{/*新年*/}</div>
        <div className="sub-dot">{/*音乐卡片*/}</div>
        <div className="separate-line">{/*line*/}</div>
        <div className="slogan">{/*slogan*/}</div>
        <div onClick={()=>setStep(1)} className="pad">
          <div className="left-animation">{/*spinning*/}</div>
          <div className="right-element">{/*spinning*/}</div>
        </div>
        <div className="separate-line">{/*line*/}</div>
        <div onClick={()=>setStep(1)} className="start">{/*开始*/}</div>
        <div className="footer-chinese">{/*霓虹制造局*/}</div>
        <div className="footer-english">{/*neo studio*/}</div>
      </div>
    </div>
  )
}
