import React, {useState} from "react";
import QRCode from 'qrcode.react';

// let startTime = undefined;
// let endTime = undefined;

export default function () {



  return (
    <div>
      <QRCode
        value={`${window.location.href}?context=${encodeURIComponent(JSON.stringify(window.sound_results))}&refluence=1`}  //value参数为生成二维码的链接
        size={200} //二维码的宽高尺寸
        fgColor="#000000"  //二维码的颜色
      />
      {/*<img*/}
      {/*  onTouchStart={()=>startTime = new Date().valueOf()}*/}
      {/*  onTouchEnd={()=> {*/}
      {/*    endTime = new Date().valueOf();*/}
      {/*    if (endTime - startTime > 500) {*/}
      {/*      setFollow(true);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  src="./test.jpeg" width="300" alt=""/>*/}
      {/*{*/}
      {/*  follow ? <div>关注！！！！！</div> : null*/}
      {/*}*/}
    </div>
  )
}
