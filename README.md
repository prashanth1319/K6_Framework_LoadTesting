# K6 Modular Load Testing Framework

## Overview
This is a **complete, reusable, and team-friendly k6 load testing framework** with:
- **Dynamic scenario selection**
- **Threshold-based pass/fail validation**
- **JSON & HTML reporting**
- **Easy environment/configuration management**
- **CI/CD readiness**

It is designed to help **QA enginseers, SDETs, and performance engineers** quickly write, execute, and maintain **API load tests**.

---

## 1. Framework Structure

```
k6_final_framework/
├── main.js                     # Entry point to execute k6 test
│
├── options/                    # Test options & configurations
│   ├── scenarios.js             # Predefined scenarios (load, stress, spike, etc.)
│   └── thresholds.js            # SLA thresholds for pass/fail
│
├── objects/                    # Reusable test objects
│   └── requests.js              # HTTP GET/POST wrapper for scripts
│
├── scripts/                    # Test scripts
│   └── exampleTest.js           # Sample API test using Requests object
│
├── configs/                    # Environment configurations
│   └── config.json              # Base URL & headers
│
├── generate_report.sh           # Steps to generate JSON & HTML reports
└── README.md                    # This documentation
```

---

## 2. Key Features

**Dynamic Scenario Selection**
- Multiple load profiles: `singleRun`, `spikeTest`, `stressTest`, `load30m10vu`, etc.
- Choose scenario at runtime without changing code.

**Threshold-Based Validation**
- Auto fail the test if **95th percentile > 500ms** or **>1% failures**.

**Reporting**
- Generate JSON results for CI/CD
- Convert JSON to **HTML report** for visual review

**Environment-Driven**
- Switch easily between **staging/prod** using `configs/config.json`

**CI/CD Ready**
- Supports GitHub Actions & Jenkins
- Run tests in pipelines with `-e SCENARIO=<name>`

**Team Friendly**
- Clean, minimal, and extensible structure
- Any team member can add new APIs or scenarios easily

---

## 3. Scenarios Supported

We support **multiple pre-defined scenarios** in `options/scenarios.js`:

- **singleRun** → 1 iteration (for smoke or CI tests)
- **iterations100** → 100 lightweight iterations
- **stages30m10vu** → Gradual ramp from 2 to 10 VUs over 18 minutes
- **load30m10vu** → Constant 10 VUs for 30 minutes
- **spikeTest** → Sudden traffic spike to 50 VUs
- **stressTest** → Gradual ramp to 200 VUs (to find system breaking point)

**Example selection at runtime:**

```bash
# Default (singleRun)
k6 run main.js

# Spike test
k6 run main.js -e SCENARIO=spikeTest

# Stress test
k6 run main.js -e SCENARIO=stressTest
```

---

## 4. How the Framework Works

1. **Select Scenario**  
   - `main.js` picks the scenario based on `SCENARIO` environment variable
2. **Load Options & Thresholds**  
   - Loads `options/scenarios.js` & `thresholds.js`
3. **Execute Test Script**  
   - Runs function from `scripts/exampleTest.js`
4. **Make Requests via Objects**  
   - Uses `objects/requests.js` for HTTP GET/POST
5. **Apply Thresholds**  
   - k6 automatically checks thresholds and reports pass/fail
6. **Generate Reports**  
   - Save output to JSON → Convert to HTML via `k6-html-reporter`

---

## 5. Execution & Reporting

### **Basic Execution**
```bash
k6 run main.js
```

### **Run Specific Scenario**
```bash
k6 run main.js -e SCENARIO=spikeTest
```

### **Save JSON Results**
```bash
k6 run main.js --out json=results.json
```

### **Generate HTML Report**
```bash
# Install Node.js and k6-html-reporter if not installed
npm install -g k6-html-reporter

# Convert results to HTML
k6-html-reporter results.json report.html

# Open report.html in browser
```

---

## 6. CI/CD Integration

**GitHub Actions Example** (`.github/workflows/k6-loadtest.yml`)

```yaml
name: k6 Load Test
on: [push]

jobs:
  k6-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install k6
        run: |
          sudo apt-get update
          sudo apt-get install -y gnupg software-properties-common
          curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
          echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update
          sudo apt-get install -y k6
      - name: Run k6 scenario
        run: |
          cd k6_final_framework
          k6 run main.js -e SCENARIO=singleRun --out json=results.json
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: k6-results
          path: k6_final_framework/results.json
```

**Key CI/CD Benefits:**
- Automates load testing in pipelines
- Uses thresholds to fail pipelines on SLA breaches
- Artifacts (JSON/HTML reports) stored for review

---

## 7. How to Extend Framework

1. **Add New Test Script**
   - Create a new `.js` in `scripts/`
   - Export a function performing HTTP calls
   - Update `main.js` if needed

2. **Add New Scenario**
   - Edit `options/scenarios.js`
   - Add to `scenarioMap` for dynamic selection

3. **Update Config**
   - Change base URL or headers in `configs/config.json`

4. **Integrate More Reports**
   - Add InfluxDB/Grafana for real-time dashboards

## 8. Benefits

- Easy for **Testers** to run basic tests
- Flexible for **SDET/performance engineers** to extend
- Minimal setup → Ready in minutes
- Scalable from **smoke to heavy stress testing**
- **Production-grade** when combined with CI/CD & dashboards

