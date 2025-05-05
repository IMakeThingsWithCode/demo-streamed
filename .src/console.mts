import { terminal } from "./terminal.mjs"
export class consoleTools {
    static openConsole() {
        terminal.type('=')
    }
    static closeConsole() {
        terminal.type('hideconsole')
        terminal.enter()
    }
    static sendSingleCommand(command: string) {
        this.openConsole()
        terminal.type(command)
        terminal.enter()
        this.closeConsole()
    }
    static sendMultipleCommands(commands: string[]) {
        this.openConsole()
        for (let command of commands) {
            terminal.type(command)
            terminal.enter()
        }
        this.closeConsole()
    }
}
