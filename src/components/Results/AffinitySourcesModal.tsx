import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  Calendar,
  BookOpen,
  Globe,
} from 'lucide-react';
import { CandidateAffinityResult } from '../../services/candidateAffinityService';
import { CandidateAvatar } from '../Candidates/CandidateAvatar';

interface AffinitySourcesModalProps {
  affinity: CandidateAffinityResult;
  onClose: () => void;
}

export const AffinitySourcesModal: React.FC<AffinitySourcesModalProps> = ({
  affinity,
  onClose,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <CandidateAvatar
              src={affinity.foto}
              name={affinity.nomeDeUrna}
              partyInitials={affinity.partido.split(' ')[0]}
              size="md"
              className="border-2 border-stone-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-400 font-extrabold text-xs">
                  {affinity.numero !== 'A definir' ? `Nº ${affinity.numero}` : 'Nº a definir'}
                </span>
                <span className="text-xs text-stone-400 font-medium">{affinity.partido}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{affinity.nomeDeUrna}</h2>
              <p className="text-xs text-stone-300">Fontes Oficiais e Verificáveis Utilizadas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Fechar modal de fontes"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 text-sm">
          {/* Methodology Banner */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Critérios Rígidos de Verificabilidade</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Todas as informações sobre as propostas e posições deste candidato foram extraídas exclusivamente de fontes públicas oficiais, priorizando:
            </p>
            <ol className="list-decimal list-inside text-xs text-stone-600 space-y-0.5 pt-1">
              <li>Programa de governo registrado no TSE / DivulgaCandContas;</li>
              <li>Documentos oficiais da candidatura;</li>
              <li>Site e manifestos oficiais do candidato;</li>
              <li>Site e estatuto oficial do partido;</li>
              <li>Declarações públicas verificáveis em canais institucionais.</li>
            </ol>
          </div>

          {/* List of Sources */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Fontes Registradas ({affinity.sources.length})</span>
            </h3>

            <div className="space-y-3">
              {affinity.sources.map((source, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <strong className="text-stone-900 text-xs sm:text-sm block">{source.nome}</strong>
                      <span className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        Data da informação/registro: {source.data}
                      </span>
                    </div>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <span>Acessar fonte</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  {source.descricao && (
                    <p className="text-xs text-stone-600">{source.descricao}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Links Institucionais */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
            <span className="font-bold text-stone-900 block">Links Oficiais do Candidato</span>
            <div className="grid sm:grid-cols-2 gap-2">
              <a
                href={affinity.fonteTSE}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-stone-800 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-700" />
                  <span className="font-semibold">DivulgaCandContas (TSE)</span>
                </div>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              <a
                href={affinity.siteOficial}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-stone-800 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-stone-600" />
                  <span className="font-semibold">Site Oficial / Partido</span>
                </div>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>

          {/* Date of Consultation */}
          <div className="text-xs text-stone-500 text-center">
            Dados consultados em: <strong>{affinity.consultationDate}</strong>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
