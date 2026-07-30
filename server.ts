import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { connectDB } from './server/db.js';
import authRoutes from './server/routes/auth.js';
import applicationRoutes from './server/routes/applications.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB Connection
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      university: 'Apex Engineering University API',
      timestamp: new Date().toISOString(),
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/applications', applicationRoutes);

  // Gemini AI Admissions Counselor Endpoint
  app.post('/api/counselor', async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ message: 'Question prompt is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are Dr. Marcus Vance, Dean of Admissions at Apex Engineering University. 
Apex Engineering University offers world-class degree programs:
1. M.S. & Ph.D. in Artificial Intelligence & Quantum Computing
2. B.S. & M.S. in Robotics, Mechatronics & Autonomous Systems
3. B.S. & M.S. in Bioengineering & Neural Technology
4. B.S. & M.S. in Aerospace Engineering & Space Propulsion

Admissions requirements: Min GPA 3.5, GRE optional, 2 letters of recommendation, Statement of Purpose.
Deadlines: Fall Priority - April 1, Spring Priority - October 15.

Respond concisely, authoritatively, and warmly to this student's inquiry: "${question}"`
                }
              ]
            }
          ]
        });
        return res.json({ answer: response.text });
      }

      // Fallback counselor responses if GEMINI_API_KEY is unset
      return res.json({
        answer: `Welcome to Apex Engineering University Admissions! Regarding your query on "${question}": Our engineering programs require a solid background in mathematics and physics, a minimum target GPA of 3.5, and a passionate Statement of Purpose. Applications are reviewed on a rolling basis. You can submit your application directly through our Student Portal above!`
      });
    } catch (err) {
      console.error('Counselor API error:', err);
      return res.status(500).json({
        answer: 'Our Admissions Office is currently experiencing high inquiry volume. Please submit your application directly through the portal!'
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎓 Apex Engineering University Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start university server:', err);
});
