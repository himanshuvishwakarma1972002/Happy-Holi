
import React, { useMemo } from 'react';
import { HOLI_COLORS } from '../data/colors';

interface HoliPreviewProps {
  colorIds: string[];
  designId: string;
  message?: string;
  className?: string;
}

export const HoliPreview: React.FC<HoliPreviewProps> = ({ 
  colorIds, 
  designId, 
  message, 
  className = "" 
}) => {
  const colors = useMemo(() => 
    HOLI_COLORS.filter(c => colorIds.includes(c.id)), 
    [colorIds]
  );

  const renderDesign = () => {
    const colorsList = colors.length > 0 ? colors : HOLI_COLORS.slice(0, 6);
    
    switch(designId) {
      case 'traditional-thali':
        return (
          <div className="relative w-full aspect-square bg-amber-50 rounded-full border-[12px] border-amber-600 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
            {colorsList.map((color, idx) => {
              const size = 100 - (idx * (90 / colorsList.length));
              return (
                <div 
                  key={color.id}
                  className="absolute rounded-full shadow-inner transition-all duration-1000"
                  style={{
                    width: `${size}%`,
                    height: `${size}%`,
                    backgroundColor: color.hex,
                    opacity: 0.95,
                    zIndex: colorsList.length - idx,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="absolute inset-0 powder-glow" style={{ backgroundColor: color.secondaryHex }}></div>
                </div>
              );
            })}
          </div>
        );

      case 'color-splash':
        return (
          <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl">
             {colorsList.map((color, idx) => {
              const top = 10 + (idx * 17) % 70;
              const left = 15 + (idx * 23) % 65;
              const size = 120 + (idx * 25) % 150;
              return (
                <div 
                  key={`${color.id}-${idx}`}
                  className="absolute animate-pulse"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color.hex,
                    borderRadius: '30% 70% 50% 50% / 50% 30% 70% 50%',
                    filter: 'blur(35px)',
                    opacity: 0.6,
                    animationDelay: `${idx * 0.2}s`
                  }}
                />
              );
            })}
            {colorsList.map((color, idx) => (
              <div 
                key={`dot-${idx}`}
                className="absolute w-4 h-4 rounded-full opacity-40 animate-bounce"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  backgroundColor: color.secondaryHex,
                  animationDelay: `${idx * 0.1}s`
                }}
              />
            ))}
          </div>
        );

      case 'royal-festival':
        return (
          <div className="relative w-full aspect-square bg-[#fff8e1] rounded-3xl overflow-hidden shadow-2xl p-8 border-4 border-amber-400">
            <div className="absolute inset-4 border border-amber-200 rounded-2xl flex flex-wrap gap-4 items-center justify-center">
              {colorsList.map((color, idx) => (
                <div 
                  key={color.id}
                  className="w-16 h-24 rounded-t-full shadow-lg"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="w-full h-1/2 bg-white/10 rounded-t-full"></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-4xl">🏰</div>
          </div>
        );

      case 'minimal-pastel':
        return (
          <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-xl flex items-center justify-center">
            <div className="grid grid-cols-3 gap-6">
              {colorsList.slice(0, 9).map((color) => (
                <div 
                  key={color.id}
                  className="w-12 h-12 rounded-full shadow-sm animate-float"
                  style={{ backgroundColor: color.hex, opacity: 0.7 }}
                />
              ))}
            </div>
          </div>
        );

      case 'radha-krishna':
        return (
          <div className="relative w-full aspect-square bg-sky-50 rounded-3xl overflow-hidden shadow-2xl p-10">
            <div className="absolute top-4 left-4 text-5xl opacity-80 animate-bounce">🪈</div>
            <div className="absolute bottom-4 right-4 text-5xl opacity-80 animate-pulse">🪶</div>
            <div className="w-full h-full flex items-center justify-center">
              {colorsList.map((color, idx) => {
                const angle = (idx / colorsList.length) * 360;
                return (
                  <div 
                    key={color.id}
                    className="absolute w-3/4 h-3/4 rounded-full mix-blend-multiply opacity-40"
                    style={{ 
                      backgroundColor: color.hex, 
                      transform: `rotate(${angle}deg) translateX(${idx * 4}px)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );

      case 'modern-abstract':
        return (
          <div className="relative w-full aspect-square bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            {colorsList.map((color, idx) => (
              <div 
                key={color.id}
                className="absolute"
                style={{
                  top: `${(idx * 15) % 100}%`,
                  left: `${(idx * 15) % 100}%`,
                  width: '150%',
                  height: '40%',
                  background: `linear-gradient(90deg, transparent, ${color.hex}, transparent)`,
                  transform: `rotate(${idx * 45}deg)`,
                  filter: 'blur(40px)',
                  opacity: 0.5
                }}
              />
            ))}
          </div>
        );

      case 'floral-holi':
        return (
          <div className="relative w-full aspect-square bg-green-50 rounded-3xl overflow-hidden shadow-2xl p-8">
            <div className="grid grid-cols-4 gap-4 h-full">
              {colorsList.map((color, idx) => (
                <div 
                  key={color.id}
                  className="flex flex-col items-center justify-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                  <span className="text-xl">🌸</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'temple-courtyard':
        return (
          <div className="relative w-full aspect-square bg-[#fdf2f2] rounded-3xl overflow-hidden shadow-2xl p-4 flex items-center justify-center">
             <div className="grid grid-cols-2 gap-4 w-full h-full p-6">
                {colorsList.slice(0, 4).map((color, idx) => (
                  <div 
                    key={color.id}
                    className="rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: color.hex + '22' }}
                  >
                    <div className="w-16 h-16 rounded-full blur-md" style={{ backgroundColor: color.hex }}></div>
                    <div className="absolute inset-0 border-2 border-dashed border-pink-200/50 rounded-2xl"></div>
                  </div>
                ))}
             </div>
             <div className="absolute text-4xl bg-white rounded-full p-4 shadow-xl">🛕</div>
          </div>
        );

      case 'soft-glow':
        return (
          <div className="relative w-full aspect-square bg-orange-50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 to-purple-200/30"></div>
            {colorsList.map((color, idx) => (
              <div 
                key={color.id}
                className="absolute rounded-full blur-[60px] animate-pulse"
                style={{
                  top: `${Math.random() * 60 + 20}%`,
                  left: `${Math.random() * 60 + 20}%`,
                  width: '200px',
                  height: '200px',
                  backgroundColor: color.hex,
                  opacity: 0.4,
                  animationDelay: `${idx * 0.5}s`
                }}
              />
            ))}
          </div>
        );

      case 'vibrant-rangoli':
        return (
          <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="relative w-full h-full scale-110">
              {colorsList.map((color, idx) => {
                const rotation = (idx / colorsList.length) * 360;
                return (
                  <div 
                    key={color.id}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg shadow-md -translate-y-24"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div 
                      className="w-8 h-8 rounded-full shadow-inner -translate-y-36"
                      style={{ backgroundColor: color.secondaryHex }}
                    />
                  </div>
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-pink-500 shadow-2xl flex items-center justify-center text-4xl text-white">✨</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full aspect-square bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-8">
            <div className="w-full h-full relative">
              {colorsList.map((color, idx) => {
                const angle = (idx / colorsList.length) * Math.PI * 2;
                const dist = 35;
                const x = 50 + Math.cos(angle) * dist;
                const y = 50 + Math.sin(angle) * dist;
                return (
                  <div 
                    key={color.id}
                    className="absolute w-32 h-32 rounded-full blur-3xl opacity-50 animate-pulse"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: color.hex,
                      animationDelay: `${idx * 0.2}s`
                    }}
                  />
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-white/40 backdrop-blur-lg border border-white/60 shadow-2xl flex flex-col items-center justify-center text-center p-4">
                  <span className="text-6xl mb-2 animate-bounce">🎨</span>
                  <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">Herbal Holi</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative group transition-all duration-500 ${className}`}>
      {renderDesign()}
      {message && (
        <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none drop-shadow-2xl">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/80 max-w-[85%] text-center transform transition-all duration-500 group-hover:scale-105">
            <div className="text-pink-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-1">Festive Greetings</div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-2 leading-tight">
              Happy Holi!
            </h2>
            <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed italic border-t border-pink-100 pt-2">
              "{message}"
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <span className="text-lg">🌸</span>
              <span className="text-lg">✨</span>
              <span className="text-lg">🌿</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
