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
export declare const KeyMap: Map<string, HidKeyMapping>;
/**
 * Special control keys
 */
export declare const SpecialKeys: {
    readonly BACKSPACE: 42;
    readonly TAB: 43;
    readonly ENTER: 40;
    readonly ESCAPE: 41;
    readonly CAPS_LOCK: 57;
};
//# sourceMappingURL=keyMap.d.ts.map