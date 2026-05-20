import * as fs from 'fs'
import chalk from 'chalk'
import { Message } from '../types'
import { COLORS } from '../config'

export const saveHistoryOnFile = (hisArr : Message[]) => {
    let filteredHistory = hisArr.filter(i => i.role !== 'system')
    let date = new Date()
    let fileName = `astra-${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}-${String(date.getHours()).padStart(2,'0')}-${String(date.getMinutes()).padStart(2,'0')}.json`
    fs.writeFileSync(fileName, JSON.stringify(filteredHistory, null, 2))
    console.log(chalk.hex(COLORS.dim)(`Conversation saved → ${fileName}`))
}
