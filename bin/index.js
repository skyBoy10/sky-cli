#! /usr/bin/env node

const program = require('commander');
const list = require('../commanders/list');
const init = require('../commanders/init');
const package = require('../package.json');

program
.version(package.version, '-v --version')
.usage('<command>')

/**
 * 增加模版指令
 */
program
.command('add')
.description('添加新模版')
.alias('ad')
.action(() => {
    require('../commanders/add')();
});

/**
 * 模版列表指令
 */
program
.command('list')
.description('查看所有模版')
.alias('li')
.action(() => {
    list();
});

/**
 * 删除模版指令
 */
program
.command('delete')
.description('删除指定模版')
.alias('de')
.action(() => {
    require('../commanders/delete')();
});

/**
 * 初始化指令
 */
program
.name('fang')
.usage('init [proName]')
.command('init [proName]')
.description('初始化项目')
.alias('in')
.action((proName) => {
    init(proName);
});

program.parse(process.argv); // 解析命令行，对注册的command，option等做解析，必须使用
if (!program.args.length) {
    program.help();
}