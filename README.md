# Demo-Streamed
## *Fully external, multi-stream CS2 demo recorder for Linux*

> This project is **not** robust. It is a quick and dirty way of getting demo recording working on Linux. Don't expect your experience to be streamlined or working out-of-the-box. If you are looking for something a little more professional, please check out [HLAE](https://github.com/advancedfx/advancedfx).


## Installation
### Dependencies (apt)
- ffmpeg
- xdotool
- scrot

### Dependencies (npm)
`npm i`
- shelljs
- typescript

### Adapting to your system
- Edit `.src/xdofool.mts` to edit terminal commands for your needs
- Change your configuration in `.src/config.mts`
- Update your demo recording/stream settings in `.src/commands.mts`

## Running
1. Pause your CS2 demo and hide the console.
2. Switch to a terminal.
3. Run `sh run.sh`
4. Once you see `"Recorder initialized. Keypresses starting in ${config.initialTimeout} ms."`, switch to your CS2 instance and it will record. 

As of right now, there is no way to stop it other than the standard methods of stopping a command (`Ctrl+C`).
