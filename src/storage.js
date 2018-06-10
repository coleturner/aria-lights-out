export function read(key) {
  return localStorage.getItem(key);
}

export function write(key, value) {
  return localStorage.setItem(key, value);
}

export function readMaxLevel() {
    return parseInt(read('maxLevel'), 10);
}