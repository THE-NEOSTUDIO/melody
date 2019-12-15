import React from "react";

export default function ({setStep}) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      justifyContent: 'center',
      alignItems: "center",
      fontSize: '.5rem'
    }}
         onClick={() => setStep(1)}
    >
      开始创作
    </div>
  )
}
