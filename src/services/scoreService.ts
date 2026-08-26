import {
  AnswerValue,
  CalculationResult,
  DimensionKey,
  DimensionScore,
  PoliticalClassification,
  Question,
  WeightConfig,
} from '../types';
import { QUESTIONS_DATA } from '../data/questions';

export const DEFAULT_WEIGHT_CONFIG: WeightConfig = {
  economia: 0.20,
  estado: 0.15,
  programas_sociais: 0.15,
  seguranca: 0.15,
  liberdade_individual: 0.10,
  saude: 0.05,
  educacao: 0.05,
  meio_ambiente: 0.10,
  trabalho: 0.05,
};

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  economia: 'Economia',
  estado: 'Tamanho do Estado',
  impostos: 'Impostos',
  programas_sociais: 'Programas Sociais',
  trabalho: 'Trabalho e Renda',
  saude: 'Saúde Pública',
  educacao: 'Educação',
  seguranca: 'Segurança Pública',
  justica: 'Justiça e Punições',
  armas: 'Armas',
  liberdade_individual: 'Liberdade Individual',
  costumes: 'Costumes e Família',
  meio_ambiente: 'Meio Ambiente',
  igualdade_social: 'Igualdade Social',
};

/**
 * Classifies a numerical score (-100 to +100) into 5 broad political spectrum ranges
 */
export function classifyPoliticalProfile(score: number): {
  classification: PoliticalClassification;
  isBorderline: boolean;
  borderlineText?: string;
} {
  // Broad thresholds:
  // -100 to -40: Esquerda
  // -40 to -12: Centro-Esquerda
  // -12 to +12: Centro
  // +12 to +40: Centro-Direita
  // +40 to +100: Direita

  let classification: PoliticalClassification = 'CENTRO';
  let isBorderline = false;
  let borderlineText: string | undefined = undefined;

  if (score < -40) {
    classification = 'ESQUERDA';
    if (score >= -43) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou na transição entre Centro-Esquerda e Esquerda.';
    }
  } else if (score < -12) {
    classification = 'CENTRO-ESQUERDA';
    if (score <= -37) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou próximo da transição para a Esquerda.';
    } else if (score >= -15) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou na transição entre Centro e Centro-Esquerda.';
    }
  } else if (score <= 12) {
    classification = 'CENTRO';
    if (score <= -10) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou entre Centro e Centro-Esquerda.';
    } else if (score >= 10) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou entre Centro e Centro-Direita.';
    }
  } else if (score <= 40) {
    classification = 'CENTRO-DIREITA';
    if (score <= 15) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou na transição entre Centro e Centro-Direita.';
    } else if (score >= 37) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou próximo da transição para a Direita.';
    }
  } else {
    classification = 'DIREITA';
    if (score <= 43) {
      isBorderline = true;
      borderlineText = 'Seu resultado ficou na transição entre Centro-Direita e Direita.';
    }
  }

  return { classification, isBorderline, borderlineText };
}

/**
 * Calculates single dimension score normalized between -100 and +100
 */
