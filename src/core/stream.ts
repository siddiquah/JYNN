import Groq from 'groq-sdk/index.js'
import { Message } from '../types';
import { clearThinking, showThinking } from '../utils/terminal';
import chalk from 'chalk';
import { COLORS, MODEL } from '../config';
import { getTime } from '../utils/time';

export async function streamResponse(memory: Message[]) {
    const client = new Groq({
        apiKey: process.env.GROQ_API_KEY
    })

    if(!client.apiKey) {
        throw new Error("Missing GROQ_API_KEY in your .env file");
    }

    showThinking()
    const response = await client.chat.completions.create({
    model: MODEL,
    messages: memory,
    stream: true,
    })
    clearThinking()
    process.stdout.write(chalk.hex(COLORS.primary)('Astra: '))

    let fullReply = ''
    let totalTokens: number = 0 
    for await(const chunk of response) {
        const piece = chunk.choices[0]?.delta.content || ''
        process.stdout.write(chalk.hex(COLORS.text)(piece))
        fullReply += piece
        totalTokens = chunk.x_groq?.usage?.total_tokens ?? 0;
    }
    console.log(chalk.hex(COLORS.dim)(` [${getTime()}]`));
    return {fullReply, totalTokens}
}