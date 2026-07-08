import readline from "node:readline/promises";

import { stdin as input, stdout as output } from "node:process";

import { askOpenAI } from "./services/openai.js";
import { askClaude } from "./services/claude.js";
import { askGroq } from "./services/groq.js";
import { judgeAnswers } from "./services/judge.js";
import { log } from "node:console";
import chalk from "chalk";

const r1 = readline.createInterface({
    input,
    output
});

const question = await r1.question("ask anything: ");

console.log("\nGenerating reponses...\n");

const [openaiResult,claudeResult,groqResult] = await Promise.all([
    askOpenAI(question),
    askClaude(question),
    askGroq(question),
]);

console.log("========== OpenAI ==========\n");
console.log(chalk.blue(openaiResult.answer));
console.log(chalk.gray(`Tokens used: ${openaiResult.usage}`));

console.log("\n========== Claude ==========\n");
console.log(chalk.green(claudeResult.answer));
console.log(chalk.gray(`Tokens used: ${claudeResult.usage}`));

console.log("\n========== Groq ==========\n");
console.log(chalk.yellow(groqResult.answer));
console.log(chalk.gray(`Tokens used: ${groqResult.usage}`));

console.log(chalk.red("\nSynthesizing final answer...\n"));

const finalAnswer = await judgeAnswers(
    question,
    openaiResult.answer,
    claudeResult.answer,
    groqResult.answer
);

console.log(chalk.cyan("===========Final Answer===========\n"));

console.log(chalk.magenta(finalAnswer));

r1.close();

