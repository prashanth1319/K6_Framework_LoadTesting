import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '1m',
};

export default function () {
  const url = 'https://staging-be.mytwocents.io/v2/business/detail?business_id=46fb857a-2bc2-4f08-92da-146d7cefaad6';

  const headers = {
    'x-api-key': '0193ddef-3c0c-704c-b070-53d62e3bb8cb',
    'device-id': '019362f7-82aa-73eb-9e18-c517b85f6d4b',
  };

  const res = http.get(url, { headers });

  // 🔍 Print failed status codes
  if (res.status !== 200) {
    console.error(`Request failed with status: ${res.status}, body: ${res.body}`);
  }

  sleep(0.305); // pacing to control request rate
}