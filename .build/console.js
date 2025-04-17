"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleTools = void 0;
var xdofool_1 = require("./xdofool");
var consoleTools = /** @class */ (function () {
    function consoleTools() {
    }
    consoleTools.openConsole = function () {
        xdofool_1.xdofool.type('=');
    };
    consoleTools.closeConsole = function () {
        xdofool_1.xdofool.type('hideconsole');
        xdofool_1.xdofool.enter();
    };
    consoleTools.sendSingleCommand = function (command) {
        this.openConsole();
        xdofool_1.xdofool.type(command);
        xdofool_1.xdofool.enter();
        this.closeConsole();
    };
    consoleTools.sendMultipleCommands = function (commands) {
        this.openConsole();
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            xdofool_1.xdofool.type(command);
            xdofool_1.xdofool.enter();
        }
        this.closeConsole();
    };
    return consoleTools;
}());
exports.consoleTools = consoleTools;
