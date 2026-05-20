import chalk from "chalk"
import { moods } from "../moods/prompts"
import { clear } from "./clear"
import { Message } from "../types"
import { COLORS } from "../config"

export function switchMood(hisArray: Message[], sysPro: string, moodName: string): string{

    if(!moodName) {
        console.log(chalk.hex(COLORS.error)('specify a mood. e.g. /mood roast'))
        return sysPro
    }

    if(moods[moodName]) {
        sysPro = moods[moodName]
        clear(hisArray, sysPro);
        console.log(chalk.hex(COLORS.success)(`mood switched to ${moodName} ✨`))
    } else {
        console.log(chalk.hex(COLORS.error)(`unknown mood. try: default, roast, teacher, chaos, poet, nerd, serious, passive-aggressive`))            
    }

    return sysPro
}

