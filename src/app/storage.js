export class Storage {
  saveToLocalStore(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getValueFromLocalStore(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  getFromLocalStore(...args) {
    const [data, meta] = args.map(key => this.getValueFromLocalStore(key));
    return data && meta ? {data, meta} : null;
  }
}

export const saveToLocalStore = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getValueFromLocalStore = key => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const getFromLocalStore = (...args) => {
  const [data, meta] = args.map(key => getValueFromLocalStore(key));
  return data && meta ? {data, meta} : null;
};
