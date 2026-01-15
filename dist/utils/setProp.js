"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProp = setProp;
const node_util_1 = require("node:util");
const node_child_process_1 = require("node:child_process");
const execAsync = (0, node_util_1.promisify)(node_child_process_1.exec);
async function setProp(name, value) {
    await execAsync(`/system/bin/setprop ${name} ${value}`);
}
