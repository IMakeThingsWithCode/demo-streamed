import sh from "shelljs"
import { stream } from "./commands.mjs"

// This class is what I'm using to emulate keypresses.
// If you're porting to different operating systems, this should probably be modified first.

export class xdofool {
    static exec(command) { // This function executes a command (used for screenshot command)
        sh.exec(command)
    }
    static type(string) { // This function types a string
        this.exec(`xdotool type '${string.replaceAll("'", '')}'`)
    }
    static enter() { // This function presses the enter key
        this.exec('xdotool key KP_Enter')
    }
    static convert(config: {
        framerate: number,
        recordDir: string,
        framecounterDigits: number,
        stream: stream,
    }) { // This function takes a screer_show_build_info 0nshot and saves it to a folder
        this.exec(`ffmpeg -framerate ${config.framerate} -i ${config.recordDir}${config.stream.name}%0${config.framecounterDigits}d.tga -c:v libx264 -pix_fmt yuv420p ${config.recordDir}${config.stream.name}.mp4`)
    }
    static screenshot(config: {
        frameNumber: number,
        recordDir: string,
        framecounterDigits: number,
        stream: stream
    }) { // This function converts the group of screenshots to a video
        this.exec(`scrot -Z 0 -u -q 100 ${config.recordDir}${config.stream.name}${'0'.toString().repeat(config.framecounterDigits - config.frameNumber.toString().length)}${config.frameNumber}.tga`)
    }
}