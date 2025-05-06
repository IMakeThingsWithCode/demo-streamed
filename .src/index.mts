import { config, recorderConfiguration } from './config.mjs'
import { commands, recorderCommands, stream } from './commands.mjs'
import { terminal } from './terminal.mjs'
import { consoleTools } from './console.mjs'

export interface frameInfo {
    /** The current frame number */
    frameNumber: number,
    /** The current stream */
    currentStream: stream,
    /** The recorder configuration */
    config: recorderConfiguration,
    /** The recorder's commands */
    commands: recorderCommands
}

function recordFrame() {
    terminal.type(config.pauseRebind) // Pause demo
    if (frameNumber > config.framerate * config.seconds) { // If recording done
        // Pause the demo, leave console open to let user know it's done
        consoleTools.openConsole()
        terminal.type('demo_pause')
        terminal.enter()

        // Convert each streams' collection of screenshots to a video
        for (const stream of commands.streams) {
            terminal.convert({
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
                terminal.type(stream.bind)
            } else {
                let localCommands: string[] = [];
                for(const element of stream.commands) {
                    if(typeof element === 'function') {
                        localCommands.push(element({
                            frameNumber: frameNumber,
                            currentStream: stream,
                            config: config,
                            commands: commands
                        }))
                    } else {
                        localCommands.push(element)
                    }
                }
                consoleTools.sendMultipleCommands(localCommands)
            }

            // Take screenshot
            terminal.screenshot({
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
        terminal.type(config.resumeRebind)
    }
}

/** The current frame index */
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
    terminal.type('demo_resume; hideconsole');
    terminal.enter()

    // Call initial frame render
    setTimeout(recordFrame, config.frametime)
}, config.initialTimeout)

console.log(`Recorder initialized. Keypresses starting in ${config.initialTimeout} ms.`)