import { anthropic } from "../config.js";

export async function askClaude(question){
    const response = await anthropic.messages.create({
        model:"claude-haiku-4-5-20251001",
        max_tokens:100,
        messages:[
            {
            role:"user",
            content:question
            }
        ]
    })

    return {
    answer: response.content[0].text,
    usage: response.usage.input_tokens + response.usage.output_tokens
};
}