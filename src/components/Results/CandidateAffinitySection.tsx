import React, { useState } from 'react';
import {
  HelpCircle,
  FileText,
  BookOpen,
  Info,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { CalculationResult, Candidate } from '../../types';
import {
  calculateAllCandidatesAffinity,
  CandidateAffinityResult,
  TopicAffinityDetail,
} from '../../services/candidateAffinityService';
import { CANDIDATES_DATA } from '../../data/candidates';
import { CandidateAvatar } from '../Candidates/CandidateAvatar';
import { AffinityWhyModal } from './AffinityWhyModal';
import { AffinitySourcesModal } from './AffinitySourcesModal';
import { CandidateDetailsModal } from '../Candidates/CandidateDetailsModal';

interface CandidateAffinitySectionProps {
  result: CalculationResult;
  onExploreProposals: () => void;
}

export const CandidateAffinitySection: React.FC<CandidateAffinitySectionProps> = ({
  result,
  onExploreProposals,
}) => {
  const [selectedWhyAffinity, setSelectedWhyAffinity] = useState<CandidateAffinityResult | null>(null);
  const [selectedSourcesAffinity, setSelectedSourcesAffinity] = useState<CandidateAffinityResult | null>(null);
  const [selectedProposalsCandidate, setSelectedProposalsCandidate] = useState<Candidate | null>(null);
  const [expandedTopicsCard, setExpandedTopicsCard] = useState<Record<string, boolean>>({});

  const affinities = calculateAllCandidatesAffinity(result);

  const toggleExpandTopics = (candidateId: string) => {
    setExpandedTopicsCard((prev) => ({
      ...prev,
      [candidateId]: !prev[candidateId],
    }));
  };

  const handleOpenProposals = (candidateId: string) => {
    const candidate = CANDIDATES_DATA.find((c) => c.id === candidateId);
    if (candidate) {
      setSelectedProposalsCandidate(candidate);
    }
  };

  // Top tier (highest match) vs other candidates
  const highestPercentage = affinities[0]?.overallPercentage ?? 0;
  const topCandidates = affinities.filter(
    (c, idx) => idx === 0 || c.overallPercentage >= highestPercentage - 2
  );
  const otherCandidates = affinities.filter(
    (c) => !topCandidates.some((top) => top.candidateId === c.candidateId)
  );

  const currentDate = affinities[0]?.consultationDate || new Date().toLocaleDateString('pt-BR');

  const renderCandidateCard = (affinity: CandidateAffinityResult, isTop = false) => {
    const isExpanded = expandedTopicsCard[affinity.candidateId] ?? false;
    // Show 6 initial topics or all when expanded
    const displayedTopics = isExpanded ? affinity.topicDetails : affinity.topicDetails.slice(0, 6);

    return (
      <div
        key={affinity.candidateId}
        id={`affinity-card-${affinity.candidateId}`}
        className={`bg-white rounded-3xl p-5 sm:p-7 border transition-all duration-200 shadow-2xs space-y-6 ${
          isTop
            ? 'border-stone-400/80 ring-1 ring-stone-300/80 bg-linear-to-b from-stone-50/50 to-white'
            : 'border-stone-200 hover:border-stone-300'
        }`}
      >
        {/* Top Candidate Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CandidateAvatar
              src={affinity.foto}
              name={affinity.nomeDeUrna}
              partyInitials={affinity.partido.split(' ')[0]}
              size="lg"
              className="border-2 border-stone-200 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-extrabold text-xs">
                  {affinity.numero !== 'A definir' ? `Nº ${affinity.numero}` : 'Nº a definir'}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {affinity.status}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                {affinity.nomeDeUrna}
              </h3>
              <p className="text-xs text-stone-600 font-medium">{affinity.partido}</p>
            </div>
          </div>

          {/* Overall Affinity Score Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900 text-white flex sm:flex-col items-center justify-between sm:justify-center text-left sm:text-center min-w-[140px] shrink-0">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
              Proximidade Geral
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {affinity.overallPercentage}%
            </div>
          </div>
        </div>

        {/* Closeness Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-stone-500 font-medium">
            <span>Estimativa de proximidade temática</span>
            <span className="font-bold text-stone-800">{affinity.overallPercentage}%</span>
          </div>
          <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/60">
            <div
              className="h-full bg-stone-800 rounded-full transition-all duration-500"
              style={{ width: `${affinity.overallPercentage}%` }}
            />
          </div>
        </div>

        {/* Topics Breakdown Grid */}
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Proximidade por Assuntos
            </span>
            <span className="text-xs text-stone-400">
              {affinity.topicDetails.filter((t) => t.hasSufficientData).length} de {affinity.topicDetails.length} temas com dados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {displayedTopics.map((topic) => (
              <div
                key={topic.topicKey}
                className={`p-3 rounded-2xl border text-xs flex flex-col justify-between gap-1.5 transition-colors ${
                  topic.hasSufficientData
                    ? 'bg-stone-50/80 border-stone-200/80'
                    : 'bg-amber-50/40 border-amber-200/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-stone-900 truncate">{topic.topicLabel}</span>
                  {topic.hasSufficientData && topic.percentage !== null ? (
                    <span className="font-extrabold text-xs px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-800 shrink-0">
                      {topic.percentage}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                      Sem dados
                    </span>
                  )}
                </div>

                {topic.hasSufficientData ? (
                  <p className="text-stone-500 text-[11px] line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                ) : (
                  <p className="text-amber-800/90 text-[11px] leading-relaxed italic">
                    Não encontramos informações públicas suficientes para calcular este tema.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Toggle show all topics */}
          {affinity.topicDetails.length > 6 && (
            <button
              onClick={() => toggleExpandTopics(affinity.candidateId)}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 pt-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Mostrar menos assuntos</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Ver todos os {affinity.topicDetails.length} assuntos ({affinity.topicDetails.length - 6} restantes)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Action Buttons: Por que deu esse resultado? | Ver propostas | Ver fontes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-stone-100">
          {/* Button 1: Por que deu esse resultado? */}
          <button
            onClick={() => setSelectedWhyAffinity(affinity)}
            className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
            <span>Por que deu esse resultado?</span>
          </button>

          {/* Button 2: Ver propostas */}
          <button
            onClick={() => handleOpenProposals(affinity.candidateId)}
            className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-stone-600" />
            <span>Ver propostas oficiais</span>
          </button>

          {/* Button 3: Ver fontes */}
          <button
            onClick={() => setSelectedSourcesAffinity(affinity)}
            className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-600" />
            <span>Ver fontes ({affinity.sources.length})</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Introduction Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Comparação Temática Transparente</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          COM QUAIS CANDIDATOS MINHAS OPINIÕES MAIS SE APROXIMAM?
        </h2>

        <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-3xl">
          Com base nas suas respostas, veja quais candidatos apresentam posições e propostas mais próximas das suas opiniões.
        </p>

        {/* Meaning of Percentage Box */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-600 flex items-start gap-3">
          <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-stone-900">Como interpretar as porcentagens:</strong>
            <p className="leading-relaxed">
              Estimativa de proximidade entre as respostas fornecidas no questionário e as posições/propostas públicas verificáveis utilizadas pelo aplicativo.
            </p>
          </div>
        </div>

        {/* Dynamic Consultation Date */}
        <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
          <span>Dados consultados em:</span>
          <strong className="text-stone-800">{currentDate}</strong>
        </div>
      </div>

      {/* Top Affinity Candidates */}
      {topCandidates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Maior proximidade encontrada</span>
            </h3>
            <span className="text-xs text-stone-500">
              {topCandidates.length} candidato(s) com maior percentual de convergência
            </span>
          </div>

          <div className="space-y-4">
            {topCandidates.map((cand) => renderCandidateCard(cand, true))}
          </div>
        </div>
      )}

      {/* Other Candidates */}
      {otherCandidates.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900">
              Outras proximidades
            </h3>
            <span className="text-xs text-stone-500">
              Demais candidaturas registradas em ordem de proximidade
            </span>
          </div>

          <div className="space-y-4">
            {otherCandidates.map((cand) => renderCandidateCard(cand, false))}
          </div>
        </div>
      )}

      {/* Final Transparency Notice */}
      <div className="p-6 rounded-3xl bg-stone-900 text-stone-300 text-xs sm:text-sm space-y-2 border border-stone-800">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Aviso de Transparência e Apartidarismo</span>
        </div>
        <p className="leading-relaxed text-stone-300">
          «Esta comparação é uma estimativa baseada nas respostas do questionário e nas posições/propostas públicas verificáveis utilizadas pelo aplicativo. Ela não representa uma recomendação de voto e não determina qual candidato você deve escolher.»
        </p>
      </div>

      {/* Modals */}
      {selectedWhyAffinity && (
        <AffinityWhyModal
          affinity={selectedWhyAffinity}
          onClose={() => setSelectedWhyAffinity(null)}
          onOpenProposals={() => {
            const cId = selectedWhyAffinity.candidateId;
            setSelectedWhyAffinity(null);
            handleOpenProposals(cId);
          }}
        />
      )}

      {selectedSourcesAffinity && (
        <AffinitySourcesModal
          affinity={selectedSourcesAffinity}
          onClose={() => setSelectedSourcesAffinity(null)}
        />
      )}

      {selectedProposalsCandidate && (
        <CandidateDetailsModal
          candidate={selectedProposalsCandidate}
          onClose={() => setSelectedProposalsCandidate(null)}
        />
      )}
    </div>
  );
};
