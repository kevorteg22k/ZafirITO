
import React, { useState, useEffect } from 'react';
import { Check, RotateCcw, Lightbulb } from 'lucide-react';

interface RellenoDivinoProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
}

const fillInQuestions = [
  {
    text: "Todo lo puedo en _____ que me fortalece",
    answer: "Cristo",
    reference: "Filipenses 4:13",
    hint: "El nombre del Salvador"
  },
  {
    text: "Jehová es mi _____; nada me faltará",
    answer: "pastor",
    reference: "Salmos 23:1",
    hint: "Quien cuida las ovejas"
  },
  {
    text: "Porque de tal manera _____ Dios al mundo",
    answer: "amó",
    reference: "Juan 3:16", 
    hint: "Sentimiento profundo de afecto"
  },
  {
    text: "La _____ de Dios es eterna",
    answer: "gracia",
    reference: "Efesios 2:8",
    hint: "Favor inmerecido de Dios"
  },
  {
    text: "En el principio era el _____",
    answer: "Verbo",
    reference: "Juan 1:1",
    hint: "La Palabra de Dios personificada"
  }
];

const RellenoDivino: React.FC<RellenoDivinoProps> = ({ onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const question = fillInQuestions[currentQuestion];

  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().trim() === question.answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < fillInQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowResult(false);
        setShowHint(false);
      } else {
        onComplete(25);
      }
    }, 2500);
  };

  const resetQuestion = () => {
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
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
            <h1 className="text-2xl font-bold text-primary">✍️ Relleno Divino</h1>
            <p className="text-sm text-muted-foreground">
              Pregunta {currentQuestion + 1} de {fillInQuestions.length}
            </p>
          </div>
          <div className="text-sm font-medium text-accent">
            {score}/{fillInQuestions.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-full spiritual-gradient rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / fillInQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="glass-effect rounded-xl p-8 text-center space-y-6">
          <h2 className="text-lg font-semibold">Completa el versículo:</h2>
          
          <div className="scripture-text text-xl max-w-lg mx-auto">
            "{question.text}"
          </div>
          
          <p className="text-sm text-accent font-medium">
            {question.reference}
          </p>

          {/* Input field */}
          <div className="space-y-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full max-w-md mx-auto px-4 py-3 rounded-lg border border-border bg-background text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={showResult}
            />

            {/* Hint */}
            {showHint ? (
              <div className="glass-effect rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-accent">
                  💡 Pista: {question.hint}
                </p>
              </div>
            ) : (
              <button
                onClick={toggleHint}
                className="flex items-center gap-2 mx-auto px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Ver pista
              </button>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {userAnswer.trim() && !showResult && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={checkAnswer}
              className="flex items-center gap-2 px-6 py-3 spiritual-gradient text-white rounded-xl font-medium hover:scale-105 transition-transform"
            >
              <Check className="w-4 h-4" />
              Verificar
            </button>
            <button
              onClick={resetQuestion}
              className="flex items-center gap-2 px-6 py-3 glass-effect border border-primary/20 text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Limpiar
            </button>
          </div>
        )}

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
              {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              La respuesta correcta es: <strong>{question.answer}</strong>
            </p>
            <p className="text-xs italic text-foreground/80">
              "{question.text.replace('_____', question.answer)}"
            </p>
            {isCorrect && (
              <p className="text-xs font-medium text-accent mt-2">
                +5 XP ganados
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RellenoDivino;
