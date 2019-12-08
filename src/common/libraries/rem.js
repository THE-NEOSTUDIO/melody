/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: rem inject
 * @Last Modified time: 2019-12-09 00:08
 */
(function (win, doc) {
  function setHTMLFontSize() {
    win.virtualWidth =
      doc.documentElement.clientWidth || doc.body.clientWidth;
    win.virtualHeight =
      doc.documentElement.clientHeight || doc.body.clientHeight;
  }

  var e = (win.virtualWidth / 375) * 100;
  if (doc.documentElement) {
    doc.documentElement.style.fontSize = e + 'px';
  }

  win.addEventListener('resize', setHTMLFontSize);
  win.addEventListener('pageshow', setHTMLFontSize);
  win.addEventListener('load', setHTMLFontSize);

  setHTMLFontSize();
})(window, document);
