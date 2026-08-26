import React from 'react';
import {
  X,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { CandidateAffinityResult } from '../../services/candidateAffinityService';
import { CandidateAvatar } from '../Candidates/CandidateAvatar';

interface AffinityWhyModalProps {
  affinity: CandidateAffinityResult;
  onClose: () => void;
  onOpenProposals: () => void;
}

export const AffinityWhyModal: React.FC<AffinityWhyModalProps> = ({
  affinity,
  onClose,
  onOpenProposals,
}) => {
  const topLabels = affinity.topMatchingTopics.map((t) => t.topicLabel.toLowerCase()).join(', ');
  const leastLabels = affinity.leastMatchingTopics.map((t) => t.topicLabel.toLowerCase()).join(', ');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-6 bg-stone-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <CandidateAvatar
              src={affinity.foto}
              name={affinity.nomeDeUrna}
              partyInitials={affinity.partido.split(' ')[0]}
              size="md"
              className="border-2 border-stone-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-400 font-extrabold text-xs">
                  {affinity.numero !== 'A definir' ? `Nº ${affinity.numero}` : 'Número a definir'}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {affinity.partido}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{affinity.nomeDeUrna}</h2>
              <p className="text-xs text-stone-300">
                Proximidade geral estimada: <strong className="text-amber-400">{affinity.overallPercentage}%</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Fechar modal de explicação"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 text-sm">
          {/* Main Explanation Banner */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-stone-700" />
              <span>Por que deu esse resultado?</span>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              O cálculo compara as respostas que você deu nas 50 situações do questionário com as posições e propostas públicas verificáveis registradas por este candidato em cada assunto temático.
            </p>
          </div>

          {/* Temas com Maior Concordância */}
          {affinity.topMatchingTopics.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Temas de Maior Concordância</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                Suas respostas indicaram <strong>maior proximidade</strong> com as posições apresentadas por este candidato nos temas de <strong>{topLabels}</strong>:
              </p>
              <div className="space-y-2 pt-1">
                {affinity.topMatchingTopics.map((topic) => (
                  <div
                    key={topic.topicKey}
                    className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <strong className="text-stone-900 block">{topic.topicLabel}</strong>
                      <p className="text-stone-600">{topic.summary}</p>
                    </div>
                    <span className="font-extrabold text-emerald-700 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 shrink-0">
                      {topic.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Temas com Menor Proximidade */}
          {affinity.leastMatchingTopics.length > 0 && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <TrendingDown className="w-4 h-4 text-stone-600" />
                <span>Temas com Menor Proximidade</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Suas respostas apresentaram <strong>menor proximidade</strong> com as posições apresentadas sobre <strong>{leastLabels}</strong>:
              </p>
              <div className="space-y-2 pt-1">
                {affinity.leastMatchingTopics.map((topic) => (
                  <div
                    key={topic.topicKey}
                    className="p-3 bg-white rounded-xl border border-stone-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <strong className="text-stone-900 block">{topic.topicLabel}</strong>
                      <p className="text-stone-600">{topic.summary}</p>
                    </div>
                    <span className="font-extrabold text-stone-700 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 shrink-0">
                      {topic.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Temas sem Dados Suficientes se houver */}
          {affinity.insufficientTopics.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Temas sem Informações Suficientes</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Para o(s) tema(s) <strong>{affinity.insufficientTopics.map((t) => t.topicLabel).join(', ')}</strong>, não encontramos documentos ou propostas públicas verificáveis suficientes registradas. Estes temas foram desconsiderados da média para não prejudicar artificialmente a porcentagem do candidato.
              </p>
            </div>
          )}

          {/* Meaning of Percentage Reminder */}
          <div className="p-4 bg-stone-100 rounded-2xl text-xs text-stone-600 space-y-1">
            <strong className="text-stone-900 block">Como interpretar esta porcentagem:</strong>
            <p>
              Estimativa de proximidade entre as respostas fornecidas no questionário e as posições/propostas públicas verificáveis utilizadas pelo aplicativo. Não significa concordância com tudo o que o candidato pensa nem recomendação eleitoral.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={onOpenProposals}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Ver propostas oficiais</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 font-bold text-xs sm:text-sm transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
