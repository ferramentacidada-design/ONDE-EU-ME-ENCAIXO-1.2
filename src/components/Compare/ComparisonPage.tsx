import React, { useState } from 'react';
import {
  GitCompare,
  CheckCircle2,
  HelpCircle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Filter,
  Plus,
  Trash2,
} from 'lucide-react';
import { Candidate, ProposalCategory, UserProposalNote } from '../../types';
import { CANDIDATES_DATA } from '../../data/candidates';
import { PROPOSALS_DATA, PROPOSAL_CATEGORIES_LIST } from '../../data/proposals';
import { storageService } from '../../services/storageService';
import { CandidateAvatar } from '../Candidates/CandidateAvatar';

interface ComparisonPageProps {
  initialSelectedIds?: string[];
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({
  initialSelectedIds = [],
}) => {
  // Default to selecting 2 popular candidates if none provided, but user can freely change
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    initialSelectedIds.length >= 2 ? initialSelectedIds : ['lula', 'flavio-bolsonaro']
  );
  const [selectedCategory, setSelectedCategory] = useState<ProposalCategory>('Economia');
  const [userNotes, setUserNotes] = useState<Record<string, UserProposalNote>>(
    storageService.getProposalNotes()
  );

  const selectedCandidates = CANDIDATES_DATA.filter((c) =>
    selectedCandidateIds.includes(c.id)
  );

  const availableCandidates = CANDIDATES_DATA.filter(
    (c) => !selectedCandidateIds.includes(c.id)
  );

  const handleAddCandidate = (id: string) => {
    if (!selectedCandidateIds.includes(id)) {
      setSelectedCandidateIds([...selectedCandidateIds, id]);
    }
  };

  const handleRemoveCandidate = (id: string) => {
    if (selectedCandidateIds.length > 1) {
      setSelectedCandidateIds(selectedCandidateIds.filter((cid) => cid !== id));
    }
  };

  const handleSetNote = (proposalId: string, note: UserProposalNote) => {
    const updated = { ...userNotes, [proposalId]: note };
    setUserNotes(updated);
    storageService.saveProposalNote(proposalId, note);
  };

