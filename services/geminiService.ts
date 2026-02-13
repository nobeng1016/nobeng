import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateBlogPostContent = async (topic: string, tone: string): Promise<{ title: string; content: string; tags: string[] }> => {
    try {
        const ai = getClient();
        const model = 'gemini-3-flash-preview';
        
        const prompt = `
        Write a blog post about "${topic}" with a ${tone} tone.
        Return the response in JSON format with the following structure:
        {
            "title": "A catchy title for the post",
            "content": "The full blog post content in Markdown format. Use headers, lists, and bold text where appropriate.",
            "tags": ["tag1", "tag2", "tag3"]
        }
        Do not include markdown code blocks (like \`\`\`json) in the response, just the raw JSON string.
        `;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        if (!text) {
            throw new Error("No response from Gemini");
        }

        const data = JSON.parse(text);
        return {
            title: data.title,
            content: data.content,
            tags: data.tags
        };
    } catch (error) {
        console.error("Error generating blog post:", error);
        throw error;
    }
};
