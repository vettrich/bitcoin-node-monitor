const fetch = require("node-fetch");

export default function fetchLocal(url) {
  const getUrl = window.location;
  let base = getUrl.protocol + "//" + getUrl.host;
  if (url.charAt(0) === '/') {

  } else {
    base += '/';
  }

  return fetch(base + url);
}
