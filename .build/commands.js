"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
var config_1 = require("./config");
exports.commands = {
    'initialCommands': [
        "bind ".concat(config_1.config.resumeRebind, " \"demo_timescale ").concat(((1000 / config_1.config.frametime) / (config_1.config.framerate)).toFixed(12), "\""),
        "bind ".concat(config_1.config.pauseRebind, " \"demo_timescale 0\""),
        "demo_timescale ".concat(((1000 / config_1.config.frametime) / (config_1.config.framerate)).toFixed(12)),
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
};
