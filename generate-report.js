import { generate } from 'cucumber-html-reporter';
import { promises as fs } from 'fs';
import path from 'path';

const normalizedDirname = process.cwd();

console.log('Normalized directory:', normalizedDirname);

const getTestResults = async () => {
  try {
    const resultFiles = await fs.readdir(path.join(normalizedDirname, 'test-results'));
    const jsonFiles = resultFiles.filter(file => file.endsWith('.json'));

    const testResults = [];
    for (const file of jsonFiles) {
      const filePath = path.join(normalizedDirname, 'test-results', file);
      console.log('Reading file:', filePath);
      const result = JSON.parse(await fs.readFile(filePath, 'utf8'));
      testResults.push(result);
    }

    return testResults;
  } catch (err) {
    console.error('Error reading test results:', err);
    throw err;
  }
};

const generateReport = async () => {
  try {
    const testResults = await getTestResults();

    const options = {
      theme: 'bootstrap',
      jsonFile: path.join(normalizedDirname, 'cucumber_report.json'),
      output: path.join(normalizedDirname, 'cucumber_report.html'),
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome 95",
        "Platform": "Windows 10",
        "Executed": "Local"
      },
      screenshots: testResults.map(result => ({
        testName: result.name,
        screenshotPath: path.join(normalizedDirname, 'test-results', `${result.name}.png`),
        videoPath: path.join(normalizedDirname, 'test-results', `${result.name}.mp4`),
      }))
    };

    generate(options);
  } catch (err) {
    console.error('Error generating report:', err);
  }
};

generateReport();
