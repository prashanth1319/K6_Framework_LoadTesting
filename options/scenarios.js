


// Gradually ramps from 2 to 10 VUs over 108 mins
export const stages30m10vu = {
  executor: 'ramping-vus',
  startVUs: 2,
  stages: [
    { duration: '5m', target: 2 },   // Hold at 2 VUs
    { duration: '1m', target: 5 },    // Ramp to 5 VUs
    { duration: '5m', target: 5 },   // Hold at 5 VUs
    { duration: '1m', target: 10 },   // Ramp to 10 VUs
    { duration: '5m', target: 10 },  // Hold at 10 VUs
    { duration: '1m', target: 0 },    // Ramp down to 0
  ],
};

// Each VU runs a set number of iterations (lightweight testing)
export const iterations100 = {
  executor: 'per-vu-iterations',
  vus: 1,
  iterations: 100,
};

// Sustained load with 10 VUs for 30 minutes
export const load30m10vu = {
  executor: 'constant-vus',
  vus: 10,
  duration: '30m',
};

// Minimal run – useful for smoke testing or CI
export const singleRun = {
  executor: 'per-vu-iterations',
  vus: 1,
  iterations: 1,
};

// Spike Testing – Rapid increase in load then drop
export const spikeTest = {
  executor: 'ramping-vus',
  stages: [
    { duration: '2m', target: 1 },  // Baseline
    { duration: '30s', target: 50 }, // Sudden spike
    { duration: '2m', target: 50 },  // Hold spike
    { duration: '1m', target: 0 },  // Ramp down
  ],
};

// Stress Testing – Gradually increasing load until failure
export const stressTest = {
  executor: 'ramping-vus',
  stages: [
    { duration: '2m', target: 10 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '2m', target: 0 },   // Ramp down
  ],
};