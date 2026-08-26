import React, { useState } from 'react';
import {
  Search,
  Users,
  ShieldCheck,
  ExternalLink,
  GitCompare,
  Filter,
  CheckCircle,
} from 'lucide-react';
import { Candidate } from '../../types';
import { CANDIDATES_DATA } from '../../data/candidates';
import { CandidateCard } from './CandidateCard';
import { CandidateDetailsModal } from './CandidateDetailsModal';

interface CandidateListProps {
  onStartComparison: (selectedIds: string[]) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  onStartComparison,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [compareSelection, setCompareSelection] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filteredCandidates = CANDIDATES_DATA.filter((cand) => {
    const matchesSearch =
      cand.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.nomeDeUrna.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.partido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.vice.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'confirmados') {
      return cand.status === 'Confirmado em convenção';
    } else if (statusFilter === 'pre-candidatura') {
      return cand.status === 'Pré-candidatura';
    }

    return true;
  });

  const toggleCompare = (id: string) => {
    if (compareSelection.includes(id)) {
      setCompareSelection(compareSelection.filter((item) => item !== id));
    } else {
      setCompareSelection([...compareSelection, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
            <Users className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Eleições Presidenciais 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Candidaturas à Presidência da República
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Consulte os nomes, partidos, situação de registro e programas de governo oficiais de todas as candidaturas e pré-candidaturas registradas no TSE.
        </p>
      </div>

      {/* Official TSE Alert (Rule 41 & 88) */}
      <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-stone-900">
            Informações verificadas no DivulgaCandContas do Tribunal Superior Eleitoral (TSE)
          </p>
          <p className="text-stone-600 text-xs">
            Esta lista reflete as candidaturas e pré-candidaturas em acompanhamento. O registro definitivo de cada candidatura, número e vice é homologado nas convenções partidárias oficiais.
          </p>
        </div>
      </div>

      {/* Search, Filter & Comparison Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou partido..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              statusFilter === 'todos'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Todos ({CANDIDATES_DATA.length})
          </button>
          <button
            onClick={() => setStatusFilter('confirmados')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              statusFilter === 'confirmados'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Confirmados
          </button>
          <button
            onClick={() => setStatusFilter('pre-candidatura')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              statusFilter === 'pre-candidatura'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Pré-candidaturas
          </button>
        </div>

        {/* Compare Trigger Button */}
        {compareSelection.length > 0 && (
          <div className="w-full md:w-auto flex items-center justify-end gap-2">
            <button
              onClick={() => onStartComparison(compareSelection)}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <GitCompare className="w-4 h-4" />
              <span>Comparar Selecionados ({compareSelection.length})</span>
            </button>
            <button
              onClick={() => setCompareSelection([])}
              className="text-xs text-stone-500 hover:text-stone-800 underline px-2"
            >
              Limpar
            </button>
          </div>
        )}
      </div>

      {/* Grid of Candidates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => (
          <CandidateCard
            key={cand.id}
            candidate={cand}
            onSelect={() => setSelectedCandidate(cand)}
            onCompareSelect={toggleCompare}
            isCompareSelected={compareSelection.includes(cand.id)}
          />
        ))}
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <CandidateDetailsModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};
