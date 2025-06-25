
import React from 'react';

const ProgressSection = () => {
  // Datos de ejemplo - en el futuro vendrán del backend
  const userStats = {
    currentStreak: 7,
    totalXP: 1250,
    level: "Discípulo Fiel",
    todayXP: 85,
    dailyGoal: 100
  };

  const progressPercentage = (userStats.todayXP / userStats.dailyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Racha Diaria */}
      <div className="glass-effect rounded-xl p-6 text-center space-y-3">
        <div className="text-4xl">🔥</div>
        <div>
          <div className="text-2xl font-bold text-primary">{userStats.currentStreak}</div>
          <div className="text-sm text-muted-foreground">días de racha</div>
        </div>
        <div className="text-xs text-accent font-medium">¡Sigue así!</div>
      </div>

      {/* Progreso Diario */}
      <div className="glass-effect rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Meta Diaria</span>
          <span className="text-sm text-muted-foreground">{userStats.todayXP}/{userStats.dailyGoal} XP</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full spiritual-gradient transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {progressPercentage >= 100 ? '🎉 ¡Meta alcanzada!' : `${Math.round(100 - progressPercentage)}% para completar`}
          </div>
        </div>
      </div>

      {/* Nivel Actual */}
      <div className="glass-effect rounded-xl p-6 text-center space-y-3">
        <div className="text-4xl">👑</div>
        <div>
          <div className="text-lg font-semibold text-primary">{userStats.level}</div>
          <div className="text-sm text-muted-foreground">{userStats.totalXP} XP total</div>
        </div>
        <div className="text-xs text-accent font-medium">Nivel 3</div>
      </div>
    </div>
  );
};

export default ProgressSection;
