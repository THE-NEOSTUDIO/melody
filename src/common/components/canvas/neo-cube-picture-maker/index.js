import Konva from 'konva';
import {
  DO_CUBE_COLOR,
  LA_CUBE_COLOR,
  MI_CUBE_COLOR,
  RE_CUBE_COLOR,
  SO_CUBE_COLOR
} from "../../../constants/color";

const calculateIndex = (row) => {
  switch (row) {
    case "C4":
      return 0;
    case "A3":
      return 1;
    case "G3":
      return 2;
    case "E3":
      return 3;
    case "D3":
      return 4;
    case "C3":
      return 5;
  }
};

export function cubeMaker(layer, rhythmNotes) {

  const cubeWidth = 28 * 3;
  const cubeHeight = 28 * 3;

  const status = rhythmNotes.map(row => {
    let line = [false, false, false, false, false, false];
    if (row.length) {
      row.forEach(value => line[calculateIndex(value)] = true);
    }
    return line;
  });

  const calculateRhythmColor = (row, column) => {
    if (!status[row][column]) {
      return false;
    }
    switch (column) {
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
        return false;
    }
  };


  const fillCubes = () => {
    // 鼓组组件push
    let currentXCoordinate = 181 * 3;
    let currentYCoordinate = 66 * 3;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 6; column++) {
        if (calculateRhythmColor(row, column)) {
          const cube = new Konva.Rect({
            row,
            fill: calculateRhythmColor(row, column),
            column,
            key: `${currentYCoordinate}${currentXCoordinate}rhythms`,
            width: cubeWidth,
            height: cubeHeight,
            y: currentXCoordinate,
            x: currentYCoordinate,
          })
          cube.zIndex(1);
          layer.add(cube);
        }
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 181 * 3;
    }
  };

  fillCubes();
}

export function refluenceCubeMaker(layer, rhythmNotes) {

  const cubeWidth = 28 * 3;
  const cubeHeight = 28 * 3;

  const status = rhythmNotes.map(row => {
    let line = [false, false, false, false, false, false];
    if (row.length) {
      row.forEach(value => line[calculateIndex(value)] = true);
    }
    return line;
  });

  const calculateRhythmColor = (row, column) => {
    if (!status[row][column]) {
      return false;
    }
    switch (column) {
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
        return false;
    }
  };


  const fillCubes = () => {
    // 鼓组组件push
    let currentXCoordinate = 80 * 3;
    let currentYCoordinate = 50 * 3;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 6; column++) {
        if (calculateRhythmColor(row, column)) {
          const cube = new Konva.Rect({
            row,
            fill: calculateRhythmColor(row, column),
            column,
            key: `${currentYCoordinate}${currentXCoordinate}rhythms`,
            width: cubeWidth,
            height: cubeHeight,
            y: currentXCoordinate,
            x: currentYCoordinate,
          })
          cube.zIndex(1);
          layer.add(cube);
        }
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 80 * 3;
    }
  };

  fillCubes();
}

// export default neoCubePictureMaker;
