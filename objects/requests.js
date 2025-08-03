import http from 'k6/http';
import { config } from '../configs/config.js';


export default class Requests {
  get(endpoint, customHeaders = {}) {
    const url = `${config.baseURL}${endpoint}`;  // Auto prepend baseURL
    const headers = { ...config.headers, ...customHeaders };
    return http.get(url, { headers });
  }

  post(endpoint, payload, customHeaders = {}) {
    const url = `${config.baseURL}${endpoint}`;
    const headers = { ...config.headers, ...customHeaders };
    return http.post(url, JSON.stringify(payload), { headers });
  }
}
