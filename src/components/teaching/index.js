import './energetic-theme.scss';
import React, {useState} from 'react';

export default function ({closeTeaching}) {

  const [isFirstStep, setStep] = useState(true);
  const [closeAnimation, setCloseAnimation] = useState(false);

  return (
    <div className={`teaching teaching-${closeAnimation ? 'animated': ''}`}>
      {
        isFirstStep
          ? (
            <div onClick={()=>{
                setStep(false);
            }} className="teaching-first-step">
              <div className="rhythm-block">{/*绘制*/}</div>
              <div className="drum-block">{/*绘制*/}</div>
            </div>
          ) : (
            <div onClick={()=>{
              setCloseAnimation(true);
              setTimeout(()=>{
                closeTeaching();
              },400)
            }} className="teaching-second-step">
              <div className="tip">{/*🔊*/}</div>
              <div className="guide-block">
              </div>
              <div className="controller-block">{/*绘制*/}</div>
            </div>
          )
      }
    </div>
  )
}
