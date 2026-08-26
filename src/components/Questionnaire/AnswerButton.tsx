import React from 'react';
import { AnswerValue } from '../../types';

interface AnswerButtonProps {
  label: string;
  value: AnswerValue;
  selectedValue: AnswerValue | undefined;
  onClick: () => void;
  id: string;
  isNeutralOrSkip?: boolean;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  label,
  value,
  selectedValue,
  onClick,
  id,
  isNeutralOrSkip = false,
}) => {
  const isSelected = selectedValue === value;

  // Visual cues based on answer intent (neutral and clear)
  let baseColors = 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200';
  let selectedColors = 'bg-stone-900 text-white border-stone-900 ring-2 ring-stone-900';

  if (value === 2) {
    baseColors = 'bg-white hover:bg-emerald-50 text-stone-900 border-emerald-300';
    selectedColors = 'bg-emerald-800 text-white border-emerald-900 ring-2 ring-emerald-600 shadow-md';
  } else if (value === 1) {
    baseColors = 'bg-white hover:bg-emerald-50/60 text-stone-800 border-emerald-200';
    selectedColors = 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-500 shadow-sm';
  } else if (value === 0) {
    baseColors = 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300';
    selectedColors = 'bg-stone-700 text-white border-stone-800 ring-2 ring-stone-500 shadow-sm';
  } else if (value === -1) {
    baseColors = 'bg-white hover:bg-rose-50/60 text-stone-800 border-rose-200';
    selectedColors = 'bg-rose-700 text-white border-rose-800 ring-2 ring-rose-500 shadow-sm';
  } else if (value === -2) {
    baseColors = 'bg-white hover:bg-rose-50 text-stone-900 border-rose-300';
    selectedColors = 'bg-rose-800 text-white border-rose-900 ring-2 ring-rose-600 shadow-md';
  } else if (value === null) {
    baseColors = 'bg-stone-100/80 hover:bg-stone-200/80 text-stone-600 border-stone-300';
    selectedColors = 'bg-stone-600 text-white border-stone-700 ring-2 ring-stone-400';
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`w-full min-h-[56px] sm:min-h-[64px] px-5 py-3.5 rounded-2xl border text-sm sm:text-base font-bold text-left transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
        isSelected ? selectedColors : baseColors
      }`}
    >
      <span className="leading-snug">{label}</span>
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          isSelected
            ? 'border-white bg-white text-stone-900 font-extrabold text-xs'
            : 'border-stone-300 bg-transparent'
        }`}
      >
        {isSelected && '✓'}
      </div>
    </button>
  );
};
