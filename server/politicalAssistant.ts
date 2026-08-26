import { GoogleGenAI } from '@google/genai';
import { CANDIDATES_DATA } from '../src/data/candidates';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

const CANDIDATES_SUMMARY = CANDIDATES_DATA.map((c) => {
  return `- ${c.nomeDeUrna} (${c.nome}), Partido: ${c.partido}, Número: ${c.numero}, Status: ${c.status}, Vice: ${c.vice} (${c.partidoVice}).
Programa/Diretrizes: "${c.programaDeGoverno}" (Fonte: ${c.fonteTSE})
Propostas de Destaque:
${c.propostasDestaque.map((p) => `  * ${p}`).join('\n')}`;
}).join('\n\n');

export const SYSTEM_INSTRUCTION = `Você é o "Assistente de Dúvidas Políticas" do aplicativo cidadão "Onde Eu Me Encaixo?".

Seu objetivo é ajudar cidadãos brasileiros a entender política, eleições, governo, economia, democracia, leis, instituições e propostas políticas.

REGRAS IMPORTANTES:

1. Responda sempre diretamente à pergunta feita pelo usuário.
2. Nunca responda com um texto genérico que não tenha relação com a pergunta.
3. Use português brasileiro simples, claro e didático.
4. Explique conceitos difíceis com exemplos quando isso ajudar.
5. Seja neutro e apartidário.
6. Nunca recomende em quem votar.
7. Nunca diga qual candidato é melhor ou pior.
8. Nunca ataque ou defenda candidatos ou partidos.
9. Quando houver diferentes visões sobre um assunto político, apresente os argumentos de forma equilibrada.
10. Se não souber uma informação, diga claramente.

Se o usuário perguntar "Qual é a função de um deputado federal?", responda especificamente sobre deputado federal.

Se perguntar "Como funciona o SUS?", explique especificamente como funciona o SUS.

Se perguntar "Qual a diferença entre deputado e senador?", compare os dois diretamente.

Nunca ignore o assunto principal da pergunta.

SOBRE CANDIDATOS E ELEIÇÕES:

- Use apenas informações verificáveis presentes nos dados fornecidos ou em fontes oficiais.
- Nunca invente candidatos, números, partidos, vices ou propostas.
- Não recomende voto.
- Se o usuário perguntar "em quem devo votar?" ou "quem é o melhor candidato?", explique que a decisão depende das prioridades de cada pessoa e ofereça uma comparação neutra.

DADOS DE CANDIDATOS DAS ELEIÇÕES 2026:

${CANDIDATES_SUMMARY}
`;

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Respostas educativas usadas apenas se o Gemini não estiver disponível.
 */
