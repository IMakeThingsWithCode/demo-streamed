"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var commands_1 = require("./commands");
var xdofool_1 = require("./xdofool");
var console_1 = require("./console");
function recordFrame() {
    xdofool_1.xdofool.type(config_1.config.pauseRebind); // Pause demo
    if (frameNumber > config_1.config.framerate * config_1.config.seconds) { // If recording done
        // Pause the demo, leave console opening to let user know it's done
        console_1.consoleTools.openConsole();
        xdofool_1.xdofool.type('demo_pause');
        xdofool_1.xdofool.enter();
        // Convert each streams' collection of screenshots to a video
        for (var _i = 0, _a = commands_1.commands.streams; _i < _a.length; _i++) {
            var stream = _a[_i];
            xdofool_1.xdofool.convert({
                framerate: config_1.config.framerate,
                recordDir: config_1.config.recordDir,
                framecounterDigits: config_1.config.framecounterDigits,
                stream: stream
            });
        }
    }
    else { // If recording still in progress
        // For each stream
        for (var _b = 0, _c = commands_1.commands.streams; _b < _c.length; _b++) {
            var stream = _c[_b];
            // Run commands for stream by pressing bind/typing them out
            if (stream.isBind) {
                xdofool_1.xdofool.type(stream.bind);
            }
            else {
                console_1.consoleTools.sendMultipleCommands(stream.commands);
            }
            // Take screenshot
            xdofool_1.xdofool.screenshot({
                frameNumber: frameNumber,
                recordDir: config_1.config.recordDir,
                framecounterDigits: config_1.config.framecounterDigits,
                stream: stream
            });
        }
        console.log("Frame ".concat(frameNumber, "/").concat(config_1.config.framerate * config_1.config.seconds, " done"));
        // Add to counter
        frameNumber++;
        // Call next frame render and resume demo
        setTimeout(recordFrame, config_1.config.frametime);
        xdofool_1.xdofool.type(config_1.config.resumeRebind);
    }
}
var frameNumber = 0;
setTimeout(function () {
    // Run init commands
    console_1.consoleTools.sendMultipleCommands(commands_1.commands.initialCommands);
    // For each stream, set binds
    for (var _i = 0, _a = commands_1.commands.streams; _i < _a.length; _i++) {
        var stream = _a[_i];
        if (stream.isBind) {
            console_1.consoleTools.sendSingleCommand("bind ".concat(stream.bind, " \"").concat(stream.commands.join(';'), "\""));
        }
    }
    // Play demo
    console_1.consoleTools.openConsole();
    xdofool_1.xdofool.type('demo_resume; hideconsole');
    xdofool_1.xdofool.enter();
    // Call initial frame render
    setTimeout(recordFrame, config_1.config.frametime);
}, config_1.config.initialTimeout);
console.log("Recorder initialized. Keypresses starting in ".concat(config_1.config.initialTimeout, " ms."));
