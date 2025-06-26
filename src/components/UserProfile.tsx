
import React from 'react';
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
    { name: "León de Judá", emoji: "🦁", earned: progress.totalXP >= 200 },
    { name: "Embajador del Reino", emoji: "👑", earned: progress.currentStreak >= 7 },
    { name: "Luz del Mundo", emoji: "💡", earned: progress.completedLevels.length >= 3 },
    { name: "Pescador de Hombres", emoji: "🎣", earned: false },
    { name: "Guerrero de Oración", emoji: "⚔️", earned: false },
    { name: "Corazón Puro", emoji: "💎", earned: progress.totalXP >= 500 }
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
              <p className="text-lg text-accent font-medium">{userProfile.level}</p>
              <p className="text-sm text-muted-foreground">{userProfile.country}</p>
              {isGuest && (
                <p className="text-sm text-yellow-400 font-medium">
                  🎯 Modo Invitado - Regístrate para guardar tu progreso
                </p>
              )}
            </div>
            
            <div className="glass-effect rounded-lg p-4 max-w-md">
              <h3 className="text-sm font-medium text-accent mb-2">💖 Versículo Favorito</h3>
              <p className="text-sm italic text-foreground/90">"{userProfile.favoriteVerse}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Detalladas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <div className="text-3xl">🔥</div>
          <div className="text-2xl font-bold text-primary">{userProfile.stats.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Días de Racha</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <div className="text-3xl">⭐</div>
          <div className="text-2xl font-bold text-primary">{userProfile.stats.totalXP}</div>
          <div className="text-xs text-muted-foreground">XP Total</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <div className="text-3xl">📖</div>
          <div className="text-2xl font-bold text-primary">{userProfile.stats.devotionalsCompleted}</div>
          <div className="text-xs text-muted-foreground">Devocionales</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center space-y-3">
          <div className="text-3xl">🎯</div>
          <div className="text-2xl font-bold text-primary">{userProfile.stats.modulesCompleted}</div>
          <div className="text-xs text-muted-foreground">Módulos</div>
        </div>
      </div>

      {/* Badges Cristianos */}
      <div className="glass-effect rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-primary text-center">🏆 Badges Espirituales</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl border transition-all duration-300 ${
                badge.earned 
                  ? 'border-accent/30 bg-accent/5 hover:bg-accent/10' 
                  : 'border-muted/30 bg-muted/5 opacity-50'
              }`}
            >
              <div className={`text-4xl mb-3 ${badge.earned ? '' : 'grayscale'}`}>
                {badge.emoji}
              </div>
              <h3 className={`text-sm font-medium ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                {badge.name}
              </h3>
              {badge.earned && (
                <div className="text-xs text-accent mt-1">✅ Desbloqueado</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Acciones del Perfil */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {!isGuest && (
          <button className="px-6 py-3 spiritual-gradient text-white rounded-xl font-medium hover:scale-105 transition-transform duration-200">
            ✏️ Editar Perfil
          </button>
        )}
        <button className="px-6 py-3 glass-effect border border-primary/20 text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors duration-200">
          📊 Ver Progreso Detallado
        </button>
        {(user || isGuest) && (
          <button 
            onClick={signOut}
            className="px-6 py-3 bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors duration-200"
          >
            🚪 {isGuest ? 'Salir del Modo Invitado' : 'Cerrar Sesión'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
