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
export enum HidModifier {
  None = 0,
  LeftCtrl = 1 << 0,
  LeftShift = 1 << 1,
  LeftAlt = 1 << 2,
  LeftGui = 1 << 3, // Windows/Command key
  RightCtrl = 1 << 4,
  RightShift = 1 << 5,
  RightAlt = 1 << 6,
  RightGui = 1 << 7,
}

/**
 * Common HID Keycodes (Usage IDs)
 */
export enum HidKeyCode {
  A = 0x04,
  D = 0x07,
  E = 0x08,
  H = 0x0b,
  L = 0x0f,
  O = 0x12,
  R = 0x15,
  Enter = 0x28,
  Key1 = 0x1e,
  Key2 = 0x1f,
  Key3 = 0x20,
}
