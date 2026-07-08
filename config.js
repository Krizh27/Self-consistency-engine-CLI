import 'dotenv/config';

import openAI, { OpenAI } from "openai";
import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const anthropic = new Anthropic({
    apikey : process.env.ANTHROPIC_API_KEY,
});

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});