describe('api', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should throw exception if config is not provided', () => {
        const API = require('../api').default;
        expect(() => new API()).toThrowError('Config is not provided');
    });

    it('should initialize API if everything is correct', () => {
        const createConnection = jest.fn().mockReturnValue({
            on: jest.fn(),
        });
        const createClient = jest.fn();

        jest.mock('thrift', () => ({
            createConnection,
            createClient,
        }));
        const API = require('../api').default;

        const api = new API({ host: 'localhost', port: '9000' });
        expect(createConnection).toBeCalled();
        expect(createClient).toBeCalled();
    });

    it('should provide raw client instance', () => {
        const callback = jest.fn();
        const createConnection = jest.fn().mockReturnValue({
            on: jest.fn(),
        });

        jest.mock('thrift', () => ({
            createConnection,
            createClient: () => {
                return 'TheClient';
            },
        }));

        const API = require('../api').default;

        const api = new API({ host: 'localhost', port: '9000' });
        expect(api.client()).toEqual('TheClient');
    });
});
