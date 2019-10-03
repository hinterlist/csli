import compile, { concatArrays } from '../compile';

describe('commands', () => {
    describe('build', () => {
        describe('concatArrays', () => {
            it('should return concatinated result of two arrays', () => {
                const a = [1, 2];
                const b = [3, 4];
                const expected = new Uint8Array([1, 2, 3, 4]);

                expect(concatArrays(a, b)).toEqual(expected);
            });
        });

        describe('compile', () => {
            it('should throw error if failed to compile code', () => {
                const api = {
                    client: () => ({
                        SmartContractCompile: () => ({
                            status: {
                                code: -1,
                                message: 'Failed to compile',
                            },
                        }),
                    }),
                };

                expect(compile(api, '')).rejects.toEqual(
                    new Error('Failed to compile'),
                );
            });

            it('should return byte code of compiled contract', () => {
                const api = {
                    client: () => ({
                        SmartContractCompile: () => ({
                            status: {
                                code: 0,
                            },
                            byteCodeObjects: [
                                { byteCode: Buffer.from('h') },
                                { byteCode: Buffer.from('e') },
                                { byteCode: Buffer.from('l') },
                                { byteCode: Buffer.from('l') },
                                { byteCode: Buffer.from('o') },
                            ],
                        }),
                    }),
                };

                const bytes = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
                return expect(compile(api, '')).resolves.toEqual(bytes);
            });
        });
    });
});
