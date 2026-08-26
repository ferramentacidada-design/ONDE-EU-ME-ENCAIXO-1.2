import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const EducationalPage: React.FC = () => {
  const [activeGlossarySearch, setGlossarySearch] = useState('');

  const glossaryItems = [
    {
      term: 'Esquerda',
      simple:
        'Corrente de pensamento político que enfatiza a igualdade social, a redução das disparidades de renda e o fortalecimento de serviços públicos essenciais garantidos pelo Estado.',
      context:
        'Existem diferentes correntes, como a social-democracia e o socialismo, cada uma com visões próprias sobre o grau de intervenção estatal.',
    },
    {
      term: 'Centro',
      simple:
        'Posição política que busca equilíbrio e moderação, combinando elementos de liberdade econômica com proteção social.',
      context:
        'Pessoas de centro frequentemente analisam propostas caso a caso, em vez de seguir uma ideologia rígida.',
    },
    {
      term: 'Direita',
      simple:
        'Corrente de pensamento que valoriza a liberdade individual e econômica, a livre concorrência, a responsabilidade fiscal e, em muitas correntes, a preservação de tradições e instituições.',
      context:
        'Existem correntes liberais, com foco no mercado e na liberdade individual, e conservadoras, com maior foco em valores, família e ordem.',
    },
    {
      term: 'Tributação Progressiva',
      simple:
        'Sistema em que pessoas e empresas com maior renda pagam proporcionalmente mais impostos do que pessoas com menor renda.',
      context:
        'Pode ser utilizada para financiar serviços públicos e reduzir a carga tributária sobre pessoas de menor renda.',
    },
    {
      term: 'Austeridade Fiscal / Responsabilidade Fiscal',
      simple:
        'Princípio de que o governo deve controlar seus gastos e administrar as contas públicas de forma responsável.',
      context:
        'Defensores argumentam que isso ajuda a evitar endividamento excessivo e problemas nas contas públicas.',
    },
    {
      term: 'Privatização',
      simple:
        'Processo em que uma empresa ou serviço anteriormente controlado pelo governo passa para a administração privada.',
      context:
        'Defensores apontam possíveis ganhos de eficiência e investimentos; críticos alertam para possíveis impactos sobre preços e acesso a serviços essenciais.',
    },
    {
      term: 'Inflação',
      simple:
        'Aumento geral e contínuo dos preços de produtos e serviços, fazendo com que o dinheiro perca poder de compra.',
      context:
        'Quando a inflação sobe, o mesmo salário pode comprar menos alimentos, combustível, remédios e outros produtos.',
    },
    {
      term: 'Estado Laico',
      simple:
        'Princípio pelo qual o governo não possui uma religião oficial e deve garantir liberdade religiosa e de crença.',
      context:
        'Protege tanto pessoas que seguem diferentes religiões quanto aquelas que não possuem religião.',
    },
    {
      term: 'Livre Mercado',
      simple:
        'Sistema econômico baseado na livre iniciativa e na concorrência entre empresas, com preços influenciados pela oferta e pela procura.',
      context:
        'Defensores valorizam a concorrência e a inovação; críticos defendem a necessidade de regras para evitar abusos e monopólios.',
    },
    {
      term: 'Separação dos Três Poderes',
      simple:
        'Organização do Estado em Executivo, Legislativo e Judiciário.',
      context:
        'O Executivo administra, o Legislativo cria e aprova leis e o Judiciário aplica as leis e julga conflitos.',
    },
    {
      term: 'Deputado Federal',
      simple:
        'Representante eleito para atuar na Câmara dos Deputados, participando da criação e votação de leis federais.',
      context:
        'Também fiscaliza atos do governo federal e representa a população no Congresso Nacional.',
    },
    {
      term: 'Senador',
      simple:
        'Representante dos estados e do Distrito Federal no Senado Federal.',
      context:
        'Participa da criação e votação de leis, fiscaliza o governo e exerce outras atribuições previstas na Constituição.',
    },
    {
      term: 'SUS',
      simple:
        'O Sistema Único de Saúde é o sistema público de saúde do Brasil, responsável por oferecer atendimento à população.',
      context:
        'O SUS realiza desde atendimentos básicos e vacinação até tratamentos especializados, cirurgias e outras ações de saúde pública.',
    },
    {
      term: 'Presidente da República',
      simple:
        'É o chefe do Poder Executivo federal e responsável pela administração do governo federal.',
      context:
        'Entre suas funções estão administrar ministérios, executar políticas públicas, propor leis e sancionar ou vetar projetos aprovados pelo Congresso.',
    },
    {
      term: 'Congresso Nacional',
      simple:
        'É o órgão do Poder Legislativo federal responsável principalmente pela elaboração de leis e fiscalização do governo.',
      context:
        'É formado pela Câmara dos Deputados e pelo Senado Federal.',
    },
    {
      term: 'Democracia',
      simple:
        'Sistema político no qual a população participa da escolha de representantes e possui direitos de participação na vida pública.',
      context:
        'No Brasil, a democracia funciona principalmente por meio da eleição de representantes e das instituições previstas na Constituição.',
    },
    {
      term: 'Voto Nulo e Voto em Branco',
      simple:
        'São formas de não escolher diretamente um candidato.',
      context:
        'No Brasil, votos nulos e em branco não são considerados votos válidos para definir o vencedor de uma eleição.',
    },
  ];

  const filteredGlossary = glossaryItems.filter(
    (item) =>
      item.term.toLowerCase().includes(activeGlossarySearch.toLowerCase()) ||
      item.simple.toLowerCase().includes(activeGlossarySearch.toLowerCase()) ||
      item.context.toLowerCase().includes(activeGlossarySearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-12">
      {/* Cabeçalho */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
            <BookOpen className="w-5 h-5" />
          </span>

          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Educação Cidadã
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Entenda Conceitos Políticos
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Explore conceitos importantes sobre política, democracia, economia,
          eleições e funcionamento do Estado em linguagem simples e acessível.
        </p>
      </div>

      {/* Principais Correntes Políticas */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <h2 className="text-xl font-bold text-stone-900">
          Principais Correntes Políticas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Esquerda */}
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>

              <h3 className="text-lg font-black text-stone-900">
                ESQUERDA
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Existem várias correntes de esquerda. Em geral, dão maior
              importância à <strong>redução das desigualdades</strong>, à{' '}
              <strong>proteção dos trabalhadores</strong> e ao{' '}
              <strong>fortalecimento de serviços públicos e sociais</strong>{' '}
              pelo Estado.
            </p>
          </div>

          {/* Centro */}
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>

              <h3 className="text-lg font-black text-stone-900">
                CENTRO
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Posições de centro buscam conciliar ideias de diferentes
              correntes. Valorizam o <strong>equilíbrio fiscal</strong> junto
              com <strong>redes de segurança social</strong>, avaliando
              soluções práticas caso a caso.
            </p>
          </div>

          {/* Direita */}
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>

              <h3 className="text-lg font-black text-stone-900">
                DIREITA
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Existem diferentes correntes de direita. Em geral, dão maior
              importância à <strong>propriedade privada</strong>, à{' '}
              <strong>liberdade econômica</strong>, à{' '}
              <strong>menor intervenção estatal</strong> ou a{' '}
              <strong>valores e costumes tradicionais</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="p-5 bg-stone-900 text-stone-200 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />

          <span>Regra Fundamental Contra Estereótipos</span>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          «Essas categorias são simplificações. Uma pessoa pode ter opiniões
          diferentes em diferentes assuntos.»
        </p>

        <p className="text-xs text-stone-400 leading-relaxed">
          Nenhuma posição política representa pessoas "boas" ou "ruins".
          Ideologias não determinam inteligência, caráter, honestidade ou
          patriotismo.
        </p>
      </div>

      {/* Glossário */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-stone-900">
            Glossário de Termos em Linguagem Simples
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              value={activeGlossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Buscar termo..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900"
            />
          </div>
        </div>

        {filteredGlossary.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2"
              >
                <h3 className="font-extrabold text-stone-900 text-sm">
                  {item.term}
                </h3>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {item.simple}
                </p>

                <p className="text-[11px] text-stone-500 italic bg-stone-50 p-2 rounded-lg">
                  {item.context}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white border border-stone-200 rounded-2xl text-center">
            <p className="text-sm text-stone-500">
              Nenhum termo encontrado. Tente pesquisar outra palavra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
