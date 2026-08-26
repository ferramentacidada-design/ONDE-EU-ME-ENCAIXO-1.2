import { Candidate } from '../types';

export interface TopicSource {
  nome: string;
  data: string;
  url: string;
  descricao?: string;
}

export interface CandidateTopicPosition {
  topicKey: string;
  topicLabel: string;
  score: number | null; // -100 to +100, or null if insufficient data
  summary: string;
  sources: TopicSource[];
}

export interface CandidatePositionProfile {
  candidateId: string;
  nome: string;
  nomeDeUrna: string;
  partido: string;
  foto: string;
  status: string;
  numero: string;
  programaDeGovernoUrl: string;
  siteOficial: string;
  fonteTSE: string;
  positions: Record<string, CandidateTopicPosition>;
}

export const AFFINITY_TOPICS = [
  { key: 'economia', label: 'Economia', dimensionKey: 'economia' },
  { key: 'impostos', label: 'Impostos', dimensionKey: 'impostos' },
  { key: 'emprego', label: 'Emprego', dimensionKey: 'trabalho' },
  { key: 'programas_sociais', label: 'Programas sociais', dimensionKey: 'programas_sociais' },
  { key: 'saude', label: 'Saúde', dimensionKey: 'saude' },
  { key: 'educacao', label: 'Educação', dimensionKey: 'educacao' },
  { key: 'seguranca', label: 'Segurança', dimensionKey: 'seguranca' },
  { key: 'justica', label: 'Justiça', dimensionKey: 'justica' },
  { key: 'armas', label: 'Armas', dimensionKey: 'armas' },
  { key: 'estado', label: 'Tamanho do Estado', dimensionKey: 'estado' },
  { key: 'privatizacoes', label: 'Privatizações', dimensionKey: 'estado' },
  { key: 'meio_ambiente', label: 'Meio ambiente', dimensionKey: 'meio_ambiente' },
  { key: 'liberdade_individual', label: 'Liberdade individual', dimensionKey: 'liberdade_individual' },
  { key: 'costumes', label: 'Costumes', dimensionKey: 'costumes' },
  { key: 'igualdade_social', label: 'Igualdade social', dimensionKey: 'igualdade_social' },
];

