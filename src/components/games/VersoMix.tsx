
import React, { useState, useEffect } from 'react';
import { Shuffle, Check, RotateCcw } from 'lucide-react';

interface VersoMixProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
}

const verses = [
  {
    text: "Todo lo puedo en Cristo que me fortalece",
    reference: "Filipenses 4:13",
    words: ["Todo", "lo", "puedo", "en", "Cristo", "que", "me", "fortalece"]
  },
  {
    text: "Jehová es mi pastor; nada me faltará",
    reference: "Salmos 23:1", 
    words: ["Jehová", "es", "mi", "pastor;", "nada", "me", "faltará"]
  },
  {
    text: "Encomienda a Jehová tu camino, y confía en él",
    reference: "Salmos 37:5",
    words: ["Encomienda", "a", "Jehová", "tu", "camino,", "y", "confía", "en", "él"]
  }
];

const VersoMix: React.FC<VersoMixProps> = ({ onComplete, onExit }) => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const verse = verses[currentVerse];

  useEffect(() => {
    shuffleWords();
  }, [currentVerse]);

  const shuffleWords = () => {
    const shuffled = [...verse.words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setSelectedWords([]);
    setIsCorrect(false);
    setShowResult(false);
  };

  const handleWordClick = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word]);
    setShuffledWords(shuffledWords.filter((_, i) => i !== index));
  };

  const handleSelectedWordClick = (index: number) => {
    const word = selectedWords[index];
    setShuffledWords([...shuffledWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const isMatch = selectedWords.join(' ') === verse.text;
    setIsCorrect(isMatch);
    setShowResult(true);
    
    if (isMatch) {
      setTimeout(() => {
        if (currentVerse < verses.length - 1) {
          setCurrentVerse(currentVerse + 1);
        } else {
          onComplete(15);
        }
      }, 2000);
    }
  };

  const resetVerse = () => {
    shuffleWords();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onExit}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Salir
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">📖 Verso Mix</h1>
            <p className="text-sm text-muted-foreground">
              Verso {currentVerse + 1} de {verses.length}
            </p>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Instructions */}
        <div className="glass-effect rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Ordena las palabras correctamente</h2>
          <p className="text-sm text-muted-foreground">
            {verse.reference}
          </p>
        </div>

        {/* Selected words area */}
        <div className="glass-effect rounded-xl p-6 min-h-[120px]">
          <h3 className="text-sm font-medium text-accent mb-4">Tu respuesta:</h3>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[60px]">
            {selectedWords.map((word, index) => (
              <button
                key={`selected-${index}`}
                onClick={() => handleSelectedWordClick(index)}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
          
          {selectedWords.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={checkAnswer}
                className="flex items-center gap-2 px-4 py-2 spiritual-gradient text-white rounded-lg font-medium hover:scale-105 transition-transform"
              >
                <Check className="w-4 h-4" />
                Verificar
              </button>
              <button
                onClick={resetVerse}
                className="flex items-center gap-2 px-4 py-2 glass-effect border border-primary/20 text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>
          )}
        </div>

        {/* Available words */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-sm font-medium text-accent mb-4">Palabras disponibles:</h3>
          <div className="flex flex-wrap gap-2">
            {shuffledWords.map((word, index) => (
              <button
                key={`shuffled-${index}`}
                onClick={() => handleWordClick(word, index)}
                className="px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div className={`glass-effect rounded-xl p-6 text-center ${
            isCorrect ? 'border-green-500/50' : 'border-red-500/50'
          }`}>
            <div className="text-4xl mb-2">
              {isCorrect ? '🎉' : '😔'}
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isCorrect ? 'text-green-500' : 'text-red-500'
            }`}>
              {isCorrect ? '¡Correcto!' : '¡Inténtalo de nuevo!'}
            </h3>
            {isCorrect && (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  "{verse.text}"
                </p>
                <p className="text-xs font-medium text-accent">
                  +15 XP ganados
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VersoMix;
