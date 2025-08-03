// options/scenarios.js

// Gradually ramps from 2 to 10 VUs over 18 mins (example)
export const stages30m10vu = {
  executor: 'ramping-vus',
  startVUs: 2,
  stages: [
    { duration: '2s', target: 2 },
    { duration: '5s', target: 5 },
    { duration: '2s', target: 5 },
    { duration: '5s', target: 10 },
    { duration: '1s', target: 0 },
  ],
};

// Each VU runs a set number of iterations
export const iterations100 = {
  executor: 'per-vu-iterations',
  vus: 1,
  iterations: 100,
};

// Sustained load for 30 minutes
export const load30m10vu = {
  executor: 'constant-vus',
  vus: 10,
  duration: '30s',
};

// Minimal smoke test
export const singleRun = {
  executor: 'per-vu-iterations',
  vus: 1,
  iterations: 1,
};

// Spike Testing
export const spikeTest = {
  executor: 'ramping-vus',
  stages: [
    { duration: '30s', target: 1 },
    { duration: '5s', target: 50 },
    { duration: '30', target: 50 },
    { duration: '2s', target: 0 },
  ],
};

// Stress Testing
export const stressTest = {
  executor: 'ramping-vus',
  stages: [
    { duration: '5s', target: 10 },
    { duration: '5s', target: 50 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 200 },
    { duration: '2', target: 0 },
  ],
};

// Export all in a dictionary for easy access
export const scenarioMap = {
  stages30m10vu,
  iterations100,
  load30m10vu,
  singleRun,
  spikeTest,
  stressTest,
};