import { sleep } from 'k6';

// ================ Create device ID ================
export function generateUUIDv7() {
  const now = Date.now().toString(16).padStart(12, "0");
  const randomHex = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join("");

  return `${now.slice(0, 8)}-${now.slice(8, 12)}-7${randomHex.slice(0, 3)}-${randomHex.slice(3, 7)}-${randomHex.slice(7, 15)}`;
}

// ================ Example: randomIntBetween(1, 10) returns a number between 1 and 10 ================
export function randomIntBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//================
export function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ================ Generate a random float between min and max (inclusive) ================
export function randomSleep(min, max) {
  sleep(randomIntBetween(min, max) / 1000);
}

// ================= Generate a random string of specified length ================
export function randomString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
