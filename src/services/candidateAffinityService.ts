import { CalculationResult } from '../types';
import {
  AFFINITY_TOPICS,
  CANDIDATE_POSITIONS_DATA,
  CandidatePositionProfile,
  TopicSource,
} from '../data/candidatePositions';

export interface TopicAffinityDetail {
  topicKey: string;
  topicLabel: string;
  userScore: number;
  candidateScore: number | null;
  percentage: number | null; // null if insufficient data
  hasSufficientData: boolean;
  statusMessage?: string;
  summary: string;
  sources: TopicSource[];
}

export interface CandidateAffinityResult {
  candidateId: string;
  nome: string;
  nomeDeUrna: string;
  partido: string;
  foto: string;
  status: string;
  numero: string;
  overallPercentage: number;
  topicDetails: TopicAffinityDetail[];
  topMatchingTopics: TopicAffinityDetail[];
  leastMatchingTopics: TopicAffinityDetail[];
  insufficientTopics: TopicAffinityDetail[];
  sources: TopicSource[];
  programaDeGovernoUrl: string;
  siteOficial: string;
  fonteTSE: string;
  consultationDate: string;
}

/**
 * Calculates affinity percentages for all candidates based on the user's completed questionnaire.
 */
export function calculateAllCandidatesAffinity(
  result: CalculationResult
): CandidateAffinityResult[] {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const affinities: CandidateAffinityResult[] = CANDIDATE_POSITIONS_DATA.map((candidate) => {
    const topicDetails: TopicAffinityDetail[] = [];
    const allSources: TopicSource[] = [];
    const seenUrls = new Set<string>();

    let totalValidPercentage = 0;
    let validTopicCount = 0;

    AFFINITY_TOPICS.forEach((topic) => {
      // Get user score for this dimension (-100 to +100)
      const userDim = result.dimensions[topic.dimensionKey as keyof typeof result.dimensions];
      const userScore = userDim ? userDim.score : 0;

      const candidatePos = candidate.positions[topic.key];

      if (candidatePos && candidatePos.score !== null) {
        // Calculate closeness percentage: 0% to 100%
        // Max distance is 200 (from -100 to +100)
        const distance = Math.abs(userScore - candidatePos.score);
        const percentage = Math.max(0, Math.min(100, Math.round(100 - distance / 2)));

        totalValidPercentage += percentage;
        validTopicCount += 1;

        candidatePos.sources.forEach((src) => {
          if (!seenUrls.has(src.url + src.nome)) {
            seenUrls.add(src.url + src.nome);
            allSources.push(src);
          }
        });

        topicDetails.push({
          topicKey: topic.key,
          topicLabel: topic.label,
          userScore,
          candidateScore: candidatePos.score,
          percentage,
          hasSufficientData: true,
          summary: candidatePos.summary,
          sources: candidatePos.sources,
        });
      } else {
        // Topic has insufficient public verifiable data
        topicDetails.push({
          topicKey: topic.key,
          topicLabel: topic.label,
          userScore,
          candidateScore: null,
          percentage: null,
          hasSufficientData: false,
          statusMessage: 'Não encontramos informações públicas suficientes para calcular este tema.',
          summary: candidatePos?.summary || 'Não encontramos informações públicas suficientes para calcular este tema.',
          sources: candidatePos?.sources || [{
            nome: 'Pesquisa em Documentos Oficiais do TSE',
            data: currentDate,
            url: 'https://divulgacandcontas.tse.jus.br/',
          }],
        });
      }
    });

    // Calculate overall affinity only based on topics with sufficient verifiable data
    const overallPercentage =
      validTopicCount > 0 ? Math.round(totalValidPercentage / validTopicCount) : 50;

    // Filter valid topics for highlights
    const validTopics = topicDetails.filter((t) => t.hasSufficientData && t.percentage !== null);
    const sortedByPercentage = [...validTopics].sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0));

    const topMatchingTopics = sortedByPercentage.slice(0, 3);
    const leastMatchingTopics = [...sortedByPercentage].reverse().slice(0, 3);
    const insufficientTopics = topicDetails.filter((t) => !t.hasSufficientData);

    // Fallback general sources if empty
    if (allSources.length === 0) {
      allSources.push({
        nome: 'DivulgaCandContas / Tribunal Superior Eleitoral (TSE)',
        data: currentDate,
        url: candidate.fonteTSE || 'https://divulgacandcontas.tse.jus.br/',
      });
    }

    return {
      candidateId: candidate.candidateId,
      nome: candidate.nome,
      nomeDeUrna: candidate.nomeDeUrna,
      partido: candidate.partido,
      foto: candidate.foto,
      status: candidate.status,
      numero: candidate.numero,
      overallPercentage,
      topicDetails,
      topMatchingTopics,
      leastMatchingTopics,
      insufficientTopics,
      sources: allSources,
      programaDeGovernoUrl: candidate.programaDeGovernoUrl,
      siteOficial: candidate.siteOficial,
      fonteTSE: candidate.fonteTSE,
      consultationDate: currentDate,
    };
  });

  // Sort descending by overall percentage (without applying rank numbers)
  return affinities.sort((a, b) => b.overallPercentage - a.overallPercentage);
}
