/**
 * Android USB HID Keyboard Library
 * 
 * A complete TypeScript library for creating and managing USB HID keyboard
 * gadgets on rooted Android devices using ConfigFS.
 * 
 * @packageDocumentation
 */

export { UsbHidKeyboard } from './usbHidKeyboard.js';
export { 
  HidKeyboardConfig, 
  HidModifier, 
  HidKeyCode,
  UsbVendorConfig,
  UsbDeviceStrings
} from './types.js';
export { KeyMap, SpecialKeys } from './utils/keyMap.js';
export { default as isRooted } from './utils/isRooted.js';
export { default as sleep } from './utils/sleep.js';
