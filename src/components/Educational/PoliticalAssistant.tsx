import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  AlertCircle,
  ExternalLink,
  Bot,
  User,
  Loader2,
} from 'lucide-react';

export interface ChatMessageUI {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  'O que é esquerda?',
  'O que é direita?',
  'O que é centro?',
  'O que é privatização?',
  'O que é inflação?',
  'O que faz o Presidente?',
  'O que faz o Congresso?',
  'O que é responsabilidade fiscal?',
  'Qual a diferença entre esquerda e direita?',
];

export const PoliticalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageUI[]>([]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const rawQuestion = questionText !== undefined ? questionText : inputQuestion;
    const textToSend = rawQuestion.trim();

    if (!textToSend || isLoading) return;

    // Character length validation
    if (textToSend.length > 600) {
      setErrorMessage('Sua pergunta é muito longa. Tente resumir para conseguirmos responder melhor.');
      return;
    }

    setErrorMessage(null);

    const userMessage: ChatMessageUI = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputQuestion('');
    setIsLoading(true);

    try {
      // Build conversation payload to maintain multi-turn session context
      const payload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        question: textToSend,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 22000);

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error('STATUS_' + res.status);
      }

      const data = await res.json();
      const answer = data?.answer?.trim();

      if (!answer) {
        const assistantErrorMsg: ChatMessageUI = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: 'Não consegui gerar uma resposta para essa pergunta. Tente escrever de outra forma.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantErrorMsg]);
      } else {
        const assistantMessage: ChatMessageUI = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: answer,
          sources: data?.sources,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err: any) {
      let friendlyError = 'Não foi possível conectar ao assistente neste momento. Tente novamente em alguns segundos.';
      if (err?.name === 'AbortError') {
        friendlyError = 'Não consegui responder agora. Verifique sua conexão e tente novamente.';
      }

      const errorMsg: ChatMessageUI = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content: friendlyError,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setErrorMessage(null);
    setInputQuestion('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectSuggested = (question: string) => {
    handleSend(question);
  };

  return (
    <section
      id="assistente-tire-duvidas"
      className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden flex flex-col"
    >
      {/* Header of Assistant */}
      <div className="bg-stone-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-stone-900 flex items-center justify-center font-bold shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg sm:text-xl text-white">
                Assistente de Dúvidas Políticas
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                100% Neutro
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Pergunte sobre conceitos, leis, funcionamento dos poderes e eleições. Respostas didáticas sem jargões.
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            id="btn-nova-pergunta"
            onClick={handleClearChat}
            disabled={isLoading}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-700 cursor-pointer disabled:opacity-50"
            title="Iniciar uma nova conversa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Pergunta / Limpar</span>
          </button>
        )}
      </div>

      {/* Neutrality & Privacy Banner */}
      <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200/70 text-xs text-amber-900 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Garantia de Neutralidade:</strong> O assistente não defende candidatos ou partidos, não indica voto e explica múltiplos pontos de vista.
        </span>
      </div>

      {/* Main Conversation Window */}
      <div className="p-4 sm:p-6 min-h-[320px] max-h-[580px] overflow-y-auto flex flex-col gap-4 bg-[#FAF9F6]">
        {messages.length === 0 ? (
          <div className="my-auto py-8 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <MessageSquare className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Tem alguma dúvida sobre política ou economia?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Digite qualquer pergunta abaixo ou toque em uma das sugestões para entender conceitos com exemplos simples do cotidiano.
              </p>
            </div>

            {/* Suggested Questions Grid */}
            <div className="space-y-2 text-left pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block text-center">
                Perguntas Frequentes Sugeridas
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTED_QUESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    id={`btn-suggested-${idx}`}
                    onClick={() => handleSelectSuggested(suggestion)}
                    className="p-3 rounded-2xl bg-white hover:bg-amber-50 hover:border-amber-300 border border-stone-200 text-left text-xs font-medium text-stone-800 transition-all shadow-2xs hover:shadow-xs flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <span>{suggestion}</span>
                    <Sparkles className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[11px] opacity-70 pb-1 border-b border-stone-100/20">
                    <span className="font-semibold">
                      {msg.role === 'user' ? 'Você' : 'Assistente Cidadão'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
                      <span className="font-bold text-stone-700 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-600" />
                        Fontes Oficiais:
                      </span>
                      {msg.sources.map((source, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 shadow-2xs animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-2.5 text-xs sm:text-sm text-stone-600">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  <span className="font-medium animate-pulse">
                    Preparando uma explicação clara e neutra...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Suggested chips row when conversation is active */}
      {messages.length > 0 && (
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-stone-500 shrink-0">
            Sugestões:
          </span>
          {SUGGESTED_QUESTIONS.slice(0, 4).map((q, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSelectSuggested(q)}
              className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-amber-300 hover:bg-amber-50 text-stone-700 text-[11px] shrink-0 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input & Form Controls */}
      <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-2">
        {errorMessage && (
          <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              id="input-duvida-politica"
              ref={inputRef}
              type="text"
              value={inputQuestion}
              onChange={(e) => {
                setInputQuestion(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              disabled={isLoading}
              placeholder="Digite sua dúvida sobre política, governo, economia ou candidatos..."
              maxLength={600}
              className="w-full pl-4 pr-16 py-3.5 rounded-2xl bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all disabled:opacity-50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 pointer-events-none">
              {inputQuestion.length}/600
            </span>
          </div>

          <button
            id="btn-enviar-pergunta"
            type="submit"
            disabled={isLoading || !inputQuestion.trim()}
            className="px-5 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Pensando...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-400" />
                <span>Perguntar</span>
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-stone-500 text-center">
          O assistente não expressa opiniões pessoais, não julga ideologias e não altera seu perfil político ou respostas do teste.
        </p>
      </div>
    </section>
  );
};
