import React from 'react';
import { ExternalLink, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Candidate } from '../../types';
import { CandidateAvatar } from './CandidateAvatar';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: () => void;
  onCompareSelect?: (candidateId: string) => void;
  isCompareSelected?: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onSelect,
  onCompareSelect,
  isCompareSelected,
}) => {
  const isVicePending =
    candidate.vice.toLowerCase().includes('confirmar') ||
    candidate.vice.toLowerCase().includes('verificar') ||
    candidate.id === 'pablo-marcal';

  return (
    <div
      id={`candidate-card-${candidate.id}`}
      className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
    >
      <div className="space-y-4">
        {/* Top: Photo, Ballot Name, Number, Status */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <CandidateAvatar
              src={candidate.foto}
              name={candidate.nomeDeUrna}
              partyInitials={candidate.partido.split(' ')[0]}
              size="md"
            />
            {candidate.numero && candidate.numero !== 'A definir' && (
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-md bg-stone-900 text-white font-extrabold text-xs shadow-xs">
                {candidate.numero}
              </span>
            )}
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                {candidate.status}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight leading-snug truncate">
              {candidate.nomeDeUrna}
            </h3>

            <p className="text-xs text-stone-600 font-medium line-clamp-1">
              {candidate.partido}
            </p>
          </div>
        </div>

        {/* Vice-President Status (Rule 44: "Vice-presidente: informação a confirmar.") */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
          <span className="text-stone-500 block text-[10px] uppercase font-semibold">
            Vice-Presidente:
          </span>
          <span className="font-semibold text-stone-800">
            {isVicePending
              ? 'Vice-presidente: informação a confirmar.'
              : `${candidate.vice} (${candidate.partidoVice})`}
          </span>
        </div>

        {/* Divergency alert if applicable (Rule 42) */}
        {candidate.divergencyAlert && (
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>{candidate.divergencyAlert}</span>
          </div>
        )}

        {/* Featured Proposals Summary */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Destaques do Programa:
          </span>
          <ul className="space-y-1 text-xs text-stone-700">
            {candidate.propostasDestaque.slice(0, 2).map((prop, idx) => (
              <li key={idx} className="flex items-start gap-1.5 line-clamp-2">
                <span className="text-stone-400 mt-0.5">•</span>
                <span>{prop}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <button
          onClick={onSelect}
          className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Ver Programa Completo</span>
        </button>

        {onCompareSelect && (
          <button
            onClick={() => onCompareSelect(candidate.id)}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
              isCompareSelected
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            title="Selecionar para comparação"
          >
            <span>{isCompareSelected ? '✓ Selecionado' : '+ Comparar'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
