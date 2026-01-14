import { readdirSync, existsSync } from 'node:fs';
import { writeFile, mkdir, symlink, open, rm, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { HidKeyboardConfig, HidModifier } from './types.js';
import { setProp } from './utils/setProp.js';
import isRooted from './utils/isRooted.js';
import { KeyMap } from './utils/keyMap.js';
import sleep from './utils/sleep.js';

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
export class UsbHidKeyboard {
    private readonly gadgetPath: string;
    private readonly g1Path: string;
    private isInitialized: boolean = false;
    private detectedUdc: string | null = null;

    constructor(private config: HidKeyboardConfig) {
        this.g1Path = join(config.cfsPath, 'g1');
        this.gadgetPath = join(config.cfsPath, config.gadgetName);
    }

    private ensureRooted(): void {
        if (!isRooted()) {
            throw new Error(
                'Root access required. This library must run with elevated privileges on Android.'
            );
        }
    }

    private detectUDC(): string {
        if (this.detectedUdc) {
            return this.detectedUdc;
        }

        try {
            const udcDir = '/sys/class/udc';
            const entries = readdirSync(udcDir);

            if (entries.length === 0) {
                throw new Error('No UDC found in /sys/class/udc');
            }

            this.detectedUdc = entries[0];
            return this.detectedUdc;
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                throw new Error('UDC directory not found at /sys/class/udc. Is ConfigFS mounted?');
            }

            throw error;
        }
    }

    private getUdcName(): string {
        return this.config.udcName || this.detectUDC();
    }

    private async unbindGadget(): Promise<void> {
        try {
            await writeFile(join(this.gadgetPath, 'UDC'), '\n');
            await sleep(100);
        } catch {
        }
    }

    private async bindGadget(): Promise<void> {
        const udcName = this.getUdcName();
        await writeFile(join(this.gadgetPath, 'UDC'), `${udcName}\n`);
        await sleep(500);
    }

    async initialize(): Promise<void> {
        this.ensureRooted();

        if (this.isInitialized) {
            await this.unbindGadget();
        }

        try {
            if (existsSync(join(this.gadgetPath, 'UDC'))) {
                await writeFile(join(this.gadgetPath, 'UDC'), '\n');
                await sleep(100);
            }
        } catch {
        }

        try {
            if (existsSync(this.gadgetPath)) {
                const linkPath = join(this.gadgetPath, 'configs/c.1/hid.usb0');
                if (existsSync(linkPath)) {
                    await unlink(linkPath);
                }
                await rm(this.gadgetPath, { recursive: true, force: true });
                await sleep(100);
            }
        } catch (error) {
        }

        await setProp('ctl.stop', 'adbd');

        try {
            await writeFile(join(this.g1Path, 'UDC'), '\n');
            await sleep(100);
        } catch {
        }

        await mkdir(join(this.gadgetPath, 'strings/0x409'), { recursive: true });
        await mkdir(join(this.gadgetPath, 'configs/c.1/strings/0x409'), { recursive: true });
        await mkdir(join(this.gadgetPath, 'functions/hid.usb0'), { recursive: true });

        await writeFile(join(this.gadgetPath, 'idVendor'), `${this.config.vendor.idVendor}\n`);
        await writeFile(join(this.gadgetPath, 'idProduct'), `${this.config.vendor.idProduct}\n`);
        await writeFile(join(this.gadgetPath, 'strings/0x409/serialnumber'), `${this.config.device.serialNumber}\n`);
        await writeFile(join(this.gadgetPath, 'strings/0x409/manufacturer'), `${this.config.device.manufacturer}\n`);
        await writeFile(join(this.gadgetPath, 'strings/0x409/product'), `${this.config.device.product}\n`);

        const funcPath = join(this.gadgetPath, 'functions/hid.usb0');
        await writeFile(join(funcPath, 'protocol'), '1\n');
        await writeFile(join(funcPath, 'subclass'), '1\n');
        await writeFile(join(funcPath, 'report_length'), '8\n');
        await writeFile(join(funcPath, 'report_desc'), KEYBOARD_REPORT_DESCRIPTOR);

        await writeFile(join(this.gadgetPath, 'configs/c.1/strings/0x409/configuration'), 'Config 1\n');

        const linkPath = join(this.gadgetPath, 'configs/c.1/hid.usb0');
        try {
            await symlink(funcPath, linkPath);
        } catch {
        }

        await this.bindGadget();
        this.isInitialized = true;
    }

    async sendKey(modifier: HidModifier, keyCode: number): Promise<void> {
        if (!this.isInitialized) {
            throw new Error('Keyboard not initialized. Call initialize() first.');
        }

        const press = Buffer.alloc(8);
        press[0] = modifier;
        press[2] = keyCode;

        const release = Buffer.alloc(8);

        const handle = await open(this.config.hidDevicePath, 'w');
        try {
            await handle.write(press, 0, 8);
            await handle.write(release, 0, 8);
        } finally {
            await handle.close();
        }
    }

    async sendString(text: string): Promise<void> {
        if (!this.isInitialized) {
            throw new Error('Keyboard not initialized. Call initialize() first.');
        }


        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const mapping = KeyMap.get(char);

            if (!mapping) {
                continue;
            }

            const modifier = mapping.needsShift ? SHIFT_MODIFIER : HidModifier.None;
            await this.sendKey(modifier, mapping.usageId);
        }

    }

    async sendEnter(): Promise<void> {
        await this.sendKey(HidModifier.None, 0x28); // ENTER key
    }

    async setProduct(name: string): Promise<void> {
        this.config.device.product = name;

        if (this.isInitialized) {
            await this.unbindGadget();
            await writeFile(join(this.gadgetPath, 'strings/0x409/product'), `${name}\n`);
            await this.bindGadget();
        }
    }

    async setManufacturer(name: string): Promise<void> {
        this.config.device.manufacturer = name;

        if (this.isInitialized) {
            await this.unbindGadget();
            await writeFile(join(this.gadgetPath, 'strings/0x409/manufacturer'), `${name}\n`);
            await this.bindGadget();
        }
    }

    getInitialized(): boolean {
        return this.isInitialized;
    }

    getConfig(): Readonly<HidKeyboardConfig> {
        return Object.freeze({ ...this.config });
    }

    async restore(): Promise<void> {
        if (!this.isInitialized) {
            return;
        }

        const udcName = this.getUdcName();

        try {
            await this.unbindGadget();

            const linkPath = join(this.gadgetPath, 'configs/c.1/hid.usb0');
            try {
                await unlink(linkPath);
            } catch {
            }

            try {
                await rm(this.gadgetPath, { recursive: true, force: true });
            } catch (error) {
            }

            try {
                await writeFile(join(this.g1Path, 'UDC'), `${udcName}\n`);
            } catch {
            }

            await setProp('ctl.start', 'adbd');
        } catch (error) {
        } finally {
            this.isInitialized = false;
        }
    }
}
