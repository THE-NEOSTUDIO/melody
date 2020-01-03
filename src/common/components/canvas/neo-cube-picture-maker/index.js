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

function neoCubePictureMaker({width = 600, height = 600, rhythmNotes = [[], [], [], [], [], [], [], []]}) {

  let canvas = document.createElement('canvas');
  canvas.id = 'neo-cube-picture-maker';
  document.body.append(canvas);

  let stage = new Konva.Stage({
    container: 'neo-cube-picture-maker',
    width: width,
    height: height
  });

  let layer = new Konva.Layer();

  const cubeWidth = width / 6;
  const cubeHeight = height / 6;

  const status = rhythmNotes.map(row => {
    let line = [false, false, false, false, false, false, false, false];
    if (row.length) {
      row.forEach(value => line[calculateIndex(value)] = true);
    }
    return line;
  });

  const calculateRhythmColor = (row, column) => {
    if (!status[row][column]) {
      return false;
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
        return false;
    }
  };

  const fillCubes = () => {
    // 鼓组组件push
    let currentXCoordinate = 0;
    let currentYCoordinate = 0;
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 6; column++) {
        if (calculateRhythmColor(row, column)) {
          layer.add(new Konva.Rect({
            row,
            fill: calculateRhythmColor(row, column),
            column,
            key: `${currentYCoordinate}${currentXCoordinate}rhythms`,
            width: cubeWidth,
            height: cubeHeight,
            x: currentYCoordinate,
            y: currentXCoordinate,
          }));
        }
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 0;
    }
  };

  fillCubes();

  stage.add(layer);
  const dataURI = stage.toDataURL({mimeType: 'image/png'});
  document.body.removeChild(canvas);
  console.log(dataURI);
  return dataURI;
}

export function cubeMaker(layer, rhythmNotes) {
  const cubeWidth = 384 / 6;
  const cubeHeight = 384 / 6;

  const status = rhythmNotes.map(row => {
    let line = [false, false, false, false, false, false, false, false];
    if (row.length) {
      row.forEach(value => line[calculateIndex(value)] = true);
    }
    return line;
  });

  const calculateRhythmColor = (row, column) => {
    if (!status[row][column]) {
      return false;
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
        return false;
    }
  };


  const fillCubes = () => {
    // 鼓组组件push
    let currentXCoordinate = 333;
    let currentYCoordinate = 606;
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 6; column++) {
        if (calculateRhythmColor(row, column)) {
          layer.add(new Konva.Rect({
            row,
            fill: calculateRhythmColor(row, column),
            column,
            key: `${currentYCoordinate}${currentXCoordinate}rhythms`,
            width: cubeWidth,
            height: cubeHeight,
            y: currentYCoordinate,
            x: currentXCoordinate,
          }));
        }
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 333;
    }
  };

  fillCubes();
}

export default neoCubePictureMaker;
