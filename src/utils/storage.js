const storage = window.localStorage;

const create = (key, value) => {
  storage.setItem(key, value);
};

const get = (key) => storage.getItem(key);

const remove = (key) => storage.removeItem(key);

export default {
  create,
  get,
  remove,
};
