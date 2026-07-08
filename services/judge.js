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
        model:"claude-haiku-4-5-20251001",
        max_tokens:100,
        messages:[
            {
            role:"user",
            content:prompt
        }
    ]
    })
    return response.content[0].text;
}