import Konva from "konva";
import QRCode from 'qrcode';

import backgroundImage from '../../../assets/energetic/share/background.png';
import play from '../../../assets/energetic/share/play.png';
import {cubeMaker} from "../neo-cube-picture-maker";
import {wishes} from "../../../constants/wishes";

const promisifyImageGenerate = (dataURI, x, y, width, height, group, layer) => new Promise(resolve => {
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

export default function neoPosterGenerator(url) {

  const {row, column} = JSON.parse(window.sentence_results);
  const [row1, row2] = wishes[column - 1][row].split('\n');

  return new Promise((resolve) => {
     QRCode.toDataURL(url).then(base64Image => {

       let width = 349;
       let height = 518;
       let dpr = 3;

       const strokeWidth = 6;

       const canvas = document.createElement('canvas');
       canvas.id = 'neo-poster-canvas';
       document.body.append(canvas);
       let stage = new Konva.Stage({
         container: 'neo-poster-canvas',
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
         stroke: 'white',
         strokeWidth: strokeWidth * dpr,
       });
       // add the shape to the layer
       layer.add(background);

       promisifyImageGenerate(backgroundImage, strokeWidth * dpr, strokeWidth * dpr, 1014, 1518, group, layer).then(() => {
         if (row1 && row1.length === 7) {
           let text1 = new Konva.Text({
             x: 54 * 3,
             y: 123 * 3,
             text: row1,
             fontSize: 34 * 3,
             fontFamily: 'neo-font',
             fill: 'white',
           });
           let text2 = new Konva.Text({
             x: 54 * 3,
             y: 379 * 3,
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
             x: 90 * 3,
             y: 123 * 3,
             text: row1,
             fontSize: 34 * 3,
             fontFamily: 'neo-font',
             fill: 'white',
           });
           let text2 = new Konva.Text({
             x: 90 * 3,
             y: 379 * 3,
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
             x: 105 * 3,
             y: 123 * 3,
             text: row1,
             fontSize: 34 * 3,
             fontFamily: 'neo-font',
             fill: 'white',
           });
           let text2 = new Konva.Text({
             x: 105 * 3,
             y: 379 * 3,
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
         cubeMaker(
           group, JSON.parse(decodeURIComponent(window.sound_results)).rhythmNotes
         );
         promisifyImageGenerate(base64Image, 270 * dpr, 450 * dpr, 44 * dpr, 44 * dpr, group, layer).then(() => {
           promisifyImageGenerate(play, 148 * 3, 240 * 3, 56 * 3, 56 * 3, group, layer).then(()=>{
             layer.add(group);
             let final = layer.toDataURL();
             document.body.removeChild(canvas);
             resolve(final);
           })

         });
       })
     });
   })
}