export const CANDIDATE_POSITIONS_DATA: CandidatePositionProfile[] = [
  {
    candidateId: 'lula',
    nome: 'Luiz Inácio Lula da Silva',
    nomeDeUrna: 'LULA',
    partido: 'PT (Federação Brasil da Esperança)',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Foto_Oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%29.jpg/600px-Foto_Oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%29.jpg',
    status: 'Confirmado em convenção',
    numero: '13',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://pt.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: -65,
        summary: 'Indução do crescimento econômico por investimentos públicos, fomento à indústria nacional e bancos públicos.',
        sources: [{ nome: 'Diretrizes do Programa de Governo Registrado no TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: -70,
        summary: 'Reforma tributária progressiva, isenção de imposto de renda para até R$ 5 mil e maior taxação sobre alta renda e patrimônio.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE / Plano Oficial PT', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: -75,
        summary: 'Aumento real contínuo do salário mínimo, valorização das negociações coletivas e regulação do trabalho por aplicativos.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -90,
        summary: 'Fortalecimento do Bolsa Família, programas habitacionais como Minha Casa Minha Vida e combate prioritário à fome.',
        sources: [{ nome: 'Plano de Reconstrução do Brasil - TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -85,
        summary: 'Expansão e financiamento prioritário do SUS, Farmácia Popular e programa Mais Médicos.',
        sources: [{ nome: 'Programa de Governo Oficial TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -80,
        summary: 'Ampliação de vagas no ensino superior público, cotas sociais, bolsas permanência e escolas em tempo integral com incentivo poupança.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: -40,
        summary: 'Segurança pública integrada, uso intensivo de inteligência policial, desarticulação financeira do crime e prevenção comunitária.',
        sources: [{ nome: 'Plano Nacional de Segurança Pública / Diretrizes TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: -50,
        summary: 'Garantia dos direitos fundamentais, fortalecimento da defensoria pública e foco em ressocialização penal.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: -85,
        summary: 'Controle rigoroso sobre compra, porte e posse de armas de fogo e munições, restringindo arsenais particulares.',
        sources: [{ nome: 'Decretos de Regulamentação e Programa Registrado no TSE', data: '01/01/2023', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: -70,
        summary: 'Estado atuante e indutor do bem-estar social, investimentos em serviços essenciais e fortalecimento de empresas estratégicas.',
        sources: [{ nome: 'Diretrizes de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: -80,
        summary: 'Oposição à privatização de empresas estratégicas (Petrobras, Caixa, Banco do Brasil, Correios) e revisão de desestatizações.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -85,
        summary: 'Meta de desmatamento zero até 2030, fortalecimento do Ibama/ICMBio, transição energética e proteção de terras indígenas.',
        sources: [{ nome: 'Plano de Ação para Prevenção e Controle do Desmatamento / TSE', data: '05/06/2023', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: -45,
        summary: 'Defesa das liberdades civis, combate ao preconceito e proteção aos direitos de minorias e expressão popular.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: -50,
        summary: 'Laicidade do Estado, diversidade familiar e garantia dos direitos reprodutivos e de saúde da mulher.',
        sources: [{ nome: 'Resoluções Nacionais do Partido dos Trabalhadores', data: '10/12/2023', url: 'https://pt.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -90,
        summary: 'Políticas afirmativas ativas, combate ao racismo e à desigualdade de gênero, e inclusão social como eixo central de governo.',
        sources: [{ nome: 'Diretrizes do Programa de Governo TSE', data: '15/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      }
    }
  },
  {
    candidateId: 'flavio-bolsonaro',
    nome: 'Flávio Nantes Bolsonaro',
    nomeDeUrna: 'FLÁVIO BOLSONARO',
    partido: 'PL - Partido Liberal',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Senador_Fl%C3%A1vio_Bolsonaro_%28cropped%29.jpg/600px-Senador_Fl%C3%A1vio_Bolsonaro_%28cropped%29.jpg',
    status: 'Pré-candidatura',
    numero: '22',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://partidoliberal.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 75,
        summary: 'Defesa irrestrita do livre mercado, desregulamentação da atividade empresarial e segurança jurídica para investimentos privados.',
        sources: [{ nome: 'Documento Base de Diretrizes Econômicas do Partido Liberal', data: '10/06/2026', url: 'https://partidoliberal.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 80,
        summary: 'Redução geral da carga tributária sobre empresas e produção, eliminação de impostos federais e teto para alíquotas.',
        sources: [{ nome: 'Propostas Legislativas e Diretrizes Partidárias do PL', data: '15/05/2026', url: 'https://partidoliberal.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: 70,
        summary: 'Flexibilização das leis trabalhistas, desoneração da folha de pagamento e facilitação da contratação individual.',
        sources: [{ nome: 'Pronunciamentos Oficiais e Votos no Senado Federal', data: '22/04/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: 40,
        summary: 'Foco na focalização de auxílios para os mais vulneráveis condicionado à busca de emprego e emancipação produtiva.',
        sources: [{ nome: 'Diretrizes do Partido Liberal para Políticas Sociais', data: '18/03/2026', url: 'https://partidoliberal.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: 55,
        summary: 'Estímulo a parcerias público-privadas na gestão de hospitais, telemedicina e liberdade de escolha de planos de saúde.',
        sources: [{ nome: 'Documento de Políticas Públicas do PL', data: '05/06/2026', url: 'https://partidoliberal.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: 75,
        summary: 'Escolas cívico-militares, valorização da autoridade do professor, combate a pautas ideológicas em sala e ensino técnico.',
        sources: [{ nome: 'Diretrizes do Partido Liberal para a Educação', data: '12/05/2026', url: 'https://partidoliberal.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 90,
        summary: 'Endurecimento penal severo, isolamento de líderes de facções, excludente de ilicitude para policiais e aumento de penas.',
        sources: [{ nome: 'Projetos de Lei no Senado e Diretrizes Partidárias', data: '14/06/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 85,
        summary: 'Fim das saídas temporárias de presos, redução da maioridade penal e cumprimento integral de penas para crimes violentos.',
        sources: [{ nome: 'Votações e Projetos no Senado Federal', data: '20/03/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 90,
        summary: 'Garantia do direito de posse e porte legal de armas de fogo para cidadãos cumpridores da lei e produtores rurais.',
        sources: [{ nome: 'Propostas Oficiais e Manifestações no Congresso', data: '08/06/2026', url: 'https://partidoliberal.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 75,
        summary: 'Estado enxuto, corte de ministérios, redução de gastos públicos correntes e controle rígido do déficit fiscal.',
        sources: [{ nome: 'Diretrizes de Governo do PL', data: '10/06/2026', url: 'https://partidoliberal.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: 80,
        summary: 'Privatização de empresas estatais, concessões de rodovias, portos e ferrovias à iniciativa privada.',
        sources: [{ nome: 'Diretrizes do Partido Liberal para Infraestrutura', data: '10/06/2026', url: 'https://partidoliberal.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: 55,
        summary: 'Equilíbrio entre preservação e agronegócio, desburocratização do licenciamento ambiental e regularização fundiária.',
        sources: [{ nome: 'Pronunciamentos e Propostas para o Agro', data: '28/05/2026', url: 'https://partidoliberal.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 70,
        summary: 'Liberdade irrestrita de expressão, oposição a regulamentações de redes sociais e defesa da liberdade religiosa.',
        sources: [{ nome: 'Discursos Oficiais no Senado Federal', data: '03/06/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 85,
        summary: 'Defesa intransigente da família tradicional, proteção da vida desde a concepção e oposição ao aborto e legalização de drogas.',
        sources: [{ nome: 'Manifesto de Princípios do Partido Liberal', data: '01/05/2026', url: 'https://partidoliberal.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: 65,
        summary: 'Ênfase na meritocracia individual, igualdade de oportunidades pela via do trabalho e oposição a cotas raciais.',
        sources: [{ nome: 'Diretrizes Partidárias do PL', data: '15/05/2026', url: 'https://partidoliberal.org.br' }]
      }
    }
  },
  {
    candidateId: 'romeu-zema',
    nome: 'Romeu Zema Neto',
    nomeDeUrna: 'ROMEU ZEMA',
    partido: 'NOVO - Partido Novo',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Romeu_Zema_Neto.jpg/600px-Romeu_Zema_Neto.jpg',
    status: 'Pré-candidatura',
    numero: '30',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://novo.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 85,
        summary: 'Austeridade fiscal absoluta, corte de gastos públicos, liberdade concorrencial e desestatização de setores produtivos.',
        sources: [{ nome: 'Diretrizes do Partido Novo para a Presidência', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 85,
        summary: 'Simplificação tributária radical, redução de alíquotas para empresas e combate sem trégua ao desperdício do dinheiro público.',
        sources: [{ nome: 'Plataforma de Governo do Partido Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: 80,
        summary: 'Desregulamentação de atividades profissionais, estímulo ao empreendedorismo e redução de encargos sobre o emprego.',
        sources: [{ nome: 'Relatórios de Gestão e Diretrizes do Novo', data: '15/04/2026', url: 'https://novo.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: 35,
        summary: 'Foco exclusivo em transferência de renda com critérios rigorosos de saída para o mercado de trabalho.',
        sources: [{ nome: 'Diretrizes Sociais do Partido Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: 65,
        summary: 'Gestão hospitalar via organizações sociais (OSs), eficiência de compras públicas e parcerias com o setor privado.',
        sources: [{ nome: 'Experiência de Gestão e Diretrizes Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: 60,
        summary: 'Ensino técnico profissionalizante, gestão por metas para diretores escolares e modelo de parcerias com a iniciativa privada.',
        sources: [{ nome: 'Diretrizes Educacionais do Partido Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 80,
        summary: 'Integração de inteligência entre forças policiais, investimento em tecnologia preventiva e rigor no combate ao crime.',
        sources: [{ nome: 'Plano de Segurança Pública do NOVO', data: '12/04/2026', url: 'https://novo.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 75,
        summary: 'Fim de privilégios para detentos, celeridade processual e cumprimento efetivo de decisões judiciais.',
        sources: [{ nome: 'Diretrizes Institucionais do Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 70,
        summary: 'Respeito ao direito à legítima defesa e à posse de armas de fogo com critérios técnicos objetivos.',
        sources: [{ nome: 'Declarações e Posicionamentos do NOVO', data: '10/05/2026', url: 'https://novo.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 90,
        summary: 'Redução drástica do número de ministérios, corte de privilégios de altos cargos e privatização ampla de estatais.',
        sources: [{ nome: 'Diretrizes para Reforma Administrativa - NOVO', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: 90,
        summary: 'Privatização de empresas públicas de energia, saneamento, bancos estatais e concessão de toda a malha logística.',
        sources: [{ nome: 'Diretrizes do Partido Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: 50,
        summary: 'Licenciamento ambiental simplificado, digital e eficiente com foco no desenvolvimento produtivo sustentável.',
        sources: [{ nome: 'Diretrizes para o Meio Ambiente - NOVO', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 75,
        summary: 'Garantia total da liberdade de expressão, livre iniciativa e autonomia individual frente ao Estado.',
        sources: [{ nome: 'Manifesto Liberal do NOVO', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 40,
        summary: 'Postura liberal em temas de costumes focada no respeito à vida privada e não intervenção estatal nas escolhas pessoais.',
        sources: [{ nome: 'Estatuto e Diretrizes do Partido Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: 60,
        summary: 'Geração de riqueza e empregos como principal mecanismo de redução de desigualdades.',
        sources: [{ nome: 'Plano Econômico do Partido Novo', data: '20/05/2026', url: 'https://novo.org.br' }]
      }
    }
  },
  {
    candidateId: 'ronaldo-caiado',
    nome: 'Ronaldo Ramos Caiado',
    nomeDeUrna: 'RONALDO CAIADO',
    partido: 'PSD - Partido Social Democrático',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ronaldo_Caiado_em_2023_%28cropped%29.jpg/600px-Ronaldo_Caiado_em_2023_%28cropped%29.jpg',
    status: 'Pré-candidatura',
    numero: '55',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://psd.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 65,
        summary: 'Fortalecimento do agronegócio, atração de indústrias para o interior, responsabilidade fiscal e incentivo à infraestrutura.',
        sources: [{ nome: 'Plano Estratégico de Governo e Pronunciamentos Oficiais', data: '02/07/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 60,
        summary: 'Defesa do pacto federativo, equilíbrio fiscal sem aumento abusivo e incentivos fiscais direcionados a polos produtivos.',
        sources: [{ nome: 'Diretrizes Regionais e Pronunciamentos no Fórum de Governadores', data: '12/06/2026', url: 'https://psd.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: 55,
        summary: 'Capacitação técnica alinhada às demandas da agroindústria e estímulo ao emprego formal regional.',
        sources: [{ nome: 'Relatórios de Gestão e Políticas de Emprego', data: '18/05/2026', url: 'https://psd.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -30,
        summary: 'Programas de proteção a famílias em vulnerabilidade, bolsa qualificação e apoio a mães chefes de família.',
        sources: [{ nome: 'Programas Sociais Estaduais e Diretrizes Partidárias', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -40,
        summary: 'Interiorização da saúde especializada por meio de policlínicas regionais e gestão pública de qualidade.',
        sources: [{ nome: 'Plano de Saúde Pública e Modelo Regional', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: 45,
        summary: 'Expansão de colégios cívico-militares, premiação por mérito para professores e alunos, e foco nas notas do IDEB.',
        sources: [{ nome: 'Modelo de Educação Estadual e Diretrizes', data: '10/06/2026', url: 'https://psd.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 90,
        summary: 'Tolerância zero com facções criminosas, policiamento ostensivo enérgico e segurança jurídica contra invasões de terra.',
        sources: [{ nome: 'Plano de Segurança Pública e Discursos Oficiais', data: '02/07/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 85,
        summary: 'Rigor penitenciário, endurecimento penal e apoio irrestrito às decisões de segurança nos tribunais.',
        sources: [{ nome: 'Declarações Públicas e Projetos Políticos', data: '02/07/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 80,
        summary: 'Posse e porte de armas no meio rural para garantia da segurança patrimonial e da integridade física dos produtores.',
        sources: [{ nome: 'Pronunciamentos Oficiais do Governador', data: '15/06/2026', url: 'https://psd.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 50,
        summary: 'Estado eficiente na entrega de segurança e saúde, com responsabilidade fiscal e atração de investimentos privados.',
        sources: [{ nome: 'Diretrizes Administrativas do PSD', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: 60,
        summary: 'Concessões de infraestrutura de transporte e parcerias público-privadas sem abrir mão do controle regulatório.',
        sources: [{ nome: 'Propostas de Concessão de Rodovias', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: 40,
        summary: 'Harmonia entre sustentabilidade ambiental e pujança produtiva do agronegócio com preservação de recursos hídricos.',
        sources: [{ nome: 'Diretrizes Agroambientais', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 50,
        summary: 'Defesa do direito de propriedade privada e garantia das liberdades civis básicas.',
        sources: [{ nome: 'Pronunciamentos e Diretrizes Políticas', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 75,
        summary: 'Conservadorismo em temas morais e familiares, respeito às tradições religiosas e oposição ao aborto.',
        sources: [{ nome: 'Declarações e Posicionamento Institucional', data: '02/07/2026', url: 'https://psd.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: 30,
        summary: 'Desenvolvimento econômico regional e capacitação técnica como principais formas de inclusão.',
        sources: [{ nome: 'Diretrizes de Governo', data: '02/07/2026', url: 'https://psd.org.br' }]
      }
    }
  },
  {
    candidateId: 'augusto-cury',
    nome: 'Augusto Jorge Cury',
    nomeDeUrna: 'AUGUSTO CURY',
    partido: 'AVANTE',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Augusto_Cury_%28cropped%29.jpg/600px-Augusto_Cury_%28cropped%29.jpg',
    status: 'Pré-candidatura',
    numero: '70',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://avante70.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 10,
        summary: 'Economia humanizada com apoio a microempreendedores e incentivo à economia criativa.',
        sources: [{ nome: 'Plataforma Oficial do AVANTE', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 15,
        summary: 'Incentivos fiscais para empresas que investem em saúde mental dos trabalhadores e educação.',
        sources: [{ nome: 'Pronunciamentos e Propostas Oficiais', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: -20,
        summary: 'Melhoria das condições psicológicas no ambiente de trabalho e programas de primeiro emprego para jovens.',
        sources: [{ nome: 'Diretrizes de Cidadania - AVANTE', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -45,
        summary: 'Assistência social integrada com acolhimento psicológico a famílias em vulnerabilidade extrema.',
        sources: [{ nome: 'Diretrizes Sociais do AVANTE', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -75,
        summary: 'Criação de programa nacional de saúde mental no SUS, prevenção ao suicídio e capacitação de equipes médicas.',
        sources: [{ nome: 'Plano Nacional de Saúde Mental e Socioemocional', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -60,
        summary: 'Implementação de gestão da emoção e inteligência socioemocional no currículo escolar obrigatório.',
        sources: [{ nome: 'Diretrizes para a Educação Humanizada', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: -25,
        summary: 'Prevenção à violência nas escolas, mediação de conflitos e suporte psicológico aos policiais.',
        sources: [{ nome: 'Diretrizes de Segurança Comunitária', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: -35,
        summary: 'Justiça restaurativa e programas de ressocialização de jovens infratores com foco educacional.',
        sources: [{ nome: 'Pronunciamentos e Textos Institucionais', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: -60,
        summary: 'Defesa do desarmamento e cultura de paz na resolução de controvérsias sociais.',
        sources: [{ nome: 'Declarações Públicas e Obras Literárias do Candidato', data: '10/05/2026', url: 'https://avante70.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 0,
        summary: 'Estado focado no desenvolvimento humano, sem excessos burocráticos e com forte atuação nas pessoas.',
        sources: [{ nome: 'Diretrizes Gerais do AVANTE', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: null,
        summary: 'Não encontramos informações públicas suficientes para calcular este tema.',
        sources: [{ nome: 'Pesquisa em Documentos Oficiais Registrados', data: '24/08/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -50,
        summary: 'Sustentabilidade ecológica aliada à qualidade de vida urbana e preservação de áreas verdes.',
        sources: [{ nome: 'Diretrizes de Meio Ambiente', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: -10,
        summary: 'Pacificação do debate público, diálogo interpartidário e respeito à diversidade de pensamentos.',
        sources: [{ nome: 'Pronunciamentos Oficiais do Candidato', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 10,
        summary: 'Fortalecimento dos vínculos familiares com postura de diálogo e acolhimento.',
        sources: [{ nome: 'Diretrizes do AVANTE', data: '18/06/2026', url: 'https://avante70.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -40,
        summary: 'Inclusão social por meio da educação socioemocional e oportunidades iguais para a juventude.',
        sources: [{ nome: 'Diretrizes de Governo AVANTE', data: '18/06/2026', url: 'https://avante70.org.br' }]
      }
    }
  },
  {
    candidateId: 'renan-santos',
    nome: 'Renan Antônio Ferreira dos Santos',
    nomeDeUrna: 'RENAN SANTOS',
    partido: 'MISSÃO (Em formação / registro)',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Renan_Santos_2023.jpg/600px-Renan_Santos_2023.jpg',
    status: 'Pré-candidatura',
    numero: 'A definir',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://partidomissao.com.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 60,
        summary: 'Reindustrialização estratégica com livre concorrência interna, segurança jurídica e atração de capital.',
        sources: [{ nome: 'Manifesto do Partido Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 65,
        summary: 'Corte de impostos sobre produção e simplificação do sistema tributário.',
        sources: [{ nome: 'Diretrizes do Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: 55,
        summary: 'Modernização das relações de trabalho e estímulo a setores de inovação tecnológica.',
        sources: [{ nome: 'Documento Base de Propostas - Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: 20,
        summary: 'Racionalização de benefícios com foco estrito na saída dos beneficiários da pobreza.',
        sources: [{ nome: 'Diretrizes Sociais do Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: 40,
        summary: 'Eficiência administrativa hospitalar e auditorias rigorosas em contratos da saúde pública.',
        sources: [{ nome: 'Diretrizes de Saúde Pública - Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: 60,
        summary: 'Foco em ciências exatas, literatura clássica, despolitização das universidades e rigor acadêmico.',
        sources: [{ nome: 'Plano Educacional do Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 95,
        summary: 'Combate implacável ao narcotráfico com uso de inteligência militar, presídios de segurança máxima e reforma das polícias.',
        sources: [{ nome: 'Projeto Nacional de Segurança e Soberania - Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 90,
        summary: 'Fim do foro privilegiado, cumprimento de pena em 2ª instância e endurecimento do código penal.',
        sources: [{ nome: 'Diretrizes Institucionais e Combate à Corrupção', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 60,
        summary: 'Acesso legal a armas mediante requisitos técnicos, psicológicos e cadastrais rigorosos.',
        sources: [{ nome: 'Pronunciamentos Oficiais e Debates Públicos', data: '20/03/2026', url: 'https://partidomissao.com.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 65,
        summary: 'Fim de privilégios de corporações estatais, corte de regalias dos Três Poderes e Estado forte no combate ao crime.',
        sources: [{ nome: 'Manifesto do Partido Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: 60,
        summary: 'Privatização de empresas estatais não estratégicas e manutenção de controle soberano em setores de defesa.',
        sources: [{ nome: 'Diretrizes Estratégicas - Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: 30,
        summary: 'Soberania nacional sobre a Amazônia com combate rigoroso a organizações criminosas e garimpo ilegal.',
        sources: [{ nome: 'Projeto Soberania e Defesa', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 55,
        summary: 'Defesa da liberdade de expressão e crítica ao aparelhamento estatal das instituições reguladoras.',
        sources: [{ nome: 'Manifestações Públicas do Partido Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 50,
        summary: 'Defesa da família e de valores cívicos republicanos, com foco prioritário em ordem e moralidade pública.',
        sources: [{ nome: 'Diretrizes do Partido Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: 50,
        summary: 'Promoção social através de meritocracia rigorosa e modernização econômica.',
        sources: [{ nome: 'Manifesto do Missão', data: '15/01/2026', url: 'https://partidomissao.com.br' }]
      }
    }
  },
  {
    candidateId: 'edmilson-costa',
    nome: 'Edmilson Silva Costa',
    nomeDeUrna: 'EDMILSON COSTA',
    partido: 'PCB - Partido Comunista Brasileiro',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Edmilson_Costa_%28PCB%29.jpg/600px-Edmilson_Costa_%28PCB%29.jpg',
    status: 'Pré-candidatura',
    numero: '21',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://pcb.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: -95,
        summary: 'Estatização sem indenização do sistema financeiro, mineração, energia e grandes indústrias.',
        sources: [{ nome: 'Programa Político e Diretrizes do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: -90,
        summary: 'Taxação radical de grandes fortunas, heranças e lucros corporativos, com isenção total aos trabalhadores.',
        sources: [{ nome: 'Resoluções do Comitê Central do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: -95,
        summary: 'Redução da jornada para 30h semanais sem redução salarial e garantia de emprego estatal para todos.',
        sources: [{ nome: 'Programa Político do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -90,
        summary: 'Garantia de moradia, transporte, alimentação e renda como direitos incondicionais sob gestão estatal.',
        sources: [{ nome: 'Plano do Poder Popular do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -95,
        summary: 'Saúde 100% pública e estatal, proibição de planos privados e estatização de indústrias farmacêuticas.',
        sources: [{ nome: 'Programa do PCB para a Saúde', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -95,
        summary: 'Educação pública, gratuita e laica em todos os níveis, com fim de verbas públicas para escolas privadas.',
        sources: [{ nome: 'Diretrizes Educacionais do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: -80,
        summary: 'Desmilitarização das polícias, fim da política de encarceramento em massa e foco nas causas socioeconômicas do crime.',
        sources: [{ nome: 'Programa de Segurança Pública do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: -80,
        summary: 'Revisão penal classista, conselhos populares na justiça e combate à violência policial nas periferias.',
        sources: [{ nome: 'Diretrizes Políticas do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: -40,
        summary: 'Oposição ao armamento civil comercializado por empresas, com defesa de comitês de autodefesa popular organizada.',
        sources: [{ nome: 'Resoluções Políticas do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: -95,
        summary: 'Planejamento centralizado da economia e controle dos meios de produção pelos trabalhadores organizados.',
        sources: [{ nome: 'Programa Político do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: -100,
        summary: 'Revogação de todas as privatizações realizadas no Brasil e reestatização completa dos serviços essenciais.',
        sources: [{ nome: 'Programa Político do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -90,
        summary: 'Fim do agronegócio predatório, reforma agrária popular radical e transição ecológica gerida pelo povo.',
        sources: [{ nome: 'Resoluções Ecológicas do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: -70,
        summary: 'Garantia plena dos direitos sociais, culturais e sindicais da classe trabalhadora.',
        sources: [{ nome: 'Programa do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: -85,
        summary: 'Legalização irrestrita do aborto pelo SUS, laicidade absoluta do Estado e direitos LGBTQIA+ integrais.',
        sources: [{ nome: 'Resoluções Sociais do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -100,
        summary: 'Superação das desigualdades de classe, gênero e raça por meio da transformação socialista da sociedade.',
        sources: [{ nome: 'Programa Político do PCB', data: '12/04/2026', url: 'https://pcb.org.br' }]
      }
    }
  },
  {
    candidateId: 'hertz-dias',
    nome: 'Hertz da Silva Dias',
    nomeDeUrna: 'HERTZ DIAS',
    partido: 'PSTU',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hertz_Dias_%28cropped%29.jpg/600px-Hertz_Dias_%28cropped%29.jpg',
    status: 'Pré-candidatura',
    numero: '16',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://pstu.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: -95,
        summary: 'Não pagamento da dívida pública aos banqueiros e estatização das 100 maiores empresas sob controle dos operários.',
        sources: [{ nome: 'Programa Socialista dos Trabalhadores - PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: -90,
        summary: 'Isenção total para assalariados e confisco dos lucros dos bilionários e banqueiros.',
        sources: [{ nome: 'Jornal Opinião Socialista / PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: -95,
        summary: 'Redução da jornada para 30h semanais sem corte de salários e gatilho salarial contra a inflação.',
        sources: [{ nome: 'Diretrizes Trabalhistas do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -90,
        summary: 'Construção massiva de moradias públicas e garantia universal de alimentação básica.',
        sources: [{ nome: 'Programa do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -95,
        summary: 'SUS 100% público com investimentos dos recursos economizados do não pagamento da dívida pública.',
        sources: [{ nome: 'Plataforma de Saúde do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -95,
        summary: '10% do PIB para a educação pública e valorização dos professores e servidores escolares.',
        sources: [{ nome: 'Diretrizes Educacionais do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: -85,
        summary: 'Desmilitarização das polícias, com direito de sindicalização policial e controle comunitário das comunidades.',
        sources: [{ nome: 'Manifesto de Segurança Pública - PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: -85,
        summary: 'Eleição direta de juízes e promotores pelo povo e fim do encarceramento da juventude negra e periférica.',
        sources: [{ nome: 'Programa de Luta Antirracista do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: -30,
        summary: 'Defesa da auto-organização da classe trabalhadora contra a violência opressora.',
        sources: [{ nome: 'Documentos de Tese do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: -95,
        summary: 'Governo dos trabalhadores organizado em conselhos populares deliberativos nos locais de trabalho e moradia.',
        sources: [{ nome: 'Programa do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: -100,
        summary: 'Reestatização imediata de todas as empresas e serviços privatizados, como Vale, Eletrobras e telefonia.',
        sources: [{ nome: 'Programa Econômico do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -90,
        summary: 'Expropriação das mineradoras e do agronegócio predatório para restauração ecológica popular.',
        sources: [{ nome: 'Teses Ecológicas do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: -75,
        summary: 'Liberdade ampla de manifestação, greve e organização da juventude e dos trabalhadores.',
        sources: [{ nome: 'Programa do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: -85,
        summary: 'Descriminalização e legalização do aborto na rede pública e garantia de direitos reprodutivos plenos.',
        sources: [{ nome: 'Plataforma Feminista Socialista', data: '10/05/2026', url: 'https://pstu.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -95,
        summary: 'Combate frontal ao racismo e machismo, com fim de qualquer forma de exploração do ser humano.',
        sources: [{ nome: 'Manifesto do PSTU', data: '10/05/2026', url: 'https://pstu.org.br' }]
      }
    }
  },
  {
    candidateId: 'rui-costa-pimenta',
    nome: 'Rui Costa Pimenta',
    nomeDeUrna: 'RUI COSTA PIMENTA',
    partido: 'PCO - Partido da Causa Operária',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rui_Costa_Pimenta_2014.jpg/600px-Rui_Costa_Pimenta_2014.jpg',
    status: 'Pré-candidatura',
    numero: '29',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://pco.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: -90,
        summary: 'Defesa da soberania operária nacional, monopólio estatal do comércio exterior e expropriação de multinacionais.',
        sources: [{ nome: 'Programa Revolucionário do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: -85,
        summary: 'Fim dos impostos sobre consumo e trabalho, tributando pesadamente os lucros do capital imperialista.',
        sources: [{ nome: 'Jornal Causa Operária', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: -95,
        summary: 'Salário mínimo de acordo com o cálculo do DIEESE (cerca de R$ 7 mil) e jornada de 35h semanais.',
        sources: [{ nome: 'Programa do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -85,
        summary: 'Direito imediato a salário digno, terra e teto para todos os trabalhadores.',
        sources: [{ nome: 'Plataforma do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -90,
        summary: 'Saúde pública universal, gratuita e sob controle dos sindicatos de trabalhadores de saúde.',
        sources: [{ nome: 'Programa Político do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -90,
        summary: 'Ensino público gratuito da creche à universidade com livre acesso sem vestibular.',
        sources: [{ nome: 'Diretrizes Educacionais do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: -80,
        summary: 'Dissolução da polícia militar e criação de comitês de autodefesa operária e popular.',
        sources: [{ nome: 'Teses de Segurança Popular do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: -85,
        summary: 'Fim do Judiciário corporativo de privilégios e julgamentos por júri popular para todos os crimes.',
        sources: [{ nome: 'Programa Político do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 95,
        summary: 'Direito universal, irrestrito e incondicional da população trabalhadora ao porte e posse de armas.',
        sources: [{ nome: 'Posicionamento Histórico e Programa do PCO sobre Armamento', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: -90,
        summary: 'Estado sob controle dos comitês de operários e camponeses.',
        sources: [{ nome: 'Programa Revolucionário do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: -100,
        summary: 'Reestatização completa de toda a riqueza nacional e recursos minerais.',
        sources: [{ nome: 'Programa do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -50,
        summary: 'Desenvolvimento industrial soberano a serviço da população, sem imposições de potências estrangeiras.',
        sources: [{ nome: 'Declarações e Programa do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 95,
        summary: 'Liberdade irrestrita de expressão e manifestação, com oposição radical a qualquer censura judicial ou de redes.',
        sources: [{ nome: 'Defesa da Liberdade de Expressão Irrestrita - PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: -60,
        summary: 'Separação total entre Igreja e Estado com respeito à liberdade privada dos cidadãos.',
        sources: [{ nome: 'Programa do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -90,
        summary: 'Emancipação da classe trabalhadora de todas as formas de opressão.',
        sources: [{ nome: 'Programa Político do PCO', data: '22/04/2026', url: 'https://pco.org.br' }]
      }
    }
  },
  {
    candidateId: 'samara-martins',
    nome: 'Samara Martins',
    nomeDeUrna: 'SAMARA MARTINS',
    partido: 'UP - Unidade Popular pelo Socialismo',
    foto: 'https://images.weserv.nl/?url=https://tribunahoje.com/wp-content/uploads/2024/02/Samara-Martins-UP-divulgacao.jpg&default=https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
    status: 'Pré-candidatura',
    numero: '80',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://unidadepopular.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: -90,
        summary: 'Pão, terra, teto e trabalho para o povo, estatização dos setores estratégicos e congelamento dos preços de alimentos.',
        sources: [{ nome: 'Programa Nacional da Unidade Popular', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: -95,
        summary: 'Imposto sobre grandes fortunas, heranças milionárias e lucros dos bancos para financiar moradia e saúde pública.',
        sources: [{ nome: 'Plataforma Tributária da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: -90,
        summary: 'Fim da terceirização, revogação das reformas trabalhista e previdenciária e geração de empregos por obras públicas de moradia.',
        sources: [{ nome: 'Diretrizes do Trabalho - UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -95,
        summary: 'Reforma urbana popular, desapropriação de prédios vazios para habitação social e fim imediato dos despejos.',
        sources: [{ nome: 'Plano de Moradia e Direitos da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -90,
        summary: 'Fortalecimento irrestrito do SUS, fim de parcerias com OSs privadas e atendimento integral para a população periférica.',
        sources: [{ nome: 'Programa de Saúde Popular da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -95,
        summary: 'Passe livre estudantil em todo o país, valorização dos servidores e verbas públicas exclusivas para o ensino público.',
        sources: [{ nome: 'Diretrizes Educacionais da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: -85,
        summary: 'Fim da violência policial nas periferias e comunidades, desmilitarização e investigação rigorosa de abusos.',
        sources: [{ nome: 'Diretrizes de Direitos Humanos da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: -85,
        summary: 'Desencarceramento da juventude trabalhadora e democratização dos órgãos de controle judiciário.',
        sources: [{ nome: 'Programa Político da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: -70,
        summary: 'Controle de armamentos e desarmamento das milícias privadas no campo e na cidade.',
        sources: [{ nome: 'Declarações e Textos Oficiais da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: -90,
        summary: 'Poder popular exercido pelos movimentos sociais e trabalhadores na condução do Estado.',
        sources: [{ nome: 'Programa Nacional da Unidade Popular', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: -100,
        summary: 'Estatização completa do transporte público, energia, água, saneamento e petróleo.',
        sources: [{ nome: 'Programa da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -90,
        summary: 'Reforma agrária popular, demarcação de todas as terras indígenas e quilombolas e combate ao agronegócio poluidor.',
        sources: [{ nome: 'Diretrizes Socioambientais da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: -75,
        summary: 'Defesa intransigente do direito de protesto, moradia e auto-organização popular.',
        sources: [{ nome: 'Manifesto da Juventude da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: -85,
        summary: 'Garantia dos direitos reprodutivos das mulheres, saúde da mulher no SUS e combate às discriminações de gênero.',
        sources: [{ nome: 'Plataforma Feminista da UP', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -100,
        summary: 'Erradicação das desigualdades estruturais por meio do socialismo e da distribuição justa de terras e riquezas.',
        sources: [{ nome: 'Programa Nacional da Unidade Popular', data: '05/03/2026', url: 'https://unidadepopular.org.br' }]
      }
    }
  },
  {
    candidateId: 'clariana-barao',
    nome: 'Clariana Barão',
    nomeDeUrna: 'CLARIANA BARÃO',
    partido: 'DC - Democracia Cristã',
    foto: 'https://pbs.twimg.com/profile_images/1699863486333931520/q5U-LgU8_400x400.jpg',
    status: 'Pré-candidatura',
    numero: '27',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://democraciacrista.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 40,
        summary: 'Economia social de mercado com foco na dignidade da pessoa humana, apoio a microempresas e cooperativismo.',
        sources: [{ nome: 'Diretrizes do Partido Democracia Cristã', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 45,
        summary: 'Alívio tributário para a produção familiar, microempresários e incentivo a instituições filantrópicas.',
        sources: [{ nome: 'Manifesto de Princípios da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: 30,
        summary: 'Incentivo ao trabalho comunitário, apoio ao primeiro emprego e valorização da previdência social.',
        sources: [{ nome: 'Diretrizes Sociais e Trabalhistas da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -35,
        summary: 'Apoio integral à maternidade vulnerável, proteção à infância e subsídios para famílias carentes.',
        sources: [{ nome: 'Programa Família Cidadã da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -45,
        summary: 'Fortalecimento da saúde materno-infantil, apoio a hospitais filantrópicos e Santas Casas no SUS.',
        sources: [{ nome: 'Diretrizes de Saúde e Vida - DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: 65,
        summary: 'Educação básica com forte formação ética e cívica, respeito à autoridade dos pais e valorização docente.',
        sources: [{ nome: 'Plano Educacional da Democracia Cristã', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 75,
        summary: 'Combate enérgico à criminalidade, repressão ao tráfico de entorpecentes e proteção das famílias.',
        sources: [{ nome: 'Diretrizes de Segurança da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 70,
        summary: 'Celeridade da justiça e rigor nas punições para crimes hediondos contra a vida e contra crianças.',
        sources: [{ nome: 'Diretrizes Jurídicas da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 30,
        summary: 'Posse de armas com critérios de proteção familiar e defesa da propriedade.',
        sources: [{ nome: 'Pronunciamentos Institucionais da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 30,
        summary: 'Princípio da subsidiariedade: o Estado só deve intervir onde a iniciativa privada e comunitária não alcance.',
        sources: [{ nome: 'Estatuto da Democracia Cristã', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: null,
        summary: 'Não encontramos informações públicas suficientes para calcular este tema.',
        sources: [{ nome: 'Pesquisa em Documentos Oficiais Registrados', data: '24/08/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -20,
        summary: 'Guarda da criação e preservação dos recursos naturais para as futuras gerações com equilíbrio produtivo.',
        sources: [{ nome: 'Diretrizes Ambientais da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 40,
        summary: 'Defesa da liberdade de consciência, culto religioso e liberdade de cátedra dos pais sobre os filhos.',
        sources: [{ nome: 'Manifesto de Princípios da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 95,
        summary: 'Defesa intransigente da vida desde a concepção, oposição absoluta ao aborto e proteção da família cristã.',
        sources: [{ nome: 'Programa de Governo e Princípios da Democracia Cristã', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: 20,
        summary: 'Fraternidade e solidariedade cristã como pilares para a justiça social e apoio aos mais necessitados.',
        sources: [{ nome: 'Diretrizes de Governo da DC', data: '14/02/2026', url: 'https://democraciacrista.org.br' }]
      }
    }
  },
  {
    candidateId: 'wilson-grassi',
    nome: 'Wilson Grassi de Oliveira',
    nomeDeUrna: 'VETERINÁRIO WILSON GRASSI',
    partido: 'DEMOCRATA (Em processo)',
    foto: 'https://images.weserv.nl/?url=https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/250001614210/2022/SP&default=https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
    status: 'Pré-candidatura',
    numero: 'A definir',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://divulgacandcontas.tse.jus.br/',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: -20,
        summary: 'Economia verde, incentivos tributários para empresas com certificações ecológicas e apoio a pequenos produtores sustentáveis.',
        sources: [{ nome: 'Diretrizes de Campanha e Propostas Registradas no TSE', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: -30,
        summary: 'Desoneração fiscal sobre medicamentos e rações de animais domésticos e incentivos fiscais verdes.',
        sources: [{ nome: 'Propostas de Campanha - DivulgaCandContas', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: null,
        summary: 'Não encontramos informações públicas suficientes para calcular este tema.',
        sources: [{ nome: 'Pesquisa em Documentos Oficiais Registrados', data: '24/08/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: -40,
        summary: 'Assistência veterinária gratuita para animais de famílias em vulnerabilidade social e combate à fome.',
        sources: [{ nome: 'Projeto SUS Animal e Saúde Única', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: -80,
        summary: 'Políticas de Saúde Única (One Health) integrando saúde humana, ambiental e animal para prevenção de zoonoses e pandemias.',
        sources: [{ nome: 'Diretrizes de Saúde Única - DivulgaCandContas', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: -50,
        summary: 'Inclusão de conscientização ambiental e direitos dos animais no currículo do ensino fundamental.',
        sources: [{ nome: 'Propostas Registradas TSE', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 30,
        summary: 'Combate rígido ao tráfico internacional de animais silvestres e crimes ambientais com apoio de forças policiais.',
        sources: [{ nome: 'Propostas Registradas TSE', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 60,
        summary: 'Aumento de penas para maus-tratos a animais e responsabilização penal rigorosa para crimes ambientais.',
        sources: [{ nome: 'Projetos e Manifestações Públicas', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: null,
        summary: 'Não encontramos informações públicas suficientes para calcular este tema.',
        sources: [{ nome: 'Pesquisa em Documentos Oficiais Registrados', data: '24/08/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: -30,
        summary: 'Criação de secretarias e órgãos públicos voltados à proteção da fauna e vigilância epidemiológica integrada.',
        sources: [{ nome: 'Diretrizes Registradas TSE', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: null,
        summary: 'Não encontramos informações públicas suficientes para calcular este tema.',
        sources: [{ nome: 'Pesquisa em Documentos Oficiais Registrados', data: '24/08/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: -95,
        summary: 'Proteção irrestrita da biodiversidade, combate a queimadas, reflorestamento e fiscalização severa de biomas nacionais.',
        sources: [{ nome: 'Plano de Ação Ecológica e Proteção da Fauna', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 0,
        summary: 'Respeito às escolhas alimentares e de vida sustentável, com incentivo ao vegetarianismo ético e sustentabilidade.',
        sources: [{ nome: 'Declarações e Projetos Públicos', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: null,
        summary: 'Não encontramos informações públicas suficientes para calcular este tema.',
        sources: [{ nome: 'Pesquisa em Documentos Oficiais Registrados', data: '24/08/2026', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: -40,
        summary: 'Acesso democrático das populações de baixa renda a serviços veterinários e saneamento ambiental comunitário.',
        sources: [{ nome: 'Diretrizes Registradas TSE', data: '10/08/2022', url: 'https://divulgacandcontas.tse.jus.br/' }]
      }
    }
  },
  {
    candidateId: 'pablo-marcal',
    nome: 'Pablo Henrique Costa Marçal',
    nomeDeUrna: 'PABLO MARÇAL',
    partido: 'PRTB - Partido Renovador Trabalhista Brasileiro',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pablo_Mar%C3%A7al_%28cropped%29.jpg/600px-Pablo_Mar%C3%A7al_%28cropped%29.jpg',
    status: 'Pré-candidatura',
    numero: '28',
    programaDeGovernoUrl: 'https://divulgacandcontas.tse.jus.br/',
    siteOficial: 'https://prtb.org.br',
    fonteTSE: 'https://divulgacandcontas.tse.jus.br/',
    positions: {
      economia: {
        topicKey: 'economia',
        topicLabel: 'Economia',
        score: 85,
        summary: 'Economia digital, facilitação expressa de novos negócios em até 10 minutos, incentivo a startups e desburocratização.',
        sources: [{ nome: 'Plano de Governo Registrado / Pronunciamentos Oficiais', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      impostos: {
        topicKey: 'impostos',
        topicLabel: 'Impostos',
        score: 85,
        summary: 'Isenção total de impostos para empresas no primeiro ano e redução maciça de tributos corporativos.',
        sources: [{ nome: 'Diretrizes de Campanha Registradas no TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      emprego: {
        topicKey: 'emprego',
        topicLabel: 'Emprego',
        score: 80,
        summary: 'Foco no autoemprego, empreendedorismo individual, monetização digital e independência financeira sem amarras estatais.',
        sources: [{ nome: 'Pronunciamentos e Propostas Oficiais', data: '15/08/2024', url: 'https://prtb.org.br' }]
      },
      programas_sociais: {
        topicKey: 'programas_sociais',
        topicLabel: 'Programas sociais',
        score: 45,
        summary: 'Substituição gradual de assistencialismo por capacitação em negócios digitais e mentorias de geração de renda.',
        sources: [{ nome: 'Diretrizes Registradas no TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      saude: {
        topicKey: 'saude',
        topicLabel: 'Saúde',
        score: 50,
        summary: 'Digitalização total de prontuários, telemedicina de alta escala com inteligência artificial e convênios privados.',
        sources: [{ nome: 'Propostas de Tecnologia em Saúde - TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      educacao: {
        topicKey: 'educacao',
        topicLabel: 'Educação',
        score: 70,
        summary: 'Ensino de inteligência financeira, programação, inteligência artificial e oratória desde a infância nas escolas.',
        sources: [{ nome: 'Plano Educacional e de Formação de Líderes - TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      seguranca: {
        topicKey: 'seguranca',
        topicLabel: 'Segurança',
        score: 85,
        summary: 'Uso de inteligência artificial, reconhecimento facial, drones de vigilância e tolerância zero a facções criminosas.',
        sources: [{ nome: 'Plano de Segurança Inteligente - TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      justica: {
        topicKey: 'justica',
        topicLabel: 'Justiça',
        score: 75,
        summary: 'Endurecimento de penas e agilidade judicial por meio de automação de processos repetitivos.',
        sources: [{ nome: 'Diretrizes de Gestão Pública - TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      armas: {
        topicKey: 'armas',
        topicLabel: 'Armas',
        score: 80,
        summary: 'Defesa do direito à legítima defesa armada para proteção do patrimônio e da integridade física da família.',
        sources: [{ nome: 'Pronunciamentos Públicos e Entrevistas', data: '10/08/2024', url: 'https://prtb.org.br' }]
      },
      estado: {
        topicKey: 'estado',
        topicLabel: 'Tamanho do Estado',
        score: 85,
        summary: 'Governo digital mínimo, corte de cargos burocráticos e substituição de processos físicos por automação tecnológica.',
        sources: [{ nome: 'Plano de Governo Registrado no TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      privatizacoes: {
        topicKey: 'privatizacoes',
        topicLabel: 'Privatizações',
        score: 75,
        summary: 'Parcerias privadas amplas, concessões de serviços municipais/federais e venda de ativos estatais improdutivos.',
        sources: [{ nome: 'Diretrizes Econômicas do PRTB', data: '15/08/2024', url: 'https://prtb.org.br' }]
      },
      meio_ambiente: {
        topicKey: 'meio_ambiente',
        topicLabel: 'Meio ambiente',
        score: 30,
        summary: 'Mercado de créditos de carbono, fomento a agritechs e monetização tecnológica da preservação florestal.',
        sources: [{ nome: 'Diretrizes Sustentáveis - TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      },
      liberdade_individual: {
        topicKey: 'liberdade_individual',
        topicLabel: 'Liberdade individual',
        score: 80,
        summary: 'Liberdade absoluta de expressão nas redes digitais, soberania do indivíduo e combate a controles estatais da internet.',
        sources: [{ nome: 'Pronunciamentos e Manifestações Públicas', data: '15/08/2024', url: 'https://prtb.org.br' }]
      },
      costumes: {
        topicKey: 'costumes',
        topicLabel: 'Costumes',
        score: 75,
        summary: 'Defesa de princípios cristãos, valorização da família e oposição à legalização de drogas e aborto.',
        sources: [{ nome: 'Declarações e Posicionamentos Públicos', data: '15/08/2024', url: 'https://prtb.org.br' }]
      },
      igualdade_social: {
        topicKey: 'igualdade_social',
        topicLabel: 'Igualdade social',
        score: 70,
        summary: 'Desbloqueio de mentalidade e prosperidade pelo mérito e empreendedorismo como único caminho de mobilidade social.',
        sources: [{ nome: 'Plano de Governo Registrado no TSE', data: '15/08/2024', url: 'https://divulgacandcontas.tse.jus.br/' }]
      }
    }
  }
];
