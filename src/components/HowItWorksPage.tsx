import React from 'react';
import {
  HelpCircle,
  Calculator,
  ShieldCheck,
  Scale,
  FileText,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { DEFAULT_WEIGHT_CONFIG, DIMENSION_LABELS } from '../services/scoreService';

interface HowItWorksPageProps {
  onBack?: () => void;
  onStartQuestionnaire: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onBack,
  onStartQuestionnaire,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        )}

        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Transparência & Metodologia
        </span>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          Como o resultado é calculado?
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          «Cada resposta recebe um valor. As respostas são agrupadas por assunto. Depois, os resultados de cada assunto são combinados para gerar uma estimativa geral.»
        </p>
      </div>

      {/* Core Methodology Cards */}
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-sm">
              1
            </div>
            <h3>Escala de Pontuação das Respostas</h3>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Para cada pergunta, sua resposta é convertida em um valor numérico neutro que indica a direção da sua preferência:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 text-xs font-medium text-center">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <strong className="block text-sm font-bold">+2</strong> Concordo Muito
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50/60 text-emerald-700 border border-emerald-100">
              <strong className="block text-sm font-bold">+1</strong> Concordo
            </div>
            <div className="p-2.5 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
              <strong className="block text-sm font-bold">0</strong> Neutro
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50/60 text-rose-700 border border-rose-100">
              <strong className="block text-sm font-bold">-1</strong> Discordo
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
              <strong className="block text-sm font-bold">-2</strong> Discordo Muito
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
              <strong className="block text-sm font-bold">N/A</strong> Não Sei (Não pontua)
            </div>
          </div>
          <p className="text-xs text-stone-500 pt-1">
            * A opção "Não sei / Prefiro não responder" não prejudica seu resultado nem gera pontuação forçada.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-sm">
              2
            </div>
            <h3>Cálculo Multidimensional e Normalização (-100 a +100)</h3>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            O aplicativo não utiliza apenas um eixo único e simplista. Suas respostas são calculadas separadamente em 14 dimensões temáticas e normalizadas em uma escala matemática de <strong>-100 a +100</strong>:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-stone-700">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <strong className="text-stone-900 block text-sm">Eixo Econômico e Estado</strong>
              <p>• -100: Maior preferência por atuação do governo e investimentos estatais</p>
              <p>• 0: Posição intermediária</p>
              <p>• +100: Maior preferência por mercado livre e menor atuação estatal</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <strong className="text-stone-900 block text-sm">Eixo Social e Costumes</strong>
              <p>• Calculado separadamente para não presumir que opiniões econômicas determinam visões sobre costumes, segurança ou família.</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-stone-900 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-sm">
              3
            </div>
            <h3>Pesos Utilizados na Composição Geral</h3>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Os temas possuem pesos definidos de forma equilibrada para gerar a classificação geral de 100%:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Economia e Finanças</span>
              <span className="font-bold text-stone-900">20%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Tamanho do Estado</span>
              <span className="font-bold text-stone-900">15%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Programas Sociais</span>
              <span className="font-bold text-stone-900">15%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Segurança Pública</span>
              <span className="font-bold text-stone-900">15%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Liberdade Individual</span>
              <span className="font-bold text-stone-900">10%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Meio Ambiente</span>
              <span className="font-bold text-stone-900">10%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Saúde Pública</span>
              <span className="font-bold text-stone-900">5%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Educação Pública</span>
              <span className="font-bold text-stone-900">5%</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
              <span className="font-medium text-stone-800">Trabalho e Emprego</span>
              <span className="font-bold text-stone-900">5%</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-6 bg-stone-900 text-stone-200 rounded-2xl space-y-4">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h3>O que o aplicativo NÃO faz</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✖</span>
              <span><strong>Não recomenda candidato:</strong> Nunca diz em quem você deve votar.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✖</span>
              <span><strong>Não ranqueia candidaturas:</strong> Não existe 1º, 2º ou 3º lugar, nem "melhor" ou "pior".</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✖</span>
              <span><strong>Não calcula compatibilidade percentual com candidatos:</strong> Seu perfil político pessoal fica separado da consulta às propostas para evitar direcionamento de votos.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✔</span>
              <span><strong>Total transparência:</strong> O método é uma ferramenta estimativa para reflexão cívica, sem pretensão de determinar de forma absoluta a identidade de ninguém.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center pt-4">
        <button
          onClick={onStartQuestionnaire}
          className="px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-md transition-all cursor-pointer"
        >
          Iniciar Questionário de 50 Perguntas
        </button>
      </div>
    </div>
  );
};