  const handleClearNote = (proposalId: string) => {
    const updated = { ...userNotes };
    delete updated[proposalId];
    setUserNotes(updated);
    storageService.removeProposalNote(proposalId);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
            <GitCompare className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Comparação Neutra de Propostas
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Comparar Candidatos por Tema
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Escolha livremente 2, 3 ou mais candidatos para colocar lado a lado suas propostas oficiais. O aplicativo não ranqueia e não diz quem está certo ou errado.
        </p>
      </div>

      {/* Neutrality Rule Notice (Rule 53 & 54) */}
      <div className="p-4 bg-stone-900 text-stone-200 rounded-2xl text-xs sm:text-sm flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-white">Garantia de Isenção Editorial</p>
          <p className="text-stone-300 text-xs">
            Esta comparação não atribui notas, nem classifica candidatos como melhores ou piores. Você pode registrar suas impressões pessoais em cada proposta ("Concordo", "Tenho dúvidas", "Discordo") estritamente para seu controle individual.
          </p>
        </div>
      </div>

      {/* Candidate Selector Bar */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Candidatos Escolhidos para Comparação ({selectedCandidates.length}):
          </span>
          <span className="text-xs text-stone-400">
            Adicione ou remova candidatos livremente
          </span>
        </div>

        {/* Selected Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          {selectedCandidates.map((cand) => (
            <div
              key={cand.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-900 text-xs font-bold border border-stone-200"
            >
              <CandidateAvatar
                src={cand.foto}
                name={cand.nomeDeUrna}
                partyInitials={cand.partido.split(' - ')[0]}
                size="xs"
                className="w-5 h-5 rounded-full"
              />
              <span>{cand.nomeDeUrna}</span>
              {selectedCandidateIds.length > 1 && (
                <button
                  onClick={() => handleRemoveCandidate(cand.id)}
                  className="text-stone-400 hover:text-rose-600 transition-colors ml-1"
                  title="Remover da comparação"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Add Candidate Dropdown */}
          {availableCandidates.length > 0 && (
            <div className="relative inline-block">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddCandidate(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer appearance-none pr-7"
              >
                <option value="" disabled>
                  + Adicionar Candidato
                </option>
                {availableCandidates.map((cand) => (
                  <option key={cand.id} value={cand.id} className="text-stone-900 bg-white">
                    {cand.nomeDeUrna} ({cand.partido.split(' - ')[0]})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Category Selector Tabs */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
          Selecione o Assunto:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PROPOSAL_CATEGORIES_LIST.slice(0, 10).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid (Side-by-side) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-xl font-black text-stone-900 uppercase">
            TEMA: {selectedCategory}
          </h2>
          <span className="text-xs text-stone-500">
            Comparando {selectedCandidates.length} candidatura(s)
          </span>
        </div>

        <div
          className={`grid gap-6 ${
            selectedCandidates.length === 1
              ? 'grid-cols-1 max-w-2xl'
              : selectedCandidates.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {selectedCandidates.map((cand) => {
            const candProposals = PROPOSALS_DATA.filter(
              (p) => p.candidateId === cand.id && p.categoria === selectedCategory
            );

            return (
              <div
                key={cand.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-5"
              >
                {/* Candidate Header */}
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <CandidateAvatar
                    src={cand.foto}
                    name={cand.nomeDeUrna}
                    partyInitials={cand.partido.split(' - ')[0]}
                    size="sm"
                    className="w-12 h-12 rounded-xl"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-stone-900">
                      {cand.nomeDeUrna}
                    </h3>
                    <p className="text-xs text-stone-500">{cand.partido.split(' - ')[0]}</p>
                  </div>
                </div>

                {/* Proposals for this theme */}
                <div className="space-y-4 flex-1">
                  {candProposals.length > 0 ? (
                    candProposals.map((prop) => {
                      const currentNote = userNotes[prop.proposalId];

                      return (
                        <div
                          key={prop.proposalId}
                          className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/80"
                        >
                          <h4 className="font-bold text-sm text-stone-900">
                            {prop.titulo}
                          </h4>

                          {/* O Que o Candidato Propõe (Rule 48) */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-stone-500 uppercase block">
                              O que o candidato propõe?
                            </span>
                            <p className="text-xs text-stone-800 leading-relaxed">
                              {prop.resumo}
                            </p>
                          </div>

                          {/* O Que Está no Documento Original */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-stone-500 uppercase block">
                              Trecho original:
                            </span>
                            <p className="text-xs text-stone-600 italic bg-white p-2.5 rounded-xl border border-stone-200/60 leading-relaxed">
                              «{prop.textoOriginal}»
                            </p>
                          </div>

                          {/* Public Statement Notice (Rule 50) */}
                          {prop.isPublicStatement && (
                            <div className="p-2 bg-amber-50 rounded-lg text-[10px] text-amber-900 border border-amber-200/60 flex items-start gap-1">
                              <AlertCircle className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                              <span>
                                Esta informação é uma declaração pública do candidato e não necessariamente faz parte do programa de governo registrado.
                              </span>
                            </div>
                          )}

                          {/* Fonte e Link (Rule 56) */}
                          <div className="pt-2 border-t border-stone-200/60 text-[10px] text-stone-500 flex items-center justify-between">
                            <span className="truncate pr-2">Fonte: {prop.fonte}</span>
                            <a
                              href={prop.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-stone-900 hover:underline flex items-center gap-0.5 shrink-0"
                            >
                              <span>Ver Documento</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {/* Personal User Note Controls (Rule 55: Concordo, Tenho Dúvidas, Discordo) */}
                          <div className="pt-2 border-t border-stone-200/60 space-y-1.5">
                            <span className="text-[10px] font-bold text-stone-500 uppercase block">
                              Minha Anotação Pessoal:
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() =>
                                  currentNote === 'concordo'
                                    ? handleClearNote(prop.proposalId)
                                    : handleSetNote(prop.proposalId, 'concordo')
                                }
                                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 ${
                                  currentNote === 'concordo'
                                    ? 'bg-emerald-700 text-white'
                                    : 'bg-white hover:bg-emerald-50 text-stone-700 border border-stone-200'
                                }`}
                              >
                                <span>👍 Concordo</span>
                              </button>

                              <button
                                onClick={() =>
                                  currentNote === 'tenho_duvidas'
                                    ? handleClearNote(prop.proposalId)
                                    : handleSetNote(prop.proposalId, 'tenho_duvidas')
                                }
                                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 ${
                                  currentNote === 'tenho_duvidas'
                                    ? 'bg-amber-700 text-white'
                                    : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
                                }`}
                              >
                                <span>🤔 Dúvidas</span>
                              </button>

                              <button
                                onClick={() =>
                                  currentNote === 'discordo'
                                    ? handleClearNote(prop.proposalId)
                                    : handleSetNote(prop.proposalId, 'discordo')
                                }
                                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 ${
                                  currentNote === 'discordo'
                                    ? 'bg-rose-700 text-white'
                                    : 'bg-white hover:bg-rose-50 text-stone-700 border border-stone-200'
                                }`}
                              >
                                <span>👎 Discordo</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 text-center text-xs text-stone-500 italic space-y-1">
                      <p>«Não encontramos uma proposta oficial verificável sobre esse assunto.»</p>
                      <p className="text-[10px] text-stone-400">
                        Consulte os documentos registrados no TSE para atualizações em tempo real.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
