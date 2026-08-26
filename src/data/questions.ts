import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // 1. Economia e Impostos (1 a 8)
  {
    id: 1,
    category: 'Economia e impostos',
    text: 'Você acha justo que uma pessoa muito rica pague uma porcentagem maior de imposto do que uma pessoa que ganha pouco?',
    example: 'Por exemplo: uma pessoa que ganha R$ 3 mil por mês e outra que ganha R$ 300 mil por mês poderiam pagar porcentagens diferentes de imposto.',
    whyWeAsk: 'Esta pergunta avalia sua opinião sobre a tributação progressiva em relação à renda.',
    primaryDimension: 'impostos',
    secondaryDimension: 'economia',
    direction: -1, // Concordar = maior tributação progressiva / esquerda
    weight: 1.0,
  },
  {
    id: 2,
    category: 'Economia e impostos',
    text: 'Você acha que o governo deveria diminuir os impostos cobrados das empresas para facilitar a criação de empregos?',
    whyWeAsk: 'Esta questão aborda o impacto da carga tributária sobre a atividade empresarial e a geração de postos de trabalho.',
    primaryDimension: 'impostos',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = desoneração empresarial / mercado
    weight: 1.0,
  },
  {
    id: 3,
    category: 'Economia e impostos',
    text: 'Se o governo estiver gastando mais dinheiro do que arrecada, você acha que deveria cortar gastos antes de aumentar impostos?',
    whyWeAsk: 'Esta questão trata da responsabilidade e do equilíbrio nas contas públicas do país.',
    primaryDimension: 'estado',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = controle de gastos / austeridade fiscal
    weight: 1.2,
  },
  {
    id: 4,
    category: 'Economia e impostos',
    text: 'Você acha que o governo deveria aumentar impostos para financiar mais serviços públicos, como saúde e educação?',
    whyWeAsk: 'Esta pergunta avalia se você prefere mais arrecadação para expandir a rede estatal de serviços.',
    primaryDimension: 'impostos',
    secondaryDimension: 'estado',
    direction: -1, // Concordar = maior arrecadação para serviços públicos
    weight: 1.1,
  },
  {
    id: 5,
    category: 'Economia e impostos',
    text: 'Você acha que o governo deveria deixar empresas privadas participarem mais da economia?',
    example: 'Por exemplo: permitir que empresas privadas administrem serviços ou empresas que hoje são controlados pelo governo.',
    whyWeAsk: 'Esta pergunta explora o equilíbrio entre atuação pública e iniciativa privada em setores essenciais.',
    primaryDimension: 'economia',
    secondaryDimension: 'estado',
    direction: 1, // Concordar = livre mercado e participação privada
    weight: 1.0,
  },
  {
    id: 6,
    category: 'Economia e impostos',
    text: 'Você acha que algumas empresas do governo poderiam ser vendidas para empresas privadas se isso trouxesse melhorias?',
    whyWeAsk: 'Esta pergunta analisa a privatização condicional de ativos e empresas públicas.',
    primaryDimension: 'estado',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = privatização para ganhos de eficiência
    weight: 1.1,
  },
  {
    id: 7,
    category: 'Economia e impostos',
    text: 'Você acha que o governo deveria ajudar pequenas empresas pagando parte dos custos ou oferecendo benefícios fiscais?',
    whyWeAsk: 'Esta questão avalia a intervenção e fomento estatal para micro e pequenas empresas.',
    primaryDimension: 'economia',
    secondaryDimension: 'trabalho',
    direction: -1, // Concordar = incentivos e suporte estatal
    weight: 0.9,
  },
  {
    id: 8,
    category: 'Economia e impostos',
    text: 'Você acha que o governo deveria controlar mais os preços de produtos importantes quando eles aumentarem muito?',
    example: 'Por exemplo: alimentos, combustíveis ou medicamentos.',
    whyWeAsk: 'Esta pergunta afere sua preferência sobre controle de preços ou livre flutuação de mercado.',
    primaryDimension: 'economia',
    secondaryDimension: 'estado',
    direction: -1, // Concordar = controle de preços estatal
    weight: 1.1,
  },

  // 2. Emprego e Salários (9 a 13)
  {
    id: 9,
    category: 'Emprego e salários',
    text: 'Você acha que o salário mínimo deveria aumentar acima da inflação quando a economia permitir?',
    example: 'Inflação é quando os preços aumentam e o dinheiro passa a comprar menos.',
    whyWeAsk: 'Esta pergunta trata da valorização real do salário mínimo de acordo com a capacidade do país.',
    primaryDimension: 'trabalho',
    secondaryDimension: 'economia',
    direction: -1, // Concordar = valorização salarial com regulação
    weight: 1.0,
  },
  {
    id: 10,
    category: 'Emprego e salários',
    text: 'Você acha que o governo deveria criar mais regras para proteger trabalhadores, mesmo que isso aumente os custos das empresas?',
    whyWeAsk: 'Esta questão analisa o peso da proteção trabalhista frente aos custos operacionais dos empregadores.',
    primaryDimension: 'trabalho',
    secondaryDimension: 'economia',
    direction: -1, // Concordar = mais regulação e direitos
    weight: 1.1,
  },
  {
    id: 11,
    category: 'Emprego e salários',
    text: 'Você acha que empresas deveriam ter mais liberdade para contratar e demitir funcionários?',
    whyWeAsk: 'Esta pergunta analisa a flexibilização das relações de trabalho e contratação.',
    primaryDimension: 'trabalho',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = flexibilidade trabalhista
    weight: 1.1,
  },
  {
    id: 12,
    category: 'Emprego e salários',
    text: 'Você acha que o governo deveria aumentar programas de treinamento para ajudar pessoas desempregadas a conseguir trabalho?',
    whyWeAsk: 'Esta questão avalia a qualificação profissional promovida pelo setor público.',
    primaryDimension: 'trabalho',
    secondaryDimension: 'programas_sociais',
    direction: -1, // Concordar = capacitação pública ativa
    weight: 0.8,
  },
  {
    id: 13,
    category: 'Emprego e salários',
    text: 'Você acha que o governo deveria aumentar benefícios para trabalhadores de baixa renda?',
    whyWeAsk: 'Esta pergunta trata da complementação de renda para trabalhadores com salários menores.',
    primaryDimension: 'programas_sociais',
    secondaryDimension: 'trabalho',
    direction: -1, // Concordar = benefícios complementares
    weight: 1.0,
  },

  // 3. Programas Sociais (14 a 18)
  {
    id: 14,
    category: 'Programas sociais',
    text: 'Você acha que o governo deveria aumentar a ajuda financeira para famílias pobres?',
    whyWeAsk: 'Esta questão avalia a ampliação de programas de transferência direta de renda.',
    primaryDimension: 'programas_sociais',
    secondaryDimension: 'igualdade_social',
    direction: -1, // Concordar = aumento da rede de assistência
    weight: 1.2,
  },
  {
    id: 15,
    category: 'Programas sociais',
    text: 'Você acha que famílias que recebem ajuda do governo deveriam cumprir algumas regras para continuar recebendo?',
    example: 'Como manter os filhos na escola e cumprir regras de saúde previstas no programa.',
    whyWeAsk: 'Esta questão trata das condicionalidades em programas de transferência de renda.',
    primaryDimension: 'programas_sociais',
    secondaryDimension: 'estado',
    direction: 1, // Concordar = exigência de contrapartidas
    weight: 0.9,
  },
  {
    id: 16,
    category: 'Programas sociais',
    text: 'Você acha melhor combater a pobreza principalmente criando empregos do que aumentando programas de ajuda financeira?',
    whyWeAsk: 'Esta pergunta contrapõe a priorização do crescimento econômico e empregabilidade aos auxílios diretos.',
    primaryDimension: 'economia',
    secondaryDimension: 'programas_sociais',
    direction: 1, // Concordar = foco em emprego/mercado
    weight: 1.1,
  },
  {
    id: 17,
    category: 'Programas sociais',
    text: 'Você acha que o governo deveria aumentar a ajuda para pessoas que realmente não conseguem trabalhar?',
    whyWeAsk: 'Esta questão afere o amparo a pessoas com deficiência severa ou idosos em vulnerabilidade.',
    primaryDimension: 'programas_sociais',
    secondaryDimension: 'igualdade_social',
    direction: -1, // Concordar = ampliação da seguridade social
    weight: 0.9,
  },
  {
    id: 18,
    category: 'Programas sociais',
    text: 'Você acha que pessoas que podem trabalhar deveriam procurar emprego para continuar recebendo determinados benefícios do governo?',
    whyWeAsk: 'Esta questão aborda a busca ativa de emprego como critério para permanência em auxílios.',
    primaryDimension: 'programas_sociais',
    secondaryDimension: 'trabalho',
    direction: 1, // Concordar = estímulo ao trabalho e limite a auxílios
    weight: 1.0,
  },

  // 4. Saúde (19 a 22)
  {
    id: 19,
    category: 'Saúde',
    text: 'Você acha que o governo deveria gastar mais dinheiro para melhorar o SUS?',
    whyWeAsk: 'Esta pergunta analisa o investimento no Sistema Único de Saúde gratuito e universal.',
    primaryDimension: 'saude',
    secondaryDimension: 'estado',
    direction: -1, // Concordar = investimento público direto
    weight: 1.1,
  },
  {
    id: 20,
    category: 'Saúde',
    text: 'Você acha que empresas particulares deveriam participar mais da saúde pública?',
    example: 'Por exemplo: um hospital particular receber dinheiro do governo para atender pacientes do SUS.',
    whyWeAsk: 'Esta pergunta aborda parcerias público-privadas e convênios na área médica.',
    primaryDimension: 'saude',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = parceria privada na saúde
    weight: 1.0,
  },
  {
    id: 21,
    category: 'Saúde',
    text: 'Você acha que o governo deveria oferecer mais medicamentos gratuitamente para a população?',
    whyWeAsk: 'Esta questão trata da cobertura de remédios pela rede pública de farmácias populares.',
    primaryDimension: 'saude',
    secondaryDimension: 'programas_sociais',
    direction: -1, // Concordar = remédios gratuitos estatais
    weight: 0.9,
  },
  {
    id: 22,
    category: 'Saúde',
    text: 'Se fosse necessário aumentar impostos para melhorar hospitais e postos de saúde, você apoiaria?',
    whyWeAsk: 'Esta questão avalia a disposição em contribuir financeiramente especificamente para a saúde.',
    primaryDimension: 'impostos',
    secondaryDimension: 'saude',
    direction: -1, // Concordar = imposto para saúde pública
    weight: 1.0,
  },

  // 5. Educação (23 a 27)
  {
    id: 23,
    category: 'Educação',
    text: 'Você acha que o governo deveria gastar mais dinheiro nas escolas públicas?',
    whyWeAsk: 'Esta pergunta foca no investimento orçamentário prioritário na rede pública de ensino.',
    primaryDimension: 'educacao',
    secondaryDimension: 'estado',
    direction: -1, // Concordar = expansão da escola pública
    weight: 1.0,
  },
  {
    id: 24,
    category: 'Educação',
    text: 'Você acha que escolas particulares deveriam receber dinheiro do governo para oferecer vagas gratuitas para alunos de baixa renda?',
    whyWeAsk: 'Esta questão analisa o modelo de bolsas e vouchers na rede privada.',
    primaryDimension: 'educacao',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = vouchers e parceria com ensino privado
    weight: 1.0,
  },
  {
    id: 25,
    category: 'Educação',
    text: 'Você acha que as escolas deveriam dar mais atenção a matemática, português, ciências e outras matérias básicas?',
    whyWeAsk: 'Esta questão aborda a ênfase no currículo básico fundamental de habilidades científicas e linguísticas.',
    primaryDimension: 'educacao',
    secondaryDimension: 'costumes',
    direction: 1, // Concordar = currículo tradicional/básico
    weight: 0.8,
  },
  {
    id: 26,
    category: 'Educação',
    text: 'Você acha que as escolas também deveriam ensinar sobre cidadania, política, história e funcionamento do governo?',
    whyWeAsk: 'Esta pergunta analisa a inclusão de formação social, política e histórica nas salas de aula.',
    primaryDimension: 'educacao',
    secondaryDimension: 'liberdade_individual',
    direction: -1, // Concordar = formação cidadã e histórica ampla
    weight: 0.9,
  },
  {
    id: 27,
    category: 'Educação',
    text: 'Você acha que os pais deveriam ter mais influência sobre o que seus filhos aprendem sobre assuntos relacionados a valores e comportamento?',
    whyWeAsk: 'Esta pergunta afere o papel da autoridade familiar frente às diretrizes pedagógicas escolares.',
    primaryDimension: 'costumes',
    secondaryDimension: 'educacao',
    direction: 1, // Concordar = primazia dos pais em valores
    weight: 1.1,
  },

  // 6. Segurança Pública (28 a 32)
  {
    id: 28,
    category: 'Segurança pública',
    text: 'Você acha que a polícia deveria receber mais dinheiro, equipamentos e treinamento para combater criminosos?',
    whyWeAsk: 'Esta pergunta avalia o fortalecimento operacional e orçamentário das forças policiais.',
    primaryDimension: 'seguranca',
    secondaryDimension: 'estado',
    direction: 1, // Concordar = fortalecimento policial
    weight: 1.0,
  },
  {
    id: 29,
    category: 'Segurança pública',
    text: 'Você acha que as penas para crimes violentos deveriam ser mais duras?',
    example: 'Como crimes envolvendo assassinato, estupro ou violência grave.',
    whyWeAsk: 'Esta questão aborda o rigor penal contra crimes de alta lesividade.',
    primaryDimension: 'justica',
    secondaryDimension: 'seguranca',
    direction: 1, // Concordar = endurecimento penal
    weight: 1.2,
  },
  {
    id: 30,
    category: 'Segurança pública',
    text: 'Você acha que criminosos que cometem crimes muito graves deveriam passar mais tempo na prisão?',
    whyWeAsk: 'Esta pergunta trata da redução de progressões e aumento do tempo real de cumprimento de pena.',
    primaryDimension: 'justica',
    secondaryDimension: 'seguranca',
    direction: 1, // Concordar = tempo de cárcere mais longo
    weight: 1.1,
  },
  {
    id: 31,
    category: 'Segurança pública',
    text: 'Você acha que o governo deveria investir mais em educação e emprego para tentar evitar que jovens entrem no crime?',
    whyWeAsk: 'Esta questão explora ações preventivas e sociais na raiz da criminalidade.',
    primaryDimension: 'seguranca',
    secondaryDimension: 'programas_sociais',
    direction: -1, // Concordar = prevenção social
    weight: 1.1,
  },
  {
    id: 32,
    category: 'Segurança pública',
    text: 'Você acha que a polícia deveria ter mais liberdade para agir contra suspeitos de crimes, desde que existam regras para evitar abusos?',
    whyWeAsk: 'Esta pergunta analisa a flexibilidade de ação policial no combate ostensivo.',
    primaryDimension: 'seguranca',
    secondaryDimension: 'liberdade_individual',
    direction: 1, // Concordar = autonomia policial
    weight: 1.1,
  },

  // 7. Armas (33 a 34)
  {
    id: 33,
    category: 'Armas',
    text: 'Você acha que uma pessoa que não tenha antecedentes criminais e cumpra todas as exigências da lei deveria ter mais facilidade para possuir uma arma em casa?',
    example: 'Possuir uma arma em casa significa ter a arma legalmente registrada e guardada para proteção dentro da residência. Isso é diferente de andar armado na rua.',
    whyWeAsk: 'Esta questão aborda o direito à posse de armas de fogo para defesa residencial.',
    primaryDimension: 'armas',
    secondaryDimension: 'liberdade_individual',
    direction: 1, // Concordar = facilidade na posse de armas
    weight: 1.2,
  },
  {
    id: 34,
    category: 'Armas',
    text: 'Você acha que as regras para comprar e registrar uma arma deveriam ser mais rígidas?',
    whyWeAsk: 'Esta pergunta trata do controle e restrições legais para a compra de armas de fogo.',
    primaryDimension: 'armas',
    secondaryDimension: 'seguranca',
    direction: -1, // Concordar = desarmamento e maior rigidez
    weight: 1.2,
  },

  // 8. Tamanho do Governo (35 a 37)
  {
    id: 35,
    category: 'Tamanho do governo',
    text: 'Você acha que o governo deveria ser menor e gastar menos dinheiro?',
    example: 'Isso poderia significar reduzir alguns cargos, despesas e estruturas do governo.',
    whyWeAsk: 'Esta pergunta afere sua preferência geral sobre a dimensão do aparato governamental.',
    primaryDimension: 'estado',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = Estado menor / enxuto
    weight: 1.2,
  },
  {
    id: 36,
    category: 'Tamanho do governo',
    text: 'Você acha que o governo deveria contratar mais funcionários públicos quando isso melhorar serviços como saúde, educação e segurança?',
    whyWeAsk: 'Esta questão aborda a expansão de concursos e do quadro de servidores públicos essenciais.',
    primaryDimension: 'estado',
    secondaryDimension: 'saude',
    direction: -1, // Concordar = expansão do funcionalismo
    weight: 1.0,
  },
  {
    id: 37,
    category: 'Tamanho do governo',
    text: 'Você acha que o governo deveria participar menos da economia e deixar mais decisões para empresas e cidadãos?',
    whyWeAsk: 'Esta questão explora a desregulamentação e livre iniciativa no dia a dia econômico.',
    primaryDimension: 'estado',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = menor interferência econômica
    weight: 1.2,
  },

  // 9. Privatizações (38 a 39)
  {
    id: 38,
    category: 'Privatizações',
    text: 'Você acha que uma empresa do governo deveria poder ser vendida se uma empresa privada puder prestar aquele serviço de forma melhor e mais barata?',
    whyWeAsk: 'Esta pergunta analisa a concessão e venda de estatais focando em qualidade e preço.',
    primaryDimension: 'estado',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = privatização focada em eficiência
    weight: 1.1,
  },
  {
    id: 39,
    category: 'Privatizações',
    text: 'Você acha importante que o governo mantenha empresas estatais mesmo quando elas dão prejuízo?',
    example: 'Empresa estatal é uma empresa controlada pelo governo.',
    whyWeAsk: 'Esta questão aborda a visão estratégica de manter estatais pelo interesse público ou soberania.',
    primaryDimension: 'estado',
    secondaryDimension: 'economia',
    direction: -1, // Concordar = manutenção de estatais estratégicas
    weight: 1.1,
  },

  // 10. Meio Ambiente (40 a 43)
  {
    id: 40,
    category: 'Meio ambiente',
    text: 'Você acha que o governo deveria criar regras ambientais mais rígidas para proteger florestas, rios e animais?',
    whyWeAsk: 'Esta pergunta avalia o rigor das leis de conservação ambiental e fiscalização.',
    primaryDimension: 'meio_ambiente',
    secondaryDimension: 'estado',
    direction: -1, // Concordar = preservação ambiental rigorosa
    weight: 1.2,
  },
  {
    id: 41,
    category: 'Meio ambiente',
    text: 'Se uma empresa quiser construir uma fábrica que gere muitos empregos, mas isso causar algum dano ao meio ambiente, você acha que o governo deveria impedir a construção?',
    whyWeAsk: 'Esta questão contrapõe a urgência do emprego imediato à preservação ecológica local.',
    primaryDimension: 'meio_ambiente',
    secondaryDimension: 'economia',
    direction: -1, // Concordar = primazia do meio ambiente
    weight: 1.2,
  },
  {
    id: 42,
    category: 'Meio ambiente',
    text: 'Você acha que empresas que poluem deveriam pagar mais impostos ou multas?',
    whyWeAsk: 'Esta pergunta aborda a tributação ecológica e o princípio do poluidor-pagador.',
    primaryDimension: 'meio_ambiente',
    secondaryDimension: 'impostos',
    direction: -1, // Concordar = punição tributária/ambiental
    weight: 1.0,
  },
  {
    id: 43,
    category: 'Meio ambiente',
    text: 'Você acha que o Brasil deveria permitir mais exploração de petróleo, minérios e outros recursos naturais para gerar empregos e dinheiro?',
    whyWeAsk: 'Esta pergunta trata da exploração intensiva de commodities minerais e fósseis para o desenvolvimento.',
    primaryDimension: 'meio_ambiente',
    secondaryDimension: 'economia',
    direction: 1, // Concordar = exploração de recursos / desenvolvimento
    weight: 1.1,
  },

  // 11. Liberdade Individual (44 a 45)
  {
    id: 44,
    category: 'Liberdade individual',
    text: 'Você acha que cada pessoa deveria poder escolher como viver sua vida, desde que não prejudique outras pessoas?',
    example: 'Isso inclui escolhas sobre aparência, relacionamento, profissão, estilo de vida e outros assuntos pessoais.',
    whyWeAsk: 'Esta questão avalia o princípio fundamental da autonomia individual e tolerância.',
    primaryDimension: 'liberdade_individual',
    secondaryDimension: 'costumes',
    direction: -1, // Concordar = progressismo/autonomia pessoal
    weight: 1.0,
  },
  {
    id: 45,
    category: 'Liberdade individual',
    text: 'Você acha que o governo deveria evitar criar leis sobre comportamentos pessoais que não prejudicam outras pessoas?',
    whyWeAsk: 'Esta pergunta afere o limite da regulação estatal sobre escolhas morais privadas.',
    primaryDimension: 'liberdade_individual',
    secondaryDimension: 'estado',
    direction: -1, // Concordar = não intervenção moral do Estado
    weight: 1.0,
  },

  // 12. Família e Costumes (46 a 48)
  {
    id: 46,
    category: 'Família e costumes',
    text: 'Você acha importante preservar costumes e tradições brasileiras?',
    example: 'Por exemplo: festas populares, festas religiosas, costumes regionais, culinária, músicas, danças, formas tradicionais de comemorar datas e alguns valores familiares.',
    whyWeAsk: 'Esta questão trata da valorização da herança cultural e tradições históricas.',
    primaryDimension: 'costumes',
    secondaryDimension: 'liberdade_individual',
    direction: 1, // Concordar = conservadorismo cultural/tradicional
    weight: 1.1,
  },
  {
    id: 47,
    category: 'Família e costumes',
    text: 'Você acha que os pais deveriam ter bastante liberdade para decidir como ensinar seus filhos sobre religião, valores e comportamento?',
    whyWeAsk: 'Esta questão aborda a primazia da educação moral no âmbito familiar.',
    primaryDimension: 'costumes',
    secondaryDimension: 'liberdade_individual',
    direction: 1, // Concordar = valores familiares tradicionais
    weight: 1.0,
  },
  {
    id: 48,
    category: 'Religião e Estado',
    text: 'Você acha que o governo deveria evitar impor uma religião ou uma visão religiosa para toda a população?',
    example: 'O Brasil possui pessoas de diferentes religiões e também pessoas que não seguem nenhuma religião.',
    whyWeAsk: 'Esta pergunta trata da laicidade do Estado e do respeito à diversidade de crenças.',
    primaryDimension: 'liberdade_individual',
    secondaryDimension: 'costumes',
    direction: -1, // Concordar = Estado laico
    weight: 1.0,
  },

  // 13. Direitos e Igualdade (49 a 50)
  {
    id: 49,
    category: 'Direitos individuais',
    text: 'Você acha que o governo deveria criar políticas específicas para ajudar grupos que sofrem mais dificuldades ou discriminação?',
    whyWeAsk: 'Esta questão avalia a atuação pública focalizada em minorias ou populações vulneráveis.',
    primaryDimension: 'igualdade_social',
    secondaryDimension: 'programas_sociais',
    direction: -1, // Concordar = políticas afirmativas e proteção a minorias
    weight: 1.2,
  },
  {
    id: 50,
    category: 'Relação entre governo e população',
    text: 'Você acha que o governo deveria aumentar sua atuação para diminuir a diferença entre pessoas muito ricas e pessoas muito pobres?',
    whyWeAsk: 'Esta pergunta mede o apoio a intervenções para diminuir a disparidade econômica na sociedade.',
    primaryDimension: 'igualdade_social',
    secondaryDimension: 'economia',
    direction: -1, // Concordar = redução ativa da desigualdade
    weight: 1.2,
  },
];
