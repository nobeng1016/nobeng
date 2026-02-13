import { GoogleGenerativeAI } from "@google/generative-ai";

const getClient = () => {
    // 1. Vite 환경과 일반 환경 모두 대응하도록 수정했습니다.
    const apiKey = import.meta.env?.VITE_GOOGLE_GENAI_API_KEY || process.env.API_KEY;
    
    if (!apiKey) {
        throw new Error("API Key not found");
    }
    return new GoogleGenerativeAI(apiKey);
};

export const generateBlogPostContent = async (topic: string, tone: string): Promise<{ title: string; content: string; tags: string[] }> => {
    try {
        const genAI = getClient();
        // 2. 모델명을 가장 안정적인 1.5-flash로 고정했습니다.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

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
