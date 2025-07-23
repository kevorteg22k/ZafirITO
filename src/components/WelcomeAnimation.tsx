
import React from 'react';
import { Book } from 'lucide-react';

const WelcomeAnimation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center spiritual-gradient">
      <div className="text-center space-y-8 animate-divine-pulse">
        <div className="relative">
          <Book className="w-20 h-20 text-white mx-auto mb-6 animate-light-ray" />
          <div className="absolute -inset-4 spiritual-gradient rounded-full blur-xl opacity-30"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            MisionGo
          </h1>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            "Lámpara es a mis pies tu palabra, y lumbrera a mi camino"
          </p>
          <p className="text-sm text-white/70">
            Salmos 119:105
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse mx-2" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
