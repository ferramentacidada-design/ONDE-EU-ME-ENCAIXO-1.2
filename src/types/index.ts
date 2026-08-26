export type AnswerValue = 2 | 1 | 0 | -1 | -2 | null;

export type AppView =
  | 'home'
  | 'como-funciona'
  | 'questionario'
  | 'resultado'
  | 'candidatos'
  | 'comparar'
  | 'educativo'
  | 'privacidade'
  | 'admin';

export type ContrastMode = 'normal' | 'alto-contraste';

export type FontSizeLevel = 'normal' | 'grande' | 'extra-grande';

export type DimensionKey =
  | 'economia'
  | 'estado'
  | 'impostos'
  | 'programas_sociais'
  | 'trabalho'
  | 'saude'
  | 'educacao'
  | 'seguranca'
  | 'justica'
  | 'armas'
  | 'liberdade_individual'
  | 'costumes'
  | 'meio_ambiente'
  | 'igualdade_social';

export type MainCategory =
  | 'Economia e impostos'
  | 'Emprego e salários'
  | 'Programas sociais'
  | 'Saúde'
  | 'Educação'
  | 'Segurança pública'
  | 'Justiça e punições'
  | 'Armas'
  | 'Tamanho do governo'
  | 'Privatizações'
  | 'Meio ambiente'
  | 'Liberdade individual'
  | 'Família e costumes'
  | 'Religião e Estado'
  | 'Direitos individuais'
  | 'Relação entre governo e população';

export interface Question {
  id: number;
  text: string;
  category: MainCategory;
  example?: string;
  whyWeAsk?: string;
  primaryDimension: DimensionKey;
  secondaryDimension?: DimensionKey;
  // +1 indicates agreeing moves towards right/market/smaller state/traditional/deregulation,
  // -1 indicates agreeing moves towards left/state action/social protection/regulation/progressive
  direction: 1 | -1;
  weight: number;
}

export type PoliticalClassification =
  | 'ESQUERDA'
  | 'CENTRO-ESQUERDA'
  | 'CENTRO'
  | 'CENTRO-DIREITA'
  | 'DIREITA';

export interface DimensionScore {
  key: DimensionKey;
  label: string;
  score: number; // -100 to +100
  classification: PoliticalClassification;
  answeredCount: number;
  totalQuestions: number;
  topInfluences: {
    questionId: number;
    questionText: string;
    answerValue: AnswerValue;
    explanation: string;
  }[];
}

export interface CalculationResult {
  overallScore: number; // -100 to +100
  classification: PoliticalClassification;
  isBorderline: boolean;
  borderlineText?: string;
  confidence: 'Alta' | 'Média' | 'Baixa';
  confidenceText: string;
  answeredCount: number;
  totalQuestions: number;
  dimensions: Record<DimensionKey, DimensionScore>;
  summaryText: string;
  consistencyText: string;
  economicAxis: number;
  stateAxis: number;
  socialAxis: number;
  freedomAxis: number;
  environmentAxis: number;
  timestamp: string;
}

export interface Candidate {
  id: string;
  nome: string;
  nomeDeUrna: string;
  partido: string;
  vice: string;
  partidoVice: string;
  numero: string;
  status: 'Registrado' | 'Pré-candidatura' | 'Aguardando julgamento' | 'Confirmado em convenção';
  foto: string;
  programaDeGoverno: string;
  programaDeGovernoUrl?: string;
  siteOficial: string;
  fonteTSE: string;
  dataAtualizacao: string;
  divergencyAlert?: string;
  biografiaCurta: string;
  propostasDestaque: string[];
}

export type ProposalCategory =
  | 'Economia'
  | 'Impostos'
  | 'Emprego'
  | 'Salários'
  | 'Inflação'
  | 'Saúde'
  | 'Educação'
  | 'Segurança'
  | 'Justiça'
  | 'Armas'
  | 'Programas sociais'
  | 'Previdência'
  | 'Meio ambiente'
  | 'Agricultura'
  | 'Indústria'
  | 'Infraestrutura'
  | 'Privatizações'
  | 'Estatais'
  | 'Administração pública'
  | 'Corrupção'
  | 'Liberdade individual'
  | 'Costumes'
  | 'Relações internacionais'
  | 'Tecnologia'
  | 'Habitação';

export interface Proposal {
  proposalId: string;
  candidateId: string;
  categoria: ProposalCategory;
  titulo: string;
  resumo: string;
  textoOriginal: string;
  fonte: string;
  url: string;
  dataPublicacao: string;
  dataConsulta: string;
  versao: number;
  versaoAnterior?: {
    versao: number;
    resumo: string;
    dataAlteracao: string;
    fonte: string;
  };
  status: 'Oficial' | 'Declaração Pública' | 'Em Análise';
  isPublicStatement?: boolean;
}

export type UserProposalNote = 'concordo' | 'tenho_duvidas' | 'discordo';

export interface ChangeLogItem {
  id: string;
  data: string;
  alteracao: string;
  valorAnterior: string;
  valorNovo: string;
  fonte: string;
  administrador: string;
}

export interface WeightConfig {
  economia: number;
  estado: number;
  programas_sociais: number;
  seguranca: number;
  liberdade_individual: number;
  saude: number;
  educacao: number;
  meio_ambiente: number;
  trabalho: number;
}
