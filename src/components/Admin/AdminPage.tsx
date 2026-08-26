import React, { useState } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  Database,
  Sliders,
  FileCode,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { ChangeLogItem } from '../../types';
import { CANDIDATES_DATA } from '../../data/candidates';
import { PROPOSALS_DATA } from '../../data/proposals';
import { DEFAULT_WEIGHT_CONFIG } from '../../services/scoreService';
import { verifyCandidate } from '../../services/candidateService';
import { CandidateAvatar } from '../Candidates/CandidateAvatar';

interface AdminPageProps {
  onBack: () => void;
}

const SAMPLE_CHANGELOG: ChangeLogItem[] = [
  {
    id: 'log-1',
    data: '2026-08-24 10:30',
    alteracao: 'Atualização do status de registro e homologação de candidatura',
    valorAnterior: 'Vice-presidente em análise preliminar',
    valorNovo: 'Geraldo Alckmin (PSB) confirmado na convenção',
    fonte: 'TSE DivulgaCandContas / Ata Partidária 2026',
    administrador: 'Admin TSE Auditor #01',
  },
  {
    id: 'log-2',
    data: '2026-08-20 14:15',
    alteracao: 'Inclusão de nova proposta oficial no tema Meio Ambiente',
    valorAnterior: 'Documento preliminar de campanha 2022',
    valorNovo: 'Diretrizes Oficiais do Programa Registrado no TSE',
    fonte: 'DivulgaCandContas TSE',
    administrador: 'Auditoria Cívica Automatizada',
  },
  {
    id: 'log-3',
    data: '2026-08-15 09:00',
    alteracao: 'Calibração dos pesos das 14 dimensões temáticas para equilíbrio estrito',
    valorAnterior: 'Economia 25%, Estado 10%',
    valorNovo: 'Economia 20%, Estado 15%, Programas Sociais 15%, Segurança 15%',
    fonte: 'Comitê Científico e Estatístico do Projeto',
    administrador: 'Sistema Central',
  },
];

export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'auditoria' | 'pesos' | 'candidatos' | 'logs'>('auditoria');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);

  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationDone(true);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Aplicativo</span>
        </button>

        <span className="text-xs font-bold bg-stone-900 text-amber-400 px-3 py-1 rounded-full uppercase tracking-wider">
          Área de Auditoria do Sistema
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-stone-900">
          Painel de Auditoria & Administração
        </h1>
        <p className="text-sm text-stone-600">
          Supervisão da integridade de dados, conferência contra o DivulgaCandContas do TSE e log de auditoria.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('auditoria')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'auditoria' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
          }`}
        >
          Verificação TSE (verifyCandidate)
        </button>
        <button
          onClick={() => setActiveTab('pesos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'pesos' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
          }`}
        >
          Configuração de Pesos (Rule 78)
        </button>
        <button
          onClick={() => setActiveTab('candidatos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'candidatos' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
          }`}
        >
          Banco de Candidatos ({CANDIDATES_DATA.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'logs' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
          }`}
        >
          Log de Alterações (Rule 87)
        </button>
      </div>

      {/* Tab Content: Auditoria TSE */}
      {activeTab === 'auditoria' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                Rotina Automática: verifyCandidate()
              </h3>
              <p className="text-xs text-stone-600">
                Audita nomes, partidos, número, vice e links de programas de governo registrados.
              </p>
            </div>

            <button
              onClick={handleRunVerification}
              disabled={isVerifying}
              className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>{isVerifying ? 'Verificando...' : 'Executar Conferência TSE'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {CANDIDATES_DATA.map((cand) => {
              const rep = verifyCandidate(cand);
              return (
                <div
                  key={cand.id}
                  className="p-4 bg-white rounded-2xl border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <CandidateAvatar
                      src={cand.foto}
                      name={cand.nomeDeUrna}
                      partyInitials={cand.partido.split(' - ')[0]}
                      size="sm"
                      className="w-10 h-10 rounded-xl"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">
                        {cand.nomeDeUrna} ({cand.partido.split(' - ')[0]})
                      </span>
                      <span className="text-stone-500">Vice: {cand.vice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {rep.divergenceNotes ? (
                      <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-semibold text-[11px]">
                        {rep.divergenceNotes.slice(0, 45)}...
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-semibold text-[11px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Oficial TSE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Pesos */}
      {activeTab === 'pesos' && (
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-stone-900 text-base">
              Distribuição de Pesos do Algoritmo (Total 100%)
            </h3>
            <p className="text-xs text-stone-600">
              «Não permitir que fontes externas alterem os pesos.» (Rule 78)
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            {Object.entries(DEFAULT_WEIGHT_CONFIG).map(([key, val]) => (
              <div key={key} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 uppercase block text-[11px]">
                  {key.replace('_', ' ')}
                </span>
                <span className="text-lg font-black text-amber-700">
                  {Math.round(val * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Candidatos */}
      {activeTab === 'candidatos' && (
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-stone-900 text-base">
            Candidaturas Registradas no Sistema ({CANDIDATES_DATA.length})
          </h3>
          <div className="divide-y divide-stone-100 text-xs">
            {CANDIDATES_DATA.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between">
                <div>
                  <strong className="text-stone-900">{c.nomeDeUrna}</strong> - {c.nome}
                  <p className="text-stone-500">{c.partido}</p>
                </div>
                <span className="font-semibold text-stone-700">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-stone-900 text-base">
              Log de Auditoria de Dados (Rule 87)
            </h3>
            <p className="text-xs text-stone-600">
              Histórico rastreável de todas as modificações e inclusões de fontes oficiais.
            </p>
          </div>

          <div className="space-y-3">
            {SAMPLE_CHANGELOG.map((log) => (
              <div
                key={log.id}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-stone-500">
                  <span className="font-bold text-stone-900">{log.alteracao}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {log.data}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Valor Anterior:
                    </span>
                    <span className="text-stone-600">{log.valorAnterior}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Valor Novo:
                    </span>
                    <span className="text-stone-800 font-semibold">{log.valorNovo}</span>
                  </div>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                  <span>Fonte: {log.fonte}</span>
                  <span>Responsável: {log.administrador}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
