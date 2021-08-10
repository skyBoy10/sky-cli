const { spawn } = require('child_process');
const inquirer = require('inquirer');

const checkExistPackage = async (pkgName) => {
  try {
    const npmPkg = spawn(`npm`, [`ls -g `, `${pkgName}`], { shell: true });
    npmPkg.on('error', (err) => {
      console.log(err, 'error');
    });

    npmPkg.stdout.on('data', (data) => {
      const pkgInfo = data.toString();
      console.log(pkgInfo, 'stdout')
    });

    npmPkg.stderr.on('data', (data) => {
      console.log(data, 'stderr');
    });

    npmPkg.on('close', (res) => {
      console.log(res, 'close')
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const handleInquire = async (pkgName) => {
  const res = await inquirer.prompt({
    type: 'confirm',
    name: 'isContinue',
    message: '确认继续吗？',
    default: true,
  });

  if (res.isContinue) {
    const isExist = await checkExistPackage(pkgName);
    console.log(isExist, 'res')
  }
};

module.exports = handleInquire;
