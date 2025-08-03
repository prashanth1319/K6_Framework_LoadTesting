import { scenarioMap } from './options/scenarios.js';
import { thresholds } from './options/thresholds.js';

// Import all testing scripts
import { firstTest } from './scripts/firstTest.js';

// Pick the test to execute here (just change one line)
const selectedTest = firstTest; // Change to ant other test as needed

// Get scenario name from environment variable or fallback to singleRun
const selectedScenario = __ENV.SCENARIO || 'singleRun';

if (!scenarioMap[selectedScenario]) {
  throw new Error(`Scenario "${selectedScenario}" not found! Available: ${Object.keys(scenarioMap).join(', ')}`);
}

// k6 Options (scenario + thresholds)
export const options = {
  scenarios: {
    [selectedScenario]: scenarioMap[selectedScenario],
  },
  thresholds,
};

// Export the selected test
export default selectedTest;

/*

# Default (singleRun)
k6 run main.js

# Spike test
k6 run main.js -e SCENARIO=spikeTest

# Stress test
k6 run main.js -e SCENARIO=stressTest

# Load test 30 min 10 VUs
k6 run main.js -e SCENARIO=load30m10vu

*/
