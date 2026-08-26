import React, { useState } from 'react';
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Info,
  CheckCircle,
  X,
  Sparkles,
  RotateCcw,
  List,
} from 'lucide-react';
import { AnswerValue, Question } from '../../types';
import { QUESTIONS_DATA } from '../../data/questions';
import { AnswerButton } from './AnswerButton';
import { ProgressBar } from './ProgressBar';

interface QuestionnaireProps {
  answers: Record<number, AnswerValue>;
  onAnswer: (questionId: number, value: AnswerValue) => void;
  currentIndex: number;
  onNavigate: (index: number) => void;
  onComplete: () => void;
  onReset: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  answers,
  onAnswer,
  currentIndex,
  onNavigate,
  onComplete,
  onReset,
}) => {
  const [showExampleModal, setShowExampleModal] = useState<boolean>(false);
  const [showWhyModal, setShowWhyModal] = useState<boolean>(false);
  const [showOverviewDrawer, setShowOverviewDrawer] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  const currentQuestion: Question = QUESTIONS_DATA[currentIndex] || QUESTIONS_DATA[0];
  const currentAnswer = answers[currentQuestion.id];
  const totalQuestions = QUESTIONS_DATA.length;

  const handleSelectAnswer = (value: AnswerValue) => {
    onAnswer(currentQuestion.id, value);

    // Auto advance smoothly to next question after small pause
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        onNavigate(currentIndex + 1);
      }, 180);
    } else {
      // Completed last question
      setIsFinishing(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      onNavigate(currentIndex + 1);
    } else {
      setIsFinishing(true);
    }
  };

  const handleSkip = () => {
    // Register as null (Não sei / Prefiro não responder)
    onAnswer(currentQuestion.id, null);
    if (currentIndex < totalQuestions - 1) {
      onNavigate(currentIndex + 1);
    } else {
      setIsFinishing(true);
    }
  };

  // Completion screen (Rule 68: "TESTE CONCLUÍDO. «Agora vamos analisar suas respostas.» Depois calcular o resultado.")
  if (isFinishing) {
    const answeredCount = Object.keys(answers).length;
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Etapa Final
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900">TESTE CONCLUÍDO</h2>
          <p className="text-lg text-stone-700 leading-relaxed max-w-md mx-auto">
            «Agora vamos analisar suas respostas.»
          </p>
          <p className="text-sm text-stone-500">
            Você respondeu {answeredCount} de {totalQuestions} perguntas.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs text-left text-xs sm:text-sm text-stone-600 space-y-2">
          <p className="font-semibold text-stone-900">O que faremos agora:</p>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Calcularemos sua preferência em 14 dimensões temáticas (-100 a +100).</li>
            <li>Identificaremos quais respostas mais influenciaram cada assunto.</li>
            <li>Apresentaremos seu perfil de forma neutra, transparente e anônima.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-calculate-profile"
            onClick={onComplete}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>CALCULAR MEU PERFIL</span>
          </button>

          <button
            onClick={() => setIsFinishing(false)}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-semibold text-sm border border-stone-300 transition-colors cursor-pointer"
          >
            Revisar Respostas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 px-4 space-y-6">
      {/* Progress Bar & Question Counter */}
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        answers={answers}
        onOpenOverview={() => setShowOverviewDrawer(true)}
      />

      {/* Main Question Card (Rule 66 & 7: clean question layout, no ideological bias revealed) */}
      <div
        id={`question-card-${currentQuestion.id}`}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
      >
        {/* Question Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Questão {currentQuestion.id} de {totalQuestions}
            </span>

            {/* Ver Exemplo Button (Rule 4) */}
            {currentQuestion.example && (
              <button
                id="btn-ver-exemplo"
                onClick={() => setShowExampleModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors cursor-pointer border border-amber-200"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>VER EXEMPLO</span>
              </button>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug tracking-tight">
            «{currentQuestion.text}»
          </h2>

          {/* Optional Why We Ask toggle */}
          {currentQuestion.whyWeAsk && (
            <div className="pt-1">
              <button
                onClick={() => setShowWhyModal(!showWhyModal)}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors font-medium"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showWhyModal ? 'Ocultar contexto' : 'Por que estamos perguntando?'}</span>
              </button>
              {showWhyModal && (
                <div className="mt-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 leading-relaxed">
                  {currentQuestion.whyWeAsk}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6 Answer Options (Rule 6) */}
        <div className="space-y-2.5 pt-2" role="radiogroup" aria-label="Opções de resposta">
          <AnswerButton
            id="ans-concordo-muito"
            label="CONCORDO MUITO"
            value={2}
            selectedValue={currentAnswer}
            onClick={() => handleSelectAnswer(2)}
          />
          <AnswerButton
            id="ans-concordo"
            label="CONCORDO"
            value={1}
            selectedValue={currentAnswer}
            onClick={() => handleSelectAnswer(1)}
          />
          <AnswerButton
            id="ans-neutro"
            label="NÃO CONCORDO NEM DISCORDO"
            value={0}
            selectedValue={currentAnswer}
            onClick={() => handleSelectAnswer(0)}
          />
          <AnswerButton
            id="ans-discordo"
            label="DISCORDO"
            value={-1}
            selectedValue={currentAnswer}
            onClick={() => handleSelectAnswer(-1)}
          />
          <AnswerButton
            id="ans-discordo-muito"
            label="DISCORDO MUITO"
            value={-2}
            selectedValue={currentAnswer}
            onClick={() => handleSelectAnswer(-2)}
          />
          <AnswerButton
            id="ans-nao-sei"
            label="NÃO SEI / PREFIRO NÃO RESPONDER"
            value={null}
            selectedValue={currentAnswer}
            onClick={() => handleSelectAnswer(null)}
            isNeutralOrSkip
          />
        </div>
      </div>

      {/* Navigation Controls (Rule 67: Voltar, Avançar, Responder, Pular) */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          id="btn-prev-question"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
            currentIndex === 0
              ? 'text-stone-300 bg-stone-100 cursor-not-allowed'
              : 'text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 shadow-2xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          id="btn-skip-question"
          onClick={handleSkip}
          className="px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
        >
          Pular esta pergunta
        </button>

        <button
          id="btn-next-question"
          onClick={handleNext}
          className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs"
        >
          <span>{currentIndex === totalQuestions - 1 ? 'Concluir' : 'Avançar'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal: VER EXEMPLO (Rule 4: strictly explanatory, non-judgmental) */}
      {showExampleModal && currentQuestion.example && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>Exemplo Explicativo</span>
              </div>
              <button
                onClick={() => setShowExampleModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
                aria-label="Fechar exemplo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 text-stone-800 text-sm leading-relaxed">
              <p className="font-medium">«{currentQuestion.example}»</p>
            </div>

            <p className="text-xs text-stone-500 leading-normal">
              * Este exemplo é puramente explicativo para esclarecer o significado prático da pergunta, sem expressar julgamento ou posicionamento favorável ou contrário.
            </p>

            <button
              onClick={() => setShowExampleModal(false)}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-colors"
            >
              Entendi e Quero Responder
            </button>
          </div>
        </div>
      )}

      {/* Overview Drawer / Modal (to jump to any question) */}
      {showOverviewDrawer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="w-5 h-5 text-stone-800" />
                <h3 className="font-bold text-stone-900 text-base">Navegar pelas 50 Perguntas</h3>
              </div>
              <button
                onClick={() => setShowOverviewDrawer(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-2 flex-1">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {QUESTIONS_DATA.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = idx === currentIndex;
                  let bg = 'bg-stone-100 text-stone-600';
                  if (ans !== undefined && ans !== null) {
                    bg = 'bg-emerald-600 text-white font-bold';
                  } else if (ans === null) {
                    bg = 'bg-stone-300 text-stone-700';
                  }

                  if (isCurrent) {
                    bg += ' ring-2 ring-amber-500 ring-offset-2';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onNavigate(idx);
                        setShowOverviewDrawer(false);
                      }}
                      className={`h-10 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${bg}`}
                      title={`Pergunta ${q.id}: ${q.text.slice(0, 40)}...`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 text-xs text-stone-500 flex items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block"></span> Respondida
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-md bg-stone-300 inline-block"></span> Não sei / Pulada
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-md bg-stone-100 inline-block"></span> Não respondida
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowOverviewDrawer(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
              >
                Fechar Navegador
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
