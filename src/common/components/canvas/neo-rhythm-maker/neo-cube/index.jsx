import React, {Component} from 'react';
import {Rect} from 'react-konva';
import {
  DO_CUBE_COLOR,
  RE_CUBE_COLOR,
  MI_CUBE_COLOR,
  SO_CUBE_COLOR,
  LA_CUBE_COLOR,
  EMPTY_CUBE_COLOR
} from "../../../../constants/color";
import {throttle} from "../../../../libraries/debounce";

class NeoCube extends Component {

  constructor(props) {
    super(props);
    const {row, column} = this.props;
    const {width, height, x, y} = this.props;
    this.state = {
      width,
      height,
      x,
      y,
      column,
      row,
      active: false,
    }
  }

  static calculateRhythmColor(active, row) {
    if (!active) {
      return EMPTY_CUBE_COLOR
    }
    switch (row) {
      case 1:
        return LA_CUBE_COLOR;
      case 2:
        return SO_CUBE_COLOR;
      case 3:
        return MI_CUBE_COLOR;
      case 4:
        return RE_CUBE_COLOR;
      case 5:
      case 0:
        return DO_CUBE_COLOR;
      default:
        return EMPTY_CUBE_COLOR;
    }
  }

  static calculateRhythm(row) {
    switch (row) {
      case 0:
        return "C4";
      case 1:
        return "A3";
      case 2:
        return "G3";
      case 3:
        return "E3";
      case 4:
        return "D3";
      case 5:
        return "C3";
    }
  }

  setActive(active) {
    const {row, active: previousActive} = this.state;
    // 声音播放
    if (active && !previousActive) {
      window.sampler.triggerAttackRelease(NeoCube.calculateRhythm(row), window.sampler.duration).toMaster()
    }
    this.setState({
      active,
    });
  }

  render() {
    const {width, height, x, y, column, row, active} = this.state;
    const {
      setActiveOnTouchStart,
      setActiveOnTouchMove,
      setActiveOnTouchEnd
    } = this.props;
    return (
      <Rect
        width={width}
        height={height}
        x={x}
        y={y}
        fill={NeoCube.calculateRhythmColor(active, row)}
        onTouchStart={() => {
          setActiveOnTouchStart(active);
          this.setActive(!active);
        }}
        onTouchMove={throttle(setActiveOnTouchMove.bind(null, row, column), 500)}
        onTouchEnd={() => setActiveOnTouchEnd()}
      />
    )
  }
}

export default NeoCube;
