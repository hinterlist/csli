describe('commands', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.resetModules();
        console.log.mockClear();
    });

    afterAll(() => {
        console.log.mockRestore();
    });

    describe('deploy', () => {
        it('it should return error if migrations folder does not exists', () => {
            jest.mock('fs', () => ({
                existsSync: () => false,
            }));

            jest.mock('../../../config', () => jest.fn());

            const { handler } = require('../command');
            handler();
            expect(global.console.log).toBeCalledWith(
                "Can't find migrations folder, make sure you are in root folder of your project.",
            );
        });

        it('should read each file and find those that were not executed before', () => {
            const readFileSync = jest.fn();

            jest.mock('fs', () => ({
                existsSync: () => true,
                readdirSync: () => ['1_item', '2_item', '3_item'],
                readFileSync,
            }));

            const item1Fn = jest.fn();
            jest.mock('/migrations/1_item', () => item1Fn, { virtual: true });

            const item2Fn = jest.fn();
            jest.mock('/migrations/2_item', () => item2Fn, { virtual: true });

            const item3Fn = jest.fn();
            jest.mock('/migrations/3_item', () => item3Fn, { virtual: true });

            const setLatestMigrationVersion = jest.fn();
            const api = {
                getLastMigrationVersion: () => 1,
                setLatestMigrationVersion,
            };

            process.env.INIT_CWD = '';

            const { handler } = require('../command');

            jest.mock();
            handler(api);

            expect(item1Fn).not.toBeCalled();
            expect(item2Fn).toBeCalled();
            expect(item3Fn).toBeCalled();

            expect(setLatestMigrationVersion).toBeCalledWith(2);
            expect(setLatestMigrationVersion).toBeCalledWith(3);
        });
    });
});
