
import React from 'react';

const ProgressSection = () => {
  // Sistema corregido: usuarios nuevos inician con 0
  const userStats = {
    currentStreak: 0,    // Inicia en 0, se incrementa solo con actividad diaria
    totalXP: 0,          // Inicia en 0, se gana completando actividades
    level: "Nuevo Discípulo", // Nivel inicial
    todayXP: 0,          // XP ganado hoy (inicia en 0)
    dailyGoal: 50        // Meta diaria inicial más baja
  };

  const progressPercentage = (userStats.todayXP / userStats.dailyGoal) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* Mensaje de bienvenida para nuevos usuarios */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white text-center">
        <div className="text-4xl mb-2">🌟</div>
        <h2 className="text-xl font-bold mb-2">¡Bienvenido a tu camino espiritual!</h2>
        <p className="text-sm opacity-90">Comienza tu primera actividad para ganar XP y construir tu racha diaria.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Racha Diaria - Corregida */}
        <div className="bg-white rounded-xl p-6 text-center space-y-3 shadow-sm border border-gray-100">
          <div className="text-4xl">🔥</div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{userStats.currentStreak}</div>
            <div className="text-sm text-gray-600">días de racha</div>
          </div>
          <div className="text-xs text-purple-600 font-medium">
            {userStats.currentStreak === 0 ? '¡Comienza hoy!' : '¡Sigue así!'}
          </div>
        </div>

        {/* Progreso Diario - Corregido */}
        <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Meta Diaria</span>
            <span className="text-sm text-gray-600">{userStats.todayXP}/{userStats.dailyGoal} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">
              {progressPercentage >= 100 ? '🎉 ¡Meta alcanzada!' : `Faltan ${userStats.dailyGoal - userStats.todayXP} XP`}
            </div>
          </div>
        </div>

        {/* Nivel Actual - Corregido */}
        <div className="bg-white rounded-xl p-6 text-center space-y-3 shadow-sm border border-gray-100">
          <div className="text-4xl">👶</div>
          <div>
            <div className="text-lg font-semibold text-gray-800">{userStats.level}</div>
            <div className="text-sm text-gray-600">{userStats.totalXP} XP total</div>
          </div>
          <div className="text-xs text-purple-600 font-medium">Nivel 1</div>
        </div>
      </div>

      {/* Guía para nuevos usuarios */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          🚀 Tu Camino Espiritual
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">1</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Completa tu primer devocional</p>
              <p className="text-xs text-gray-600">Gana +10 XP</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">2</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Juega un minijuego bíblico</p>
              <p className="text-xs text-gray-600">Gana +15 XP</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">3</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Explora la Biblia</p>
              <p className="text-xs text-gray-600">Gana +5 XP por búsqueda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
