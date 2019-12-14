import React, {useState, useContext, useEffect} from 'react';
import MainContext from '../../../context/index';
import {Rect, Layer, Stage, Line} from "react-konva";
import {throttle} from "../../../libraries/debounce";
import {
  BOLD_LINE_COLOR,
  DO_CUBE_COLOR,
  EMPTY_CUBE_COLOR,
  LA_CUBE_COLOR, LIGHT_LINE_COLOR,
  MI_CUBE_COLOR,
  RE_CUBE_COLOR,
  SO_CUBE_COLOR
} from "../../../constants/color";

let activeStatus = false; // touchMove绘画时的初始状态

function NeoRhythmMaker({width, height, player}) {

  const {
    columnIndex, // 当前选中行
    loading, // 是否正在加载
    initialized, // 是否加载成功
    reset, // 是否需要重置
    setContext: setAppState // 重置App状态
  } = useContext(MainContext);

  const cubeWidth = width / 8;
  const cubeHeight = height / 6;

  // 所有用到和鼓状态有关的组件都用它初始化
  const defaultCubeGenerator = () => [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ];

  // 整体状态管理
  const [status, setStatus] = useState(defaultCubeGenerator());

  const calculateRhythmColor = (row, column) => {
    if (!status[row][column]) {
      return EMPTY_CUBE_COLOR;
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
  };

  const calculateRhythm = (row) => {
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
  };

  const cubes = []; // 普通格子
  const lines = [];
  const [timeline, setTimeline] = useState([]);

  const handleTouchStart = (row, column) => {
    if (loading && !initialized) {
      return null;
    }
    activeStatus = !status[row][column];
    // 是否需要打鼓
    if (!status[row][column]) {
      player.tap(calculateRhythm(row), column);
    } else {
      player.unTap(calculateRhythm(row), column);
    }
    // 重新setState
    let newStatus = [...status];
    newStatus[row][column] = !status[row][column];
    setStatus(newStatus);
  };

  const handleTouchMove = (row, column) => {
    let newStatus = [...status];
    if (!status[row][column] && activeStatus) {
      player.tap(calculateRhythm(row), column);
    }
    if (!activeStatus && status[row][column]) {
      player.unTap(calculateRhythm(row), column);
    }
    newStatus[row][column] = activeStatus;
    setStatus(newStatus);
  };

  const handleTouchEnd = () => {
    activeStatus = false;
  };

  const fillCubes = () => {
    // 鼓组组件push
    let currentXCoordinate = 0;
    let currentYCoordinate = 0;
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 8; column++) {
        cubes.push(
          <Rect
            onTouchStart={() => handleTouchStart(row, column)}
            onTouchMove={throttle(handleTouchMove.bind(null, row, column), 500)}
            onTouchEnd={throttle(handleTouchEnd.bind(null, row, column))}
            row={row}
            fill={calculateRhythmColor(row, column)}
            column={column}
            key={`${currentYCoordinate}${currentXCoordinate}rhythms`}
            width={cubeWidth}
            height={cubeHeight}
            x={currentXCoordinate}
            y={currentYCoordinate}
          />
        );
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 0;
    }
  };

  fillCubes();

  const fillLines = () => {
    for (let column = 1; column < 8; column++) {
      lines.push(<Line
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
    for (let row = 1; row < 6; row++) {
      lines.push(<Line
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
  };

  fillLines();

  const fillTimeline = () => {
    let list = [];
    if (columnIndex === undefined) {
      setTimeline([]);
    } else {
      for (let row = 0; row < 6; row++) {
        list.push(
          <Rect
            onTouchStart={() => handleTouchStart(row, columnIndex)}
            onTouchMove={throttle(handleTouchMove.bind(null, row, columnIndex), 500)}
            onTouchEnd={throttle(handleTouchEnd.bind(null, row, columnIndex))}
            row={row}
            fill={'rgba(251,73, 99, 0.22)'}
            key={`${columnIndex}${row}time-timeline`}
            column={columnIndex}
            width={cubeWidth}
            height={cubeHeight}
            x={cubeWidth * columnIndex}
            y={row * cubeHeight}
          />
        )
      }
      setTimeline(list);
    }
  };

  // 当有鼓组中有鼓被敲击时
  useEffect(() => {
    fillCubes();
  }, [status]);

  useEffect(() => {
    setStatus(defaultCubeGenerator());
    player && player.reset();
    setAppState({reset: false});
  }, [reset]);

  // 当开始播放 / 鼓组渲染播放进度
  useEffect(() => {
    fillTimeline();
  }, [columnIndex]);


  return (
    <Stage width={width} height={height}>
      <Layer>
        {
          [
            ...cubes,
            ...lines,
            ...timeline
          ]
        }
      </Layer>
    </Stage>
  )
}

export default NeoRhythmMaker;