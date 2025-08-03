export const config = {
  baseURL: __ENV.BASE_URL || 'https://test-api.k6.io',
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': __ENV.AUTH_TOKEN || '',
  },
};