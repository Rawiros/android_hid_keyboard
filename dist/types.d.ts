/**
 * USB Vendor/Product identification
 */
export interface UsbVendorConfig {
    /** USB Vendor ID (e.g., '0x1d6b') */
    idVendor: string;
    /** USB Product ID (e.g., '0x0104') */
    idProduct: string;
}
/**
 * USB Device strings
 */
export interface UsbDeviceStrings {
    /** Manufacturer string reported to the host */
    manufacturer: string;
    /** Product string reported to the host */
    product: string;
    /** Serial number reported to the host */
    serialNumber: string;
}
/**
 * Configuration options for the USB HID Gadget
 */
export interface HidKeyboardConfig {
    /** Root path for ConfigFS, usually /config/usb_gadget or /sys/kernel/config/usb_gadget */
    cfsPath: string;
    /** Name of the gadget directory to create */
    gadgetName: string;
    /** The USB Device Controller name (optional - will auto-detect if not provided) */
    udcName?: string;
    /** Path to the character device for HID reports */
    hidDevicePath: string;
    /** USB Vendor/Product identification */
    vendor: UsbVendorConfig;
    /** USB Device strings */
    device: UsbDeviceStrings;
}
/**
 * Standard HID Modifiers bitmask
 */
export declare enum HidModifier {
    None = 0,
    LeftCtrl = 1,
    LeftShift = 2,
    LeftAlt = 4,
    LeftGui = 8,// Windows/Command key
    RightCtrl = 16,
    RightShift = 32,
    RightAlt = 64,
    RightGui = 128
}
/**
 * Common HID Keycodes (Usage IDs)
 */
export declare enum HidKeyCode {
    A = 4,
    D = 7,
    E = 8,
    H = 11,
    L = 15,
    O = 18,
    R = 21,
    Enter = 40,
    Key1 = 30,
    Key2 = 31,
    Key3 = 32
}
//# sourceMappingURL=types.d.ts.map