import {saveToLocalStore, getFromLocalStore} from './storage';

const supportsHtml5Storage = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (err) {
    console.error('Cache is not supported by your browser', err);
    return false;
  }
};

const cacheToStorage = supportsHtml5Storage();

export const fetchPoster = value => {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(value)}&type=movie`;
  const jsonCached = localStorage.getItem(url);
  if (jsonCached) {
    return new Promise(resolve => resolve(JSON.parse(jsonCached)));
  }
  return fetch(url)
    .then(resp => {
      return resp.json().then(json => {
        let response;
        if (resp.ok) {
          response = json;
          localStorage.setItem(url, JSON.stringify(json));
        } else {
          response = Promise.reject(json);
        }
        return response;
      });
    });
};

const fetchDataFromServer = (resolve, reject) => {
  const url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
  fetch(url)
  .then(resp => {
    return resp.json();
  })
  .then(response => {
    if (cacheToStorage) {
      Object
        .keys(response)
        .map(key => saveToLocalStore(key, response[key]));
    }
    if (resolve) {
      resolve({
        data: response.data,
        meta: response.meta
      });
    }
  })
  .catch(err => {
    reject(err);
    console.error(err);
  });
};

export const fetchMovies = new Promise((resolve, reject) => {
  if (cacheToStorage) {
    const data = getFromLocalStore('data', 'meta');
    if (data) {
      resolve(data);
    }
  }
  fetchDataFromServer(resolve, reject);
});
