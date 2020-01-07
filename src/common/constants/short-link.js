import neoFetch from 'axios';

export const token = 'ce9c4cfe0500ea07904ada79354c2e15';
export const api = 'https://dwz.cn/admin/v2/create';

export const getShortLink = (url) => Promise.resolve({data:''});

  /*
  *
  * neoFetch({
  method: 'POST',
  headers: {'Token': token},
  data: JSON.stringify({url}),
  url: api,
});
*/
