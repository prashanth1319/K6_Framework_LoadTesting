# Generate HTML report from k6 JSON results

# Step 1: Install Node.js (for report generation) if not installed
# brew install node (Mac) or choco install nodejs (Windows)

# Step 2: Install k6-to-html reporter
npm install -g k6-html-reporter

# Step 3: Run k6 test and generate JSON report
k6 run main.js --out json=results.json

# Step 4: Generate HTML report
k6-html-reporter results.json report.html

# Your report is saved as report.html
