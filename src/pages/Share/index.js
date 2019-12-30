import React,{useState} from "react";

let startTime = undefined;
let endTime = undefined;

export default function () {

  const [follow, setFollow] = useState(false);

  return (
    <div>
      <img
        onTouchStart={()=>startTime = new Date().valueOf()}
        onTouchEnd={()=> {
          endTime = new Date().valueOf();
          if (endTime - startTime > 500) {
            setFollow(true);
          }
        }}
        src="./test.jpeg" width="300" alt=""/>
      {
        follow ? <div>关注！！！！！</div> : null
      }
    </div>
  )
}
