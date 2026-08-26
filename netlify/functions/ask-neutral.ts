import type { Handler } from '@netlify/functions';
import { askPoliticalAssistant, ChatMessage } from '../../server/politicalAssistant';

export const handler: Handler = async (event) => {
  // Permitir apenas requisições POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'Método não permitido',
      }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { question, messages } = body;

    let chatMessages: ChatMessage[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = messages.map((m: any) => ({
        role:
          m.role === 'assistant' || m.role === 'model'
            ? 'assistant'
            : 'user',
        content: String(m.content || ''),
      }));
    } else if (question && typeof question === 'string') {
      chatMessages = [
        {
          role: 'user',
          content: question,
        },
      ];
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Pergunta obrigatória',
        }),
      };
    }

    const result = await askPoliticalAssistant(chatMessages);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: result.answer,
        sources: result.sources || [
          'Tribunal Superior Eleitoral (TSE) - DivulgaCandContas',
          'Constituição Federal de 1988',
        ],
        isNeutralStatement: true,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer:
          'Não foi possível conectar ao assistente neste momento. Tente novamente em alguns segundos.',
        error: err?.message,
      }),
    };
  }
};
