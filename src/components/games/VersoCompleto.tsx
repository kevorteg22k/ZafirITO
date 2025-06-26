
import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Heart } from 'lucide-react';

interface VersoCompletoProps {
  onComplete: (xp: number) => void;
  onExit: () => void;
}

const questions = [
  {
    verse: "En el principio creó Dios los cielos y la tierra",
    reference: "Génesis 1:1",
    options: [
      "En el principio era el Verbo",
      "En el principio creó Dios los cielos y la tierra",
      "En el principio creó el hombre",
      "En el principio había tinieblas"
    ],
    correct: 1,
    explanation: "Este es el primer versículo de la Biblia"
  },
  {
    verse: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito",
    reference: "Juan 3:16",
    options: [
      "Porque Dios es amor y verdad",
      "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito",
      "Porque Dios quiere que todos se salven",
      "Porque el amor de Dios es eterno"
    ],
    correct: 1,
    explanation: "El versículo más famoso sobre el amor de Dios"
  },
  {
    verse: "Todo lo puedo en Cristo que me fortalece",
    reference: "Filipenses 4:13",
    options: [
      "Todo lo puedo en Cristo que me fortalece",
      "Todo lo puedo con la ayuda de Dios",
      "Todo lo puedo con fe y esperanza",
      "Todo lo puedo si confío en el Señor"
    ],
    correct: 0,
    explanation: "Versículo sobre la fortaleza que viene de Cristo"
  }
];

const VersoCompleto: React.FC<VersoCompletoProps> = ({ onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [timeLeft, setTimeLeft] = useState(30);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult]);

  const handleTimeUp = () => {
    setHearts(hearts - 1);
    setShowResult(true);
    setSelectedOption(-1); // Indica que se acabó el tiempo
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

    setShowResult(true);
    
    if (selectedOption === question.correct) {
      setScore(score + 1);
    } else {
      setHearts(hearts - 1);
    }

    setTimeout(() => {
      if (hearts <= 1 && selectedOption !== question.correct) {
        // Game Over
        onComplete(score * 10);
        return;
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        onComplete(score * 15 + 25);
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onExit}
            className="text-white hover:text-gray-200 flex items-center space-x-2 font-bold"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Corazones */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-6 h-6 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            
            {/* Timer */}
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-white font-bold">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="h-full bg-green-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            ¿Cuál es el versículo correcto?
          </h2>
          <p className="text-lg text-gray-800 text-center mb-2 font-semibold">
            {question.reference}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 font-semibold ${
                selectedOption === index
                  ? showResult
                    ? index === question.correct
                      ? 'bg-green-500 text-white border-2 border-green-400'
                      : 'bg-red-500 text-white border-2 border-red-400'
                    : 'bg-blue-500 text-white border-2 border-blue-400'
                  : showResult && index === question.correct
                    ? 'bg-green-500 text-white border-2 border-green-400'
                    : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">{option}</span>
                {showResult && index === question.correct && (
                  <Check className="w-6 h-6 text-white" />
                )}
                {showResult && selectedOption === index && index !== question.correct && (
                  <X className="w-6 h-6 text-white" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        {selectedOption !== null && !showResult && (
          <button
            onClick={checkAnswer}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors duration-200"
          >
            Confirmar
          </button>
        )}

        {/* Result */}
        {showResult && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">
              {selectedOption === question.correct ? '🎉' : selectedOption === -1 ? '⏰' : '😔'}
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              selectedOption === question.correct ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedOption === question.correct ? '¡Correcto!' : selectedOption === -1 ? '¡Tiempo agotado!' : '¡Incorrecto!'}
            </h3>
            <p className="text-gray-800 mb-4 font-medium">
              {question.explanation}
            </p>
            {selectedOption === question.correct && (
              <p className="text-green-600 font-bold">
                +15 XP ganados
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VersoCompleto;
