import { config } from './config.mjs'
import { commands } from './commands.mjs'
import { xdofool } from './xdofool.mjs'
import { consoleTools } from './console.mjs'

function recordFrame() {
    xdofool.type(config.pauseRebind) // Pause demo
    if (frameNumber > config.framerate * config.seconds) { // If recording done
        // Pause the demo, leave console opening to let user know it's done
        consoleTools.openConsole()
        xdofool.type('demo_pause')
        xdofool.enter()

        // Convert each streams' collection of screenshots to a video
        for (const stream of commands.streams) {
            xdofool.convert({
                framerate: config.framerate,
                recordDir: config.recordDir,
                framecounterDigits: config.framecounterDigits,
                stream: stream
            })
        }
    } else { // If recording still in progress
        // For each stream
        for (const stream of commands.streams) {
            // Run commands for stream by pressing bind/typing them out
            if (stream.isBind) {
                xdofool.type(stream.bind)
            } else {
                consoleTools.sendMultipleCommands(stream.commands)
            }

            // Take screenshot
            xdofool.screenshot({
                frameNumber: frameNumber,
                recordDir: config.recordDir,
                framecounterDigits: config.framecounterDigits,
                stream: stream
            })
        }

        console.log(`Frame ${frameNumber}/${config.framerate * config.seconds} done`)

        // Add to counter
        frameNumber++;

        // Call next frame render and resume demo
        setTimeout(recordFrame, config.frametime) 
        xdofool.type(config.resumeRebind)
    }
}

let frameNumber = 0;
setTimeout(() => {
    // Run init commands
    consoleTools.sendMultipleCommands(commands.initialCommands)

    // For each stream, set binds
    for (const stream of commands.streams) {
        if (stream.isBind) {
            consoleTools.sendSingleCommand(`bind ${stream.bind} "${stream.commands.join(';')}"`)
        }
    }

    // Play demo
    consoleTools.openConsole()
    xdofool.type('demo_resume; hideconsole');
    xdofool.enter()

    // Call initial frame render
    setTimeout(recordFrame, config.frametime)
}, config.initialTimeout)

console.log(`Recorder initialized. Keypresses starting in ${config.initialTimeout} ms.`)