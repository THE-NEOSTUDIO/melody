import Konva from 'konva';
import {
  DO_CUBE_COLOR,
  EMPTY_CUBE_COLOR,
  LA_CUBE_COLOR,
  MI_CUBE_COLOR,
  RE_CUBE_COLOR,
  SO_CUBE_COLOR
} from "../../../constants/color";

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

  const status = rhythmNotes.map(row => {
    let line = [false, false, false, false, false, false, false, false];
    if (row.length) {
      row.forEach(value => line[calculateIndex(value)] = true);
    }
    return line;
  });


  const fillCubes = () => {
    // 鼓组组件push
    let currentXCoordinate = 0;
    let currentYCoordinate = 0;
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 6; column++) {
        layer.add(new Konva.Rect({
          row,
          fill: calculateRhythmColor(row, column),
          column,
          key: `${currentYCoordinate}${currentXCoordinate}rhythms`,
          width: cubeWidth,
          height: cubeHeight,
          x: currentXCoordinate,
          y: currentYCoordinate,
        }));
        currentXCoordinate += cubeWidth;
      }
      currentYCoordinate += cubeHeight;
      currentXCoordinate = 0;
    }
  };

  fillCubes();

  stage.add(layer);
  const dataURI = stage.toDataURL();
  document.body.removeChild(canvas);
  return dataURI;
}

export default neoCubePictureMaker;
