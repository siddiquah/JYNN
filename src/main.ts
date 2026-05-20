import { Message } from './types';
import { COLORS } from './config';
import chalk from 'chalk';
import { moodDefault } from './moods/prompts';
import { ask, rl } from './utils/terminal';
import { getTime } from './utils/time';
import { help, clear, saveHistoryOnFile, recapHistory, switchMood, showTokens } from './commands';
import { streamResponse } from './core/stream';


let sysPrompt = moodDefault
let messages: Message[] = [{ role: 'system', content: sysPrompt}]
let sessionTokens = 0 //session lifetime tokens.

export async function main() {

    console.log(chalk.hex(COLORS.welcome).bold('hey. I\'m Astra. let\'s get into it.'));
    console.log(chalk.hex(COLORS.success)('Ask me anything. Type "/help" for commands. بسم الله 🌿\n'));
    while(true) {
        const userInput = await ask(chalk.hex(COLORS.primary)('You: '));
        process.stdout.write(`\x1B[1A\x1B[2K`);
        console.log(`${chalk.hex(COLORS.primary)('You: ')} ${chalk.hex(COLORS.user)(userInput)} ${chalk.hex(COLORS.dim)(` [${getTime()}]`)}`)
 
        // slash commands
        if(userInput.toLocaleLowerCase() === "/exit") {
            console.log(chalk.hex(COLORS.border)("---------------------------------------------------------------------------------------"));
            console.log(chalk.hex(COLORS.welcome)('peace out ✌️'));
            rl.close()
            break;
        }
        if(userInput.toLowerCase() === '/clear') {
            clear(messages, sysPrompt)
            console.log(chalk.hex(COLORS.border)("---------------------------------------------------------------------------------------"));
            console.log(chalk.hex(COLORS.dim)('memory wiped. fresh start.'))
            continue;
        }
        if(userInput.toLocaleLowerCase() === '/recap') {
            await recapHistory(messages)
            continue;
        }
        if(userInput.toLocaleLowerCase() === '/save') {
            saveHistoryOnFile(messages);
            continue;
        }
        if(userInput.toLocaleLowerCase().startsWith('/mood')) {
            let parts = userInput.split(' ')
            let moodName = parts[1]?.toLowerCase() ?? ''
            sysPrompt = switchMood(messages, sysPrompt, moodName)
            continue;
        }
        if(userInput.toLowerCase() === '/tokens') {
            showTokens(sessionTokens)
            continue
        }
        if(userInput.toLocaleLowerCase() === '/help') {
            help()
            continue;
        }
 
        messages.push({ role: 'user', content: userInput })
 
        const {fullReply, totalTokens} = await streamResponse(messages)
        sessionTokens += totalTokens
        messages.push({role: 'assistant', content: fullReply})
    }
}