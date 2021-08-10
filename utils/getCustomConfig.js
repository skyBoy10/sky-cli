const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

const result = [];

const handleResult = () => {
  try {
    const filePath = `${path.resolve(process.cwd, 'sky.config.ts')}`;
    const isExist = fs.existsSync(filePath);

    if (!isExist) {
      return;
    }

    setTimeout(() => {
      result.push('test');
    }, 3000);
  } catch (err) {
    console.log(chalk.red(err.message));
  }
};

handleResult();

module.exports = result;