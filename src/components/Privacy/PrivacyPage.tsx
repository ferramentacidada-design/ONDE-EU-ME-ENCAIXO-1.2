import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { storageService } from '../../services/storageService';

interface PrivacyPageProps {
  onBack: () => void;
  onDataCleared: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onBack,
  onDataCleared,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClearData = () => {
    storageService.clearAllUserData();
    setShowConfirmModal(false);
    setIsSuccess(true);
    onDataCleared();
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Privacidade & Segurança
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-100 text-purple-900">
            <Lock className="w-5 h-5" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Privacidade e Proteção de Dados
          </h1>
        </div>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Suas opiniões políticas pertencem exclusivamente a você. O teste é 100% anônimo e não transmitimos suas respostas para terceiros.
        </p>
      </div>

      {/* Commitments Box (Rule 60 & 61) */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <h3>O que NÃO pedimos</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            <li>• Não pedimos CPF</li>
            <li>• Não pedimos título de eleitor</li>
            <li>• Não pedimos endereço ou telefone</li>
            <li>• Não pedimos senha ou cadastro</li>
            <li>• Não pedimos dados bancários</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-base">
            <ShieldCheck className="w-5 h-5" />
            <h3>Como tratamos seus dados</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            <li>• Não enviamos respostas para terceiros</li>
            <li>• Não vendemos dados</li>
            <li>• Não utilizamos respostas para propaganda</li>
            <li>• Não criamos perfil comercial</li>
            <li>• Não compartilhamos respostas com candidatos</li>
          </ul>
        </div>
      </div>

      {/* Erase My Data Section (Rule 62) */}
      <div className="p-6 sm:p-8 bg-rose-50/70 rounded-3xl border border-rose-200 space-y-4">
        <div className="flex items-center gap-3 text-rose-900 font-bold text-lg">
          <Trash2 className="w-6 h-6 text-rose-700" />
          <h3>Apagar Meus Dados</h3>
        </div>

        <p className="text-xs sm:text-sm text-rose-950/80 leading-relaxed">
          Você pode excluir a qualquer momento todas as suas respostas do questionário, resultado calculado e anotações pessoais salvas no armazenamento local deste navegador.
        </p>

        {isSuccess && (
          <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Todos os dados foram apagados deste dispositivo com sucesso!</span>
          </div>
        )}

        <button
          id="btn-apagar-dados"
          onClick={() => setShowConfirmModal(true)}
          className="px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Trash2 className="w-4 h-4" />
          <span>APAGAR MEUS DADOS</span>
        </button>
      </div>

      {/* Confirmation Modal (Rule 62) */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center gap-3 text-stone-900 font-bold text-lg">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              <h3>Confirmar Exclusão de Dados</h3>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed font-medium">
              «Isso apagará suas respostas e seu resultado deste dispositivo.»
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm transition-colors"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
