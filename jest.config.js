module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
    moduleDirectories: ['node_modules', 'src'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
