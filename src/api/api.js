/**
 * Thin layer between thrift based API and own helpers
 */
import thrift from 'thrift';
import chalk from 'chalk';

import { APIClient } from './thrift';

class API {
    /**
     * Crates a new API instance
     *
     * @param {Object} config - Network configuration
     */
    constructor(config) {
        if (!config) {
            throw new Error('Config is not provided');
        }

        this._config = config;

        const connection = thrift.createConnection(config.host, config.port, {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TBinaryProtocol,
        });

        connection.on('error', error => {
            console.log(chalk.red('API connection error'), error);
        });

        this._client = thrift.createClient(APIClient, connection);
    }

    /**
     * Returns raw thrift client
     */
    client() {
        return this._client;
    }
}

export default API;
