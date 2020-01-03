import Konva from "konva";
import QRCode from 'qrcode';

import backgroundImage from '../../../assets/energetic/share/background.png';
import {cubeMaker} from "../neo-cube-picture-maker";

const promisifyImageGenerate = (dataURI, x, y, width, height, layer) => new Promise(resolve => {
  Konva.Image.fromURL(dataURI, function (darthNode) {
    darthNode.setAttrs({
      x,
      y,
      width,
      height,
    });
    layer.add(darthNode);
    layer.batchDraw();
    resolve(true);
  });
});

export default function neoPosterGenerator(url) {
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

       console.log(width);

       let layer = new Konva.Layer();
       stage.add(layer);

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

       promisifyImageGenerate(backgroundImage, strokeWidth * dpr, strokeWidth * dpr, 1014, 1518, layer).then(() => {
         cubeMaker(
           layer, JSON.parse(decodeURIComponent(window.sound_results)).rhythmNotes
         );
         promisifyImageGenerate(base64Image, 264.27 * dpr, 450 * dpr, 44 * dpr, 44 * dpr, layer).then(() => {
           let final = layer.toDataURL();
           document.body.removeChild(canvas);
           resolve(final);
         });
       })
     });
   })
}

