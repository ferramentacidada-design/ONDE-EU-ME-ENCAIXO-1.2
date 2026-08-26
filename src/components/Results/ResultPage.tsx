import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  RotateCcw,
  Share2,
  Table,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AnswerValue, CalculationResult, DimensionKey } from '../../types';
import { QUESTIONS_DATA } from '../../data/questions';
import { DimensionChart } from './DimensionChart';
import { ShareProfileCard } from './ShareProfileCard';
import { CandidateAffinitySection } from './CandidateAffinitySection';

interface ResultPageProps {
  result: CalculationResult;
  answers: Record<number, AnswerValue>;
  onRetakeTest: () => void;
  onExploreCandidates: () => void;
  onExploreProposals: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  result,
  answers,
  onRetakeTest,
  onExploreCandidates,
  onExploreProposals,
}) => {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'afinidade-candidatos' | 'perfil' | 'assuntos' | 'por-que' | 'compartilhar'
  >('afinidade-candidatos');

  const answerLabels: Record<number, string> = {
    2: 'Concordo Muito (+2)',
    1: 'Concordo (+1)',
    0: 'Não concordo nem discordo (0)',
    [-1]: 'Discordo (-1)',
    [-2]: 'Discordo Muito (-2)',
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-12">
      {/* Top Banner / Breadcrumb */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Resultado do Questionário
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          SEU PERFIL POLÍTICO
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Análise baseada em suas {result.answeredCount} respostas nas 50 situações apresentadas.
        </p>
      </div>

      {/* Main Overall Profile Card (Rule 34) */}
      <div
        id="result-main-card"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
          Posição Estimada Geral
        </span>

        {/* Classification Title */}
        <div className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight">
          {result.classification}
        </div>

        {/* Borderline notice if applicable (Rule 33) */}
        {result.isBorderline && result.borderlineText && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs sm:text-sm font-semibold border border-amber-200">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{result.borderlineText}</span>
          </div>
        )}

        {/* Explanatory Text (Rule 34) */}
        <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
          «{result.summaryText}»
        </p>

        {/* Macro Axes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-100 text-left">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-semibold text-stone-500 block">Eixo Econômico</span>
            <span className="font-bold text-sm text-stone-900">
              {result.economicAxis > 15 ? 'Mercado Livre' : result.economicAxis < -15 ? 'Atuação Estatal' : 'Equilibrado'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-semibold text-stone-500 block">Tamanho do Estado</span>
            <span className="font-bold text-sm text-stone-900">
              {result.stateAxis > 15 ? 'Estado Enxuto' : result.stateAxis < -15 ? 'Estado Presente' : 'Moderado'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-semibold text-stone-500 block">Área Social</span>
            <span className="font-bold text-sm text-stone-900">
              {result.socialAxis < -15 ? 'Foco Social Amplo' : result.socialAxis > 15 ? 'Foco em Emprego' : 'Intermediário'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-semibold text-stone-500 block">Meio Ambiente</span>
            <span className="font-bold text-sm text-stone-900">
              {result.environmentAxis < -15 ? 'Preservação Rígida' : result.environmentAxis > 15 ? 'Foco em Produção' : 'Equilibrado'}
            </span>
          </div>
        </div>

        {/* Quality of Result & Consistency Box (Rule 36, 37) */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2 text-left text-xs sm:text-sm">
          {/* Consistency (Rule 36) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Consistência entre Assuntos</span>
            </div>
            <p className="text-stone-600 leading-relaxed">{result.consistencyText}</p>
          </div>

          {/* Confidence (Rule 37) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Qualidade do Resultado</span>
              </div>
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  result.confidence === 'Alta'
                    ? 'bg-emerald-100 text-emerald-800'
                    : result.confidence === 'Média'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                Precisão {result.confidence}
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">{result.confidenceText}</p>
          </div>
        </div>

        {/* Non-Recommendation Statement (Rule 38) */}
        <div className="p-4 rounded-2xl bg-stone-900 text-stone-300 text-xs sm:text-sm text-left flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white">Lembrete de Neutralidade Soberana:</strong>
            <p>
              Este resultado não é uma recomendação eleitoral. O aplicativo nunca dirá em quem você deve votar. Recomendamos que você agora consulte as propostas oficiais de todos os candidatos.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Deep Dive */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('afinidade-candidatos')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0 flex items-center gap-1.5 ${
            activeTab === 'afinidade-candidatos'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>COM QUAIS CANDIDATOS MINHAS OPINIÕES MAIS SE APROXIMAM?</span>
        </button>

        <button
          onClick={() => setActiveTab('perfil')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0 ${
            activeTab === 'perfil'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Perfil por Assunto (14 Áreas)
        </button>

        <button
          onClick={() => setActiveTab('por-que')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0 ${
            activeTab === 'por-que'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Por que o resultado deu isso?
        </button>

        <button
          onClick={() => setActiveTab('compartilhar')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0 flex items-center gap-1.5 ${
            activeTab === 'compartilhar'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Compartilhar Perfil</span>
        </button>
      </div>

      {/* Tab: COM QUAIS CANDIDATOS MINHAS OPINIÕES MAIS SE APROXIMAM? */}
      {activeTab === 'afinidade-candidatos' && (
        <CandidateAffinitySection
          result={result}
          onExploreProposals={onExploreProposals}
        />
      )}

      {/* Tab 1: Perfil por Assunto */}
      {activeTab === 'perfil' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900">
              SEU PERFIL POR ASSUNTO
            </h2>
            <span className="text-xs text-stone-500">
              14 dimensões temáticas calculadas
            </span>
          </div>

          <DimensionChart dimensions={result.dimensions} />
        </div>
      )}

      {/* Tab 2: Por que o resultado deu isso? (Rule 35) */}
      {activeTab === 'por-que' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-stone-900">
              POR QUE O RESULTADO DEU ISSO?
            </h2>
            <p className="text-sm text-stone-600">
              Veja as perguntas e respostas que mais influenciaram cada dimensão no cálculo matemático:
            </p>
          </div>

          <div className="space-y-6">
            {Object.values(result.dimensions).map((dim) => (
              <div
                key={dim.key}
                className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-stone-900">{dim.label}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800">
                      {dim.classification}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">
                    {dim.answeredCount} respondida(s) de {dim.totalQuestions}
                  </span>
                </div>

                {dim.topInfluences.length > 0 ? (
                  <div className="space-y-3">
                    {dim.topInfluences.map((inf, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs sm:text-sm space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-stone-500 text-xs">
                          <span>Pergunta #{inf.questionId}</span>
                          <span className="font-bold text-stone-800">
                            Sua resposta: {inf.answerValue !== null ? answerLabels[inf.answerValue] : 'Não sei'}
                          </span>
                        </div>
                        <p className="font-semibold text-stone-900">«{inf.questionText}»</p>
                        <p className="text-stone-600 text-xs">{inf.explanation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500 italic">
                    Não houve respostas diretas suficientes com peso nesta área.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Compartilhar Meu Perfil (Rule 69) */}
      {activeTab === 'compartilhar' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-stone-900">
              COMPARTILHAR MEU PERFIL
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Gere um cartão visual neutro para download ou compartilhamento com amigos e familiares.
            </p>
          </div>

          <ShareProfileCard result={result} />
        </div>
      )}

      {/* View All Answers Toggle (Rule 82) */}
      <div className="pt-6 border-t border-stone-200">
        <button
          onClick={() => setShowAllAnswers(!showAllAnswers)}
          className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 flex items-center justify-between text-stone-900 font-bold text-sm sm:text-base transition-colors"
        >
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-stone-600" />
            <span>VER TODAS AS MINHAS 50 RESPOSTAS</span>
          </div>
          {showAllAnswers ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showAllAnswers && (
          <div className="mt-4 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3.5 w-12 text-center">#</th>
                    <th className="p-3.5">Pergunta</th>
                    <th className="p-3.5">Sua Resposta</th>
                    <th className="p-3.5">Área Principal</th>
                    <th className="p-3.5 text-center">Peso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {QUESTIONS_DATA.map((q) => {
                    const ans = answers[q.id];
                    return (
                      <tr key={q.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="p-3.5 text-center font-bold text-stone-500">{q.id}</td>
                        <td className="p-3.5 font-medium text-stone-900">{q.text}</td>
                        <td className="p-3.5 font-semibold text-stone-700">
                          {ans !== undefined && ans !== null ? (
                            <span className={ans > 0 ? 'text-emerald-700' : ans < 0 ? 'text-rose-700' : 'text-stone-600'}>
                              {answerLabels[ans]}
                            </span>
                          ) : (
                            <span className="text-stone-400 italic">Não respondida / Não sei</span>
                          )}
                        </td>
                        <td className="p-3.5 text-stone-600">{q.category}</td>
                        <td className="p-3.5 text-center font-mono text-xs text-stone-500">{q.weight.toFixed(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Next Step: Presidential Elections 2026 CTA */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Segunda Parte do Aplicativo
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Agora conheça as propostas dos candidatos
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed">
            Agora que você compreendeu suas próprias opiniões, veja o que cada candidatura à Presidência da República em 2026 propõe oficialmente para os temas que você considera mais importantes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onExploreCandidates}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Ver Candidatos e Programas</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </button>

          <button
            onClick={onExploreProposals}
            className="px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-sm border border-stone-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Comparar Propostas por Assunto</span>
          </button>
        </div>
      </div>

      {/* Retake Test Button (Rule 83) */}
      <div className="text-center pt-2">
        <button
          onClick={() => setShowRetakeModal(true)}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>REFAZER TESTE</span>
        </button>
      </div>

      {/* Modal: Confirm Retake Test */}
      {showRetakeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center gap-3 text-stone-900 font-bold text-lg">
              <RotateCcw className="w-6 h-6 text-amber-600" />
              <h3>Refazer o Questionário?</h3>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              Você deseja reiniciar as respostas do questionário? Suas respostas atuais serão redefinidas neste dispositivo para que você possa responder novamente do início.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRetakeModal(false)}
                className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowRetakeModal(false);
                  onRetakeTest();
                }}
                className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-colors"
              >
                Sim, Refazer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
