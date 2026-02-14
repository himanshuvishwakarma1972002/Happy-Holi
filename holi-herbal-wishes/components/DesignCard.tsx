
import React from 'react';
import { DesignStyle } from '../types';

interface DesignCardProps {
  style: DesignStyle;
  isSelected: boolean;
  onClick: () => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({ style, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer group flex items-center gap-6 p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
        isSelected 
          ? 'border-pink-500 bg-white shadow-[0_20px_50px_rgba(236,72,153,0.15)] scale-[1.02]' 
          : 'border-white bg-white/40 hover:border-pink-200 hover:bg-white'
      }`}
    >
      <div className={`text-4xl w-20 h-20 flex items-center justify-center rounded-3xl transition-colors duration-500 shrink-0 ${
        isSelected ? 'bg-pink-500 text-white' : 'bg-pink-50'
      }`}>
        {style.previewIcon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-xl text-gray-800 mb-1">{style.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{style.description}</p>
      </div>
    </div>
  );
};
