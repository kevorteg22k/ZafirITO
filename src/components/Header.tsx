
import React from 'react';
import { Book, User, Heart, Trophy, Home, Flame, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Duolingo Bíblico</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Streak */}
              <div className="flex items-center space-x-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-gray-800 font-bold">7</span>
              </div>
              
              {/* Gems */}
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💎</span>
                </div>
                <span className="text-gray-800 font-bold">120</span>
              </div>
              
              {/* Hearts */}
              <div className="flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="text-gray-800 font-bold">5</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-green-500' 
                : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'quests' 
                ? 'text-green-500' 
                : 'text-gray-500'
            }`}
          >
            <Trophy className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Misiones</span>
          </button>
          
          <button
            onClick={() => setActiveTab('devotional')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'devotional' 
                ? 'text-green-500' 
                : 'text-gray-500'
            }`}
          >
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Devocional</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-green-500' 
                : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
