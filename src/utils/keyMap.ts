/**
 * HID Key mapping: character -> [Usage ID, needsShift]
 */
export interface HidKeyMapping {
    usageId: number;
    needsShift: boolean;
}

/**
 * Complete HID Usage ID to character mapping
 */
export const KeyMap = new Map<string, HidKeyMapping>([
    // Lowercase letters (a-z: 0x04-0x1d)
    ['a', { usageId: 0x04, needsShift: false }],
    ['b', { usageId: 0x05, needsShift: false }],
    ['c', { usageId: 0x06, needsShift: false }],
    ['d', { usageId: 0x07, needsShift: false }],
    ['e', { usageId: 0x08, needsShift: false }],
    ['f', { usageId: 0x09, needsShift: false }],
    ['g', { usageId: 0x0a, needsShift: false }],
    ['h', { usageId: 0x0b, needsShift: false }],
    ['i', { usageId: 0x0c, needsShift: false }],
    ['j', { usageId: 0x0d, needsShift: false }],
    ['k', { usageId: 0x0e, needsShift: false }],
    ['l', { usageId: 0x0f, needsShift: false }],
    ['m', { usageId: 0x10, needsShift: false }],
    ['n', { usageId: 0x11, needsShift: false }],
    ['o', { usageId: 0x12, needsShift: false }],
    ['p', { usageId: 0x13, needsShift: false }],
    ['q', { usageId: 0x14, needsShift: false }],
    ['r', { usageId: 0x15, needsShift: false }],
    ['s', { usageId: 0x16, needsShift: false }],
    ['t', { usageId: 0x17, needsShift: false }],
    ['u', { usageId: 0x18, needsShift: false }],
    ['v', { usageId: 0x19, needsShift: false }],
    ['w', { usageId: 0x1a, needsShift: false }],
    ['x', { usageId: 0x1b, needsShift: false }],
    ['y', { usageId: 0x1c, needsShift: false }],
    ['z', { usageId: 0x1d, needsShift: false }],

    // Uppercase letters (same usage IDs, with shift)
    ['A', { usageId: 0x04, needsShift: true }],
    ['B', { usageId: 0x05, needsShift: true }],
    ['C', { usageId: 0x06, needsShift: true }],
    ['D', { usageId: 0x07, needsShift: true }],
    ['E', { usageId: 0x08, needsShift: true }],
    ['F', { usageId: 0x09, needsShift: true }],
    ['G', { usageId: 0x0a, needsShift: true }],
    ['H', { usageId: 0x0b, needsShift: true }],
    ['I', { usageId: 0x0c, needsShift: true }],
    ['J', { usageId: 0x0d, needsShift: true }],
    ['K', { usageId: 0x0e, needsShift: true }],
    ['L', { usageId: 0x0f, needsShift: true }],
    ['M', { usageId: 0x10, needsShift: true }],
    ['N', { usageId: 0x11, needsShift: true }],
    ['O', { usageId: 0x12, needsShift: true }],
    ['P', { usageId: 0x13, needsShift: true }],
    ['Q', { usageId: 0x14, needsShift: true }],
    ['R', { usageId: 0x15, needsShift: true }],
    ['S', { usageId: 0x16, needsShift: true }],
    ['T', { usageId: 0x17, needsShift: true }],
    ['U', { usageId: 0x18, needsShift: true }],
    ['V', { usageId: 0x19, needsShift: true }],
    ['W', { usageId: 0x1a, needsShift: true }],
    ['X', { usageId: 0x1b, needsShift: true }],
    ['Y', { usageId: 0x1c, needsShift: true }],
    ['Z', { usageId: 0x1d, needsShift: true }],

    // Numbers (1-9: 0x1e-0x26, 0: 0x27)
    ['1', { usageId: 0x1e, needsShift: false }],
    ['2', { usageId: 0x1f, needsShift: false }],
    ['3', { usageId: 0x20, needsShift: false }],
    ['4', { usageId: 0x21, needsShift: false }],
    ['5', { usageId: 0x22, needsShift: false }],
    ['6', { usageId: 0x23, needsShift: false }],
    ['7', { usageId: 0x24, needsShift: false }],
    ['8', { usageId: 0x25, needsShift: false }],
    ['9', { usageId: 0x26, needsShift: false }],
    ['0', { usageId: 0x27, needsShift: false }],

    // Special characters (with Shift)
    ['!', { usageId: 0x1e, needsShift: true }], // Shift+1
    ['@', { usageId: 0x1f, needsShift: true }], // Shift+2
    ['#', { usageId: 0x20, needsShift: true }], // Shift+3
    ['$', { usageId: 0x21, needsShift: true }], // Shift+4
    ['%', { usageId: 0x22, needsShift: true }], // Shift+5
    ['^', { usageId: 0x23, needsShift: true }], // Shift+6
    ['&', { usageId: 0x24, needsShift: true }], // Shift+7
    ['*', { usageId: 0x25, needsShift: true }], // Shift+8
    ['(', { usageId: 0x26, needsShift: true }], // Shift+9
    [')', { usageId: 0x27, needsShift: true }], // Shift+0

    // Base symbols (without Shift)
    [' ', { usageId: 0x2c, needsShift: false }], // Space
    ['\n', { usageId: 0x28, needsShift: false }], // Enter
    ['\r', { usageId: 0x28, needsShift: false }], // Enter (CR)
    ['\t', { usageId: 0x2b, needsShift: false }], // Tab
    ['-', { usageId: 0x2d, needsShift: false }],
    ['=', { usageId: 0x2e, needsShift: false }],
    ['[', { usageId: 0x2f, needsShift: false }],
    [']', { usageId: 0x30, needsShift: false }],
    ['\\', { usageId: 0x31, needsShift: false }],
    [';', { usageId: 0x33, needsShift: false }],
    ["'", { usageId: 0x34, needsShift: false }],
    ['`', { usageId: 0x35, needsShift: false }],
    [',', { usageId: 0x36, needsShift: false }],
    ['.', { usageId: 0x37, needsShift: false }],
    ['/', { usageId: 0x38, needsShift: false }],

    // Shifted symbols
    ['_', { usageId: 0x2d, needsShift: true }], // Shift+-
    ['+', { usageId: 0x2e, needsShift: true }], // Shift+=
    ['{', { usageId: 0x2f, needsShift: true }], // Shift+[
    ['}', { usageId: 0x30, needsShift: true }], // Shift+]
    ['|', { usageId: 0x31, needsShift: true }], // Shift+\
    [':', { usageId: 0x33, needsShift: true }], // Shift+;
    ['"', { usageId: 0x34, needsShift: true }], // Shift+'
    ['~', { usageId: 0x35, needsShift: true }], // Shift+`
    ['<', { usageId: 0x36, needsShift: true }], // Shift+,
    ['>', { usageId: 0x37, needsShift: true }], // Shift+.
    ['?', { usageId: 0x38, needsShift: true }], // Shift+/
]);

/**
 * Special control keys
 */
export const SpecialKeys = {
    BACKSPACE: 0x2a,
    TAB: 0x2b,
    ENTER: 0x28,
    ESCAPE: 0x29,
    CAPS_LOCK: 0x39,
} as const;
