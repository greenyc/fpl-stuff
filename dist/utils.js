"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nChooseK = exports.logTime = exports.log = void 0;
const log = (message) => {
    console.log(message);
};
exports.log = log;
const logTime = (type) => {
    if (type === "start")
        console.time();
    if (type === "end")
        console.timeEnd();
};
exports.logTime = logTime;
// Type this properly using generics
const nChooseK = (arr, k, prefix = []) => {
    if (k == 0)
        return [prefix];
    return arr.flatMap((v, i) => (0, exports.nChooseK)(arr.slice(i + 1), k - 1, [...prefix, v]));
};
exports.nChooseK = nChooseK;
//# sourceMappingURL=utils.js.map