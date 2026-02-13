import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateBlogPostContent = async (topic: string, tone: string) => {
    try {
        // VITE_ 접두사가 붙은 키를 우선적으로 가져옵니다.
        const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY || import.meta.env.VITE_API_KEY;
        
        if (!apiKey) {
            console.error("API Key missing! Check Vercel Environment Variables.");
            throw new Error("API Key not found. Please check Vercel settings.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" } // JSON 출력을 강제합니다.
        });

        const prompt = `Write a blog post about "${topic}" in ${tone} tone. 
        Return ONLY a JSON object: {"title": "...", "content": "...", "tags": ["...", "..."]}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // 텍스트에서 혹시 모를 마크다운 코드 블록(```json)을 제거하는 안전장치
        const cleanText = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanText);

        return {
            title: data.title,
            content: data.content,
            tags: data.tags
        };
    } catch (error) {
        console.error("Detailed Error:", error);
        throw error;
    }
};
