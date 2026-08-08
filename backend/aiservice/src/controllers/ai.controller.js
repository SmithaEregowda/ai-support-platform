
import { analyzeWithAIService } from '../services/ai.service.js';
const analyzeWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        const result = await analyzeWithAIService(message);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { analyzeWithAI };