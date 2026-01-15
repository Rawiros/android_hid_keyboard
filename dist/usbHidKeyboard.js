"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsbHidKeyboard = void 0;
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const types_js_1 = require("./types.js");
const setProp_js_1 = require("./utils/setProp.js");
const isRooted_js_1 = __importDefault(require("./utils/isRooted.js"));
const keyMap_js_1 = require("./utils/keyMap.js");
const sleep_js_1 = __importDefault(require("./utils/sleep.js"));
/**
 * HID Report Descriptor for a standard 6-key rollover keyboard
 */
const KEYBOARD_REPORT_DESCRIPTOR = Buffer.from([
    0x05, 0x01, 0x09, 0x06, 0xa1, 0x01, 0x05, 0x07, 0x19, 0xe0, 0x29, 0xe7, 0x15, 0x00, 0x25, 0x01,
    0x75, 0x01, 0x95, 0x08, 0x81, 0x02, 0x95, 0x01, 0x75, 0x08, 0x81, 0x03, 0x95, 0x05, 0x75, 0x01,
    0x05, 0x08, 0x19, 0x01, 0x29, 0x05, 0x91, 0x02, 0x95, 0x01, 0x75, 0x03, 0x91, 0x03, 0x95, 0x06,
    0x75, 0x08, 0x15, 0x00, 0x25, 0x65, 0x05, 0x07, 0x19, 0x00, 0x29, 0x65, 0x81, 0x00, 0xc0,
]);
/**
 * Shift modifier bit for HID reports
 */
const SHIFT_MODIFIER = 0x02;
/**
 * USB HID Keyboard implementation using ConfigFS on Android
 *
 * This class provides a complete interface for creating and managing
 * a USB HID keyboard gadget on rooted Android devices.
 */
