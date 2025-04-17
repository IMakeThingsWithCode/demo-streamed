"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdofool = void 0;
var shelljs_1 = require("shelljs");
// This class is what I'm using to emulate keypresses.
// If you're porting to different operating systems, this should probably be modified first.
var xdofool = /** @class */ (function () {
    function xdofool() {
    }
    xdofool.exec = function (command) {
        (0, shelljs_1.exec)(command);
    };
    xdofool.type = function (string) {
        this.exec("xdotool type '".concat(string.replaceAll("'", ''), "'"));
    };
    xdofool.enter = function () {
        this.exec('xdotool key KP_Enter');
    };
    xdofool.convert = function (config) {
        (0, shelljs_1.exec)("ffmpeg -framerate ".concat(config.framerate, " -i ").concat(config.recordDir).concat(config.stream.name, "%0").concat(config.framecounterDigits, "d.tga -c:v libx264 -pix_fmt yuv420p ").concat(config.recordDir).concat(config.stream.name, ".mp4"));
    };
    xdofool.screenshot = function (config) {
        (0, shelljs_1.exec)("scrot -Z 0 -u -q 100 ".concat(config.recordDir).concat(config.stream.name).concat('0'.toString().repeat(config.framecounterDigits - config.frameNumber.toString().length)).concat(config.frameNumber, ".tga"));
    };
    return xdofool;
}());
exports.xdofool = xdofool;
