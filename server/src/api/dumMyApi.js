const { APP_ID_FIELD, APP_ID_VALUE, LIMIT_FIELD, PAGE_FIELD, BASE_URL } =  require('../constants/api/dumMyApi.js');
const { METHOD_GET, METHOD_POST, METHOD_PUT } = require('../constants/api/common.js');
const fetch = require('node-fetch');

exports.doGetRequest = (path, searchParams) => {
  const url = new URL(path, BASE_URL);
  searchParams && Object.entries(searchParams).forEach((params) => {
    url.searchParams.append(params[0], params[1]);
  });
  return fetch(url.toString(), {
    method: METHOD_GET,
    headers: { [APP_ID_FIELD]: APP_ID_VALUE },
  }).then((resp) => resp.json());
};

exports.doPostRequest = (path, postObj) => {
  return fetch(BASE_URL+path, {
    method: METHOD_POST,
    headers: { [APP_ID_FIELD]: APP_ID_VALUE, 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(postObj)
  }).then((resp) => resp.json());
};

exports.doPutRequest = (path, putObj) => {
  return fetch(BASE_URL+path, {
    method: METHOD_PUT,
    headers: { [APP_ID_FIELD]: APP_ID_VALUE, 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(putObj)
  }).then((resp) => resp.json());
};