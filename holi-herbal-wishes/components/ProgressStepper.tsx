
import React from 'react';
import { Step } from '../types';

const STEPS: Step[] = ['colors', 'designs', 'message', 'preview'];

export const ProgressStepper: React.FC<{ currentStep: Step }> = ({ currentStep }) => {
  const currentIndex = STEPS.indexOf(currentStep);

  if (currentIndex === -1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mb-8 px-4">
      {STEPS.map((step, idx) => (
        <React.Fragment key={step}>
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              idx <= currentIndex ? 'bg-pink-500 scale-125' : 'bg-pink-200'
            }`}
          />
          {idx < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 rounded-full ${
              idx < currentIndex ? 'bg-pink-500' : 'bg-pink-100'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
