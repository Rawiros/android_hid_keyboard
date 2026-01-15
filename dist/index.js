"use strict";
/**
 * Android USB HID Keyboard Library
 *
 * A complete TypeScript library for creating and managing USB HID keyboard
 * gadgets on rooted Android devices using ConfigFS.
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.isRooted = exports.SpecialKeys = exports.KeyMap = exports.HidKeyCode = exports.HidModifier = exports.UsbHidKeyboard = void 0;
var usbHidKeyboard_js_1 = require("./usbHidKeyboard.js");
Object.defineProperty(exports, "UsbHidKeyboard", { enumerable: true, get: function () { return usbHidKeyboard_js_1.UsbHidKeyboard; } });
var types_js_1 = require("./types.js");
Object.defineProperty(exports, "HidModifier", { enumerable: true, get: function () { return types_js_1.HidModifier; } });
Object.defineProperty(exports, "HidKeyCode", { enumerable: true, get: function () { return types_js_1.HidKeyCode; } });
var keyMap_js_1 = require("./utils/keyMap.js");
Object.defineProperty(exports, "KeyMap", { enumerable: true, get: function () { return keyMap_js_1.KeyMap; } });
Object.defineProperty(exports, "SpecialKeys", { enumerable: true, get: function () { return keyMap_js_1.SpecialKeys; } });
var isRooted_js_1 = require("./utils/isRooted.js");
Object.defineProperty(exports, "isRooted", { enumerable: true, get: function () { return __importDefault(isRooted_js_1).default; } });
var sleep_js_1 = require("./utils/sleep.js");
Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return __importDefault(sleep_js_1).default; } });
