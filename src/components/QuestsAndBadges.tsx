
import React, { useState } from 'react';
import { Trophy, Target, Zap, Star, Clock, CheckCircle, Crown, Lightbulb, Fish, Sword, Gem } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';

const QuestsAndBadges = () => {
  const [activeTab, setActiveTab] = useState<'quests' | 'badges'>('quests');
  const { progress } = useGameProgress();

  const dailyQuests = [
    {
      id: 1,
      title: 'Gana 30 XP',
      description: 'Completa lecciones para ganar experiencia',
      progress: progress.totalXP,
      target: 30,
      reward: 50,
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      timeLeft: '6 horas',
      completed: progress.totalXP >= 30
    },
    {
      id: 2,
      title: 'Completa 2 lecciones perfectas',
      description: 'Termina lecciones sin errores',
      progress: progress.completedLevels.length,
      target: 2,
      reward: 100,
      icon: <Target className="w-6 h-6 text-green-500" />,
      timeLeft: '6 horas',
      completed: progress.completedLevels.length >= 2
    },
    {
      id: 3,
      title: 'Mantén tu racha',
      description: 'No rompas tu racha diaria',
      progress: progress.currentStreak >= 1 ? 1 : 0,
      target: 1,
      reward: 25,
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
      timeLeft: '6 horas',
      completed: progress.currentStreak >= 1
    }
  ];

  const badges = [
    {
      id: 1,
      name: 'León de Judá',
      description: 'Alcanza 200 XP total',
      icon: Trophy,
      earned: progress.totalXP >= 200,
      progress: progress.totalXP,
      total: 200
    },
    {
      id: 2,
      name: 'Embajador del Reino',
      description: 'Mantén una racha de 7 días',
      icon: Crown,
      earned: progress.currentStreak >= 7,
      progress: progress.currentStreak,
      total: 7
    },
    {
      id: 3,
      name: 'Luz del Mundo',
      description: 'Completa 3 niveles',
      icon: Lightbulb,
      earned: progress.completedLevels.length >= 3,
      progress: progress.completedLevels.length,
      total: 3
    },
    {
      id: 4,
      name: 'Pescador de Hombres',
      description: 'Completa 5 niveles',
      icon: Fish,
      earned: progress.completedLevels.length >= 5,
      progress: progress.completedLevels.length,
      total: 5
    },
    {
      id: 5,
      name: 'Guerrero de Oración',
      description: 'Mantén una racha de 30 días',
      icon: Sword,
      earned: progress.currentStreak >= 30,
      progress: progress.currentStreak,
      total: 30
    },
    {
      id: 6,
      name: 'Corazón Puro',
      description: 'Alcanza 500 XP total',
      icon: Gem,
      earned: progress.totalXP >= 500,
      progress: progress.totalXP,
      total: 500
    }
  ];

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-secondary p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Desafíos</h1>
          <p className="text-white/80">Completa misiones y desbloquea logros</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/20 rounded-2xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 ${
              activeTab === 'quests'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Misiones
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 ${
              activeTab === 'badges'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Logros
          </button>
        </div>

        {/* Content */}
        {activeTab === 'quests' ? (
          <div className="space-y-4">
            {/* Challenge completed banner */}
            {progress.completedLevels.length > 0 && (
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-center text-white">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-white" />
                <h2 className="text-xl font-bold mb-1">¡Excelente progreso!</h2>
                <p className="text-sm opacity-90">Has completado {progress.completedLevels.length} niveles.</p>
              </div>
            )}

            {/* Daily Quests */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Misiones Diarias</h3>
                <div className="flex items-center space-x-1 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">6 horas</span>
                </div>
              </div>

              <div className="space-y-3">
                {dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={`bg-white/20 rounded-xl p-4 ${
                      quest.completed ? 'border-2 border-green-400' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {quest.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm mb-1">
                          {quest.title}
                        </h4>
                        <p className="text-white/80 text-xs mb-2">
                          {quest.description}
                        </p>
                        
                        {/* Progress bar */}
                        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              quest.completed ? 'bg-green-400' : 'bg-yellow-400'
                            }`}
                            style={{ width: `${getProgressPercentage(quest.progress, quest.target)}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-white text-xs">
                            {quest.progress}/{quest.target}
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                            <span className="text-white text-xs font-bold">
                              +{quest.reward}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center ${
                    badge.earned ? 'border-2 border-primary' : 'opacity-70'
                  }`}
                >
                  <badge.icon 
                    className={`w-12 h-12 mx-auto mb-2 ${
                      badge.earned ? 'text-primary' : 'text-white/50'
                    }`} 
                  />
                  <h3 className="text-white font-bold text-sm mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-white/80 text-xs mb-2">
                    {badge.description}
                  </p>
                  
                  {!badge.earned && (
                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(badge.progress, badge.total)}%` }}
                      ></div>
                    </div>
                  )}
                  
                  <div className="text-white text-xs">
                    {badge.earned ? (
                      <span className="text-green-400 font-bold">✓ Desbloqueado</span>
                    ) : (
                      <span>{badge.progress}/{badge.total}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestsAndBadges;
