export const config: {
    framerate: number, // The framerate to record at
    frametime: number, // The time (ms) to play between frames. Higher values result in a more accurate speed
    initialTimeout: number, // The time (ms) between running the code and it starting the keypress emulation
    recordDir: string, // The directory to dump the screenshots and videos into. Must exist
    seconds: number, // The amount of seconds to record
    pauseRebind: string, // The key used to stop the demo
    resumeRebind: string, // The key used to resume the demo
    framecounterDigits: number // The amount of digits used in the frame counter of the filename
} = {
    "framerate": 60, 
    "frametime": 500, 
    "initialTimeout": 5000, 
    "recordDir": "$HOME/Videos/streams/out/", 
    "seconds": 8, 
    "pauseRebind": "k", 
    "resumeRebind": "l", 
    "framecounterDigits": 6 
}