export function generateEducationalFallback(question: string): string {
  const q = normalizeText(question);

  // ==================================================
  // DIFERENÇA ENTRE DEPUTADO E SENADOR
  // Esta regra vem ANTES das regras individuais.
  // ==================================================

  if (
    q.includes('deputado') &&
    (q.includes('senador') || q.includes('senado')) &&
    (
      q.includes('diferenca') ||
      q.includes('diferente') ||
      q.includes('compar')
    )
  ) {
    return `A principal diferença entre Deputado Federal e Senador está em quem cada um representa, na duração do mandato e em algumas atribuições.

• Deputado Federal:
Representa a população e faz parte da Câmara dos Deputados. Seu mandato dura 4 anos.

• Senador:
Representa os estados e o Distrito Federal e faz parte do Senado Federal. Seu mandato dura 8 anos.

Ambos participam da criação e votação de leis federais e da fiscalização do governo.

O Senado também possui algumas atribuições específicas previstas na Constituição, como participar da aprovação de determinadas autoridades para cargos públicos.

Resumo:

Deputado Federal → representa a população → mandato de 4 anos.

Senador → representa os estados e o Distrito Federal → mandato de 8 anos.

Fonte: Constituição Federal de 1988 / Câmara dos Deputados / Senado Federal.`;
  }

  // ==================================================
  // SUS
  // ==================================================

  if (
    q.includes('como funciona o sus') ||
    q.includes('o que e sus') ||
    q.includes('oque e sus') ||
    q.includes('oq e sus') ||
    q.includes('sistema unico de saude') ||
    q === 'sus'
  ) {
    return `O SUS significa Sistema Único de Saúde e é o sistema público de saúde do Brasil.

Ele oferece atendimento à população e é financiado com recursos públicos.

O SUS atua em diversas áreas, como:

1. Consultas e atendimento médico;
2. Vacinação;
3. Atendimento de emergência;
4. Cirurgias e tratamentos;
5. Distribuição de determinados medicamentos;
6. Transplantes;
7. Vigilância sanitária;
8. Controle e prevenção de doenças.

O sistema funciona com participação dos três níveis de governo:

• União;
• Estados;
• Municípios.

Cada nível possui responsabilidades na organização, financiamento e administração dos serviços de saúde.

Fonte: Constituição Federal de 1988 / Sistema Único de Saúde.`;
  }

  // ==================================================
  // VOTO
  // ==================================================

  if (
    (q.includes('em quem') && q.includes('votar')) ||
    q.includes('quem devo votar') ||
    q.includes('em quem eu voto')
  ) {
    return `Não posso escolher ou recomendar um candidato para você.

A escolha do voto depende das prioridades e valores de cada pessoa. Posso ajudar a comparar propostas e informações verificáveis para que você forme sua própria opinião.

Fonte: Tribunal Superior Eleitoral (TSE).`;
  }

  if (
    q.includes('quem e melhor') ||
    q.includes('qual candidato e melhor') ||
    q.includes('quem e o melhor') ||
    q.includes('quem e pior')
  ) {
    return `Não existe uma resposta objetiva sobre qual candidato é "melhor" ou "pior".

Essa avaliação depende das prioridades e valores de cada eleitor.

Posso ajudar você a comparar propostas e informações disponíveis de forma neutra para facilitar sua análise.

Fonte: Tribunal Superior Eleitoral (TSE).`;
  }

  // ==================================================
  // ESQUERDA
  // ==================================================

  if (
    q.includes('o que e esquerda') ||
    q.includes('oq e esquerda') ||
    q.includes('oque e esquerda') ||
    q.includes('o que significa esquerda')
  ) {
    return `Esquerda é um conjunto de correntes de pensamento político que, de forma geral, dá maior importância à redução das desigualdades sociais e a uma atuação mais forte do Estado em áreas como saúde, educação, trabalho e proteção social.

Por exemplo, pessoas identificadas com ideias de esquerda podem defender maior investimento público em serviços como escolas e hospitais e políticas para reduzir desigualdades.

Existem diferentes correntes dentro da esquerda, portanto nem todas as pessoas de esquerda pensam da mesma forma.`;
  }

  // ==================================================
  // DIREITA
  // ==================================================

  if (
    q.includes('o que e direita') ||
    q.includes('oq e direita') ||
    q.includes('oque e direita') ||
    q.includes('o que significa direita')
  ) {
    return `Direita é um conjunto de correntes de pensamento político que, de forma geral, valoriza a liberdade individual, a iniciativa privada, o mercado e a responsabilidade fiscal.

Por exemplo, defensores de ideias de direita podem argumentar que menos intervenção do governo na economia e mais liberdade para empresas ajudam a estimular investimentos e geração de empregos.

Existem diferentes correntes dentro da direita, como liberalismo e conservadorismo. Por isso, pessoas identificadas com a direita podem ter opiniões diferentes dependendo do assunto.`;
  }

  // ==================================================
  // DIFERENÇA ENTRE ESQUERDA E DIREITA
  // ==================================================

  if (
    q.includes('esquerda') &&
    q.includes('direita') &&
    (
      q.includes('diferenca') ||
      q.includes('diferente') ||
      q.includes('compar')
    )
  ) {
    return `De forma simplificada, esquerda e direita costumam ter visões diferentes sobre o papel do Estado e da economia.

• Esquerda: costuma defender uma participação mais ativa do Estado na redução das desigualdades e na oferta de serviços públicos.

• Direita: costuma defender maior espaço para a iniciativa privada, liberdade econômica e, em muitas correntes, maior controle dos gastos públicos.

• Centro: geralmente busca combinar ideias associadas aos dois lados, dependendo do tema.

Essas categorias são simplificações. Uma pessoa pode concordar com ideias tradicionalmente associadas à esquerda em alguns assuntos e à direita em outros.`;
  }

  // ==================================================
  // CENTRO
  // ==================================================

  if (
    q.includes('o que e centro') ||
    q.includes('oq e centro') ||
    q.includes('oque e centro') ||
    q.includes('centro politico')
  ) {
    return `Centro é uma posição política geralmente associada à busca de equilíbrio ou moderação entre ideias tradicionalmente ligadas à esquerda e à direita.

Uma pessoa de centro pode defender responsabilidade fiscal e iniciativa privada em alguns temas e, ao mesmo tempo, apoiar programas sociais e investimentos públicos em saúde e educação.

As posições políticas podem variar bastante dependendo do assunto.`;
  }

  // ==================================================
  // PRESIDENTE
  // ==================================================

  if (
    q.includes('o que faz o presidente') ||
    q.includes('funcao do presidente') ||
    q.includes('papel do presidente') ||
    q.includes('presidente da republica')
  ) {
    return `O Presidente da República é o chefe do Poder Executivo federal.

Entre suas principais funções estão:

1. Administrar o governo federal e os ministérios;
2. Executar políticas públicas nacionais;
3. Propor projetos de lei;
4. Sancionar ou vetar leis aprovadas pelo Congresso;
5. Executar o orçamento federal dentro das regras legais;
6. Representar o Brasil internacionalmente;
7. Exercer o comando supremo das Forças Armadas.

O Presidente não governa sozinho. O Congresso Nacional cria e aprova leis, enquanto o Poder Judiciário interpreta e aplica as leis e a Constituição.

Fonte: Constituição Federal de 1988.`;
  }

  // ==================================================
  // DEPUTADO FEDERAL
  // ==================================================

  if (
    q.includes('deputado federal') ||
    q.includes('deputados federais') ||
    (
      q.includes('deputado') &&
      (
        q.includes('funcao') ||
        q.includes('faz') ||
        q.includes('papel') ||
        q.includes('serve')
      )
    )
  ) {
    return `O Deputado Federal é um representante da população no Congresso Nacional e faz parte da Câmara dos Deputados.

Suas principais funções são:

1. Criar, discutir e votar leis federais;
2. Apresentar projetos de lei;
3. Fiscalizar as ações do governo federal;
4. Participar da discussão e aprovação do orçamento da União;
5. Representar a população e os interesses do estado pelo qual foi eleito.

Por exemplo, um Deputado Federal pode apresentar um projeto de lei relacionado à educação, saúde, segurança ou economia.

Fonte: Constituição Federal de 1988 / Câmara dos Deputados.`;
  }

  // ==================================================
  // SENADOR
  // ==================================================

  if (
    q.includes('senador') ||
    q.includes('senado') ||
    q.includes('o que faz um senador')
  ) {
    return `O Senador é um representante dos estados e do Distrito Federal no Congresso Nacional.

O Brasil possui 81 senadores: três representantes para cada um dos 26 estados e para o Distrito Federal.

Entre suas principais funções estão:

1. Criar, discutir e votar leis federais;
2. Fiscalizar ações do governo;
3. Participar da aprovação de determinadas autoridades indicadas para cargos públicos;
4. Representar os interesses dos estados no Congresso Nacional.

O mandato de um senador é de 8 anos.

Fonte: Constituição Federal de 1988 / Senado Federal.`;
  }

  // ==================================================
  // GOVERNADOR
  // ==================================================

  if (
    q.includes('o que faz governador') ||
    q.includes('funcao do governador') ||
    q.includes('papel do governador')
  ) {
    return `O Governador é o chefe do Poder Executivo de um estado.

Entre suas principais funções estão:

1. Administrar o governo estadual;
2. Executar políticas públicas estaduais;
3. Gerenciar áreas de responsabilidade estadual, como segurança pública;
4. Propor projetos de lei estaduais;
5. Sancionar ou vetar leis aprovadas pela Assembleia Legislativa;
6. Administrar o orçamento do estado.

Fonte: Constituição Federal de 1988.`;
  }

  // ==================================================
  // PREFEITO
  // ==================================================

  if (
    q.includes('o que faz prefeito') ||
    q.includes('funcao do prefeito') ||
    q.includes('papel do prefeito')
  ) {
    return `O Prefeito é o chefe do Poder Executivo de um município.

Entre suas principais funções estão:

1. Administrar a cidade;
2. Executar políticas públicas municipais;
3. Gerenciar serviços municipais;
4. Administrar áreas como transporte e limpeza urbana;
5. Propor projetos de lei para a Câmara Municipal;
6. Sancionar ou vetar leis municipais aprovadas pelos vereadores.

Fonte: Constituição Federal de 1988.`;
  }

  // ==================================================
  // VEREADOR
  // ==================================================

  if (
    q.includes('o que faz vereador') ||
    q.includes('funcao do vereador') ||
    q.includes('papel do vereador')
  ) {
    return `O Vereador faz parte do Poder Legislativo municipal, ou seja, da Câmara Municipal.

Suas principais funções são:

1. Criar, discutir e votar leis municipais;
2. Fiscalizar as ações do Prefeito;
3. Participar da discussão e aprovação do orçamento municipal;
4. Representar os interesses da população da cidade.

O Vereador não administra diretamente a prefeitura. Essa função é do Prefeito e de sua equipe.

Fonte: Constituição Federal de 1988.`;
  }

  // ==================================================
  // CONGRESSO
  // ==================================================

  if (
    q.includes('o que faz o congresso') ||
    q.includes('funcao do congresso') ||
    q.includes('papel do congresso') ||
    q.includes('congresso nacional')
  ) {
    return `O Congresso Nacional é o Poder Legislativo federal do Brasil.

Ele é formado por duas casas:

• Câmara dos Deputados: composta por Deputados Federais, que representam a população.

• Senado Federal: composto por Senadores, que representam os estados e o Distrito Federal.

Entre as principais funções do Congresso estão:

1. Criar e aprovar leis;
2. Alterar propostas legislativas;
3. Aprovar o orçamento da União;
4. Fiscalizar ações do governo federal.

Fonte: Constituição Federal de 1988.`;
  }

  // ==================================================
  // STF
  // ==================================================

  if (
    q.includes('o que e stf') ||
    q.includes('oque e stf') ||
    q.includes('o que faz o stf') ||
    q.includes('funcao do stf') ||
    q.includes('supremo tribunal federal')
  ) {
    return `O STF, Supremo Tribunal Federal, é a mais alta corte do Poder Judiciário brasileiro.

Sua principal função é guardar a Constituição Federal.

Isso significa que o STF pode analisar se leis e atos do poder público estão de acordo com a Constituição.

Fonte: Constituição Federal de 1988 / Supremo Tribunal Federal.`;
  }

  // ==================================================
  // INFLAÇÃO
  // ==================================================

  if (
    q.includes('o que e inflacao') ||
    q.includes('oque e inflacao') ||
    q === 'inflacao'
  ) {
    return `Inflação é o aumento geral e contínuo dos preços de produtos e serviços.

Por exemplo, imagine que uma compra de supermercado custava R$ 100 e, algum tempo depois, os mesmos produtos passam a custar R$ 110.

Nesse caso, o dinheiro perdeu parte do seu poder de compra.

Quando a inflação aumenta, produtos e serviços podem ficar mais caros.`;
  }

  // ==================================================
  // PRIVATIZAÇÃO
  // ==================================================

  if (q.includes('privatiza')) {
    return `Privatização é o processo em que uma empresa ou atividade controlada pelo governo passa para a iniciativa privada.

Quem defende a privatização costuma argumentar que empresas privadas podem ter mais flexibilidade para investir e administrar.

Quem critica costuma argumentar que serviços essenciais podem ficar mais caros ou que setores estratégicos devem permanecer sob controle público.

Os resultados podem variar dependendo do setor, do contrato e da fiscalização.`;
  }

  // ==================================================
  // URNA ELETRÔNICA
  // ==================================================

  if (
    q.includes('urna eletronica') ||
    q.includes('seguranca da urna') ||
    q.includes('seguranca do voto')
  ) {
    return `A urna eletrônica é o equipamento utilizado pela Justiça Eleitoral brasileira para registrar e apurar os votos.

Durante a votação, ela não fica conectada diretamente à internet.

O sistema eleitoral possui mecanismos de auditoria e procedimentos de verificação conduzidos pela Justiça Eleitoral.

Após a votação, são emitidos Boletins de Urna com os resultados registrados em cada seção eleitoral.

Fonte: Tribunal Superior Eleitoral (TSE).`;
  }

  // ==================================================
  // VOTO NULO E BRANCO
  // ==================================================

  if (
    q.includes('voto nulo') ||
    q.includes('voto em branco') ||
    q.includes('anular o voto') ||
    q.includes('voto branco')
  ) {
    return `No Brasil, votos em branco e votos nulos não são considerados votos válidos para definir o vencedor da eleição.

• Voto em branco: quando o eleitor escolhe a opção "Branco".

• Voto nulo: quando o eleitor digita um número que não corresponde a um candidato ou legenda válida.

Os vencedores são definidos com base nos votos válidos.

É incorreto afirmar que uma eleição é automaticamente anulada se mais de 50% dos votos forem nulos.

Fonte: Tribunal Superior Eleitoral (TSE).`;
  }

  // ==================================================
  // PROCESSO DE LEIS
  // ==================================================

  if (
    q.includes('como uma lei e criada') ||
    q.includes('como nasce uma lei') ||
    q.includes('processo de lei')
  ) {
    return `De forma simplificada, uma lei federal geralmente passa por algumas etapas:

1. Uma proposta é apresentada;
2. O projeto é analisado e discutido;
3. Pode passar por comissões;
4. É votado conforme o processo previsto;
5. Depois de aprovado pelo Congresso, pode seguir para sanção ou veto do Presidente da República;
6. Após a conclusão do processo legal, a norma pode ser publicada e entrar em vigor.

O processo pode variar dependendo do tipo de proposta.

Fonte: Constituição Federal de 1988 / Congresso Nacional.`;
  }

  // ==================================================
  // FALLBACK FINAL
  // ==================================================

  return `Não encontrei uma resposta específica para essa pergunta no modo offline.

Se o Gemini estiver conectado corretamente, ele poderá responder perguntas abertas sobre política, governo, economia, democracia, saúde pública, eleições, leis e cidadania.

Fonte geral: Constituição Federal de 1988 / Tribunal Superior Eleitoral (TSE).`;
}

