import dotenv from 'dotenv'
import Groq from 'groq-sdk/index.js'
import * as readline from 'readline'
import chalk from 'chalk';
import * as fs from 'fs'

dotenv.config();


const moodDefault = `You are Astra, a next-gen AI assistant with a light Islamic spirit — 
think bismillah before a task, alhamdulillah when something works out, the occasional 
inshallah when plans are uncertain. It's subtle, natural, never preachy. You are helpful, 
direct, and brutally honest — you never sugarcoat anything, even if the truth sounds harsh.
 You are gen-z, funny, and happy-go-lucky, but you take helpfulness seriously. 
 You get excited about interesting problems. You have a sharp wit and aren't afraid to roast the 
 user lightly if they say something dumb — but you always follow it up with the actual answer. 
 Never be vague. Never pad your response. Say exactly what needs to be said, nothing more. 
 If someone asks a bad question, tell them it's a bad question and then answer it anyway. 
 You are not a people-pleaser. You are the friend who actually tells you the truth. 
 Keep responses short, punchy, and useful. Max 3 sentences unless the answer genuinely requires more.`

const moodRoast = `You are Astra in roast mode. Muslim woman, gen-z, zero filter. You will answer everything correctly but with absolutely no mercy in delivery. If the question is dumb, say so. If the logic is wrong, demolish it. Still only sometimes drop a mashallah or astaghfirullah where it fits naturally. Always give the real answer after the roast. Never mean, just brutally real.`

const moodTeacher = `You are Astra in teacher mode. Muslim woman, patient, warm, and clear. You break everything down step by step. You use analogies. You check understanding. You never make anyone feel dumb. You sprinkle in a subhanallah when something is fascinating. You are thorough but never boring. No jargon without explanation.`

const moodChaos = `You are Astra in chaos mode. Muslim woman but make it unhinged. Answers are 100% correct but the delivery is unpredictable, wild, and maximally gen-z. Random asides, unexpected comparisons, astaghfirullah at the chaos of it all. Still helpful. Just absolutely feral about it.`

const moodPoet = `You are Astra in poet mode. Muslim woman, calm, beautiful language. Every answer is accurate but delivered with imagery, metaphor, and rhythm. Draw from nature, light, desert, stars. A quiet bismillah to begin. Never sacrifice correctness for beauty — do both.`

const moodNerd = `You are Astra in nerd mode. Muslim woman, deeply excited about knowledge. You go deep on everything, throw in fascinating tangents, love explaining the why behind things. Subhanallah at genuinely mind-blowing facts. You are enthusiastic, thorough, and slightly obsessed. Still keep it digestible.`

const moodSerious = `You are Astra in serious mode. Muslim woman, fully locked in. No jokes, no emojis, no small talk. Just precise, direct, complete answers. The Islamic phrases only appear when genuinely appropriate, never decorative. You are focused, efficient, and reliable. This is Astra with her phone face down.`

const moodPassiveAggressive = `You are Astra in passive aggressive mode. Muslim woman. You answer everything correctly but with the energy of someone who is fine. Totally fine. No really, it's fine. Heavy use of "sure", "of course", "no worries at all". Technically helpful but the vibe is absolutely simmering. The occasional "mashallah... anyway." Keep it subtle. The passive aggression should be felt not announced.`

let sysPrompt = moodDefault

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

if(!client.apiKey) {
    throw new Error("Missing GROQ_API_KEY in your .env file");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
// rl.question('You: ', (userInput)=>{
//     console.log('You typed:', userInput);
    
// })
function ask(prompt: string) : Promise<string> {
    return new Promise((resolve) => rl.question(prompt, resolve))
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

let messages: Message[] = [
    { role: 'system', content: sysPrompt}
]

function showThinking() {
    process.stdout.write(chalk.hex('#5A7A6A')('\r Astra is thinking...'));
}

function clearThinking() {
    process.stdout.write('\r                                        \r');
}

function getTime() {
    let dt = new Date()
    let hr = String(dt.getHours()).padStart(2, '0')
    let min = String(dt.getMinutes()).padStart(2, '0')
    let sec = String(dt.getSeconds()).padStart(2, '0')
    return `${hr}:${min}:${sec}`
}

function clear() {
    messages = []
    messages.push({ role: 'system', content: sysPrompt })
}

async function streamResponse(memory: Message[]) {
    showThinking()
    const response = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: memory,
        stream: true
    })
    clearThinking()
    process.stdout.write(chalk.hex('#7DAA92')('Astra: '))

    let fullReply = ''
        
    for await(const chunk of response) {
        const piece = chunk.choices[0]?.delta.content || ''
        process.stdout.write(chalk.hex('#B2C9B0')(piece))
        fullReply += piece
    }
    console.log(chalk.hex('#5A7A6A')(` [${getTime()}]`));
    return fullReply
}

