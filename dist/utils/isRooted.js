"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRooted() {
    return (process.platform === 'android' &&
        process.getuid && process.getuid() === 0);
}
exports.default = isRooted;
