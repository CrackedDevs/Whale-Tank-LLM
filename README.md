# 🐋 Whale Tank AI

An open-source AI platform that simulates interactions with crypto investment "Whales" (experienced investors) who evaluate token proposals. This platform uses advanced language models to create realistic, character-driven interactions while maintaining consistent investment evaluation patterns.

## 🎯 Overview

The Whale Tank AI Platform provides a unique way to simulate interactions with experienced crypto investors (Whales). Each Whale has a distinct personality and evaluation style, offering realistic feedback on token proposals while maintaining their character traits and investment philosophy.

## 🔍 How It Works

The platform's core functionality is built around the `handleAIChatInteraction` system, which:

1. **Persona Management**: Each Whale has a defined personality, characteristics, and typical dialogue patterns
2. **Context-Aware Responses**: Takes into account:
   - Previous successful interaction patterns
   - Recent conversation history
   - Token details (address and ticker)
3. **Consistent Decision Making**: Always provides reasoned rejections while maintaining character authenticity
4. **Safety Mechanisms**: Built-in rules ensure responsible and educational interactions

## 🛠 Technical Implementation

The system uses TypeScript and OpenAI's GPT models to process and generate responses. Key components include:

### Key Features

- **Personality-Driven Responses**: Each Whale maintains consistent character traits
- **Context-Aware Processing**: Incorporates previous successful patterns and recent messages
- **Structured Decision Making**: Uses OpenAI's function calling to ensure consistent response format
- **Error Handling**: Robust error management for reliable operation

## 📖 Code Explanation

The `LLM-interaction.ts` file contains the core logic for AI-driven chat interactions. Here's a breakdown:

1. **Interface Definitions**:

   - `SharkPersona`: Defines the Whale's personality and characteristics
   - `ChatContext`: Manages conversation context and token information
   - `AIResponse`: Structures the AI's response format

2. **Main Function**: `handleAIChatInteraction`

   - Takes OpenAI instance and chat context as parameters
   - Constructs system message with Whale's personality and rules
   - Uses OpenAI's function calling to ensure structured responses
   - Handles error cases and returns formatted responses

3. **Safety Features**:
   - Built-in rules prevent positive investment decisions
   - Maintains character consistency
   - Incorporates learning from previous interactions
