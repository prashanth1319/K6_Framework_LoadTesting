import Requests from '../objects/requests.js';
const req = new Requests();

export function firstTest() {
  const res = req.get('/public/crocodiles/');  // No full URL needed
  console.log(`Status: ${res.status}`);
}
