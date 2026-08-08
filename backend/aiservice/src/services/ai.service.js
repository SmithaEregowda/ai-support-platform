import axios from 'axios';

const parseAiResponse = (rawText) => {
    console.log('Raw AI response:------------->', rawText);
    const text = String(rawText || '').trim();

    if (!text) {
        throw new Error('AI service returned an empty response.');
    }

    const cleanedText = text
        .replace(/```json\s*/gi, '')
        .replace(/```/g, '')
        .trim();

    const start = cleanedText.indexOf('{');
    const end = cleanedText.lastIndexOf('}');

    const jsonCandidate =
        start !== -1 && end > start
            ? cleanedText.slice(start, end + 1)
            : cleanedText;

    try {
        return JSON.parse(jsonCandidate);
    } catch (error) {
        console.error('Error parsing AI response:', error);
        throw new Error(`Invalid JSON returned by AI service: ${error.message}`);
    }
};

const analyzeWithAIService = async (message) => {
    const prompt = `

You are an AI customer support assistant.

Analyze this ticket:

"${message}"

Return ONLY valid JSON with this structure and no extra text:

{
  "category": "",
  "priority": "",
  "sentiment": "",
  "summary": ""
}

`;

    const response = await axios.post(
        'http://localhost:11434/api/generate',
        {
            model: 'llama3',
            prompt,
            stream: false,
        }
    );

    const aiText = response?.data?.response;
    return parseAiResponse(aiText);
};

export { analyzeWithAIService };