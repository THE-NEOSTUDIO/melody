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

  calculateRhythmColor() {
    const {active, row} = this.state;
    if (!active) {
      return EMPTY_CUBE_COLOR
    }
    switch (row) {
      case 0:
        return LA_CUBE_COLOR;
      case 1:
        return SO_CUBE_COLOR;
      case 2:
        return MI_CUBE_COLOR;
      case 3:
        return RE_CUBE_COLOR;
      case 4:
        return DO_CUBE_COLOR;
      default:
        return EMPTY_CUBE_COLOR;
    }
  }

  setActive(active) {
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
        fill={this.calculateRhythmColor()}
        onTouchStart={() => {setActiveOnTouchStart(active);this.setActive(!active)}}
        onTouchMove={()=>setActiveOnTouchMove(row, column)}
        onTouchEnd={()=>setActiveOnTouchEnd()}
      />
    )
  }
}

export default NeoCube;
