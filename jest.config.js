/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: "tsconfig-test.json"
        }
    },
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/test/util/setup.ts']
};
