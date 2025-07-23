import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, Clock } from 'lucide-react';

interface VersoCompletoProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
  onLoseLife: () => void;
  currentLives: number;
}

const questions = [
  {
    verse: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito...",
    reference: "Juan 3:16",
    options: [
      "para que todo aquel que en él cree, no se pierda, mas tenga vida eterna",
      "para que el mundo sea salvo por él",
      "para que todo aquel que le busque, sea encontrado",
      "para que su nombre sea glorificado en toda la tierra"
    ],
    correctAnswer: 0,
    explanation: "Este es uno de los versículos más conocidos que habla del amor de Dios"
  },
  {
    verse: "Todo lo puedo en Cristo...",
    reference: "Filipenses 4:13",
    options: [
      "que me da sabiduría",
      "que me fortalece",
      "que me ama",
      "que me guía"
    ],
    correctAnswer: 1,
    explanation: "Cristo nos da fortaleza para enfrentar cualquier situación"
  },
  {
    verse: "El Señor es mi pastor...",
    reference: "Salmos 23:1",
    options: [
      "me protegerá",
      "me cuidará",
      "nada me faltará",
      "me consolará"
    ],
    correctAnswer: 2,
    explanation: "Cuando Dios es nuestro pastor, Él suple todas nuestras necesidades"
  }
];

const VersoCompleto: React.FC<VersoCompletoProps> = ({ onComplete, onExit, onLoseLife, currentLives }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 segundos por pregunta

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult]);

  const handleTimeUp = () => {
    setShowResult(true);
    onLoseLife();
    setTimeout(() => {
      if (currentLives > 1) {
        resetQuestion();
      } else {
        // Game over
        onExit();
      }
    }, 2000);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          resetQuestion();
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Juego completado
          const finalScore = score + 1;
          const xpEarned = finalScore * 12; // 12 XP por respuesta correcta
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
    setTimeLeft(30);
  };

  const question = questions[currentQuestion];

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
            <div className={`flex items-center ${timeLeft <= 10 ? 'text-red-500' : 'text-secondary'}`}>
              <Clock className="w-5 h-5 mr-1" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mision-card p-6 mb-6">
          <h2 className="text-xl font-bold text-center mb-2">Verso Completo</h2>
          <p className="text-center text-muted-foreground mb-6">
            Selecciona cómo continúa el versículo
          </p>
          
          <div className="text-center mb-6">
            <p className="scripture-text mb-2">{question.verse}</p>
            <p className="text-sm text-muted-foreground">{question.reference}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all duration-200
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
                <span className="block font-medium">{option}</span>
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
              Confirmar respuesta
            </button>
          ) : (
            <div className="text-center">
              {selectedOption === question.correctAnswer ? (
                <div className="text-green-600">
                  <p className="font-bold text-lg">¡Excelente! 🎉</p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              ) : timeLeft === 0 ? (
                <div className="text-red-600">
                  <p className="font-bold text-lg">Se acabó el tiempo ⏰</p>
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

export default VersoCompleto;