# Self-consistency-engine-CLI

The application queries three independent models (GPT-5, Claude Haiku 4.5, and Llama 3.1 8B via Groq) in parallel. Their responses are then passed to Claude Sonnet 5, which acts as an evaluator and synthesizes a new answer by combining the strongest aspects of each response rather than selecting any single one.

# pipeline

                User Question
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
     GPT-5       Claude Haiku 4.5    Llama 3.1 8B (Groq)
        │             │             │
        └─────────────┼─────────────┘
                      ▼
          Claude Sonnet 5 (Judge)
                      │
                      ▼
         Final Synthesized Answer

# How to run

npm init -y 

npm install @anthropic-ai/sdk chalk dotenv groq-sdk openai

node index.js

enter your question

get responses from all three models along with their total token usage and final judge synthesized answer