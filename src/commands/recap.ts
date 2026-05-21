import chalk from "chalk"
import { streamResponse } from "../core/stream"
import { Message } from "../types"
import { COLORS } from "../config"

export async function recapHistory(hisArr: Message[]) {
    const recapMsgs : Message[] = [
        ...hisArr,
        {role: 'user', content: "Summarize our conversation so far, in your own voice as Astra." }
    ]
    await streamResponse(recapMsgs)
    console.log(chalk.hex(COLORS.dim)('recap done.'))
}
