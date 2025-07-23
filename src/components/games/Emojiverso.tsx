import React, { useState } from 'react';
import { ArrowLeft, Heart, Star } from 'lucide-react';

interface EmojiversoProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
  onLoseLife: () => void;
  currentLives: number;
}

const emojiQuestions = [
  {
    verse: "Porque de tal manera amó Dios al mundo...",
    reference: "Juan 3:16",
    options: ["❤️", "🌍", "✝️", "👑"],
    correctAnswer: 0,
    explanation: "El amor de Dios por el mundo"
  },
  {
    verse: "Yo soy el pan de vida...",
    reference: "Juan 6:35",
    options: ["🍞", "💧", "🕊️", "⭐"],
    correctAnswer: 0,
    explanation: "Jesús es el pan de vida"
  },
  {
    verse: "Dios es mi pastor, nada me faltará...",
    reference: "Salmos 23:1",
    options: ["🐑", "🌿", "🙏", "👨‍🌾"],
    correctAnswer: 0,
    explanation: "Dios como pastor que cuida sus ovejas"
  }
];

const Emojiverso: React.FC<EmojiversoProps> = ({ onComplete, onExit, onLoseLife, currentLives }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === emojiQuestions[currentQuestion].correctAnswer;
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestion + 1 < emojiQuestions.length) {
          resetQuestion();
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Juego completado
          const finalScore = score + 1;
          const xpEarned = finalScore * 5; // 5 XP por respuesta correcta
          onComplete(xpEarned);
        }
      }, 2000);
    } else {
      // Perder vida
      onLoseLife();
      setTimeout(() => {
        if (currentLives > 1) {
          resetQuestion();
        } else {
          // Game over
          onExit();
        }
      }, 2000);
    }
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  const question = emojiQuestions[currentQuestion];

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
              Pregunta {currentQuestion + 1} de {emojiQuestions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / emojiQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mision-card p-6 mb-6">
          <h2 className="text-xl font-bold text-center mb-2">Emojiverso</h2>
          <p className="text-center text-muted-foreground mb-4">
            Selecciona el emoji que mejor represente el versículo
          </p>
          
          <div className="text-center mb-6">
            <p className="scripture-text mb-2">{question.verse}</p>
            <p className="text-sm text-muted-foreground">{question.reference}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {question.options.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`
                  p-8 text-6xl rounded-xl border-2 transition-all duration-200 hover:scale-105
                  ${selectedOption === index 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                  }
                  ${showResult && index === question.correctAnswer 
                    ? 'border-green-500 bg-green-500/10' 
                    : ''
                  }
                  ${showResult && selectedOption === index && index !== question.correctAnswer 
                    ? 'border-red-500 bg-red-500/10' 
                    : ''
                  }
                `}
                disabled={showResult}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Action Button */}
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className="w-full mision-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar
            </button>
          ) : (
            <div className="text-center">
              {selectedOption === question.correctAnswer ? (
                <div className="text-green-600">
                  <p className="font-bold text-lg">¡Correcto! 🎉</p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              ) : (
                <div className="text-red-600">
                  <p className="font-bold text-lg">Incorrecto 😔</p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emojiverso;