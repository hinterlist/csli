// Scielence console log
global.console = { log: () => {} };

describe('commands', () => {
    describe('init', () => {
        beforeEach(() => {
            jest.resetModules();
        });

        it('should return false if destination folder is not empty', async () => {
            jest.mock('fs', () => ({
                readdirSync: () => {
                    return ['file1', 'file2'];
                },
            }));
            const { handler } = require('../command');

            const result = await handler();
            expect(result).toBeFalsy();
        });

        it('should init project structure and return true', async () => {
            const mkdirSync = jest.fn();
            const copyFileSync = jest.fn();

            jest.mock('fs', () => ({
                readdirSync: () => {
                    return [];
                },
                mkdirSync,
                copyFileSync,
            }));
            const { handler } = require('../command');

            const result = await handler();
            expect(result).toBeTruthy();
            expect(mkdirSync).toBeCalled();
            expect(copyFileSync).toBeCalled();
        });
    });
});
