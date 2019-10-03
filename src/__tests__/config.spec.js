describe('config', () => {
    afterEach(() => {
        jest.resetModules();
    });

    it('should export whole config object as default', () => {
        const defaultConfig = { hello: 'world' };

        jest.mock('/config.js', () => ({ default: defaultConfig }), {
            virtual: true,
        });
        process.env.INIT_CWD = '';

        const config = require('../config').default;
        expect(config.all()).toEqual(defaultConfig);
    });

    it('should throw exception if provided network does not exists', () => {
        jest.mock('/config.js', () => ({}), { virtual: true });
        process.env.INIT_CWD = '';

        const config = require('../config').default;

        expect(() => {
            config.network('default');
        }).toThrowError(
            "Unable to find configuration section for specified network. Make sure that it's defined in your config file.",
        );
    });

    it('should return config for specified network', () => {
        const networkConfig = {
            networks: {
                prod: {
                    host: '127.0.0.1',
                },
                test: {
                    host: '127.0.0.2',
                },
            },
        };

        jest.mock('/config.js', () => ({ default: networkConfig }), {
            virtual: true,
        });
        process.env.INIT_CWD = '';

        const config = require('../config').default;
        expect(config.network('prod')).toEqual(networkConfig.networks.prod);
        expect(config.network('test')).toEqual(networkConfig.networks.test);
    });
});
