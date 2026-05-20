import chalk from "chalk"
import { COLORS } from "../config"

export const help = () => {
    console.log(chalk.hex(COLORS.border)(`
─────────────────────────────
  ASTRA — AVAILABLE COMMANDS
─────────────────────────────`) + 
chalk.hex(COLORS.dim)(`
  /help    → show this menu
  /clear   → reset memory
  /recap   → summarize chat
  /exit    → end session
  /save    → save conversation history in a JSON file
  /mood    → switch mood (default, roast, teacher, chaos, poet, nerd, serious, passive-aggressive)
  /tokens  → finds the amount of token used.
  `) + chalk.hex(COLORS.border)(`─────────────────────────────`)
)}