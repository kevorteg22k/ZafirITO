
import React from 'react';
import { Book, User, Heart, Trophy, Home, Flame, Zap, Volume2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const userStats = {
    streak: 0,
    gems: 0,
    hearts: 3
  };

  return (
    <>
      {/* Top Header */}
      <header className="bg-slate-800 shadow-lg sticky top-0 z-50 border-b border-slate-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center divine-glow">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-100">MisionGo</h1>
                <p className="text-xs text-slate-300 font-medium">Juega. Aprende. Camina con Dios.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Streak */}
              <div className="flex items-center space-x-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-slate-100 font-bold text-sm">{userStats.streak}</span>
              </div>
              
              {/* Gems */}
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 text-xs font-bold">💎</span>
                </div>
                <span className="text-slate-100 font-bold text-sm">{userStats.gems}</span>
              </div>
              
              {/* Hearts */}
              <div className="flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="text-slate-100 font-bold text-sm">{userStats.hearts}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-purple-400 bg-purple-900/30' 
                : 'text-slate-300 hover:text-purple-400'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('bible')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'bible' 
                ? 'text-purple-400 bg-purple-900/30' 
                : 'text-slate-300 hover:text-purple-400'
            }`}
          >
            <Book className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Biblia</span>
          </button>

          <button
            onClick={() => setActiveTab('audio-bible')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'audio-bible' 
                ? 'text-purple-400 bg-purple-900/30' 
                : 'text-slate-300 hover:text-purple-400'
            }`}
          >
            <Volume2 className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Audio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'quests' 
                ? 'text-purple-400 bg-purple-900/30' 
                : 'text-slate-300 hover:text-purple-400'
            }`}
          >
            <Trophy className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Misiones</span>
          </button>
          
          <button
            onClick={() => setActiveTab('devotional')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'devotional' 
                ? 'text-purple-400 bg-purple-900/30' 
                : 'text-slate-300 hover:text-purple-400'
            }`}
          >
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">Devocional</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-purple-400 bg-purple-900/30' 
                : 'text-slate-300 hover:text-purple-400'
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
