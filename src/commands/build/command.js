import chalk from 'chalk';
import fs from 'fs';
import Promise from 'bluebird';
import compile from './compile';
import API from '../../api';

import config from '../../config';
import { BUILD_FOLDER, CONTRACTS_FOLDER } from '../../environment';

/**
 * Compile specified source file and save it in destination folder
 *
 * @param {Object} api     - An API entity
 * @param {String} srcPath - Source file path to compile
 * @param {String} dstPath - Destination path
 */
const compileAdSave = async (api, srcPath, dstPath) => {
    const code = fs.readFileSync(srcPath);
    const bytes = await compile(api, code.toString());
    fs.writeFileSync(dstPath, bytes);

    return true;
};

export const handler = async api => {
    console.log(chalk.bold('info:'), 'Building contracts');

    // Create build folder
    if (!fs.existsSync(BUILD_FOLDER)) {
        fs.mkdirSync(BUILD_FOLDER);
    }

    // Make sure that contacts folder exists
    if (!fs.existsSync(CONTRACTS_FOLDER)) {
        console.log(
            "Can't find contracts folder, make sure you are in root folder of your project",
        );
        return false;
    }

    const files = fs.readdirSync(CONTRACTS_FOLDER);
    await Promise.each(files, file => {
        // Skip non *.java files
        if (!file.match(/\.*\.java$/)) {
            return Promise.resolve();
        }

        const dstFile = file.substr(0, file.lastIndexOf('.'));
        return compileAdSave(
            api,
            `${CONTRACTS_FOLDER}/${file}`,
            `${BUILD_FOLDER}/${dstFile}`,
        );
    });

    console.log(`Built ${files.length} contracts!`);
};

const main = commander => {
    commander
        .command('build')
        .description('Compile the current project contracts')
        .action(() => {
            // Get config for specified network and init API
            const _config = config.network(commander.network);
            const api = new API(_config);

            return handler(api);
        });
};

export default main;
