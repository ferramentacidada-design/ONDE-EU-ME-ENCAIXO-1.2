import React, { useState } from 'react';
import { User } from 'lucide-react';

interface CandidateAvatarProps {
  src: string;
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  partyInitials?: string;
}

export const CandidateAvatar: React.FC<CandidateAvatarProps> = ({
  src,
  name,
  className = '',
  size = 'md',
  partyInitials,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-16 h-16 sm:w-20 sm:h-20 text-base',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 text-lg',
    xl: 'w-28 h-28 sm:w-32 sm:h-32 text-2xl',
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return 'CP';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (hasError || !src) {
    return (
      <div
        className={`rounded-2xl bg-stone-800 text-stone-200 font-black flex flex-col items-center justify-center border border-stone-700 shadow-2xs select-none ${sizeClasses[size]} ${className}`}
        title={name}
      >
        <span>{getInitials(name)}</span>
        {partyInitials && size !== 'xs' && size !== 'sm' && (
          <span className="text-[9px] font-bold text-amber-400 opacity-90 uppercase">
            {partyInitials}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`rounded-2xl object-cover bg-stone-100 border border-stone-200/80 shadow-2xs ${sizeClasses[size]} ${className}`}
      loading="lazy"
    />
  );
};
