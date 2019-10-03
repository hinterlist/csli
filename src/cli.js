import commander from 'commander';
import { each } from 'lodash';
import { version } from '../package.json';

import commands from './commands';

/**
 * Parse CLI arguments and execute appropriate command
 *
 * @param args - CLI arguments
 */
export function main(args) {
    commander
        .usage('[command] [flags]')
        .version(version, '-v, --version')
        .option(
            '-n, --network <name>',
            'network name (e.g. default)',
            'default',
        );

    // Initialize each available command
    each(commands, command => {
        command(commander);
    });

    // Output help if not arguments were provided
    if (!args.slice(2).length) {
        commander.outputHelp();
    }

    return commander.parse(args);
}

export default main(process.argv);
