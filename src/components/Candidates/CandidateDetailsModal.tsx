import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { Candidate, Proposal } from '../../types';
import { PROPOSALS_DATA } from '../../data/proposals';
import { CandidateAvatar } from './CandidateAvatar';

interface CandidateDetailsModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({
  candidate,
  onClose,
}) => {
  const proposals = PROPOSALS_DATA.filter((p) => p.candidateId === candidate.id);
  const isVicePending =
    candidate.vice.toLowerCase().includes('confirmar') ||
    candidate.vice.toLowerCase().includes('verificar') ||
    candidate.id === 'pablo-marcal';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <CandidateAvatar
              src={candidate.foto}
              name={candidate.nomeDeUrna}
              partyInitials={candidate.partido.split(' ')[0]}
              size="md"
              className="border-2 border-stone-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-400 font-extrabold text-xs">
                  {candidate.numero !== 'A definir' ? `Nº ${candidate.numero}` : 'Número a definir'}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {candidate.status}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">{candidate.nomeDeUrna}</h2>
              <p className="text-xs text-stone-300">{candidate.nome}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Fechar detalhes do candidato"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 text-sm">
          {/* Party & Vice Box */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase block">
                Partido / Federação:
              </span>
              <p className="font-semibold text-stone-900 text-sm">{candidate.partido}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase block">
                Vice-Presidente:
              </span>
              <p className="font-semibold text-stone-900 text-sm">
                {isVicePending
                  ? 'Vice-presidente: informação a confirmar.'
                  : `${candidate.vice} (${candidate.partidoVice})`}
              </p>
            </div>
          </div>

          {/* Biografia Curta */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-base">Sobre a Candidatura</h3>
            <p className="text-stone-600 leading-relaxed text-sm">{candidate.biografiaCurta}</p>
          </div>

          {/* Programa de Governo */}
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h4>Programa de Governo Oficial</h4>
              </div>
              <span className="text-xs text-stone-500">
                Atualizado em: {candidate.dataAtualizacao}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-800 font-medium">
              «{candidate.programaDeGoverno}»
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={candidate.fonteTSE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                <span>Verificar no TSE DivulgaCand</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>

              {candidate.siteOficial && (
                <a
                  href={candidate.siteOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  <span>Portal Oficial da Legenda</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              )}
            </div>
          </div>

          {/* Proposals by Theme for this Candidate */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 text-base">
              Propostas Registradas por Tema ({proposals.length})
            </h3>

            {proposals.length > 0 ? (
              <div className="space-y-4">
                {proposals.map((prop) => (
                  <div
                    key={prop.proposalId}
                    className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                        {prop.categoria}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {prop.status} • Versão {prop.versao}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      {prop.titulo}
                    </h4>

                    {/* O Que o Candidato Propõe (Rule 48) */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-stone-500 uppercase block">
                        O que o candidato propõe?
                      </span>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                        {prop.resumo}
                      </p>
                    </div>

                    {/* O Que Está no Documento */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-stone-500 uppercase block">
                        O que está no documento original?
                      </span>
                      <p className="text-xs text-stone-600 italic bg-stone-50/50 p-3 rounded-xl border border-stone-200/40">
                        «{prop.textoOriginal}»
                      </p>
                    </div>

                    {/* Fonte e Link */}
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                      <span>Fonte: {prop.fonte}</span>
                      <a
                        href={prop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-900 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Ver Documento</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 text-center text-xs sm:text-sm text-stone-600">
                «Não encontramos uma proposta oficial verificável adicional cadastrada para este assunto no momento.»
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
