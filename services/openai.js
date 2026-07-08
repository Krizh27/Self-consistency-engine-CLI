import { openai } from "../config.js";
export async function askOpenAI(question) {
    const response = await openai.responses.create({
        model:"gpt-3.5-turbo",
        input:question,
        max_output_tokens:100
    })

    return {
    answer : response.output_text || response.message?.content || response.choices?.[0]?.message?.content,
    usage: response.usage?.total_tokens || JSON.stringify(response.usage)
    }
}