
import React, { useState, useEffect } from 'react';

const spiritualPhrases = [
  "Preparando tu jornada espiritual...",
  "Cargando sabiduría divina...",
  "Iluminando el camino de la fe...",
  "Conectando corazones con la Palabra...",
  "Despertando el discípulo que hay en ti..."
];

const biblicalFacts = [
  "La Biblia fue escrita por más de 40 autores diferentes",
  "El libro de Salmos es el más largo de la Biblia",
  "La palabra 'amor' aparece más de 500 veces en la Biblia",
  "Jesús contó más de 40 parábolas registradas",
  "El versículo más corto está en Juan 11:35"
];

const SpiritualLoader = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % spiritualPhrases.length);
    }, 1000);

    const factTimer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % biblicalFacts.length);
    }, 2000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(phraseTimer);
      clearInterval(factTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-lg mx-auto text-center space-y-8 p-8">
        {/* Animación de luz divina */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 spiritual-gradient rounded-full animate-spin opacity-30"></div>
            <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
              <div className="w-16 h-16 spiritual-gradient rounded-full divine-glow animate-divine-pulse"></div>
            </div>
          </div>
        </div>

        {/* Frase espiritual */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">
            {spiritualPhrases[currentPhrase]}
          </h2>
          
          {/* Barra de progreso */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full spiritual-gradient transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>

        {/* Dato curioso */}
        <div className="glass-effect rounded-lg p-6 space-y-2">
          <h3 className="text-sm font-medium text-accent">💡 ¿Sabías que...?</h3>
          <p className="text-sm text-foreground/80">
            {biblicalFacts[currentFact]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpiritualLoader;
