import { reduce } from 'lodash';

/**
 * Concatinate two arrays and return result
 *
 * @param {Array} a - First array
 * @param {Array} b - Second array
 */
export const concatArrays = (a, b) => {
    const result = new Uint8Array(a.length + b.length);

    result.set(a, 0);
    result.set(b, a.length);

    return result;
};

/**
 * Compiles provided source code of smart contract and returns bytcode
 *
 * @param {Object} api  - An API instance
 * @param {String} code - Smart contract source code
 */
const compile = async (api, code) => {
    const byteCode = await api.client().SmartContractCompile(code);

    // Status: Success
    if (byteCode.status.code === 0) {
        return reduce(
            byteCode.byteCodeObjects,
            (result, current) => {
                return concatArrays(result, Uint8Array.from(current.byteCode));
            },
            [],
        );
    }
    // Status: Not-Success
    else {
        throw new Error(byteCode.status.message);
    }
};

export default compile;
