import React from 'react';
import { DimensionScore } from '../../types';

interface DimensionChartProps {
  dimensions: Record<string, DimensionScore>;
}

export const DimensionChart: React.FC<DimensionChartProps> = ({ dimensions }) => {
  const dimList = Object.values(dimensions);

  return (
    <div className="space-y-4">
      {dimList.map((dim) => {
        // Score is from -100 to +100.
        // Convert to percentage position on bar (0% is -100, 50% is 0, 100% is +100)
        const percentPosition = Math.round(((dim.score + 100) / 200) * 100);

        // Classification badge style
        let badgeStyle = 'bg-stone-100 text-stone-800 border-stone-200';
        if (dim.classification === 'ESQUERDA' || dim.classification === 'CENTRO-ESQUERDA') {
          badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200';
        } else if (dim.classification === 'DIREITA' || dim.classification === 'CENTRO-DIREITA') {
          badgeStyle = 'bg-blue-50 text-blue-800 border-blue-200';
        } else {
          badgeStyle = 'bg-amber-50 text-amber-900 border-amber-200';
        }

        return (
          <div
            key={dim.key}
            className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-stone-900">{dim.label}</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                {dim.classification}
              </span>
            </div>

            {/* Visual Spectrum Bar */}
            <div className="space-y-1">
              <div className="relative w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                {/* Center marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-400 z-10" />

                {/* Score Indicator Dot / Pill */}
                <div
                  className="absolute top-0 bottom-0 w-4 -ml-2 rounded-full bg-stone-900 border-2 border-white shadow-xs z-20 transition-all duration-500"
                  style={{ left: `${Math.max(4, Math.min(96, percentPosition))}%` }}
                />
              </div>

              {/* Spectrum Axis Sub-Labels */}
              <div className="flex justify-between text-[10px] font-medium text-stone-600 px-0.5">
                <span>Mais atuação estatal</span>
                <span>Centro</span>
                <span>Mais mercado / autonomia</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
