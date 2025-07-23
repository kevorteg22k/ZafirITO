import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, RotateCcw } from 'lucide-react';

interface VersoMixProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
  onLoseLife: () => void;
  currentLives: number;
}

const verses = [
  {
    text: "El Señor es mi pastor nada me faltará",
    reference: "Salmos 23:1",
    words: ["El", "Señor", "es", "mi", "pastor", "nada", "me", "faltará"]
  },
  {
    text: "Todo lo puedo en Cristo que me fortalece",
    reference: "Filipenses 4:13",
    words: ["Todo", "lo", "puedo", "en", "Cristo", "que", "me", "fortalece"]
  },
  {
    text: "Porque de tal manera amó Dios al mundo",
    reference: "Juan 3:16",
    words: ["Porque", "de", "tal", "manera", "amó", "Dios", "al", "mundo"]
  }
];

const VersoMix: React.FC<VersoMixProps> = ({ onComplete, onExit, onLoseLife, currentLives }) => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    shuffleWords();
  }, [currentVerse]);

  const shuffleWords = () => {
    const words = [...verses[currentVerse].words];
    // Fisher-Yates shuffle
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    setShuffledWords(words);
  };

  const handleWordClick = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word]);
    const newShuffledWords = shuffledWords.filter((_, i) => i !== index);
    setShuffledWords(newShuffledWords);
  };

  const handleSelectedWordClick = (index: number) => {
    const word = selectedWords[index];
    setShuffledWords([...shuffledWords, word]);
    const newSelectedWords = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelectedWords);
  };

  const checkAnswer = () => {
    const userText = selectedWords.join(" ");
    const correctText = verses[currentVerse].text;
    const correct = userText === correctText;
    
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentVerse + 1 < verses.length) {
          resetVerse();
          setCurrentVerse(currentVerse + 1);
        } else {
          // Juego completado
          const finalScore = score + 1;
          const xpEarned = finalScore * 10; // 10 XP por versículo completado
          onComplete(xpEarned);
        }
      }, 2000);
    } else {
      // Perder vida
      onLoseLife();
      setTimeout(() => {
        if (currentLives > 1) {
          resetVerse();
        } else {
          // Game over
          onExit();
        }
      }, 2000);
    }
  };

  const resetVerse = () => {
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(null);
    shuffleWords();
  };

  const verse = verses[currentVerse];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="flex items-center text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Salir
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-red-500">
              <Heart className="w-5 h-5 mr-1" />
              <span className="font-bold">{currentLives}</span>
            </div>
            <div className="flex items-center text-primary">
              <Star className="w-5 h-5 mr-1" />
              <span className="font-bold">{score}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Versículo {currentVerse + 1} de {verses.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentVerse + 1) / verses.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Game */}
        <div className="mision-card p-6 mb-6">
          <h2 className="text-xl font-bold text-center mb-2">Verso Mix</h2>
          <p className="text-center text-muted-foreground mb-6">
            Ordena las palabras para formar el versículo
          </p>
          
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">{verse.reference}</p>
          </div>

          {/* Selected Words Area */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Tu versículo:</h3>
            <div className="min-h-20 p-4 border-2 border-dashed border-border rounded-lg bg-muted/30">
              <div className="flex flex-wrap gap-2">
                {selectedWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectedWordClick(index)}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    disabled={showResult}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Available Words */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Palabras disponibles:</h3>
            <div className="flex flex-wrap gap-2">
              {shuffledWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word, index)}
                  className="px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
                  disabled={showResult}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {!showResult ? (
            <div className="flex space-x-3">
              <button
                onClick={checkAnswer}
                disabled={selectedWords.length !== verse.words.length}
                className="flex-1 mision-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verificar
              </button>
              <button
                onClick={resetVerse}
                className="px-4 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              {isCorrect ? (
                <div className="text-green-600">
                  <p className="font-bold text-lg">¡Perfecto! 🎉</p>
                  <p className="text-sm">Has ordenado correctamente el versículo</p>
                </div>
              ) : (
                <div className="text-red-600">
                  <p className="font-bold text-lg">Incorrecto 😔</p>
                  <p className="text-sm">El orden correcto era: "{verse.text}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersoMix;