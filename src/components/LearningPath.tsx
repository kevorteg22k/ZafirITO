
import React, { useState } from 'react';
import { Star, Lock, Play, Check, Trophy, Flame } from 'lucide-react';
import VersoMix from './games/VersoMix';
import Emojiverso from './games/Emojiverso';
import RellenoDivino from './games/RellenoDivino';
import VersoCompleto from './games/VersoCompleto';

interface Level {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'checkpoint' | 'bonus';
  completed: boolean;
  locked: boolean;
  xp: number;
  position: number;
  gameType: string;
}

const levels: Level[] = [
  { id: '1', title: 'Génesis 1:1', description: 'En el principio...', type: 'lesson', completed: false, locked: false, xp: 15, position: 0, gameType: 'verso-mix' },
  { id: '2', title: 'Juan 3:16', description: 'Amor de Dios', type: 'lesson', completed: false, locked: true, xp: 15, position: 1, gameType: 'emojiverso' },
  { id: '3', title: 'Salmos 23:1', description: 'El Buen Pastor', type: 'lesson', completed: false, locked: true, xp: 20, position: 2, gameType: 'relleno-divino' },
  { id: '4', title: 'Checkpoint 1', description: 'Repaso Básico', type: 'checkpoint', completed: false, locked: true, xp: 30, position: 3, gameType: 'verso-completo' },
  { id: '5', title: 'Filipenses 4:13', description: 'Fortaleza en Cristo', type: 'lesson', completed: false, locked: true, xp: 25, position: 4, gameType: 'verso-mix' },
  { id: '6', title: 'Mateo 5:14', description: 'Luz del mundo', type: 'lesson', completed: false, locked: true, xp: 25, position: 5, gameType: 'emojiverso' },
  { id: '7', title: 'Proverbios 3:5-6', description: 'Confianza plena', type: 'lesson', completed: false, locked: true, xp: 30, position: 6, gameType: 'relleno-divino' },
  { id: '8', title: 'Bonus: Parábolas', description: 'Lección especial', type: 'bonus', completed: false, locked: true, xp: 50, position: 7, gameType: 'verso-completo' },
];

