const sum = require('./sum');
const fs = require('fs');

let testsPassed = 0;
let testsFailed = 0;
let htmlOutput = `
<html>
<head>
  <title>Test Results</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    table { width: 80%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background-color: #f2f2f2; }
    .pass { color: green; font-weight: bold; }
    .fail { color: red; font-weight: bold; }
    .summary { margin-top: 20px; padding: 15px; border: 1px solid #ccc; background-color: #f9f9f9; }
    .summary p { margin: 5px 0; }
  </style>
</head>
<body>
  <h1>Test Results for sum function</h1>
  <table>
    <tr>
      <th>Status</th>
      <th>Description</th>
      <th>Details</th>
    </tr>
`;

function runTest(description, actual, expected) {
  if (actual === expected) {
    htmlOutput += `<tr class="pass"><td>✅ PASS</td><td>${description}</td><td></td></tr>`;
    testsPassed++;
  } else {
    htmlOutput += `<tr class="fail"><td>❌ FAIL</td><td>${description}</td><td>Expected: ${expected}, Actual: ${actual}</td></tr>`;
    testsFailed++;
  }
}

console.log("Running tests for sum function and generating HTML report...");

runTest('adds 1 + 2 to equal 3', sum(1, 2), 3);
runTest('adds -1 + 1 to equal 0', sum(-1, 1), 0);
runTest('adds 0 + 0 to equal 0', sum(0, 0), 0);

htmlOutput += `
  </table>
  <div class="summary">
    <h2>Test Summary</h2>
    <p>Total tests: ${testsPassed + testsFailed}</p>
    <p class="pass">Passed: ${testsPassed}</p>
    <p class="fail">Failed: ${testsFailed}</p>
  </div>
</body>
</html>
`;

fs.writeFileSync('test-results.html', htmlOutput);
console.log("HTML report generated: test-results.html");

if (testsFailed > 0) {
  process.exitCode = 1; // Indicate failure to the shell
}
