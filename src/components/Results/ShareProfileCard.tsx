import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { CalculationResult } from '../../types';

interface ShareProfileCardProps {
  result: CalculationResult;
}

export const ShareProfileCard: React.FC<ShareProfileCardProps> = ({ result }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `meu-perfil-politico-2026.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao gerar imagem para download', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareNavigator = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Onde Eu Me Encaixo?',
          text: `Meu resultado no aplicativo Onde Eu Me Encaixo?: ${result.classification}. Descubra como suas opiniões se posicionam na política brasileira!`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to image download
        handleDownloadImage();
      }
    } else {
      handleDownloadImage();
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden/Visible shareable canvas card */}
      <div className="overflow-x-auto p-1">
        <div
          ref={cardRef}
          className="w-full max-w-[540px] mx-auto bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-lg">
                26
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  Onde Eu Me Encaixo?
                </h3>
                <span className="text-xs text-stone-400">Ferramenta Cidadã Apartidária</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold bg-stone-800 text-stone-300 px-2.5 py-1 rounded-full">
              Eleições 2026
            </span>
          </div>

          {/* Overall Profile Result */}
          <div className="text-center py-4 bg-stone-800/80 rounded-2xl border border-stone-700/60 space-y-1">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Classificação Geral
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {result.classification}
            </div>
            <p className="text-xs text-stone-300 max-w-sm mx-auto px-4 pt-1">
              {result.summaryText}
            </p>
          </div>

          {/* Subject Highlights */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
              Perfil por Áreas Temáticas:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.values(result.dimensions).slice(0, 8).map((dim) => (
                <div
                  key={dim.key}
                  className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/40 flex justify-between items-center"
                >
                  <span className="text-stone-300 font-medium truncate pr-1">{dim.label}</span>
                  <span className="font-bold text-amber-300 text-[11px] shrink-0">
                    {dim.classification}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Footer on Image */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sem recomendação de voto • 100% Neutro</span>
            </div>
            <span>Fontes: TSE / DivulgaCandContas</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={handleDownloadImage}
          disabled={isGenerating}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Imagem Baixada com Sucesso!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-amber-400" />
              <span>{isGenerating ? 'Gerando Imagem...' : 'Baixar Imagem do Perfil'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleShareNavigator}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-sm font-semibold border border-stone-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-stone-600" />
          <span>Compartilhar Resultado</span>
        </button>
      </div>
    </div>
  );
};
