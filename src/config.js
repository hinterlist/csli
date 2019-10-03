import { has } from 'lodash';
import { ROOT_FOLDER } from './environment';

export default {
    /**
     * Return raw configuration file
     */
    all: () => {
        return require(`${ROOT_FOLDER}/config.js`).default;
    },

    /**
     * Returns configuration for specified network if it's available
     *
     * @param {String} name - Network name
     */
    network: name => {
        const config = require(`${ROOT_FOLDER}/config.js`).default;

        if (!has(config, ['networks', name])) {
            throw new Error(
                "Unable to find configuration section for specified network. Make sure that it's defined in your config file.",
            );
        }

        return config.networks[name];
    },
};
