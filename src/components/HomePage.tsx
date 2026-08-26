import React from 'react';
import {
  Vote,
  HelpCircle,
  Users,
  GitCompare,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface HomePageProps {
  onStartQuestionnaire: () => void;
  onOpenHowItWorks?: () => void;
  onOpenCandidates?: () => void;
  onExploreCandidates?: () => void;
  onOpenCompare?: () => void;
  onExploreProposals?: () => void;
  onLearnConcepts?: () => void;
  hasSavedResult?: boolean;
  hasExistingAnswers?: boolean;
  onOpenResult?: () => void;
  onViewResults?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartQuestionnaire,
  onOpenHowItWorks,
  onOpenCandidates,
  onExploreCandidates,
  onOpenCompare,
  onExploreProposals,
  onLearnConcepts,
  hasSavedResult,
  hasExistingAnswers,
  onOpenResult,
  onViewResults,
}) => {
  const handleCandidates = onExploreCandidates || onOpenCandidates || (() => {});
  const handleCompare = onExploreProposals || onOpenCompare || (() => {});
  const handleHowItWorks = onOpenHowItWorks || onLearnConcepts || (() => {});
  const handleResult = onViewResults || onOpenResult || (() => {});
  const showSavedResult = hasSavedResult ?? hasExistingAnswers ?? false;
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-6 border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Eleições Presidenciais 2026 • Ferramenta Cidadã</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight mb-6">
          ONDE EU ME ENCAIXO?
        </h1>

        <p className="text-lg sm:text-2xl text-stone-700 font-medium max-w-3xl mx-auto leading-relaxed mb-4">
          Descubra como suas opiniões se posicionam na política brasileira
        </p>

        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Responda a 50 situações simples do cotidiano brasileiro em linguagem acessível. Descubra sua posição em 14 assuntos e conheça as propostas oficiais dos candidatos com fontes do TSE.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="btn-hero-start"
            onClick={onStartQuestionnaire}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Vote className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>COMEÇAR QUESTIONÁRIO</span>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            id="btn-hero-how-it-works"
            onClick={handleHowItWorks}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-base border border-stone-300 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-stone-600" />
            <span>COMO FUNCIONA</span>
          </button>
        </div>

        {showSavedResult && (
          <div className="mt-6">
            <button
              onClick={handleResult}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Você já possui um resultado salvo. Clique para visualizá-lo</span>
            </button>
          </div>
        )}
      </section>

      {/* 4 Pillars of Trust */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Linguagem Simples</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Sem jargões ou termos complicados. Todas as perguntas contam com exemplos do dia a dia.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">100% Neutro e Apartidário</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Não recomendamos voto, não ranqueamos candidatos e não dizemos qual posição é boa ou ruim.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Privacidade Total</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Totalmente anônimo. Sem pedido de CPF, e-mail ou dados. Suas respostas ficam apenas no seu navegador.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Fontes Oficiais do TSE</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Propostas extraídas dos programas de governo registrados no DivulgaCandContas com links diretos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Presidential Election Features */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
              Segunda Etapa do Aplicativo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Eleições Presidenciais 2026
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              Conheça as candidaturas registradas, explore o banco completo de propostas por assunto (Economia, Saúde, Educação, Segurança, etc.) e compare livremente os candidatos que você escolher.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCandidates}
                className="px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-amber-600" />
                <span>Ver Candidatos e Vices</span>
              </button>

              <button
                onClick={handleCompare}
                className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-sm border border-stone-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <GitCompare className="w-4 h-4 text-amber-400" />
                <span>Comparar Propostas por Tema</span>
              </button>

              <button
                onClick={onLearnConcepts}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-stone-900" />
                <span>Tire suas Dúvidas (IA)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works summary */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-stone-900 mb-4">
          Como o aplicativo ajuda você a decidir?
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-white border border-stone-200">
            <span className="text-2xl font-black text-amber-600 block mb-2">1</span>
            <h4 className="font-bold text-stone-900 text-sm mb-1">O que eu penso?</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              O teste mapeia suas prioridades em 14 áreas sem rotular respostas como certas ou erradas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200">
            <span className="text-2xl font-black text-amber-600 block mb-2">2</span>
            <h4 className="font-bold text-stone-900 text-sm mb-1">O que cada um propõe?</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Você consulta os programas oficiais dos candidatos divididos por temas com links para o TSE.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200">
            <span className="text-2xl font-black text-amber-600 block mb-2">3</span>
            <h4 className="font-bold text-stone-900 text-sm mb-1">Sua decisão soberana</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              O aplicativo nunca diz em quem votar. Você analisa os dados e faz sua própria escolha consciente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
