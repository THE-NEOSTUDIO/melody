import Konva from "konva";

import backgroundImage from '../../../assets/energetic/share/refluence.png';
import {refluenceCubeMaker} from "../neo-cube-picture-maker";
import {wishes} from "../../../constants/wishes";

const promisifyImageGenerate = (dataURI, x, y, width, height, group) => new Promise(resolve => {
  Konva.Image.fromURL(dataURI, function (darthNode) {
    darthNode.setAttrs({
      x,
      y,
      width,
      height,
    });
    darthNode.zIndex(0);
    group.add(darthNode);
    resolve(true);
  });
});

export default function refluenceGenerator(div, queries) {

  const rhythm = JSON.parse(queries.context).rhythmNotes;
  const sentence = JSON.parse(queries.wish);

  const {row, column} = sentence;
  const [row1, row2] = wishes[column - 1][row].split('\n');

  return new Promise((resolve) => {
    let width = 319;
    let height = 319;
    let dpr = 3;

    let stage = new Konva.Stage({
      container: div,
      width: width * dpr,
      height: height * dpr
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let group = new Konva.Group();

    let background = new Konva.Rect({
      x: 0,
      y: 0,
      width: width * dpr,
      height: height * dpr,
      fill: '#171963',
    });
    // add the shape to the layer
    layer.add(background);

    promisifyImageGenerate(backgroundImage, 0, 0, 319 * 3, 319 * 3, group, layer).then(() => {
      if (row1 && row1.length === 7) {
        let text1 = new Konva.Text({
          x: 40 * 3,
          y: 6 * 3,
          text: row1,
          fontSize: 34 * 3,
          fontFamily: 'neo-font',
          fill: 'white',
        });
        let text2 = new Konva.Text({
          x: 40 * 3,
          y: 280 * 3,
          text: row2,
          fontSize: 34 * 3,
          fontFamily: 'neo-font',
          fill: 'white',
        });
        group.add(text1);
        group.add(text2);
        text1.zIndex(1);
        text2.zIndex(1);
        layer.draw();
      }

      if (row1 && row1.length === 5) {
        let text1 = new Konva.Text({
          x: 74 * 3,
          y: 6 * 3,
          text: row1,
          fontSize: 34 * 3,
          fontFamily: 'neo-font',
          fill: 'white',
        });
        let text2 = new Konva.Text({
          x: 74 * 3,
          y: 280 * 3,
          text: row2,
          fontSize: 34 * 3,
          fontFamily: 'neo-font',
          fill: 'white',
        });
        group.add(text1);
        group.add(text2);
        text1.zIndex(1);
        text2.zIndex(1);
        layer.draw();
      }

      if (row1 && row1.length === 4) {
        let text1 = new Konva.Text({
          x: 90 * 3,
          y: 6 * 3,
          text: row1,
          fontSize: 34 * 3,
          fontFamily: 'neo-font',
          fill: 'white',
        });
        let text2 = new Konva.Text({
          x: 90 * 3,
          y: 280 * 3,
          text: row2,
          fontSize: 34 * 3,
          fontFamily: 'neo-font',
          fill: 'white',
        });
        group.add(text1);
        group.add(text2);
        text1.zIndex(1);
        text2.zIndex(1);
        layer.draw();
      }
      refluenceCubeMaker(
        group, rhythm
      );
      layer.add(group);
      layer.draw();
      resolve(true);
    });
  })
}
