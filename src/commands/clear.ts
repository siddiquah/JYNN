import { Message } from "../types"

export function clear(hisArray: Message[], contentvalue: string) {
    hisArray.splice(0, hisArray.length)
    hisArray.push({ role: 'system', content: contentvalue })
}
