const ora = require('ora');
const template = require('../template');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const { spawn } = require('child_process');
const git = require('simple-git');
const fse = require('fs-extra');

const defaultBranch = 'master';

const removeRelationGit = async (catalogue) => {
    try {
        await fse.remove(path.resolve(catalogue, '\.git'));
    } catch (err) {
        console.error(err.message);
    }
};

const getTemplate = (gitUrl, proName) => {
    return new Promise((resolve, reject) => {
        git().
        //silent(true).
        clone(gitUrl, proName).
        then(() => {
            console.log(chalk.green('template 拉取成功'));
            resolve();
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};

const installDepences = (catalogue) => {
    console.log(chalk.green('starting install dependencies'));
    const inp = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: catalogue, stdio: 'inherit' });

    inp.on('close', (code) => {
        if (code === 0) {
            console.log(chalk.green('install dependencies success！'));
            return;
        }

        console.log(chalk.red('install dependencies fail'));
    })
};

const init = async (proName) => {
    try {
        const filePath = path.resolve(process.cwd(), projectName);
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

        await fse.ensureDir(filePath);
        await getTemplate(gitUrl, projectName);
        await removeRelationGit(filePath);

        process.exit();
        /*
        cp.exec(proCmd, (err, stout, sterr) => {
            if (err) {
                ora('\n 初始化失败！').fail(err.message);
                process.exit();
                return;
            }

            ora('\n 初始化成功！').succeed();
            process.exit();
        });
        */
    } catch (err) {
        ora('\n 初始化失败！').fail(err.message);
        process.exit(1);
    }
};

module.exports = init;
