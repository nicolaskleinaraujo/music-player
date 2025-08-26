// Modules
import { execSync } from "child_process"

function getShortPath(longPath: string): string {
    try {
        return execSync(`for %I in ("${longPath}") do @echo %~sI`, { shell: "cmd.exe" }).toString().trim()
    } catch (e) {
        return longPath
    }
}

export default getShortPath
