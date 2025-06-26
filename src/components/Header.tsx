
import React from 'react';
import { Book, User, Heart, Trophy, Home, Flame, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const userStats = {
    streak: 0,
    gems: 0,
    hearts: 5
  };

  return (
    <>
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Sionik App</h1>
                <p className="text-xs text-gray-700 font-medium">Fe • Sabiduría • Tecnología</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Streak */}
              <div className="flex items-center space-x-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-gray-900 font-bold text-sm">{userStats.streak}</span>
              </div>
              
              {/* Gems */}
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💎</span>
                </div>
                <span className="text-gray-900 font-bold text-sm">{userStats.gems}</span>
              </div>
              
              {/* Hearts */}
              <div className="flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="text-gray-900 font-bold text-sm">{userStats.hearts}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-500'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('bible')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'bible' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-500'
            }`}
          >
            <Book className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">Biblia</span>
          </button>
          
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'quests' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-500'
            }`}
          >
            <Trophy className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">Misiones</span>
          </button>
          
          <button
            onClick={() => setActiveTab('devotional')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'devotional' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-500'
            }`}
          >
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">Devocional</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-500'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">Perfil</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
