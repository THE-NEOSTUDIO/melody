import React, {useState} from "react";

export default function ({setStep}) {

  console.log(1);

  return (
    <div
      onClick={()=>setStep(3)}
      style={{
      height: '100vh',
      width: '100vw',
    }}>
    </div>
  )
}
