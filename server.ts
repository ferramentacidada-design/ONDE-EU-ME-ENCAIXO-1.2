import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { askPoliticalAssistant, ChatMessage } from './server/politicalAssistant';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'Onde Eu Me Encaixo?',
      timestamp: new Date().toISOString(),
      officialSource: 'https://divulgacandcontas.tse.jus.br/',
    });
  });

  // Verification status endpoint (for checking candidate data against TSE rules)
  app.get('/api/verification-status', (req, res) => {
    res.json({
      lastVerified: new Date().toISOString().split('T')[0],
      source: 'Tribunal Superior Eleitoral - DivulgaCandContas',
      sourceUrl: 'https://divulgacandcontas.tse.jus.br/',
      tsePortalUrl: 'https://www.tse.jus.br/',
      status: 'Dados oficiais verificados no TSE e DivulgaCandContas.',
      disclaimer: 'Informações eleitorais oficiais das Eleições 2026.',
    });
  });

  // Neutral Political Assistant endpoint (supports both multi-turn messages array and single question string)
  const handleAsk = async (req: express.Request, res: express.Response) => {
    try {
      const { question, messages } = req.body;

      let chatMessages: ChatMessage[] = [];

      if (Array.isArray(messages) && messages.length > 0) {
        chatMessages = messages.map((m: any) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user',
          content: String(m.content || ''),
        }));
      } else if (question && typeof question === 'string') {
        chatMessages = [{ role: 'user', content: question }];
      } else {
        return res.status(400).json({ error: 'Pergunta obrigatória' });
      }

      const result = await askPoliticalAssistant(chatMessages);
      return res.json({
        answer: result.answer,
        sources: result.sources || ['Tribunal Superior Eleitoral (TSE) - DivulgaCandContas', 'Constituição Federal de 1988'],
        isNeutralStatement: true,
      });
    } catch (err: any) {
      return res.status(500).json({
        answer: 'Não foi possível conectar ao assistente neste momento. Tente novamente em alguns segundos.',
        error: err?.message,
      });
    }
  };

  app.post('/api/ask-neutral', handleAsk);
  app.post('/api/assistant/chat', handleAsk);

  // Vite middleware for development
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
    console.log(`Meu Perfil Político 2026 server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
