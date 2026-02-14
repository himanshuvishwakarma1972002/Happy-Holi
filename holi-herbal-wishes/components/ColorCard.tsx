
import React from 'react';
import { HoliColor } from '../types';

interface ColorCardProps {
  color: HoliColor;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorCard: React.FC<ColorCardProps> = ({ color, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer group rounded-[2rem] p-5 transition-all duration-500 border-2 overflow-hidden ${
        isSelected 
          ? 'border-pink-500 bg-white shadow-2xl scale-105 z-10' 
          : 'border-white bg-white/40 hover:bg-white hover:border-pink-200 shadow-sm'
      }`}
    >
      <div 
        className="w-full h-28 rounded-2xl mb-4 shadow-inner transform transition-transform duration-700 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${color.hex}, ${color.secondaryHex})` }}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>
      <h3 className="font-bold text-gray-800 text-base mb-1">{color.name}</h3>
      <p className="text-xs text-pink-600 font-bold mb-2 uppercase tracking-tighter">Derived from {color.source}</p>
      <p className="text-xs text-gray-500 leading-normal line-clamp-2">{color.description}</p>
      
      {isSelected && (
        <div className="absolute top-3 right-3 bg-pink-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in spin-in">
          ✓
        </div>
      )}
    </div>
  );
};
