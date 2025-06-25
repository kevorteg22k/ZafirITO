
import React, { useState, useEffect } from 'react';
import { Check, RotateCcw } from 'lucide-react';

interface EmojiversoProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
}

const emojiQuestions = [
  {
    verse: "El Señor es mi pastor",
    reference: "Salmos 23:1",
    options: ["🐑", "🌊", "🔥", "⚡"],
    correct: 0,
    explanation: "El pastor cuida a las ovejas"
  },
  {
    verse: "Lámpara es a mis pies tu palabra",
    reference: "Salmos 119:105",
    options: ["🌙", "💡", "🔥", "⭐"],
    correct: 1,
    explanation: "La lámpara ilumina el camino"
  },
  {
    verse: "Sed la luz del mundo",
    reference: "Mateo 5:14",
    options: ["🌍", "💡", "🌟", "🔥"],
    correct: 2,
    explanation: "Las estrellas dan luz al mundo"
  },
  {
    verse: "El amor es paciente",
    reference: "1 Corintios 13:4",
    options: ["❤️", "⏰", "🕊️", "🙏"],
    correct: 0,
    explanation: "El corazón representa el amor"
  }
];

const Emojiverso: React.FC<EmojiversoProps> = ({ onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = emojiQuestions[currentQuestion];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

    setShowResult(true);
    
    if (selectedOption === question.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < emojiQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        onComplete(20);
      }
    }, 2500);
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
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
            <h1 className="text-2xl font-bold text-primary">🙏 Emojiverso</h1>
            <p className="text-sm text-muted-foreground">
              Pregunta {currentQuestion + 1} de {emojiQuestions.length}
            </p>
          </div>
          <div className="text-sm font-medium text-accent">
            {score}/{emojiQuestions.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-full spiritual-gradient rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / emojiQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="glass-effect rounded-xl p-8 text-center space-y-4">
          <h2 className="text-xl font-semibold">¿Qué emoji representa mejor este versículo?</h2>
          <div className="scripture-text text-center max-w-lg mx-auto">
            "{question.verse}"
          </div>
          <p className="text-sm text-accent font-medium">
            {question.reference}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`glass-effect rounded-xl p-8 text-6xl hover:scale-105 transition-all duration-200 ${
                selectedOption === index 
                  ? 'border-2 border-primary bg-primary/10' 
                  : 'border border-border hover:border-primary/50'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        {selectedOption !== null && !showResult && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={checkAnswer}
              className="flex items-center gap-2 px-6 py-3 spiritual-gradient text-white rounded-xl font-medium hover:scale-105 transition-transform"
            >
              <Check className="w-4 h-4" />
              Confirmar
            </button>
            <button
              onClick={resetQuestion}
              className="flex items-center gap-2 px-6 py-3 glass-effect border border-primary/20 text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Cambiar
            </button>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`glass-effect rounded-xl p-6 text-center ${
            selectedOption === question.correct ? 'border-green-500/50' : 'border-red-500/50'
          }`}>
            <div className="text-6xl mb-4">
              {selectedOption === question.correct ? '🎉' : '😔'}
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              selectedOption === question.correct ? 'text-green-500' : 'text-red-500'
            }`}>
              {selectedOption === question.correct ? '¡Correcto!' : '¡Incorrecto!'}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Respuesta correcta: {question.options[question.correct]}
            </p>
            <p className="text-xs text-accent">
              {question.explanation}
            </p>
            {selectedOption === question.correct && (
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

export default Emojiverso;