class UsbHidKeyboard {
    config;
    gadgetPath;
    g1Path;
    isInitialized = false;
    detectedUdc = null;
    constructor(config) {
        this.config = config;
        this.g1Path = (0, node_path_1.join)(config.cfsPath, 'g1');
        this.gadgetPath = (0, node_path_1.join)(config.cfsPath, config.gadgetName);
    }
    ensureRooted() {
        if (!(0, isRooted_js_1.default)()) {
            throw new Error('Root access required. This library must run with elevated privileges on Android.');
        }
    }
    detectUDC() {
        if (this.detectedUdc) {
            return this.detectedUdc;
        }
        try {
            const udcDir = '/sys/class/udc';
            const entries = (0, node_fs_1.readdirSync)(udcDir);
            if (entries.length === 0) {
                throw new Error('No UDC found in /sys/class/udc');
            }
            this.detectedUdc = entries[0];
            return this.detectedUdc;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error('UDC directory not found at /sys/class/udc. Is ConfigFS mounted?');
            }
            throw error;
        }
    }
    getUdcName() {
        return this.config.udcName || this.detectUDC();
    }
    async unbindGadget() {
        try {
            await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'UDC'), '\n');
            await (0, sleep_js_1.default)(100);
        }
        catch {
        }
    }
    async bindGadget() {
        const udcName = this.getUdcName();
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'UDC'), `${udcName}\n`);
        await (0, sleep_js_1.default)(500);
    }
    async initialize() {
        this.ensureRooted();
        if (this.isInitialized) {
            await this.unbindGadget();
        }
        try {
            if ((0, node_fs_1.existsSync)((0, node_path_1.join)(this.gadgetPath, 'UDC'))) {
                await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'UDC'), '\n');
                await (0, sleep_js_1.default)(100);
            }
        }
        catch {
        }
        try {
            if ((0, node_fs_1.existsSync)(this.gadgetPath)) {
                const linkPath = (0, node_path_1.join)(this.gadgetPath, 'configs/c.1/hid.usb0');
                if ((0, node_fs_1.existsSync)(linkPath)) {
                    await (0, promises_1.unlink)(linkPath);
                }
                await (0, promises_1.rm)(this.gadgetPath, { recursive: true, force: true });
                await (0, sleep_js_1.default)(100);
            }
        }
        catch (error) {
        }
        await (0, setProp_js_1.setProp)('ctl.stop', 'adbd');
        try {
            await (0, promises_1.writeFile)((0, node_path_1.join)(this.g1Path, 'UDC'), '\n');
            await (0, sleep_js_1.default)(100);
        }
        catch {
        }
        await (0, promises_1.mkdir)((0, node_path_1.join)(this.gadgetPath, 'strings/0x409'), { recursive: true });
        await (0, promises_1.mkdir)((0, node_path_1.join)(this.gadgetPath, 'configs/c.1/strings/0x409'), { recursive: true });
        await (0, promises_1.mkdir)((0, node_path_1.join)(this.gadgetPath, 'functions/hid.usb0'), { recursive: true });
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'idVendor'), `${this.config.vendor.idVendor}\n`);
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'idProduct'), `${this.config.vendor.idProduct}\n`);
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'strings/0x409/serialnumber'), `${this.config.device.serialNumber}\n`);
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'strings/0x409/manufacturer'), `${this.config.device.manufacturer}\n`);
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'strings/0x409/product'), `${this.config.device.product}\n`);
        const funcPath = (0, node_path_1.join)(this.gadgetPath, 'functions/hid.usb0');
        await (0, promises_1.writeFile)((0, node_path_1.join)(funcPath, 'protocol'), '1\n');
        await (0, promises_1.writeFile)((0, node_path_1.join)(funcPath, 'subclass'), '1\n');
        await (0, promises_1.writeFile)((0, node_path_1.join)(funcPath, 'report_length'), '8\n');
        await (0, promises_1.writeFile)((0, node_path_1.join)(funcPath, 'report_desc'), KEYBOARD_REPORT_DESCRIPTOR);
        await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'configs/c.1/strings/0x409/configuration'), 'Config 1\n');
        const linkPath = (0, node_path_1.join)(this.gadgetPath, 'configs/c.1/hid.usb0');
        try {
            await (0, promises_1.symlink)(funcPath, linkPath);
        }
        catch {
        }
        await this.bindGadget();
        this.isInitialized = true;
    }
    async sendKey(modifier, keyCode) {
        if (!this.isInitialized) {
            throw new Error('Keyboard not initialized. Call initialize() first.');
        }
        const press = Buffer.alloc(8);
        press[0] = modifier;
        press[2] = keyCode;
        const release = Buffer.alloc(8);
        const handle = await (0, promises_1.open)(this.config.hidDevicePath, 'w');
        try {
            await handle.write(press, 0, 8);
            await handle.write(release, 0, 8);
        }
        finally {
            await handle.close();
        }
    }
    async sendString(text) {
        if (!this.isInitialized) {
            throw new Error('Keyboard not initialized. Call initialize() first.');
        }
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const mapping = keyMap_js_1.KeyMap.get(char);
            if (!mapping) {
                continue;
            }
            const modifier = mapping.needsShift ? SHIFT_MODIFIER : types_js_1.HidModifier.None;
            await this.sendKey(modifier, mapping.usageId);
        }
    }
    async sendEnter() {
        await this.sendKey(types_js_1.HidModifier.None, 0x28); // ENTER key
    }
    async setProduct(name) {
        this.config.device.product = name;
        if (this.isInitialized) {
            await this.unbindGadget();
            await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'strings/0x409/product'), `${name}\n`);
            await this.bindGadget();
        }
    }
    async setManufacturer(name) {
        this.config.device.manufacturer = name;
        if (this.isInitialized) {
            await this.unbindGadget();
            await (0, promises_1.writeFile)((0, node_path_1.join)(this.gadgetPath, 'strings/0x409/manufacturer'), `${name}\n`);
            await this.bindGadget();
        }
    }
    getInitialized() {
        return this.isInitialized;
    }
    getConfig() {
        return Object.freeze({ ...this.config });
    }
    async restore() {
        if (!this.isInitialized) {
            return;
        }
        const udcName = this.getUdcName();
        try {
            await this.unbindGadget();
            const linkPath = (0, node_path_1.join)(this.gadgetPath, 'configs/c.1/hid.usb0');
            try {
                await (0, promises_1.unlink)(linkPath);
            }
            catch {
            }
            try {
                await (0, promises_1.rm)(this.gadgetPath, { recursive: true, force: true });
            }
            catch (error) {
            }
            try {
                await (0, promises_1.writeFile)((0, node_path_1.join)(this.g1Path, 'UDC'), `${udcName}\n`);
            }
            catch {
            }
            await (0, setProp_js_1.setProp)('ctl.start', 'adbd');
        }
        catch (error) {
        }
        finally {
            this.isInitialized = false;
        }
    }
}
exports.UsbHidKeyboard = UsbHidKeyboard;
