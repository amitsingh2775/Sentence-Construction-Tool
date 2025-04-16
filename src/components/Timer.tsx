import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Clock className="w-6 h-6" />
      <span className={`${timeRemaining <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
        {timeRemaining}s
      </span>
    </div>
  );
};