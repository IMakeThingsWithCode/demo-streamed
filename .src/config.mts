export interface recorderConfiguration {
    /** The framerate to record at */
    framerate: number,
    /** The time (ms) to play between frames. Higher values result in a more accurate speed*/
    frametime: number,
    /** The time (ms) between running the code and it starting the keypress emulation */
    initialTimeout: number,
    /** The directory to dump the screenshots and videos into. Must exist */
    recordDir: string,
    /** The amount of seconds to record */
    seconds: number,
    /** The key used to stop the demo */
    pauseRebind: string,
    /** The key used to resume the demo */
    resumeRebind: string,
    /** The amount of digits used in the frame counter of the filename */
    framecounterDigits: number
}

/** The configuration for the recorder */
export const config: recorderConfiguration = {
    "framerate": 60,
    "frametime": 500,
    "initialTimeout": 5000,
    "recordDir": "$HOME/Videos/streams/out/",
    "seconds": 2,
    "pauseRebind": "k",
    "resumeRebind": "l",
    "framecounterDigits": 6
}