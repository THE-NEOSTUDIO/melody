import React, {useState, forwardRef} from 'react';
import {Image} from 'react-konva';
import useImage from 'use-image';
import {throttle} from "../../../libraries/debounce";

/*
* 干 早早用hooks不就好了……
* */
function NeoImage(props, ref) {

  const {
    setActiveOnTouchStart,
    setActiveOnTouchMove,
    setActiveOnTouchEnd,
    row,
    column,
    player,
  } = props;

  const calculateRhythm = (row) => {
    switch (row) {
      case 0:
        return "C4";
      case 1:
        return "C3";
    }
  };

  const setActiveAsCube = (newActive) => {
    // 声音播放
    if (newActive && !active) {
      player.drumming(calculateRhythm(row), column);
    }
    if (!newActive && active) {
      player.unDrumming(calculateRhythm(row), column);
    }
    setActive(newActive)
  };

  const [active, setActive] = useState(false);
  const [image] = useImage(props.url);
  // "image" will DOM image element or undefined

  return (
    <Image
      setActiveAsCube={setActiveAsCube}
      ref={ref}
      {...props}
      image={image}
      onTouchStart={() => {
        let result = setActiveOnTouchStart(active, row, column);
        if (!result) {
          setActiveAsCube(!active);
        }
      }}
      onTouchMove={throttle(setActiveOnTouchMove.bind(null, row, column), 500)}
      onTouchEnd={() => setActiveOnTouchEnd()}
    />
  );
}

export default forwardRef((props, ref) => new NeoImage(props, ref))