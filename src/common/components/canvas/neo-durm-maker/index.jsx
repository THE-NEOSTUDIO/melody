import React, {PureComponent} from 'react';
import {connect} from "../../../context";
import {Stage, Layer, Line} from 'react-konva';
import {BOLD_LINE_COLOR, EMPTY_CUBE_COLOR, LIGHT_LINE_COLOR} from "../../../constants/color";
import NeoDrumCube from "./neo-drum-cube";

class NeoDrumMaker extends PureComponent {

  refList = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

  constructor(props) {
    super(props);
    const {width, height} = props;
    this.state = {
      initialized: width && height, // 既有宽 又有高 则为加载成功
      width,
      height,
      cubeWidth: width / 8, // 每一格的宽度
      cubeHeight: height / 2, // 每一格的高度
    }
  }

  setElementInRefList(ref, row, column) {
    this.refList[row][column] = ref;
  }

  setActiveOnTouchMove(row, column) {
    this.refList[row][column].setActive(this.active);
  }

  setActiveOnTouchStart(active) {
    this.active = !active;
  }

  setActiveOnTouchEnd() {
    this.active = undefined;
  }

  initializeCubeGroup() {
    const {cubeWidth, cubeHeight, loading} = this.state;
    let currentXCoordinate = 0;
    let currentYCoordinate = 0;
    const cubeGroup = [];

    for (let row = 0; row < 2; row++) {
      for (let column = 0; column < 8; column++) {
        cubeGroup.push(<NeoDrumCube
          ref={ref => this.setElementInRefList(ref, row, column)}
          setActiveOnTouchStart={!loading ? this.setActiveOnTouchStart.bind(this) : null}
          setActiveOnTouchMove={!loading ? this.setActiveOnTouchMove.bind(this) : null}
          setActiveOnTouchEnd={!loading ? this.setActiveOnTouchEnd.bind(this) : null}
          row={row}
          column={column}
          key={`${currentYCoordinate}${currentXCoordinate}drum`}
          width={cubeWidth}
          height={cubeHeight}
          x={currentXCoordinate}
          y={currentYCoordinate}
        />);
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 0;
    }
    return cubeGroup;
  }

  initializeLineGroup() {
    const {cubeWidth, cubeHeight} = this.state;
    const {width, height} = this.state;
    const lineGroup = [];

    for (let column = 1; column < 8; column++) {
      lineGroup.push(<Line
        key={`${column}column`}
        stroke={column % 2 === 1 ? LIGHT_LINE_COLOR : BOLD_LINE_COLOR}
        strokeWidth={1}
        points={
          [
            column * cubeWidth, 0,
            column * cubeWidth, height
          ]
        }
      />)
    }

    for (let row = 1; row < 2; row++) {
      lineGroup.push(<Line
        key={`${row}row`}
        stroke={LIGHT_LINE_COLOR}
        strokeWidth={1}
        points={
          [
            0, row * cubeHeight,
            width, row * cubeHeight
          ]
        }
      />)
    }

    return lineGroup;
  }

  render() {
    const {initialized, width, height} = this.state;
    // TODO 错误处理
    if (!initialized) {
      return (
        <div>
          Error!~
        </div>
      )
    }

    return (
      <Stage width={width} height={height}>
        <Layer>
          {
            this.initializeCubeGroup()
          }
          {
            this.initializeLineGroup()
          }
        </Layer>
      </Stage>
    );
  }
}

export default connect(NeoDrumMaker);
