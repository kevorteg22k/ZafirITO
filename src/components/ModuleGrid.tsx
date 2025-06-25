
import React, { useState } from 'react';
import VersoMix from './games/VersoMix';
import Emojiverso from './games/Emojiverso';
import RellenoDivino from './games/RellenoDivino';

const modules = [
  {
    id: 'verso-mix',
    title: 'Verso Mix',
    emoji: '📖',
    description: 'Ordena los versículos correctamente',
    xp: 15,
    difficulty: 'Fácil',
    completed: false,
    locked: false
  },
  {
    id: 'emojiverso',
    title: 'Emojiverso',
    emoji: '🙏',
    description: 'Selecciona el emoji correcto',
    xp: 20,
    difficulty: 'Medio',
    completed: false,
    locked: false
  },
  {
    id: 'relleno-divino',
    title: 'Relleno Divino',
    emoji: '✍️',
    description: 'Completa los espacios en blanco',
    xp: 25,
    difficulty: 'Medio',
    completed: false,
    locked: false
  },
  {
    id: 'verso-correcto',
    title: 'Verso Correcto',
    emoji: '🎯',
    description: 'Múltiple elección bíblica',
    xp: 30,
    difficulty: 'Difícil',
    completed: false,
    locked: true
  },
  {
    id: 'quien-dijo',
    title: '¿Quién dijo eso?',
    emoji: '🧠',
    description: 'Trivia de personajes bíblicos',
    xp: 35,
    difficulty: 'Difícil',
    completed: false,
    locked: true
  },
  {
    id: 'promesas',
    title: 'Explorando Promesas',
    emoji: '🗺️',
    description: 'Descubre las promesas divinas',
    xp: 40,
    difficulty: 'Experto',
    completed: false,
    locked: true
  }
];

const ModuleGrid = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [userXP, setUserXP] = useState(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-500';
      case 'Medio': return 'text-yellow-500';
      case 'Difícil': return 'text-orange-500';
      case 'Experto': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const handleModuleClick = (moduleId: string, isLocked: boolean) => {
    if (!isLocked) {
      setActiveGame(moduleId);
    }
  };

  const handleGameComplete = (xp: number) => {
    setUserXP(prev => prev + xp);
    setActiveGame(null);
    // Aquí podrías actualizar el estado del módulo como completado
    console.log(`Juego completado! +${xp} XP ganados. Total: ${userXP + xp}`);
  };

  const handleGameExit = () => {
    setActiveGame(null);
  };

  // Render game component based on activeGame
  if (activeGame === 'verso-mix') {
    return <VersoMix onComplete={handleGameComplete} onExit={handleGameExit} />;
  }
  
  if (activeGame === 'emojiverso') {
    return <Emojiverso onComplete={handleGameComplete} onExit={handleGameExit} />;
  }
  
  if (activeGame === 'relleno-divino') {
    return <RellenoDivino onComplete={handleGameComplete} onExit={handleGameExit} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Módulos de Aprendizaje</h2>
        <p className="text-muted-foreground">Elige tu aventura espiritual</p>
        {userXP > 0 && (
          <p className="text-sm font-medium text-accent">XP Total: {userXP}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => handleModuleClick(module.id, module.locked)}
            className={`relative group rounded-xl border transition-all duration-300 hover:scale-105 ${
              module.locked 
                ? 'bg-muted/50 border-muted cursor-not-allowed opacity-60' 
                : 'glass-effect border-primary/20 cursor-pointer hover:border-primary/40 hover:shadow-lg'
            }`}
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="text-4xl">{module.emoji}</div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={`text-lg font-semibold ${module.locked ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {module.title}
                </h3>
                <p className={`text-sm ${module.locked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {module.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className={`text-sm font-medium ${module.locked ? 'text-muted-foreground' : 'text-accent'}`}>
                  +{module.xp} XP
                </div>
                <div className="text-right">
                  {module.locked ? (
                    <div className="text-xs text-muted-foreground">🔒 Bloqueado</div>
                  ) : module.completed ? (
                    <div className="text-xs text-green-500">✅ Completado</div>
                  ) : (
                    <div className="text-xs text-primary">▶ Empezar</div>
                  )}
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            {!module.locked && (
              <div className="absolute inset-0 spiritual-gradient opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
