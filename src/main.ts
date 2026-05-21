import { Message } from './types';
import { COLORS } from './config';
import chalk from 'chalk';
import { moodDefault } from './moods/prompts';
import { ask, rl } from './utils/terminal';
import { getTime } from './utils/time';
import { help, clear, saveHistoryOnFile, recapHistory, switchMood, showTokens } from './commands';
import { streamResponse } from './core/stream';
import gradient from "gradient-string";

let sysPrompt = moodDefault
let messages: Message[] = [{ role: 'system', content: sysPrompt}]
let sessionTokens = 0 //session lifetime tokens.

export async function main() {
    console.log(
  gradient([
    "#01164b", // deep navy
    "#1e3a8a", // royal blue
    "#2563eb", // vibrant blue
    "#06b6d4", // cyan glow
    "#7c3aed"  // soft purple
  ]).multiline(`
   ____       .-'''-. ,---------. .-------.       ____     
 .'  __ \`.   / _     \\\\          \\|  _ _   \\    .'  __ \`.  
/   '  \\  \\ (\`' )/\`--' \`--.  ,---'| ( ' )  |   /   '  \\  \\ 
|___|  /  |(_ o _).       |   \\   |(_ o _) /   |___|  /  | 
   _.-\`   | (_,_). '.     :_ _:   | (_,_).' __    _.-\`   | 
.'   _    |.---.  \\  :    (_I_)   |  |\\ \\  |  |.'   _    | 
|  _( )_  |\\    \`-'  |   (_(=)_)  |  | \\ \`'   /|  _( )_  | 
\\ (_ o _) / \\       /     (_I_)   |  |  \\    / \\ (_ o _) / 
 '.(_,_).'   \`-...-'      '---'   ''-'   \`'-'   '.(_,_).'  

                  Your Terminal Companion
                Smart. Sassy. Terminal-native
`)
);

    console.log( chalk.hex(COLORS.welcome)( "streaming thoughts directly into your terminal.\n" ) ); 
    console.log( chalk.hex(COLORS.dim)( "type /help if you forgot how this works. happens to the best of us.\n" ) );

    while(true) {
        const userInput = await ask(chalk.hex(COLORS.primary)('You ❯ '));
        process.stdout.write(`\x1B[1A\x1B[2K`);
        console.log(`${chalk.hex(COLORS.primary)("you ❯")} ${chalk.hex(COLORS.user)(userInput)} ${chalk.hex(COLORS.dim)(`[${getTime()}]`)}`)
        
        const normalizedInput = userInput.toLowerCase().trim();
        // slash commands
        if(normalizedInput.toLocaleLowerCase() === "/exit") {
            console.log(chalk.hex(COLORS.border)("---------------------------------------------------------------------------------------"));
            console.log(chalk.hex(COLORS.welcome)('peace out ✌️'));
            rl.close()
            break;
        }
        if(normalizedInput.toLowerCase() === '/clear') {
            clear(messages, sysPrompt)
            console.log(chalk.hex(COLORS.border)("---------------------------------------------------------------------------------------"));
            console.log(chalk.hex(COLORS.dim)('memory wiped. fresh start.'))
            continue;
        }
        if(normalizedInput.toLocaleLowerCase() === '/recap') {
            await recapHistory(messages) 
            continue;
        }
        if(normalizedInput.toLocaleLowerCase() === '/save') {
            saveHistoryOnFile(messages);
            continue;
        }
        if(normalizedInput.toLocaleLowerCase().startsWith('/mood')) {
            let parts = userInput.split(' ')
            let moodName = parts[1] ?? ''
            sysPrompt = switchMood(messages, sysPrompt, moodName)
            continue;
        }
        if(normalizedInput.toLowerCase() === '/tokens') {
            showTokens(sessionTokens)
            continue
        }
        if(normalizedInput.toLocaleLowerCase() === '/help') {
            help()
            continue;
        }
 
        messages.push({ role: 'user', content: userInput })
 
        const {fullReply, totalTokens} = await streamResponse(messages)
        sessionTokens += totalTokens
        messages.push({role: 'assistant', content: fullReply})
        console.log();
    }
}