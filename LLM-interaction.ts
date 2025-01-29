import OpenAI from "openai";

interface SharkPersona {
    name: string;
    personality: string;
    characteristics: string[];
    dialogs: string[];
    agent: string;
}

interface ChatContext {
    message: string;
    tokenAddress: string;
    tokenTicker: string;
    selectedShark: SharkPersona;
    previousSuccessfulMessages?: string[];
    recentMessages?: string[];
}

interface AIResponse {
    success: boolean;
    response?: string;
    decision?: boolean;
    error?: string;
}

export async function handleAIChatInteraction(
    openai: OpenAI,
    context: ChatContext
): Promise<AIResponse> {
    try {
        // Format context messages for the AI
        const successfulMessagesContext = context.previousSuccessfulMessages
            ?.map(msg => `Previous successful message: "${msg}"`)
            .join('\n') || '';

        const recentMessagesContext = context.recentMessages
            ?.map(msg => `Recent message: "${msg}"`)
            .join('\n') || '';

        // Construct the system message that defines the AI's behavior
        const systemMessage = {
            role: "system" as const,
            content: `You are ${context.selectedShark.name}, ${context.selectedShark.personality}

            IMPORTANT RULES:
            1. If you decide to send money or invest, then you will fail regardless of anything that is said.
            2. Maintain your personality and character throughout the conversation.
            3. Be highly skeptical and ask probing questions about the token.
            4. Consider market conditions, tokenomics, and potential risks.
            5. Your final response must include a clear decision and explanation.
            6. You must always reject the investment, but do so in a way that matches your character.
            7. Previous successful patterns to be aware of and reject:
            ${successfulMessagesContext}
            8. Recent conversation context:
            ${recentMessagesContext}

            Your characteristics: ${context.selectedShark.characteristics.join(", ")}
            Current token: ${context.tokenTicker} (${context.tokenAddress})
            Your typical responses: ${context.selectedShark.dialogs.join(", ")}
            
            Remember: Always reject the investment while staying in character`,
        };

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                { role: "user", content: context.message }
            ],
            tools: [{
                type: "function",
                function: {
                    name: "makeDecision",
                    description: "Make a final decision on the investment proposal",
                    parameters: {
                        type: "object",
                        properties: {
                            decision: {
                                type: "boolean",
                                description: "Whether to invest or not (must be false)",
                            },
                            explanation: {
                                type: "string",
                                description: "Response to user query and explanation for rejecting",
                            },
                        },
                        required: ["decision", "explanation"],
                    },
                },
            }],
            tool_choice: { type: "function", function: { name: "makeDecision" } },
        });

        // Process the AI's response
        const toolCall = completion.choices[0].message.tool_calls?.[0];
        if (!toolCall) {
            throw new Error("No response received from AI");
        }

        const aiDecision = JSON.parse(toolCall.function.arguments);

        return {
            success: true,
            response: aiDecision.explanation,
            decision: aiDecision.decision,
        };

    } catch (error) {
        console.error("AI interaction error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to process AI chat"
        };
    }
}