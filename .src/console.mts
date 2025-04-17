import { xdofool } from "./xdofool.mjs"
export class consoleTools {
    static openConsole() {
        xdofool.type('=')
    }
    static closeConsole() {
        xdofool.type('hideconsole')
        xdofool.enter()
    }
    static sendSingleCommand(command: string) {
        this.openConsole()
        xdofool.type(command)
        xdofool.enter()
        this.closeConsole()
    }
    static sendMultipleCommands(commands: string[]) {
        this.openConsole()
        for (let command of commands) {
            xdofool.type(command)
            xdofool.enter()
        }
        this.closeConsole()
    }
}
