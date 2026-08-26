import React, { useState } from 'react';
import {
  Vote,
  HelpCircle,
  Users,
  GitCompare,
  BookOpen,
  Shield,
  Sun,
  Moon,
  Type,
  Wifi,
  WifiOff,
  Sparkles,
} from 'lucide-react';
import { AppView, ContrastMode, FontSizeLevel } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  contrastMode: ContrastMode;
  onToggleContrast: () => void;
  fontSizeLevel: FontSizeLevel;
  onCycleFontSize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  contrastMode,
  onToggleContrast,
  fontSizeLevel,
  onCycleFontSize,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isHighContrast = contrastMode === 'alto-contraste';

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 border-b ${
        isHighContrast
          ? 'bg-black text-yellow-300 border-yellow-400'
          : 'bg-white/95 backdrop-blur-md border-stone-200 shadow-xs'
      }`}
    >
      {/* Top Neutrality & Accessibility Banner */}
      <div
        className={`text-xs px-4 py-1.5 flex items-center justify-between ${
          isHighContrast ? 'bg-zinc-900 text-yellow-300' : 'bg-stone-900 text-stone-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium">
            Eleições Presidenciais 2026 — Ferramenta Neutra & Transparente
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1 text-stone-300">
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" /> Online
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-400" /> Modo Offline
              </>
            )}
          </span>

          {/* Quick A11y Controls */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-stone-700">
            <button
              id="btn-font-scale"
              onClick={onCycleFontSize}
              title="Ajustar tamanho da fonte"
              className="px-2 py-0.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors text-white cursor-pointer"
              aria-label={`Tamanho da fonte atual: ${fontSizeLevel.toUpperCase()}`}
            >
              <Type className="w-3 h-3" />
              <span>{fontSizeLevel === 'normal' ? 'A' : fontSizeLevel === 'grande' ? 'A+' : 'A++'}</span>
            </button>
            <button
              id="btn-contrast-toggle"
              onClick={onToggleContrast}
              title="Alternar Alto Contraste"
              className={`p-1 rounded-sm text-xs transition-colors cursor-pointer ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
              aria-label="Alternar modo de alto contraste"
            >
              {isHighContrast ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <button
            id="nav-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg p-1 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-lg shadow-xs">
              26
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-stone-900 leading-tight">
                Onde Eu Me Encaixo?
              </span>
              <span className="block text-xs text-stone-500 font-medium">
                Neutro • Informativo • Acessível
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação Principal">
            <button
              id="nav-tab-home"
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'bg-stone-100 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Início
            </button>

            <button
              id="nav-tab-questionnaire"
              onClick={() => onNavigate('questionario')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'questionario'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>Questionário</span>
            </button>

            <button
              id="nav-tab-results"
              onClick={() => onNavigate('resultado')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'resultado'
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'text-amber-900 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Meu Perfil</span>
            </button>

            <button
              id="nav-tab-candidates"
              onClick={() => onNavigate('candidatos')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'candidatos'
                  ? 'bg-stone-100 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidatos</span>
            </button>

            <button
              id="nav-tab-compare"
              onClick={() => onNavigate('comparar')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'comparar'
                  ? 'bg-stone-100 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Comparar Propostas</span>
            </button>

            <button
              id="nav-tab-educational"
              onClick={() => onNavigate('educativo')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'educativo'
                  ? 'bg-stone-100 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Tire suas Dúvidas</span>
            </button>

            <button
              id="nav-tab-privacy"
              onClick={() => onNavigate('privacidade')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'privacidade'
                  ? 'bg-stone-100 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Privacidade</span>
            </button>
          </nav>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center gap-1 py-2 overflow-x-auto border-t border-stone-100 scrollbar-none">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
              currentView === 'home' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onNavigate('questionario')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1 ${
              currentView === 'questionario' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Vote className="w-3.5 h-3.5" /> Questionário
          </button>
          <button
            onClick={() => onNavigate('resultado')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1 ${
              currentView === 'resultado' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Perfil
          </button>
          <button
            onClick={() => onNavigate('candidatos')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1 ${
              currentView === 'candidatos' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Candidatos
          </button>
          <button
            onClick={() => onNavigate('comparar')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1 ${
              currentView === 'comparar' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" /> Comparar
          </button>
          <button
            onClick={() => onNavigate('educativo')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1 ${
              currentView === 'educativo' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Dúvidas
          </button>
          <button
            onClick={() => onNavigate('privacidade')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-1 ${
              currentView === 'privacidade' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Privacidade
          </button>
        </div>
      </div>
    </header>
  );
};