const LearningPath = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  
  // Usuario nuevo: stats empiezan en 0
  const [userProgress, setUserProgress] = useState({
    currentStreak: 0,
    totalXP: 0,
    heartsLeft: 5,
    gemsCount: 0
  });

  const handleLevelClick = (level: Level) => {
    if (level.locked) {
      // Mostrar mensaje de nivel bloqueado
      alert('🔒 Completa el nivel anterior para desbloquear este');
      return;
    }
    
    setActiveLevelId(level.id);
    setActiveGame(level.gameType);
  };

  const handleGameComplete = (xp: number) => {
    if (activeLevelId) {
      // Marcar nivel como completado
      setCompletedLevels(prev => [...prev, activeLevelId]);
      
      // Actualizar XP del usuario
      setUserProgress(prev => ({
        ...prev,
        totalXP: prev.totalXP + xp,
        currentStreak: prev.currentStreak + 1 // Aumentar racha solo cuando completa
      }));
      
      // Desbloquear siguiente nivel
      const currentLevelIndex = levels.findIndex(l => l.id === activeLevelId);
      if (currentLevelIndex < levels.length - 1) {
        const nextLevel = levels[currentLevelIndex + 1];
        // El siguiente nivel se desbloquea automáticamente
      }
    }
    
    setActiveGame(null);
    setActiveLevelId(null);
  };

  const handleGameExit = () => {
    setActiveGame(null);
    setActiveLevelId(null);
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'verso-mix':
        return <VersoMix onComplete={handleGameComplete} onExit={handleGameExit} />;
      case 'emojiverso':
        return <Emojiverso onComplete={handleGameComplete} onExit={handleGameExit} />;
      case 'relleno-divino':
        return <RellenoDivino onComplete={handleGameComplete} onExit={handleGameExit} />;
      case 'verso-completo':
        return <VersoCompleto onComplete={handleGameComplete} onExit={handleGameExit} />;
      default:
        return null;
    }
  };

  if (activeGame) {
    return renderGame();
  }

  const getLevelIcon = (level: Level) => {
    if (completedLevels.includes(level.id)) return <Check className="w-8 h-8 text-white" />;
    if (level.locked) return <Lock className="w-8 h-8 text-gray-500" />;
    if (level.type === 'checkpoint') return <Trophy className="w-8 h-8 text-yellow-400" />;
    if (level.type === 'bonus') return <Star className="w-8 h-8 text-purple-400" />;
    return <Play className="w-8 h-8 text-white" />;
  };

  const getLevelStyles = (level: Level) => {
    if (completedLevels.includes(level.id)) return 'bg-green-500 border-green-400 shadow-green-500/50';
    if (level.locked) return 'bg-gray-400 border-gray-300 opacity-50 cursor-not-allowed';
    if (level.type === 'checkpoint') return 'bg-yellow-500 border-yellow-400 shadow-yellow-500/50';
    if (level.type === 'bonus') return 'bg-purple-500 border-purple-400 shadow-purple-500/50';
    return 'bg-blue-500 border-blue-400 shadow-blue-500/50';
  };

  // Determinar qué niveles están desbloqueados
  const getUnlockedLevels = () => {
    const unlocked = ['1']; // Primer nivel siempre desbloqueado
    
    // Desbloquear niveles consecutivos basado en completados
    for (let i = 0; i < completedLevels.length; i++) {
      const nextLevelIndex = levels.findIndex(l => l.id === completedLevels[i]) + 1;
      if (nextLevelIndex < levels.length) {
        unlocked.push(levels[nextLevelIndex].id);
      }
    }
    
    return unlocked;
  };

  const unlockedLevels = getUnlockedLevels();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-400 p-4">
      {/* Header con stats - Corregido para empezar en 0 */}
      <div className="flex items-center justify-between mb-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-white font-bold text-lg">{userProgress.currentStreak}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">💎</span>
            </div>
            <span className="text-white font-bold text-lg">{userProgress.gemsCount}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold text-lg">{userProgress.totalXP}</span>
          <span className="text-white text-sm font-bold">XP</span>
        </div>
      </div>

      {/* Mensaje de bienvenida para nuevos usuarios */}
      {userProgress.totalXP === 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 text-center">
          <div className="text-4xl mb-2">🌟</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">¡Bienvenido a Sionik App!</h2>
          <p className="text-gray-700 font-medium">Comienza tu camino espiritual completando tu primera misión.</p>
        </div>
      )}

      {/* Camino de niveles */}
      <div className="max-w-md mx-auto space-y-8">
        {levels.map((level, index) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCompleted = completedLevels.includes(level.id);
          
          return (
            <div
              key={level.id}
              className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              {/* Línea conectora */}
              {index < levels.length - 1 && (
                <div className={`absolute top-20 w-16 h-16 ${index % 2 === 0 ? 'left-16' : 'right-16'}`}>
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <path
                      d={index % 2 === 0 ? "M 0 0 Q 32 32 64 0" : "M 64 0 Q 32 32 0 0"}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="8,4"
                    />
                  </svg>
                </div>
              )}

              {/* Nivel */}
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => handleLevelClick({...level, locked: !isUnlocked})}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-200 ${
                    !isUnlocked ? 'cursor-not-allowed' : 'hover:scale-110 active:scale-95'
                  } ${getLevelStyles({...level, locked: !isUnlocked})}`}
                >
                  {getLevelIcon({...level, locked: !isUnlocked})}
                </button>
                
                <div className="text-center">
                  <h3 className="text-white font-bold text-sm">{level.title}</h3>
                  <p className="text-white/80 text-xs font-medium">{level.description}</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-white text-xs font-bold">+{level.xp} XP</span>
                  </div>
                  {!isUnlocked && (
                    <p className="text-white/60 text-xs font-medium mt-1">🔒 Bloqueado</p>
                  )}
                  {isCompleted && (
                    <p className="text-green-300 text-xs font-bold mt-1">✅ Completado</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón de práctica - Solo si hay al menos un nivel completado */}
      {completedLevels.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <button className="bg-white text-green-500 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Práctica</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningPath;
