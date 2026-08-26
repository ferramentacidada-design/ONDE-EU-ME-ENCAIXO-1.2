import React from 'react';
import { ShieldCheck, ExternalLink, RefreshCw, Trash2, Info, Lock } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate?: (view: AppView) => void;
  onOpenPrivacy?: () => void;
  onOpenHowItWorks?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenHowItWorks,
  onOpenAdmin,
}) => {
  const handlePrivacy = () => {
    if (onOpenPrivacy) onOpenPrivacy();
    else if (onNavigate) onNavigate('privacidade');
  };

  const handleHowItWorks = () => {
    if (onOpenHowItWorks) onOpenHowItWorks();
    else if (onNavigate) onNavigate('como-funciona');
  };

  const handleAdmin = () => {
    if (onOpenAdmin) onOpenAdmin();
    else if (onNavigate) onNavigate('admin');
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <footer id="main-footer" className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Electoral & Neutrality Disclaimer (Rule 91, 92) */}
        <div className="bg-stone-800/80 rounded-2xl p-6 border border-stone-700/60 mb-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-stone-300">
              <p className="font-semibold text-white text-base">
                Compromisso com a Neutralidade e Fontes Oficiais
              </p>
              <p>
                O <strong>Onde Eu Me Encaixo?</strong> é uma ferramenta informativa criada para ajudar
                cidadãos a compreenderem suas próprias opiniões e conhecerem as propostas apresentadas nas
                Eleições Presidenciais 2026.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Sem vínculo partidário ou com campanhas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Não recomenda ou ranqueia candidatos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Decisão de voto 100% soberana do eleitor</span>
                </div>
              </div>
              <p className="text-xs text-amber-400/90 pt-1 font-medium">
                ⚠️ Informações eleitorais podem mudar durante o processo eleitoral. Consulte sempre a fonte oficial.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800 text-sm">
          <div>
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-stone-700 flex items-center justify-center text-xs text-amber-300 font-extrabold">
                26
              </span>
              Onde Eu Me Encaixo?
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Questionário neutro de 50 perguntas e comparador transparente de propostas para a Presidência da República 2026.
            </p>
            <p className="text-xs text-stone-500">
              Última verificação oficial: <strong className="text-stone-300">{currentDate}</strong>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Fontes Oficiais</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://divulgacandcontas.tse.jus.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>TSE DivulgaCandContas</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tse.jus.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Portal Oficial do TSE</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tse.jus.br/eleicoes/eleicoes-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Calendário e Regras Eleitorais</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Navegação e Metodologia</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={handleHowItWorks}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  <span>Como o resultado é calculado?</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handlePrivacy}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Política de Privacidade e Dados</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Seus Dados e Controle</h4>
            <p className="text-xs text-stone-400 mb-3">
              Não solicitamos CPF, e-mail ou dados pessoais. Suas respostas ficam salvas apenas neste aparelho.
            </p>
            <button
              onClick={handlePrivacy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-red-950/60 hover:text-red-300 text-stone-300 text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Gerenciar ou Apagar Meus Dados</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Onde Eu Me Encaixo? — Projeto Cívico Apartidário e Aberto.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAdmin}
              className="hover:text-stone-400 text-stone-600 transition-colors cursor-pointer"
              title="Painel Administrativo e Auditoria de Pesos"
            >
              Auditoria do Sistema
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
