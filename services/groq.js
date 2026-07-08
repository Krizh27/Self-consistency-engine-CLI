import { groq } from "../config.js";

export async function askGroq(question) {
    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: question,
            },
        ],
        model:"llama-3.1-8b-instant",
        max_tokens: 100
    });

    return {
    answer: response.choices[0].message.content,
    usage: response.usage.total_tokens
    };
}
