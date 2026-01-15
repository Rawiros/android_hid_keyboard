/**
 * Standard HID Modifiers bitmask
 */
export var HidModifier;
(function (HidModifier) {
    HidModifier[HidModifier["None"] = 0] = "None";
    HidModifier[HidModifier["LeftCtrl"] = 1] = "LeftCtrl";
    HidModifier[HidModifier["LeftShift"] = 2] = "LeftShift";
    HidModifier[HidModifier["LeftAlt"] = 4] = "LeftAlt";
    HidModifier[HidModifier["LeftGui"] = 8] = "LeftGui";
    HidModifier[HidModifier["RightCtrl"] = 16] = "RightCtrl";
    HidModifier[HidModifier["RightShift"] = 32] = "RightShift";
    HidModifier[HidModifier["RightAlt"] = 64] = "RightAlt";
    HidModifier[HidModifier["RightGui"] = 128] = "RightGui";
})(HidModifier || (HidModifier = {}));
/**
 * Common HID Keycodes (Usage IDs)
 */
export var HidKeyCode;
(function (HidKeyCode) {
    HidKeyCode[HidKeyCode["A"] = 4] = "A";
    HidKeyCode[HidKeyCode["D"] = 7] = "D";
    HidKeyCode[HidKeyCode["E"] = 8] = "E";
    HidKeyCode[HidKeyCode["H"] = 11] = "H";
    HidKeyCode[HidKeyCode["L"] = 15] = "L";
    HidKeyCode[HidKeyCode["O"] = 18] = "O";
    HidKeyCode[HidKeyCode["R"] = 21] = "R";
    HidKeyCode[HidKeyCode["Enter"] = 40] = "Enter";
    HidKeyCode[HidKeyCode["Key1"] = 30] = "Key1";
    HidKeyCode[HidKeyCode["Key2"] = 31] = "Key2";
    HidKeyCode[HidKeyCode["Key3"] = 32] = "Key3";
})(HidKeyCode || (HidKeyCode = {}));
