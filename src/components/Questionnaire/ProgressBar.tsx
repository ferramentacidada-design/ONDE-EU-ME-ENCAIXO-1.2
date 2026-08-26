import React from 'react';
import { Check, List } from 'lucide-react';
import { AnswerValue } from '../../types';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  answers: Record<number, AnswerValue>;
  onOpenOverview: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  answers,
  onOpenOverview,
}) => {
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full space-y-2 mb-6" aria-label="Progresso do Questionário">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-700">
        <span className="text-stone-900 font-bold">
          PERGUNTA {currentIndex + 1} DE {totalQuestions}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-stone-500 hidden sm:inline">
            {answeredCount} respondida{answeredCount !== 1 ? 's' : ''} ({Math.round((answeredCount / totalQuestions) * 100)}%)
          </span>
          <button
            onClick={onOpenOverview}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
            title="Ver todas as 50 perguntas"
          >
            <List className="w-3.5 h-3.5" />
            <span>Navegar</span>
          </button>
        </div>
      </div>

      {/* Bar */}
      <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-stone-900 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
