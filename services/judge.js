import {anthropic} from "../config.js";

export async function judgeAnswers(question,openaiAnswer,claudeAnswer,groqAnswer) {
    const prompt =`
    question: ${question}

    ----------------------------------------------------------

    openAI Answer:
    ${openaiAnswer}

    ----------------------------------------------------------

    Claude Answer:
    ${claudeAnswer}

    ----------------------------------------------------------

    Groq Answer:
    ${groqAnswer}

    ----------------------------------------------------------

    you are an impartial evaluator
    compare all three answers
    do not simply choose one
    create a brand new answer by combining the strongest ideas from all responses
    remove any duplicate information
    return only the final synthesized answer
    `
    const response = await anthropic.messages.create({
        model:"claude-sonnet-5",
        max_tokens:100,
        messages:[
            {
            role:"user",
            content:prompt
        }
    ]
    })
    return {
        answer: response.content[0].text,
        usage: response.usage.input_tokens + response.usage.output_tokens
    };
}