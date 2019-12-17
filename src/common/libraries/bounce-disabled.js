import domReady from './domready';

/* double tap zooming disabled  */
domReady(function () {
  document.querySelectorAll("body div").forEach(element => {
    var doubleTouchStartTimestamp = 0;
    element.addEventListener("touchstart", function (event) {
      var now = +(new Date());
      if (doubleTouchStartTimestamp + 500 > now) {
        event.preventDefault();
      }
      doubleTouchStartTimestamp = now;
    });
  })
});
