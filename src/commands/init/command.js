/**
 * Initialize environment for a new application
 * in provided folder.
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { ncp } from 'ncp';
import { promisify } from 'bluebird';
import fs, { mkdirSync, copyFileSync } from 'fs';

// Application environment template path
const TEMPLATE_FOLDER = `${__dirname}/template`;

/**
 * Print geating message with useful commands
 */
const printGeating = () => {
    console.log('');
    console.log(chalk.bold('Welcome to Credits!'));
    console.log('');
    console.log('This will create an environment for your new application,');
    console.log('so you could start being creative right a way!');
    console.log('');
    console.log('Commands:');
    console.log('');
    console.log('         Build:', chalk.bold('credits build'));
    console.log('        Deploy:', chalk.bold('credits deploy'));
    console.log('Test contracts:', chalk.bold('credits test'));
    console.log('');
};

/**
 * Handle init command execution
 *
 * @param path - Path to a new project
 */
export const handler = async () => {
    console.log(
        chalk.bold('info:'),
        'Creating environment for a new application',
    );

    const dstPath = process.env.INIT_CWD;

    // Make sure that destination folder is empty
    const folder = fs.readdirSync(dstPath);
    if (folder.length > 0) {
        console.log(chalk.red('Error: Current folder is not empty'));
        return false;
    }

    mkdirSync(`${dstPath}/__tests__`);
    mkdirSync(`${dstPath}/contracts`);
    mkdirSync(`${dstPath}/deployment`);
    copyFileSync(`${TEMPLATE_FOLDER}/config.js`, `${dstPath}/config.js`);
    copyFileSync(
        `${TEMPLATE_FOLDER}/Migrations.java`,
        `${dstPath}/contracts/Migrations.java`,
    );

    printGeating();

    return true;
};

const main = commander => {
    commander
        .command('init')
        .description('Create a new credits project in an existing director')
        .action(handler);
};

export default main;
