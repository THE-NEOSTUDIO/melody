/*
 * @Author: jujube
 * @Date: 2019-12-09 00:08
 * @Description: rem inject
 * @Last Modified time: 2019-12-09 00:08
 */
(function(win, doc) {
  var search = (win.location && win.location.search.split('?')[1]) || '';
  var sArr = search.split('&');
  var result = {};
  for (var i = 0, len = sArr.length; i < len; i++) {
    var temp = sArr[i].split('=');
    var key = temp[0];
    result[key] = decodeURIComponent(temp[1]);
  }

  function setHTMLFontSize() {
    if (result.resolution) {
      var width = Number(result.resolution.split('*')[0]) || 0;
      var height = Number(result.resolution.split('*')[1]) || 0;
      if (width > height) {
        var tmp = width;
        width = height;
        height = tmp;
      }
      win.virtualWidth = Math.ceil(width / (win.devicePixelRatio || 1));
      win.virtualHeight = Math.ceil(height / (win.devicePixelRatio || 1));
    } else {
      win.virtualWidth =
        doc.documentElement.clientWidth || doc.body.clientWidth;
      win.virtualHeight =
        doc.documentElement.clientHeight || doc.body.clientHeight;
    }

    var e = (win.virtualWidth / 375) * 100;
    if (doc.documentElement) {
      doc.documentElement.style.fontSize = e + 'px';
    }
  }

  // 没有resolution参数需要监听事件获取准确的宽高
  if (!result.resolution) {
    win.addEventListener('resize', setHTMLFontSize);
    win.addEventListener('pageshow', setHTMLFontSize);
    win.addEventListener('load', setHTMLFontSize);
  }

  setHTMLFontSize();
})(window, document);
