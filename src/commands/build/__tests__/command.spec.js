// Disable console logging
global.console = { log: () => {} };

describe('commands', () => {
    describe('build', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        it('it should create build folder if it does not exist', () => {
            jest.mock('../../../config', () => jest.fn());

            const mkdirSync = jest.fn();
            const existsSync = jest
                .fn()
                .mockImplementationOnce(() => {
                    return false;
                })
                .mockImplementationOnce(() => {
                    return true;
                });

            jest.mock('fs', () => ({
                existsSync,
                mkdirSync,
                readdirSync: () => [],
            }));

            process.env.INIT_CWD = '';

            const { handler } = require('../command');
            handler();
            expect(mkdirSync).toBeCalledWith('/build');
        });

        it('should return if contracts folder does not exists', () => {
            const mkdirSync = jest.fn();
            const existsSync = jest
                .fn()
                .mockImplementationOnce(() => {
                    return true;
                })
                .mockImplementationOnce(() => {
                    return false;
                });

            jest.mock('fs', () => ({
                existsSync,
                mkdirSync,
            }));

            process.env.INIT_CWD = '';

            const { handler } = require('../command');
            return expect(handler()).resolves.toBeFalsy();
        });

        it('should compile contracts and save in build folder', async () => {
            expect.assertions(3);

            const writeFileSync = jest.fn();
            const readFileSync = jest.fn().mockImplementationOnce(() => {
                return 'hello';
            });

            jest.mock('fs', () => ({
                existsSync: () => true,
                readdirSync: () => ['file1.java', 'file2'],
                readFileSync,
                writeFileSync,
            }));

            jest.mock('../../../config', () => jest.fn());

            const bytes = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
            jest.mock('../compile', () => () => bytes);

            process.env.INIT_CWD = '';

            const { handler } = require('../command');
            await handler();

            expect(readFileSync).toBeCalledWith('/contracts/file1.java');
            expect(writeFileSync).toBeCalledWith('/build/file1', bytes);

            expect(readFileSync).not.toBeCalledWith('/contracts/file2');
        });
    });
});
