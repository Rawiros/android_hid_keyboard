import { HidKeyboardConfig, HidModifier } from './types.js';
/**
 * USB HID Keyboard implementation using ConfigFS on Android
 *
 * This class provides a complete interface for creating and managing
 * a USB HID keyboard gadget on rooted Android devices.
 */
export declare class UsbHidKeyboard {
    private config;
    private readonly gadgetPath;
    private readonly g1Path;
    private isInitialized;
    private detectedUdc;
    constructor(config: HidKeyboardConfig);
    private ensureRooted;
    private detectUDC;
    private getUdcName;
    private unbindGadget;
    private bindGadget;
    initialize(): Promise<void>;
    sendKey(modifier: HidModifier, keyCode: number): Promise<void>;
    sendString(text: string): Promise<void>;
    sendEnter(): Promise<void>;
    setProduct(name: string): Promise<void>;
    setManufacturer(name: string): Promise<void>;
    getInitialized(): boolean;
    getConfig(): Readonly<HidKeyboardConfig>;
    restore(): Promise<void>;
}
//# sourceMappingURL=usbHidKeyboard.d.ts.map