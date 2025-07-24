
import React from 'react';
import { Flame, Star, Book, Target, Trophy, Crown, Lightbulb, Fish, Sword, Gem } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useGameProgress } from '@/hooks/useGameProgress';

const UserProfile = () => {
  const { user, isGuest, signOut } = useAuth();
  const { progress } = useGameProgress();

  const userProfile = {
    name: user?.email?.split('@')[0] || (isGuest ? "Invitado" : "Usuario"),
    level: progress.totalXP < 50 ? "Nuevo Discípulo" : progress.totalXP < 200 ? "Discípulo Fiel" : "León de Judá",
    avatar: isGuest ? "👤" : "👩‍🦱",
    country: "🌍 Global",
    favoriteVerse: "Todo lo puedo en Cristo que me fortalece - Filipenses 4:13",
    stats: {
      currentStreak: progress.currentStreak,
      totalXP: progress.totalXP,
      devotionalsCompleted: 0, // TODO: Implementar devocionales
      modulesCompleted: progress.completedLevels.length
    }
  };

  const badges = [
    { name: "León de Judá", icon: Trophy, earned: progress.totalXP >= 200 },
    { name: "Embajador del Reino", icon: Crown, earned: progress.currentStreak >= 7 },
    { name: "Luz del Mundo", icon: Lightbulb, earned: progress.completedLevels.length >= 3 },
    { name: "Pescador de Hombres", icon: Fish, earned: progress.completedLevels.length >= 5 },
    { name: "Guerrero de Oración", icon: Sword, earned: progress.currentStreak >= 30 },
    { name: "Corazón Puro", icon: Gem, earned: progress.totalXP >= 500 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* Header del Perfil */}
      <div className="glass-effect rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-8xl">{userProfile.avatar}</div>
          
          <div className="text-center md:text-left space-y-3">
            <h1 className="text-3xl font-bold text-primary">{userProfile.name}</h1>
            <div className="space-y-1">
              <p className="text-lg text-secondary font-medium">{userProfile.level}</p>
              <p className="text-sm text-white/70">{userProfile.country}</p>
              {isGuest && (
                <p className="text-sm text-primary font-medium">
                  🎯 Modo Invitado - Regístrate para guardar tu progreso
                </p>
              )}
            </div>
            
            <div className="glass-effect rounded-lg p-4 max-w-md">
              <h3 className="text-sm font-medium text-white mb-2">💖 Versículo Favorito</h3>
              <p className="text-sm italic text-white/90">"{userProfile.favoriteVerse}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Detalladas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <Flame className="w-8 h-8 text-primary mx-auto" />
          <div className="text-2xl font-bold text-primary">{userProfile.stats.currentStreak}</div>
          <div className="text-sm text-white font-medium">Días de Racha</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <Star className="w-8 h-8 text-secondary mx-auto" />
          <div className="text-2xl font-bold text-primary">{userProfile.stats.totalXP}</div>
          <div className="text-sm text-white font-medium">XP Total</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <Book className="w-8 h-8 text-secondary mx-auto" />
          <div className="text-2xl font-bold text-primary">{userProfile.stats.devotionalsCompleted}</div>
          <div className="text-sm text-white font-medium">Devocionales</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <Target className="w-8 h-8 text-primary mx-auto" />
          <div className="text-2xl font-bold text-primary">{userProfile.stats.modulesCompleted}</div>
          <div className="text-sm text-white font-medium">Módulos</div>
        </div>
      </div>

      {/* Badges Cristianos */}
      <div className="glass-effect rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
          <Trophy className="w-7 h-7 text-primary" />
          Badges Espirituales
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className={`text-center p-6 rounded-xl border transition-all duration-300 ${
                  badge.earned 
                    ? 'border-primary/30 bg-primary/5 hover:bg-primary/10' 
                    : 'border-muted/30 bg-muted/5 opacity-50'
                }`}
              >
                <IconComponent 
                  className={`w-12 h-12 mx-auto mb-3 ${
                    badge.earned ? 'text-primary' : 'text-white/30'
                  }`} 
                />
                <h3 className={`text-sm font-medium ${badge.earned ? 'text-white' : 'text-white/50'}`}>
                  {badge.name}
                </h3>
                {badge.earned && (
                  <div className="text-xs text-primary mt-1 font-bold">✅ Desbloqueado</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Acciones del Perfil */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {!isGuest && (
          <button className="px-6 py-3 spiritual-gradient text-white rounded-xl font-medium hover:scale-105 transition-transform duration-200">
            ✏️ Editar Perfil
          </button>
        )}
        <button className="px-6 py-3 glass-effect border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-colors duration-200">
          📊 Ver Progreso Detallado
        </button>
        {(user || isGuest) && (
          <button 
            onClick={signOut}
            className="px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl font-medium hover:bg-red-500/30 transition-colors duration-200"
          >
            🚪 {isGuest ? 'Salir del Modo Invitado' : 'Cerrar Sesión'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