export function calculateDimensionScore(
  dimKey: DimensionKey,
  answers: Record<number, AnswerValue>,
  questions: Question[] = QUESTIONS_DATA
): DimensionScore {
  const relatedQuestions = questions.filter(
    (q) => q.primaryDimension === dimKey || q.secondaryDimension === dimKey
  );

  let totalWeightedScore = 0;
  let maxPossibleScore = 0;
  let answeredCount = 0;

  const influences: {
    questionId: number;
    questionText: string;
    answerValue: AnswerValue;
    explanation: string;
    impact: number;
  }[] = [];

  for (const q of relatedQuestions) {
    const ans = answers[q.id];
    if (ans !== undefined && ans !== null) {
      answeredCount++;
      const isPrimary = q.primaryDimension === dimKey;
      const effectiveWeight = q.weight * (isPrimary ? 1.0 : 0.5);

      // ans ranges from -2 to +2
      // q.direction is +1 or -1
      // contribution = ans * q.direction * effectiveWeight
      const contribution = ans * q.direction * effectiveWeight;
      totalWeightedScore += contribution;
      maxPossibleScore += 2 * effectiveWeight;

      if (Math.abs(ans) > 0) {
        let explanation = '';
        if (ans > 0) {
          explanation = `Você concordou com a afirmação "${q.text}". Isso influenciou sua posição nesta área.`;
        } else if (ans < 0) {
          explanation = `Você discordou da afirmação "${q.text}". Isso contribuiu para o cálculo desta dimensão.`;
        }
        influences.push({
          questionId: q.id,
          questionText: q.text,
          answerValue: ans,
          explanation,
          impact: Math.abs(contribution),
        });
      }
    }
  }

  // Normalize to -100 to +100
  const normalizedScore =
    maxPossibleScore > 0
      ? Math.round((totalWeightedScore / maxPossibleScore) * 100)
      : 0;

  const { classification } = classifyPoliticalProfile(normalizedScore);

  // Sort influences by highest impact
  influences.sort((a, b) => b.impact - a.impact);

  return {
    key: dimKey,
    label: DIMENSION_LABELS[dimKey],
    score: Math.max(-100, Math.min(100, normalizedScore)),
    classification,
    answeredCount,
    totalQuestions: relatedQuestions.length,
    topInfluences: influences.slice(0, 3).map(({ questionId, questionText, answerValue, explanation }) => ({
      questionId,
      questionText,
      answerValue,
      explanation,
    })),
  };
}

/**
 * Calculates result confidence based on answered ratio
 */
export function calculateResultConfidence(
  answeredCount: number,
  totalQuestions: number
): { confidence: 'Alta' | 'Média' | 'Baixa'; text: string } {
  const ratio = answeredCount / totalQuestions;

  if (ratio >= 0.8) {
    return {
      confidence: 'Alta',
      text: 'Seu resultado possui alta consistência dentro deste questionário.',
    };
  } else if (ratio >= 0.6) {
    return {
      confidence: 'Média',
      text: 'Seu resultado possui precisão moderada. Para maior precisão, responda às perguntas que foram puladas.',
    };
  } else {
    return {
      confidence: 'Baixa',
      text: 'Não há respostas suficientes para calcular um perfil confiável. Recomendamos responder pelo menos 60% das perguntas.',
    };
  }
}

/**
 * Master calculation of full profile across all dimensions
 */
