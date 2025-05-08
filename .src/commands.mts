import { config } from "./config.mjs"
import { Extra } from "./extra.mjs"
import { frameInfo } from "./index.mjs"

/** Represents a recording stream */
export interface stream {
    /** The name of the stream. Used in the filenames */
    name: string,
    /** The key that is rebound to the commands given */
    bind: string,
    /** If true, it will bind the key ${bind} to the commands. Otherwise, it will type them */
    isBind: boolean,
    /** The commands to run before the stream is captured */
    commands: string[] | ((info: frameInfo) => string)[]
}

export interface recorderCommands {
    /** These commands run before the demo starts. */
    initialCommands: string[],
    /** A list of streams and their commands */
    streams: stream[]
}

/** Customizable commands to run throughout the recording process */
export const commands: recorderCommands = {
    'initialCommands': [
        `bind ${config.resumeRebind} "demo_timescale ${((1000 / config.frametime) / (config.framerate)).toFixed(12)}"`,
        `bind ${config.pauseRebind} "demo_timescale 0"`,
        `demo_timescale ${((1000 / config.frametime) / (config.framerate)).toFixed(12)}`,
        'host_framerate 0',
        'cl_draw_only_deathnotices 1',
        'spec_show_xray 0',
        'crosshair 0',
        'cam_snapto 1',
        'r_show_build_info 0',
        'r_drawviewmodel 0',
        'cl_drawhud 0'
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
                'r_drawparticles 0'
            ]
        },
        {
            'name': 'fullbright',
            'bind': ']',
            'isBind': true,
            'commands': [
                'r_csgo_render_dynamic_objects 1',
                'mat_fullbright 1',
                'r_drawworld 1',
                'r_drawskybox 1',
                'sc_disable_world_materials 1',
                'sc_setclassflags Default -4',
                'r_drawviewmodel 0',
                'cl_drawhud 0',
                'r_csgo_render_decals 0',
                'r_drawparticles 0'
            ]
        },
        {
            'name': 'noviewandfeed',
            'isBind': true,
            'bind': '/',
            'commands': [
                'r_csgo_render_dynamic_objects 1',
                'mat_fullbright 0',
                'r_drawworld 1',
                'r_drawskybox 1',
                'sc_disable_world_materials 0',
                'sc_setclassflags Default 0',
                'r_drawviewmodel 0',
                'cl_drawhud 0',
                'r_csgo_render_decals 1',
                'r_drawparticles 1'
            ]
        },
        {
            'name': 'viewandfeed',
            'isBind': true,
            'bind': 'v',
            'commands': [
                'r_csgo_render_dynamic_objects 1',
                'mat_fullbright 0',
                'r_drawworld 1',
                'r_drawskybox 1',
                'sc_disable_world_materials 0',
                'sc_setclassflags Default 0',
                'r_drawviewmodel 1',
                'cl_drawhud 1',
                'r_csgo_render_decals 1',
                'r_drawparticles 1'
            ]
        },
        // {
        //     name: 'example_function_stream',
        //     bind: '',
        //     isBind: false, // CANNOT be bind because it types the returned command each time
        //     commands: [
        //         (frameInfo: frameInfo) => { // Sets cam yaw to a sine wave
        //             return `cam_idealyaw ${Math.sin(frameInfo.frameNumber / 100) * 180}`
        //         }
        //     ]
        // }
        // {
        //     name: 'example_keyframe_stream',
        //     bind: '',
        //     isBind: false, // CANNOT be bind because it types the returned command each time
        //     commands: [
        //         (frameInfo: frameInfo) => {
        //             return `fov_cs_debug ${
        //                 Extra.tweenAllSingle(
        //                     [
        //                         {
        //                             value: 90,
        //                             ms: 500
        //                         },
        //                         {
        //                             value: 110,
        //                             ms: 750
        //                         },
        //                         {
        //                             value: 65,
        //                             ms: 1250
        //                         },
        //                         {
        //                             value: 90,
        //                             ms: 1750
        //                         }
        //                     ],
        //                     frameInfo.timeElapsed
        //                 )
        //             }`
        //         }
        //     ]
        // }
    ]
}
