import Konva from "konva";
import QRCode from 'qrcode';

export default function neoPosterGenerator(url) {
  return QRCode.toDataURL(url).then(base64Image=>{
    let width = window.innerWidth;
    let height = window.innerHeight;

    const canvas = document.createElement('canvas');
    canvas.id = 'jujube_test';
    document.body.append(canvas);
    let stage = new Konva.Stage({
      container: 'jujube_test',
      width,
      height
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let simpleText = new Konva.Text({
      x: stage.width() / 2,
      y: 15,
      text: '测试测试测试',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green'
    });

    layer.add(simpleText);

    return new Promise(resolve => {
      Konva.Image.fromURL(base64Image, function(darthNode) {
        darthNode.setAttrs({
          x: 200,
          y: 50,
          scaleX: 0.5,
          scaleY: 0.5
        });
        layer.add(darthNode);
        layer.batchDraw();
        let uri = stage.toDataURL();
        document.body.removeChild(canvas);
        resolve(uri);
      });
    })

  });
}
