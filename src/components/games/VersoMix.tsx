
import React, { useState, useEffect } from 'react';
import { Shuffle, Check, RotateCcw, X } from 'lucide-react';

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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

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

  const showDynamicNotification = (type: 'success' | 'error') => {
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const checkAnswer = () => {
    const isMatch = selectedWords.join(' ') === verse.text;
    setIsCorrect(isMatch);
    setShowResult(true);
    
    if (isMatch) {
      showDynamicNotification('success');
      setTimeout(() => {
        if (currentVerse < verses.length - 1) {
          setCurrentVerse(currentVerse + 1);
        } else {
          onComplete(15);
        }
      }, 2000);
    } else {
      showDynamicNotification('error');
    }
  };

  const resetVerse = () => {
    shuffleWords();
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      {/* Dynamic Island Notification */}
      {showNotification && (
        <div className={`dynamic-island ${notificationType}`}>
          <div className="flex items-center space-x-2">
            {notificationType === 'success' ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span className="text-white font-bold">¡Correcto! +10 XP</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-white" />
                <span className="text-white font-bold">¡Inténtalo de nuevo!</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onExit}
            className="text-slate-200 hover:text-white font-bold flex items-center space-x-2"
          >
            <X className="w-6 h-6" />
            <span>Salir</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-400">📖 Verso Mix</h1>
            <p className="text-sm text-slate-300 font-medium">
              Verso {currentVerse + 1} de {verses.length}
            </p>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Instructions */}
        <div className="zafirigo-card p-6 text-center">
          <h2 className="text-lg font-semibold mb-2 text-slate-100">Ordena las palabras correctamente</h2>
          <p className="text-sm text-slate-300 font-medium">
            {verse.reference}
          </p>
        </div>

        {/* Selected words area */}
        <div className="zafirigo-card p-6 min-h-[120px]">
          <h3 className="text-sm font-medium text-purple-400 mb-4">Tu respuesta:</h3>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[60px]">
            {selectedWords.map((word, index) => (
              <button
                key={`selected-${index}`}
                onClick={() => handleSelectedWordClick(index)}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors border border-purple-500"
              >
                {word}
              </button>
            ))}
          </div>
          
          {selectedWords.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={checkAnswer}
                className="zafirigo-button flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Verificar
              </button>
              <button
                onClick={resetVerse}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 border-2 border-slate-600 text-slate-200 rounded-lg font-bold hover:bg-slate-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>
          )}
        </div>

        {/* Available words */}
        <div className="zafirigo-card p-6">
          <h3 className="text-sm font-medium text-purple-400 mb-4">Palabras disponibles:</h3>
          <div className="flex flex-wrap gap-2">
            {shuffledWords.map((word, index) => (
              <button
                key={`shuffled-${index}`}
                onClick={() => handleWordClick(word, index)}
                className="game-button"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div className={`zafirigo-card p-6 text-center border-2 ${
            isCorrect ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'
          }`}>
            <div className="text-4xl mb-2">
              {isCorrect ? '🎉' : '😔'}
            </div>
            <h3 className={`text-lg font-bold mb-2 ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? '¡Correcto!' : '¡Inténtalo de nuevo!'}
            </h3>
            {isCorrect && (
              <>
                <p className="text-sm text-slate-200 mb-2 font-medium">
                  "{verse.text}"
                </p>
                <p className="text-xs font-bold text-purple-400">
                  +10 XP ganados
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
