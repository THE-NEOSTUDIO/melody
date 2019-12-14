import React, {useState, useContext, useEffect} from 'react';
import MainContext from '../../../context/index';
import useImage from "use-image";
import {Image, Rect, Layer, Stage, Line} from "react-konva";
import {throttle} from "../../../libraries/debounce";
import {BOLD_LINE_COLOR, EMPTY_CUBE_COLOR, LIGHT_LINE_COLOR} from "../../../constants/color";

import emptyEvenIcon from '../../../assets/energetic/drum-canvas/drum-even-icon.png'
import emptyOddIcon from '../../../assets/energetic/drum-canvas/drum-odd-icon.png'
import fillHighIcon from '../../../assets/energetic/drum-canvas/drum-high-selected-icon.png';
import fillLowIcon from '../../../assets/energetic/drum-canvas/drum-low-selected-icon.png';

function NeoImage(props) {
  const [image] = useImage(props.url);
  return (
    <Image
      {
        ...props
      }
      image={image}
    />
  );
}

let activeStatus = false; // touchMove绘画时的初始状态

function NeoDrumMaker({width, height, player}) {

  const {
    columnIndex, // 当前选中行
    loading, // 是否正在加载
    initialized, // 是否加载成功
    reset, // 是否需要重置
    setContext: setAppState // 重置App状态
  } = useContext(MainContext);

  const cubeWidth = width / 8;
  const cubeHeight = height / 2;

  // 所有用到和鼓状态有关的组件都用它初始化
  const defaultCubeGenerator = () => [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ];

  // 鼓组整体状态管理
  const [status, setStatus] = useState(defaultCubeGenerator());

  const cubes = []; // 普通格子
  const labels = []; // 格子修饰
  // let timeline = []; // 时间线
  const lines = [];
  const [timeline, setTimeline] = useState([]);

  const handleTouchStart = (row, column) => {
    if (loading && !initialized) {
      return null;
    }
    activeStatus = !status[row][column];
    // 是否需要打鼓
    if (!status[row][column]) {
      player.drumming(row ? "C3" : "C4", column);
    } else {
      player.unDrumming(row ? "C3" : "C4", column);
    }
    // 重新setState
    let newStatus = [...status];
    newStatus[row][column] = !status[row][column];
    setStatus(newStatus);
  };

  const handleTouchMove = (row, column) => {
    let newStatus = [...status];
    if (!status[row][column] && activeStatus) {
      player.drumming(row ? "C3" : "C4", column);
    }
    if (!activeStatus && status[row][column]) {
      player.unDrumming(row ? "C3" : "C4", column);
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
    for (let row = 0; row < 2; row++) {
      for (let column = 0; column < 8; column++) {
        cubes.push(
          <Rect
            onTouchStart={() => handleTouchStart(row, column)}
            onTouchMove={throttle(handleTouchMove.bind(null, row, column), 500)}
            onTouchEnd={throttle(handleTouchEnd.bind(null, row, column))}
            row={row}
            fill={EMPTY_CUBE_COLOR}
            column={column}
            key={`${currentYCoordinate}${currentXCoordinate}drum`}
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

  const fillLabels = () => {
    let currentXCoordinate = 0;
    let currentYCoordinate = 0;
    for (let row = 0; row < 2; row++) {
      for (let column = 0; column < 8; column++) {
        labels.push(
          <NeoImage
            url={
              status[row][column]
                ? (row === 0 ? fillHighIcon : fillLowIcon)
                : (column % 2 ? emptyOddIcon : emptyEvenIcon)
            }
            onTouchStart={throttle(handleTouchStart.bind(null, row, column))}
            onTouchMove={throttle(handleTouchMove.bind(null, row, column))}
            onTouchEnd={throttle(handleTouchEnd.bind(null, row, column))}
            row={row}
            column={column}
            key={`${currentYCoordinate}${currentXCoordinate}drum-label`}
            width={
              status[row][column]
                ? (row === 0 ? 24 : 20)
                : (column % 2 ? 6 : 10)
            }
            height={
              status[row][column]
                ? 20
                : (column % 2 ? 6 : 10)
            }
            x={
              status[row][column]
                ? (row === 0 ? currentXCoordinate + (cubeWidth / 2) - 12 : currentXCoordinate + (cubeWidth / 2) - 10)
                : (column % 2 ? currentXCoordinate + (cubeWidth / 2) - 3 : currentXCoordinate + (cubeWidth / 2) - 5)
            }
            y={
              status[row][column]
                ? (currentYCoordinate + (cubeHeight / 2) - 10)
                : (column % 2 ? currentYCoordinate + (cubeHeight / 2) - 3 : currentYCoordinate + (cubeHeight / 2) - 5)
            }
          />
        );
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 0;
    }
  };

  fillLabels();

  const fillLines = () => {
    // 竖线
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
    // 横线
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
      for (let row = 0; row < 2; row++) {
        list.push(
          <Rect
            onTouchStart={() => handleTouchStart(row, columnIndex)}
            onTouchMove={throttle(handleTouchMove.bind(null, row, columnIndex), 500)}
            onTouchEnd={throttle(handleTouchEnd.bind(null, row, columnIndex))}
            row={row}
            fill={'rgba(251,73, 99, 0.22)'}
            key={`${columnIndex}${row}drum-timeline`}
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
    fillLabels();
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
            ...labels,
            ...lines,
            ...timeline
          ]
        }
      </Layer>
    </Stage>
  )
}

export default NeoDrumMaker;