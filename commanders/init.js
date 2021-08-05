const ora = require('ora');
const template = require('../template');
const inquirer = require('inquirer');
const cp = require('child_process');

const defaultBranch = 'master';

const init = async (proName) => {
    try {
        const tempList = Object.keys(template.tpl);
        const res = await inquirer.prompt({
            type: 'rawlist',
            name: 'template',
            choices: tempList,
            message: '请选择一个模版',
            default: null,
        });

        const projectName = proName || res.template;
        const gitUrl = template.tpl[res.template]['url'];
        const gitBranch = template.tpl[res.template]['branch'] || defaultBranch;
        const proCmd = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${gitBranch}`;
        ora('开始初始化').start();

        cp.exec(proCmd, (err, stout, sterr) => {
            if (err) {
                ora('\n 初始化失败！').fail(err.message);
                process.exit();
                return;
            }

            ora('\n 初始化成功！').succeed();
            process.exit();
        });
    } catch (err) {
        ora('\n 初始化失败！').fail(err.message);
        process.exit();
    }
};

module.exports = init;
