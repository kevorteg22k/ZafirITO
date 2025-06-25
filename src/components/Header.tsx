
import React from 'react';
import { Book, User, Heart } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Book className="w-8 h-8 text-primary" />
              <div className="absolute -inset-1 spiritual-gradient rounded-full blur opacity-30"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Duolingo Bíblico</h1>
              <p className="text-xs text-muted-foreground">Tu jornada espiritual</p>
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'home' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('devotional')}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                activeTab === 'devotional' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Devocional</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                activeTab === 'profile' 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
