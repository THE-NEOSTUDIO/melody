import {SOUND_MAP} from "./type-map";

/* 外网访问域名 */
export const PREFIX_CDN = 'https://neostudio.oss-accelerate.aliyuncs.com/melody_project/';
/* CDN访问域名 */
export const PREFIX_NORMAL = 'https://neostudio.oss-cn-beijing.aliyuncs.com/melody_project/';

/* 开关 */
const useCDN = true;
const debug = true;

export const PREFIX =
  !debug
    ? (useCDN ? PREFIX_CDN : PREFIX_NORMAL)
    : '/';

export const GET_RHYTHM_API_LIST = type => {
  if (!{}.propertyIsEnumerable.call(SOUND_MAP, type) || type === 'drum') {
    return [];
  } else {
    return [
      `${PREFIX}sounds/${SOUND_MAP[type]}/C3.mp3`,
      `${PREFIX}sounds/${SOUND_MAP[type]}/Ds3.mp3`,
      `${PREFIX}sounds/${SOUND_MAP[type]}/Fs3.mp3`,
      `${PREFIX}sounds/${SOUND_MAP[type]}/A3.mp3`,
      `${PREFIX}sounds/${SOUND_MAP[type]}/C4.mp3`,
    ]
  }
};

export const GET_DRUM_API_LIST = () => [
  `${PREFIX}sounds/${SOUND_MAP.drum}/low.mp3`,
  `${PREFIX}sounds/${SOUND_MAP.drum}/high.mp3`,
];

