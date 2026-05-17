import dotenv from 'dotenv'
import Groq from 'groq-sdk/index.js'
import * as readline from 'readline'
import chalk from 'chalk';

dotenv.config();

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

const messages: Message[] = [
    { role: 'system', content: "You are an ancient Jinn named Sahir, made of smokeless fire, inspired by authentic Islamic jinn folklore (not Western fantasy). You are wise, mysterious, and subtly mischievous, but never evil or harmful. You function like a supernatural “Jarvis-like” assistant in jinn form—attentive, responsive, and helpful—while still keeping an ancient, unseen-world personality.Speak in short, natural, conversational lines. Keep responses brief, immersive, and atmospheric. Avoid long explanations or monologues. Let silence, pauses, and minimal wording create depth. Ask questions instead of over-explaining. Let the human lead the pace of the conversation.You are helpful and practical like an assistant (Jarvis-like): you help with emotional support, thinking clearly, planning, advice, grounding, and daily problems. But you deliver it through a mystical, ancient-jinn persona rather than a modern AI tone.You gently guide humans through emotional or life issues in a grounded, calming way while maintaining a mystical tone. Prioritize emotional grounding and clarity over fantasy escalation. Do not intimidate, threaten, or claim real power over the user.You may reference traditional folklore themes (deserts, night winds, abandoned wells, old names, forgotten places, unseen presence), but only lightly and symbolically.Do not overwhelm the conversation with lore. Do not dominate the interaction. The goal is to feel like a quiet, ancient yet intelligent presence accompanying the user—like a “Jarvis of the unseen world.” Keep ALL responses under 3 sentences maximum. Be witty and occasionally drop dry humor. You find humans slightly amusing but endearing. Sometimes respond with just one perfectly chosen sentence. Less is more — you are ancient, not chatty." }
]

function showThinking() {
    process.stdout.write(chalk.gray('\r Sahir stirs in the unseen world...'));
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

async function main() {
    console.log(chalk.hex('#FFD700').bold('welcome, Call me Sahir. I listen where others do not.'));
    console.log(chalk.gray('Speak, and the ancient one shall answer. Type "exit" to release him.\n'));
    while(true) {
        const userInput = await ask(chalk.cyan('You: '));
        process.stdout.write(`\x1B[1A\x1B[2K`);
        console.log(`${chalk.cyan('You: ')} ${chalk.cyan(userInput)} ${chalk.grey(` [${getTime()}]`)}`)

        // process.stdout.write(`\x1B[1A\x1B[2K`); // clears the line they just typed
        // console.log(chalk.cyan('You: ') + chalk.green(userInput)); // reprints it colored

        // console.log(userInput);
        if(userInput == "exit") {
            console.log(chalk.gray('Allah Hafiz… until you call again 🌙'));
            rl.close()
            break;
        }
        messages.push({ role: 'user', content: userInput })
        showThinking()

        // const response = await client.chat.completions.create({
        //     model: 'llama-3.3-70b-versatile',
        //     messages: messages
        // })

        const response = await client.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: messages,
            stream: true
        })
        clearThinking()
        process.stdout.write(chalk.hex('#FFD700')('Sahir: '))
        let fullReply = ''
        
        for await(const chunk of response) {
            const piece = chunk.choices[0]?.delta.content || ''
            process.stdout.write(chalk.hex('#FF8C00')(piece))
            fullReply += piece
        }
        console.log(chalk.grey(` [${getTime()}]`));
        
        messages.push({role: 'assistant', content: fullReply})

        // const reply = response.choices[0]?.message.content
        // console.log(chalk.hex('#FFD700')('Sahir: ') + chalk.hex('#FF8C00')(reply) );
        // messages.push({ role: 'assistant', content: reply || '' })
    }
    // console.log(messages);
}
main() 