export function calculateOverallProfile(
  answers: Record<number, AnswerValue>,
  weights: WeightConfig = DEFAULT_WEIGHT_CONFIG
): CalculationResult {
  const totalQuestions = QUESTIONS_DATA.length;
  let answeredCount = 0;

  for (const q of QUESTIONS_DATA) {
    if (answers[q.id] !== undefined && answers[q.id] !== null) {
      answeredCount++;
    }
  }

  const allDimensions: DimensionKey[] = [
    'economia',
    'estado',
    'impostos',
    'programas_sociais',
    'trabalho',
    'saude',
    'educacao',
    'seguranca',
    'justica',
    'armas',
    'liberdade_individual',
    'costumes',
    'meio_ambiente',
    'igualdade_social',
  ];

  const dimScores: Record<DimensionKey, DimensionScore> = {} as any;
  for (const dim of allDimensions) {
    dimScores[dim] = calculateDimensionScore(dim, answers);
  }

  // Composite Macro Axes (-100 to +100):
  // 1. Economic Axis: Economia + Impostos
  const economicAxis = Math.round(
    dimScores.economia.score * 0.6 + dimScores.impostos.score * 0.4
  );

  // 2. State Axis: Tamanho do Estado
  const stateAxis = dimScores.estado.score;

  // 3. Social Axis: Programas Sociais + Igualdade Social + Saúde + Educação
  const socialAxis = Math.round(
    dimScores.programas_sociais.score * 0.4 +
      dimScores.igualdade_social.score * 0.3 +
      dimScores.saude.score * 0.15 +
      dimScores.educacao.score * 0.15
  );

  // 4. Freedom & Customs Axis: Liberdade Individual + Costumes + Armas + Justiça
  const freedomAxis = Math.round(
    dimScores.liberdade_individual.score * 0.3 +
      dimScores.costumes.score * 0.3 +
      dimScores.armas.score * 0.2 +
      dimScores.justica.score * 0.2
  );

  // 5. Environment Axis
  const environmentAxis = dimScores.meio_ambiente.score;

  // Overall Weighted Score
  const overallScore = Math.round(
    dimScores.economia.score * weights.economia +
      dimScores.estado.score * weights.estado +
      dimScores.programas_sociais.score * weights.programas_sociais +
      dimScores.seguranca.score * weights.seguranca +
      dimScores.liberdade_individual.score * weights.liberdade_individual +
      dimScores.saude.score * weights.saude +
      dimScores.educacao.score * weights.educacao +
      dimScores.meio_ambiente.score * weights.meio_ambiente +
      dimScores.trabalho.score * weights.trabalho
  );

  const { classification, isBorderline, borderlineText } =
    classifyPoliticalProfile(overallScore);

  const { confidence, text: confidenceText } = calculateResultConfidence(
    answeredCount,
    totalQuestions
  );

  // Consistency analysis
  const scoresList = [
    dimScores.economia.score,
    dimScores.seguranca.score,
    dimScores.programas_sociais.score,
    dimScores.liberdade_individual.score,
    dimScores.costumes.score,
  ];
  const maxScore = Math.max(...scoresList);
  const minScore = Math.min(...scoresList);
  const scoreSpread = maxScore - minScore;

  let consistencyText = '';
  if (scoreSpread > 60) {
    consistencyText =
      'Suas opiniões variam bastante conforme o assunto. Isso é normal e significa que você não se encaixa perfeitamente em uma única posição política fechada.';
  } else {
    consistencyText =
      'Suas respostas demonstram uma linha de pensamento relativamente homogênea entre os diferentes assuntos abordados.';
  }

  // Pedagogical summary description for user
  let summaryText = '';
  switch (classification) {
    case 'ESQUERDA':
      summaryText =
        'Suas respostas apresentam uma combinação de opiniões com forte ênfase na atuação pública do Estado, expansão de programas sociais, redução das desigualdades e defesa de direitos coletivos.';
      break;
    case 'CENTRO-ESQUERDA':
      summaryText =
        'Suas respostas indicam preferência por políticas públicas ativas de proteção social, valorização dos serviços públicos e regulação moderada da economia.';
      break;
    case 'CENTRO':
      summaryText =
        'Suas respostas apresentam uma combinação de opiniões que fica próxima do centro político dentro do modelo utilizado pelo aplicativo, mesclando pontos de vista de diferentes visões.';
      break;
    case 'CENTRO-DIREITA':
      summaryText =
        'Suas respostas indicam preferência pela iniciativa privada, responsabilidade fiscal, incentivo ao empreendedorismo e equilíbrio na atuação estatal.';
      break;
    case 'DIREITA':
      summaryText =
        'Suas respostas apresentam forte ênfase na liberdade de mercado, redução da intervenção estatal, preservação da ordem pública e autonomia individual na economia e costumes.';
      break;
  }

  return {
    overallScore: Math.max(-100, Math.min(100, overallScore)),
    classification,
    isBorderline,
    borderlineText,
    confidence,
    confidenceText,
    answeredCount,
    totalQuestions,
    dimensions: dimScores,
    summaryText,
    consistencyText,
    economicAxis,
    stateAxis,
    socialAxis,
    freedomAxis,
    environmentAxis,
    timestamp: new Date().toISOString(),
  };
}
