
import React, { useState, useEffect } from 'react';

const biblicalCuriosities = [
  "¿Sabías que la Biblia fue escrita por más de 40 autores diferentes a lo largo de 1,500 años?",
  "El libro de Salmos es el más largo de la Biblia con 150 capítulos.",
  "La palabra 'amor' aparece más de 500 veces en la Biblia.",
  "Jesús contó más de 40 parábolas registradas en los Evangelios.",
  "El versículo más corto de la Biblia está en Juan 11:35: 'Jesús lloró'.",
  "El Salmo 119 es el capítulo más largo con 176 versículos.",
  "La Biblia ha sido traducida a más de 3,000 idiomas.",
  "El nombre 'Jesús' aparece 973 veces en el Nuevo Testamento.",
  "La Biblia fue escrita en 3 continentes: Asia, África y Europa.",
  "El libro de Job es considerado uno de los más antiguos de la Biblia.",
  "La palabra 'Aleluya' significa 'Alabad al Señor' en hebreo.",
  "El Antiguo Testamento tiene 39 libros y el Nuevo Testamento 27.",
  "La Biblia contiene 66 libros en total.",
  "El libro más corto de la Biblia es 2 Juan con solo 13 versículos.",
  "La palabra 'oro' aparece más de 400 veces en la Biblia."
];

const inspirationalPhrases = [
  "Preparando tu encuentro con la Palabra...",
  "Cargando sabiduría divina...",
  "Conectando tu corazón con las Escrituras...",
  "Iluminando el camino de la fe...",
  "Despertando el discípulo que hay en ti...",
  "Fortaleciendo tu espíritu...",
  "Abriendo tesoros celestiales...",
  "Encendiendo la luz de la verdad...",
  "Preparando tu jornada espiritual...",
  "Cargando bendiciones digitales..."
];

interface BiblicalLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const BiblicalLoader: React.FC<BiblicalLoaderProps> = ({ onComplete, duration = 3000 }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentCuriosity, setCurrentCuriosity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCuriosity, setShowCuriosity] = useState(false);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % inspirationalPhrases.length);
    }, 800);

    const curiosityTimer = setInterval(() => {
      setCurrentCuriosity((prev) => (prev + 1) % biblicalCuriosities.length);
      setShowCuriosity(true);
      setTimeout(() => setShowCuriosity(false), 2000);
    }, 2500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (onComplete) onComplete();
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    return () => {
      clearInterval(phraseTimer);
      clearInterval(curiosityTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete, duration]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-lg mx-auto text-center space-y-8 p-8">
        {/* Logo espiritual animado */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Círculo exterior giratorio */}
            <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin opacity-30"></div>
            <div className="absolute inset-2 border-4 border-blue-300 rounded-full animate-spin opacity-40" style={{ animationDirection: 'reverse' }}></div>
            
            {/* Logo central */}
            <div className="absolute inset-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-4xl animate-pulse">📖</div>
            </div>
            
            {/* Rayos de luz */}
            <div className="absolute inset-0 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-6 bg-gradient-to-t from-yellow-400 to-transparent rounded-full"
                  style={{
                    top: '10%',
                    left: '50%',
                    transformOrigin: '50% 400%',
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Nombre de la app */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Sionik App</h1>
          <p className="text-purple-200 text-sm font-medium">Fe • Sabiduría • Tecnología</p>
        </div>

        {/* Frase inspiracional */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white min-h-[3rem] flex items-center justify-center">
            {inspirationalPhrases[currentPhrase]}
          </h2>
          
          {/* Barra de progreso */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-purple-200 font-medium">{Math.round(progress)}%</p>
        </div>

        {/* Curiosidad bíblica */}
        <div className={`transition-all duration-500 ${showCuriosity ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-sm font-bold text-yellow-300 mb-2 flex items-center justify-center">
              💡 Curiosidad Bíblica
            </h3>
            <p className="text-sm text-white/90 leading-relaxed font-medium">
              {biblicalCuriosities[currentCuriosity]}
            </p>
          </div>
        </div>

        {/* Indicador de carga */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiblicalLoader;