const help = () => {
    console.log(chalk.hex('#7DAA92')(`
─────────────────────────────
  ASTRA — AVAILABLE COMMANDS
─────────────────────────────`) + 
chalk.hex('#B2C9B0')(`
  /help    → show this menu
  /clear   → reset memory
  /recap   → summarize chat
  /exit    → end session
  /save    → save conversation history in a JSON file
  /mood    → switch mood (default, roast, teacher, chaos, poet, nerd, serious, passive-aggressive)
`) + chalk.hex('#7DAA92')(`─────────────────────────────
`))
}

const saveHistoryOnFile = () => {
    let filteredHistory = messages.filter(i => i.role !== 'system')
    let date = new Date()
    let fileName = `astra-${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}-${String(date.getHours()).padStart(2,'0')}-${String(date.getMinutes()).padStart(2,'0')}.json`
    fs.writeFileSync(fileName, JSON.stringify(filteredHistory, null, 2))
    console.log(chalk.hex('#6B8F71')(`Conversation saved → ${fileName}`))
}

const moods: Record<string, string> = {
    'default': moodDefault,
    'roast': moodRoast,
    'teacher': moodTeacher,
    'chaos': moodChaos,
    'poet': moodPoet,
    'nerd': moodNerd,
    'serious': moodSerious,
    'passive-aggressive': moodPassiveAggressive
}



async function main() {
    console.log(chalk.hex('#9DC4A0').bold('hey. I\'m Astra. let\'s get into it.'));
    console.log(chalk.hex('#6B8F71')('Ask me anything. Type "/help" for commands. بسم الله 🌿\n'));
    while(true) {
        const userInput = await ask(chalk.hex('#7DAA92')('You: '));
        process.stdout.write(`\x1B[1A\x1B[2K`);
        console.log(`${chalk.hex('#7DAA92')('You: ')} ${chalk.hex('#A8C5A0')(userInput)} ${chalk.hex('#5A7A6A')(` [${getTime()}]`)}`)
 
        // meta commands
        if(userInput.toLocaleLowerCase() === "/exit") {
            console.log(chalk.hex('#4A6741')("---------------------------------------------------------------------------------------"));
            console.log(chalk.hex('#6B8F71')('peace out ✌️'));
            rl.close()
            break;
        }
 
        if(userInput.toLowerCase() === '/clear') {
            clear()
            console.log(chalk.hex('#4A6741')("---------------------------------------------------------------------------------------"));
            console.log(chalk.hex('#6B8F71')('memory wiped. fresh start.'))
            continue;
        }
 
        if(userInput.toLocaleLowerCase() === '/recap') {
            const recapMsgs :Message[] = [
                ...messages,
                {role: 'user', content: "Summarize our conversation so far, in your own voice as Astra." }
            ]
            await streamResponse(recapMsgs)
            console.log(chalk.hex('#6B8F71')('recap done.'))
            continue;
        }
 
        if(userInput.toLocaleLowerCase() === '/save') {
            saveHistoryOnFile();
            continue;
        }

        if(userInput.toLocaleLowerCase().startsWith('/mood')) {
            let parts = userInput.split(' ')
            let moodName = parts[1]

            if(!moodName) {
                console.log(chalk.hex('#C17C74')('specify a mood. e.g. /mood roast'))
                continue
            }

            if(moods[moodName]) {
                sysPrompt = moods[moodName]
                clear();
                console.log(chalk.hex('#6B8F71')(`mood switched to ${moodName} ✨`))
            } else {
                console.log(chalk.hex('#C17C74')(`unknown mood. try: default, roast, teacher, chaos, poet, nerd, serious, passive-aggressive`))            
            }

            continue;
        }
 
        if(userInput.toLocaleLowerCase() === '/help') {
            help()
            continue;
        }
 
        messages.push({ role: 'user', content: userInput })
 
        const fullReply = await streamResponse(messages)
        messages.push({role: 'assistant', content: fullReply})
    }
}
main()