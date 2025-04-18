import { config } from "./config.mjs"

export interface stream {
    name: string, // The name of the stream. Used in the filenames
    bind: string, // The key that is rebound to the commands given
    isBind: boolean, // If true, it will bind the key ${bind} to the commands. Otherwise, it will type them
    commands: string[] // The commands to run before the stream is captured
}
export const commands: {
    initialCommands: string[], // These commands run before the demo starts.
    streams: stream[] // A list of streams and their commands
} = {
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
                'r_drawparticles 0'
            ]
        },
        {
            'name': 'fullbright',
            'bind': ']',
            'isBind': true,
            'commands': [
                'r_csgo_render_dynamic_objects 1',
            ]
        },
        {
            'name': 'normal',
            'isBind': true,
            'bind': '/',
            'commands': [
                'mat_fullbright 0',
                'sc_disable_world_materials 0',
                'sc_setclassflags Default 0',
                'r_drawviewmodel 1',
                'cl_drawhud 0',
                'r_csgo_render_decals 1',
                'r_drawparticles 1'
            ]
        },
        {
            'name': 'noview_nofeed',
            'isBind': true,
            'bind': 'v',
            'commands': [
                'r_drawviewmodel 0',
                'cl_drawhud 1'
            ]
        }
    ]
}