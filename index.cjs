// Original version
// No longer maintaned, may work

const sh = require('shelljs');

class xdofool {
    static exec(command) {
        sh.exec(command)
    }
    static type(string) {
        this.exec(`xdotool type '${string.replaceAll("'", '')}'`)
    }
    static enter() {
        this.exec('xdotool key KP_Enter')
    }
}

let config = {
    'framerate': 60,
    'frametime': 500,
    'initialTimeout': 5000,
    'catchUpTime': 0,
    'recordDir': '$HOME/Videos/streams/test/',
    'seconds': 4,
    'pauseRebind': 'k',
    'resumeRebind': 'l',
    'framecounterDigits': 6
}

const commands = {
    'initialCommands': [
        `bind ${config.resumeRebind} "demo_timescale ${((1000 / config.frametime) / (config.framerate)).toFixed(12)}"`,
        `bind ${config.pauseRebind} "demo_timescale 0"`,
        `demo_timescale ${((1000 / config.frametime) / (config.framerate)).toFixed(12)}`,
        'host_framerate 0',
        'cl_draw_only_deathnotices 1',
        'spec_show_xray 0',
        'crosshair 0',
        'cam_snapto 1',
        'r_show_build_info 0'
    ],
    'streams': [
        {
            'name': 'no_player',
            'bind': '[',
            'isBind': true,
            'commands': [
                'r_csgo_render_dynamic_objects 0',
                'mat_fullbright 1',
                'r_drawworld 1',
                'r_drawskybox 1',
                'sc_disable_world_materials 1',
                'sc_setclassflags Default -4',
                'r_drawviewmodel 0',
                'cl_drawhud 0',
                'r_csgo_render_decals 0',
                'r_drawparticles 1'
            ]
        },
        {
            'name': 'fullbright',
            'bind': ']',
            'isBind': true,
            'commands': [
                'r_csgo_render_dynamic_objects 1',
                'mat_fullbright 1',
                'sc_disable_world_materials 1',
                'sc_setclassflags Default -4',
                'r_drawviewmodel 0',
                'cl_drawhud 0',
                'r_csgo_render_decals 0'
            ]
        },
        {
            'name': 'normal',
            'isBind': true,
            'bind': '/',
            'commands': [
                'r_csgo_render_dynamic_objects 1',
                'mat_fullbright 0',
                'sc_disable_world_materials 0',
                'sc_setclassflags Default 0',
                'r_drawviewmodel 0',
                'cl_drawhud 1',
                'r_csgo_render_decals 1'
            ]
        },
        {
            'name': 'noview_nofeed',
            'isBind': true,
            'bind': 'v',
            'commands': [
                'r_drawviewmodel 0',
                'cl_drawhud 0'
            ]
        }
    ]
}

function openConsole() {
    xdofool.type('=')
}
function closeConsole() {
    xdofool.type('hideconsole')
    xdofool.enter()
}
function sendSingleCommand(command) {
    openConsole()
    xdofool.type(command)
    xdofool.enter()
    closeConsole()
}
function sendMultipleCommands(commands) {
    openConsole()
    for (let command of commands) {
        xdofool.type(command)
        xdofool.enter()
    }
    closeConsole()
}

function recordFrame() {
    xdofool.type(config.pauseRebind) // Pause demo
    if (frameNumber > config.framerate * config.seconds) {
        openConsole()
        xdofool.type('demo_pause')
        xdofool.enter()

        for (const stream of commands.streams) {
            sh.exec(`ffmpeg -framerate ${config.framerate} -i ${config.recordDir}${stream.name}%0${config.framecounterDigits}d.tga -c:v libx264 -pix_fmt yuv420p ${config.recordDir}${stream.name}.mp4`)
        }
    } else {
        setTimeout(() => {
            for (const stream of commands.streams) {
                // Run commands for stream by pressing bind
                if (stream.isBind) {
                    if (stream.bind != '') {
                        xdofool.type(stream.bind)
                    }
                } else {
                    sendMultipleCommands(stream.commands)
                }


                // Take screenshot
                sh.exec(`scrot -Z 0 -u -q 100 ${config.recordDir}${stream.name}${'0'.toString().repeat(config.framecounterDigits - frameNumber.toString().length)}${frameNumber}.tga`)
            }

            console.log(`Frame ${frameNumber}/${config.framerate * config.seconds} done`)
            // Add to counter
            frameNumber++;

            setTimeout(recordFrame, config.frametime) // Call next frame render
            xdofool.type(config.resumeRebind) // Resume demo
        }, config.catchUpTime)
    }
}

let frameNumber = 0;
setTimeout(() => {
    sendMultipleCommands(commands.initialCommands) // Run init commands
    for (const stream of commands.streams) {
        if (stream.isBind && stream.bind != '') {
            sendSingleCommand(`bind ${stream.bind} "${stream.commands.join(';')}"`)
        }
    }

    // Play demo
    openConsole()
    xdofool.type('demo_resume; hideconsole');
    xdofool.enter()

    setTimeout(recordFrame, config.frametime) // Call initial frame render
}, config.initialTimeout)