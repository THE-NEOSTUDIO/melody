/*
* Some necessary helpers
* */
const cssPrefixList = ['', '-webkit-', '-Moz-', '-ms-', '-o-'];

/*
* rem to px
* */
export const transformRemToPixel = rem => {
  if (typeof rem !== 'number') {
    return 0;
  }
  return rem * (window.virtualWidth / 375) * 100;
};

/*
* px to rem
* */
export const transformPixelToRem = rem => {
  return `${Math.round(transformRemToPixel(rem))}px`;
};

/*
 * 判断某css属性是否支持当前在设备使用
 * */
export const checkCssCompatibility = propertyName =>
  new Promise((resolve, reject) => {
    // result
    let compatibility = false;
    const checkIfCssPropertyCompatible = propertyName =>
      document &&
      document.documentElement &&
      document.documentElement.style &&
      // eslint-disable-next-line no-prototype-builtins
      document.documentElement.style.hasOwnProperty(propertyName);

    // string required
    if (typeof propertyName !== 'string') {
      console.Error('string css property name required');
      reject('unknown');
    }

    // judge if css property name with prefix
    if (cssPrefixList.find(prefix => propertyName.indexOf(prefix) !== -1)) {
      return resolve(checkIfCssPropertyCompatible(propertyName));
    } else {
      cssPrefixList
        .map(prefix => ({
          cssPropertyWithPrefix: `${prefix}${propertyName}`,
          prefix
        }))
        // eslint-disable-next-line no-unused-vars
        .forEach(({ cssPropertyWithPrefix, prefix }) => {
          if (checkIfCssPropertyCompatible(cssPropertyWithPrefix)) {
            compatibility = true;
          }
        });
    }
    return resolve(compatibility);
  });


/*
 * 判断canvas是否支持当前在设备使用
 * */
export const checkCanvasCompatibility = () =>
  new Promise((resolve, reject) => {
    let canvas;
    if (!document || !document.createElement) {
      const error = 'browser env required!';
      console.error(error);
      return reject(error);
    }
    try {
      canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        // 支持canvas
        resolve(true);
      } else {
        // 不支持canvas
        resolve(false);
      }
    } catch (e) {
      canvas && document.removeChild(canvas);
      console.error(e);
      reject(e);
    }
  });