/**
 * Responde usando Gemini.
 * Se houver erro, utiliza o fallback local.
 */
export async function askPoliticalAssistant(
  messages: ChatMessage[]
): Promise<{ answer: string; sources?: string[] }> {
  if (!messages || messages.length === 0) {
    throw new Error('Nenhuma mensagem fornecida');
  }

  const latestMessage = messages[messages.length - 1];

  const questionText = String(latestMessage.content || '').trim();

  if (!questionText) {
    return {
      answer: 'Por favor, escreva sua pergunta para que eu possa ajudar.',
    };
  }

  if (questionText.length > 2000) {
    return {
      answer:
        'Sua pergunta é muito longa. Tente resumir para que eu possa responder melhor.',
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log(
      '[Assistente Político] GEMINI_API_KEY não encontrada. Usando fallback.'
    );

    return {
      answer: generateEducationalFallback(questionText),
      sources: [
        'Tribunal Superior Eleitoral (TSE)',
        'Constituição Federal de 1988',
      ],
    };
  }

  try {
    console.log(
      '[Assistente Político] Enviando pergunta para Gemini:',
      questionText
    );

    const ai = new GoogleGenAI({
      apiKey,
    });

    const contents = messages
      .filter((msg) => msg && msg.content)
      .map((msg) => ({
        role:
          msg.role === 'assistant' || msg.role === 'model'
            ? 'model'
            : 'user',
        parts: [
          {
            text: String(msg.content),
          },
        ],
      }));

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('TIMEOUT'));
      }, 25000);
    });

    const generatePromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    const response = await Promise.race([
      generatePromise,
      timeoutPromise,
    ]);

    const generatedText = response.text?.trim();

    if (!generatedText) {
      console.error(
        '[Assistente Político] Gemini respondeu sem texto.'
      );

      return {
        answer: generateEducationalFallback(questionText),
        sources: [
          'Tribunal Superior Eleitoral (TSE)',
          'Constituição Federal de 1988',
        ],
      };
    }

    console.log(
      '[Assistente Político] Resposta recebida do Gemini.'
    );

    return {
      answer: generatedText,
    };
  } catch (err) {
    console.error(
      '[Assistente Político] Erro ao chamar Gemini:',
      err
    );

    return {
      answer: generateEducationalFallback(questionText),
      sources: [
        'Tribunal Superior Eleitoral (TSE)',
        'Constituição Federal de 1988',
      ],
    };
  }
}
