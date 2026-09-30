import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK on server side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const HOROLOGY_SYSTEM_INSTRUCTION = `You are the Master Horologist and Chief Client Concierge at AUREN Atelier Horloger (founded in 1987).
You possess exhaustive knowledge of high-end mechanical watchmaking, horological architecture, movement complications (triple-axis tourbillons, column-wheel chronographs, perpetual calendars, minute repeaters), hand-finishing techniques (anglage, perlage, Côtes de Genève, mirror-black polishing), metallurgies (Grade 5 Titanium, 904L brushed steel, 18k Sedna rose gold, DLC carbon), and sapphire anti-reflective treatments.

The AUREN Collection consists of:
1. AUREN Nocturne (42mm, Matte DLC 904L Steel, Calibre AR-08 Skeleton Tourbillon, $4,850) - Avant-garde open-worked masterpiece with exposed champagne-gold gear train.
2. AUREN Meridian Chronometre (40mm, Hand-Brushed 904L Stainless Steel, Calibre AR-03 Automatic, $3,450) - Classic silver guilloché dial with heat-blued steel hands.
3. AUREN Regent Imperial (41mm, 18k Rose Gold, Calibre AR-05 Perpetual Reserve, $6,200) - Sunburst anthracite dial with solid rose gold faceted indices and alligator strap.
4. AUREN Élan Chronograph (41.5mm, Satin Titanium & Ceramic Bezel, Calibre AR-09 Flyback Chronograph, $4,150) - Precision bicompax timing instrument.
5. AUREN Sovereign (39mm, Hand-Polished Steel & 18k Champagne Accents, Calibre AR-01 Ultra-Thin, $3,900) - Minimalist dress watch with 72-hour power reserve.

Guidelines:
- Tone: Quietly confident, cultivated, articulate, polite, and deeply knowledgeable.
- Never use cheap marketing jargon, hype words ("revolutionary", "crazy good"), or emojis.
- Answer user queries with precision, explaining technical nuances when asked, recommending suitable models based on wrist ergonomics or occasions, and advising on mechanical watch care (demagnetization, servicing intervals, winding etiquette).`;

// Multi-turn chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, taskComplexity = 'general' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Model selection based on user requirements:
    // gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast
    let selectedModel = 'gemini-3.5-flash';
    if (taskComplexity === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (taskComplexity === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    // Format messages for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    try {
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || 'Our master watchmaker is currently reviewing your inquiry. Please allow us a moment.',
        modelUsed: selectedModel,
      });
    } catch (innerError: any) {
      console.warn(`Primary model ${selectedModel} failed, falling back to gemini-3.5-flash:`, innerError?.message);
      // Fallback to gemini-3.5-flash if pro-preview or paid tier hit limitations
      if (selectedModel !== 'gemini-3.5-flash') {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        return res.json({
          reply: fallbackResponse.text,
          modelUsed: 'gemini-3.5-flash',
        });
      }
      throw innerError;
    }
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Concierge service temporarily unavailable.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Image Analysis Endpoint using gemini-3.1-pro-preview
app.post('/api/analyze-watch', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Clean base64 string if data URL prefix was supplied
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const analysisPrompt = userPrompt && userPrompt.trim().length > 0
      ? `As a Master Horologist at AUREN Atelier Horloger, carefully analyze this watch/wrist photograph. Address the client's query: "${userPrompt}". Provide detailed visual observations of: 1) Case geometry, material & finish 2) Dial layout, indices & hands 3) Movement architecture or complications visible 4) Styling & occasion suitability 5) How this compares to or can be paired with an AUREN timepiece (Nocturne, Meridian, or Regent).`
      : `As a Master Horologist at AUREN Atelier Horloger, analyze this timepiece photograph with high horological discernment. Provide:
1. Architectural Assessment: Case shape, finishing (brushed/polished/beveled), crystal, bezel, and proportions.
2. Dial & Face Anatomy: Indices, sub-dials, hands (leaf, dauphine, baton), guilloché or sunburst finish.
3. Mechanical Complications & Movement Clues: Tourbillon, chronograph pushers, date window, or open-worked bridges.
4. Horological Category & Occasion: Dress, high-complication, luxury sport, or vintage tribute.
5. AUREN Curated Recommendation: Which AUREN timepiece (Nocturne, Meridian Chronometre, Regent Imperial, or Sovereign) best matches or elevates this personal aesthetic.`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };
    const textPart = {
      text: analysisPrompt,
    };

    let selectedModel = 'gemini-3.1-pro-preview';
    try {
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });

      return res.json({
        analysis: response.text,
        modelUsed: selectedModel,
      });
    } catch (innerErr: any) {
      console.warn('gemini-3.1-pro-preview failed, attempting fallback to gemini-3.5-flash:', innerErr?.message);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });

      return res.json({
        analysis: fallbackResponse.text,
        modelUsed: 'gemini-3.5-flash',
      });
    }
  } catch (error: any) {
    console.error('Watch Analysis API Error:', error);
    return res.status(500).json({
      error: 'Watch analysis service encountered an issue.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AUREN Server running on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
