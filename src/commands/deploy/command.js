import fs from 'fs';
import chalk from 'chalk';
import { each } from 'lodash';

import config from '../../config';
import { MIGRATIONS_FOLDER } from '../../environment';

export const handler = api => {
    console.log(chalk.bold('info:'), 'Deploying contracts');

    // Mke sure that migrations folder exists
    if (!fs.existsSync(MIGRATIONS_FOLDER)) {
        console.log(
            "Can't find migrations folder, make sure you are in root folder of your project.",
        );
        return false;
    }

    const files = fs.readdirSync(MIGRATIONS_FOLDER);
    each(files, file => {
        let version = file.match(/^(\d+)_/);
        // Execute migration only if version specified in file prefix is aboce
        // latest executeg migration version
        version = version ? parseInt(version[0]) : 0;
        if (version > api.getLastMigrationVersion()) {
            const migration = require(`${MIGRATIONS_FOLDER}/${file}`);

            console.log(`Executing ${file} migration`);
            migration();

            // Update latest executed migration version
            api.setLatestMigrationVersion(version);
        }
    });
};

const main = commander => {
    commander
        .command('deploy')
        .description('Deploy compiled contracts to credits network')
        .action(() => {
            // Get config for specified network and init API
            const _config = config.network(commander.network);
            const api = new API(_config);

            return handler(api);
        });
};

export default main;
