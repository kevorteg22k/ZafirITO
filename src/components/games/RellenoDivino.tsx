import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, HelpCircle } from 'lucide-react';

interface RellenoDivinoProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
  onLoseLife: () => void;
  currentLives: number;
}

const fillInQuestions = [
  {
    text: "Todo lo puedo en Cristo que me ___________",
    answer: "fortalece",
    reference: "Filipenses 4:13",
    hint: "Una palabra que significa dar fuerza"
  },
  {
    text: "Vosotros sois la ___ del mundo",
    answer: "luz",
    reference: "Mateo 5:14",
    hint: "Lo opuesto a la oscuridad"
  },
  {
    text: "Fíate de Jehová de todo tu ___________",
    answer: "corazón",
    reference: "Proverbios 3:5",
    hint: "El órgano que simboliza nuestros sentimientos"
  }
];

const RellenoDivino: React.FC<RellenoDivinoProps> = ({ onComplete, onExit, onLoseLife, currentLives }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    const question = fillInQuestions[currentQuestion];
    const correct = userAnswer.toLowerCase().trim() === question.answer.toLowerCase();
    
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestion + 1 < fillInQuestions.length) {
          resetQuestion();
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Juego completado
          const finalScore = score + 1;
          const xpEarned = finalScore * 8; // 8 XP por respuesta correcta
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
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const question = fillInQuestions[currentQuestion];

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
              Pregunta {currentQuestion + 1} de {fillInQuestions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / fillInQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mision-card p-6 mb-6">
          <h2 className="text-xl font-bold text-center mb-2">Relleno Divino</h2>
          <p className="text-center text-muted-foreground mb-6">
            Completa el versículo bíblico
          </p>
          
          <div className="text-center mb-6">
            <p className="scripture-text mb-2">{question.text}</p>
            <p className="text-sm text-muted-foreground">{question.reference}</p>
          </div>

          {/* Input */}
          <div className="mb-6">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full p-4 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={showResult}
            />
          </div>

          {/* Hint Button */}
          {!showResult && (
            <div className="mb-6 text-center">
              <button
                onClick={toggleHint}
                className="flex items-center justify-center mx-auto text-secondary hover:text-secondary/80 transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                {showHint ? 'Ocultar pista' : 'Ver pista'}
              </button>
              {showHint && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  💡 {question.hint}
                </p>
              )}
            </div>
          )}

          {/* Action Button */}
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className="w-full mision-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verificar
            </button>
          ) : (
            <div className="text-center">
              {isCorrect ? (
                <div className="text-green-600">
                  <p className="font-bold text-lg">¡Excelente! 🎉</p>
                  <p className="text-sm">Respuesta correcta: "{question.answer}"</p>
                </div>
              ) : (
                <div className="text-red-600">
                  <p className="font-bold text-lg">Incorrecto 😔</p>
                  <p className="text-sm">La respuesta correcta era: "{question.answer}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RellenoDivino;