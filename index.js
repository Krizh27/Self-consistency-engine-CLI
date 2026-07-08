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

try {
    const [openaiResult,claudeResult,groqResult] = await Promise.allSettled([
        askOpenAI(question),
        askClaude(question),
        askGroq(question),
    ]);

    const openaiValue = openaiResult.status === 'fulfilled' ? openaiResult.value : { answer: `Error: ${openaiResult.reason?.message || 'Unknown'}`, usage: 0 };
    const claudeValue = claudeResult.status === 'fulfilled' ? claudeResult.value : { answer: `Error: ${claudeResult.reason?.message || 'Unknown'}`, usage: 0 };
    const groqValue = groqResult.status === 'fulfilled' ? groqResult.value : { answer: `Error: ${groqResult.reason?.message || 'Unknown'}`, usage: 0 };

    console.log("========== OpenAI ==========\n");
    console.log(chalk.blue(openaiValue.answer));
    console.log(chalk.gray(`Tokens used: ${openaiValue.usage}`));

    console.log("\n========== Claude ==========\n");
    console.log(chalk.green(claudeValue.answer));
    console.log(chalk.gray(`Tokens used: ${claudeValue.usage}`));

    console.log("\n========== Groq ==========\n");
    console.log(chalk.yellow(groqValue.answer));
    console.log(chalk.gray(`Tokens used: ${groqValue.usage}`));

    console.log(chalk.red("\nSynthesizing final answer...\n"));

    const finalResult = await judgeAnswers(
        question,
        openaiValue.answer,
        claudeValue.answer,
        groqValue.answer
    );

    console.log(chalk.cyan("===========Final Answer===========\n"));

    console.log(chalk.magenta(finalResult.answer));
    console.log(chalk.gray(`Tokens used: ${finalResult.usage}`));

} catch (error) {
    console.error(chalk.red("An error occurred during execution:\n"), error);
} finally {
    r1.close();
}

