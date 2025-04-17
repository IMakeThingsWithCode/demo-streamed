# Demo-Streamed
## *Fully external, multi-stream CS2 demo recorder for Linux*

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
- Edit `.src/xdofool.mts` to change terminal commands.
- Change your configuration in `.src/config.mts`
- Update your demo recording settings in `.src/commands.mts`

## Running
1. Pause your CS2 demo and hide the console.
2. Switch to a terminal.
3. Run `sh run.sh`
4. Once you see `"Recorder initialized. Keypresses starting in ${config.initialTimeout} ms."`, switch to your CS2 instance and it will record. 

As of right now, there is no way to stop it other than the standard methods of stopping a command `Ctrl+C`.