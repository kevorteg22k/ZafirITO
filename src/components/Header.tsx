
import React from 'react';
import { Book, User, Heart, Trophy, Home, Flame, Gem, Volume2 } from 'lucide-react';
import logoMisionJuvenil from '../assets/logo-mision-juvenil.png';
import { useGameProgress } from '@/hooks/useGameProgress';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { progress } = useGameProgress();

  return (
    <>
      {/* Top Header */}
      <header className="bg-accent shadow-lg sticky top-0 z-50 border-b border-accent/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white">
                <img 
                  src={logoMisionJuvenil} 
                  alt="Misión Juvenil D5" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">MisionGo</h1>
                <p className="text-xs text-white/80 font-medium">Juega. Aprende. Camina con Dios.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Streak */}
              <div className="flex items-center space-x-1">
                <Flame className="w-5 h-5 text-primary" />
                <span className="text-white font-bold text-sm">{progress.currentStreak}</span>
              </div>
              
              {/* XP/Gems */}
              <div className="flex items-center space-x-1">
                <Gem className="w-5 h-5 text-secondary" />
                <span className="text-white font-bold text-sm">{progress.totalXP}</span>
              </div>
              
              {/* Hearts */}
              <div className="flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="text-white font-bold text-sm">{progress.currentLives}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-accent border-t border-accent/20 z-50 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-primary bg-primary/20' 
                : 'text-white/70 hover:text-primary'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('bible')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'bible' 
                ? 'text-primary bg-primary/20' 
                : 'text-white/70 hover:text-primary'
            }`}
          >
            <Book className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Biblia</span>
          </button>

          <button
            onClick={() => setActiveTab('audio-bible')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'audio-bible' 
                ? 'text-primary bg-primary/20' 
                : 'text-white/70 hover:text-primary'
            }`}
          >
            <Volume2 className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Audio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'quests' 
                ? 'text-primary bg-primary/20' 
                : 'text-white/70 hover:text-primary'
            }`}
          >
            <Trophy className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Misiones</span>
          </button>
          
          <button
            onClick={() => setActiveTab('devotional')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'devotional' 
                ? 'text-primary bg-primary/20' 
                : 'text-white/70 hover:text-primary'
            }`}
          >
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Devocional</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-primary bg-primary/20' 
                : 'text-white/70 hover:text-primary'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Perfil</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
