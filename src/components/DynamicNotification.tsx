
import React from 'react';
import { Check, X, Star } from 'lucide-react';

interface DynamicNotificationProps {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
  xp?: number;
}

const DynamicNotification: React.FC<DynamicNotificationProps> = ({ 
  show, 
  type, 
  message, 
  xp 
}) => {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-white" />;
      case 'error':
        return <X className="w-5 h-5 text-white" />;
      case 'info':
        return <Star className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className={`dynamic-island ${type} animate-fade-in-up`}>
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className="text-white font-bold">
          {message}
          {xp && ` +${xp} XP`}
        </span>
      </div>
    </div>
  );
};

export default DynamicNotification;
