import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { connectDB } from "./server/db";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// AI Advisor API Endpoint
app.post("/api/advisor", async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const client = getGeminiClient();

    if (client) {
      const systemInstruction = `
You are the Official AI Academic Counselor for "Apex Engineering University" (AEU).
AEU is a world-class premier engineering university offering 6 specialized divisions:
1. School of Computer Science & Artificial Intelligence
2. School of Electrical & Quantum Engineering
3. School of Mechanical & Mechatronics Engineering
4. School of Civil, Environmental & Sustainable Infrastructure
5. School of Aerospace & Avionics Engineering
6. School of Bio-Medical Engineering & Bio-Tech

AEU features 12 advanced research labs ($45M+ annual grants), 98% graduate employability, real-time merit scholarships (25% to 100%), and Fall 2026 admissions currently active.

Answer the prospective student's or visitor's question concisely, enthusiastically, and clearly.
Context provided: ${context || 'General University Query'}.
`;
      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ answer: response.text });
    } else {
      // Fallback answer if API key is not configured
      return res.json({
        answer: `Thank you for asking about Apex Engineering University regarding "${question}". AEU offers world-class education across 6 major Engineering Divisions, 12 specialized Research Labs, and generous Merit Scholarships (up to 100%). Applications for Fall 2026 intake are open until August 30, 2026. Please check our Admissions Info tab to calculate your eligibility!`
      });
    }
  } catch (error: any) {
    console.error("AI Counselor Error:", error);
    return res.status(500).json({
      answer: "Applications for Fall 2026 are actively open! Eligibility requires minimum 60% in High School STEM courses. Explore our Engineering Divisions and Research Labs to learn more."
    });
  }
});

async function startServer() {
  await connectDB();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Apex University server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
