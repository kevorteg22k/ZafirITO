
import React, { useState, useEffect } from 'react';
import { Heart, Share, Bookmark, Check } from 'lucide-react';

const devotionals = [
  {
    id: 1,
    title: "La Fortaleza en Cristo",
    verse: "Todo lo puedo en Cristo que me fortalece",
    reference: "Filipenses 4:13",
    reflection: "En momentos de dificultad, recordemos que nuestra fortaleza no viene de nosotros mismos, sino de Cristo. Él nos capacita para enfrentar cualquier desafío que se presente en nuestro camino.",
    question: "¿En qué situación actual de tu vida necesitas aplicar esta verdad?",
    xp: 10
  },
  {
    id: 2,
    title: "El Amor de Dios",
    verse: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito",
    reference: "Juan 3:16",
    reflection: "El amor de Dios es tan grande que dio lo más precioso que tenía por nosotros. Este amor incondicional debe motivarnos a amar a otros de la misma manera.",
    question: "¿Cómo puedes mostrar el amor de Dios a alguien hoy?",
    xp: 10
  },
  {
    id: 3,
    title: "Confianza en el Señor",
    verse: "Encomienda a Jehová tu camino, y confía en él; y él hará",
    reference: "Salmos 37:5",
    reflection: "Confiar en Dios significa entregar nuestros planes y preocupaciones en Sus manos, sabiendo que Él tiene el control y hará lo mejor para nosotros.",
    question: "¿Qué área de tu vida necesitas encomendar completamente a Dios?",
    xp: 10
  }
];

const DailyDevotional = () => {
  const [currentDevotional, setCurrentDevotional] = useState(0);
  const [userReflection, setUserReflection] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Cambiar devocional cada día basado en la fecha
    const today = new Date().getDate();
    setCurrentDevotional(today % devotionals.length);
  }, []);

  const devotional = devotionals[currentDevotional];

  const handleComplete = () => {
    if (userReflection.trim().length < 10) {
      alert('Por favor, escribe una reflexión más detallada (mínimo 10 caracteres)');
      return;
    }
    setIsCompleted(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: devotional.title,
        text: `"${devotional.verse}" - ${devotional.reference}`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`"${devotional.verse}" - ${devotional.reference}`);
      alert('Versículo copiado al portapapeles');
    }
  };

  if (isCompleted) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center space-y-6">
        <div className="text-6xl animate-divine-pulse">🎉</div>
        <h2 className="text-2xl font-bold text-primary">¡Devocional Completado!</h2>
        <p className="text-muted-foreground">
          Has ganado {devotional.xp} XP por completar tu devocional diario
        </p>
        <div className="glass-effect rounded-lg p-4 max-w-md mx-auto">
          <h3 className="text-sm font-medium text-accent mb-2">Tu reflexión:</h3>
          <p className="text-sm text-foreground/80 italic">"{userReflection}"</p>
        </div>
        <button
          onClick={() => {
            setIsCompleted(false);
            setUserReflection('');
            setCurrentDevotional((prev) => (prev + 1) % devotionals.length);
          }}
          className="px-6 py-3 spiritual-gradient text-white rounded-xl font-medium hover:scale-105 transition-transform"
        >
          Ver Siguiente Devocional
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Devocional Diario</h2>
        <p className="text-muted-foreground">Reflexiona y crece espiritualmente</p>
      </div>

      <div className="glass-effect rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block bg-accent/20 px-4 py-2 rounded-full text-sm font-medium text-accent">
            ✨ {devotional.title}
          </div>
        </div>

        {/* Verse */}
        <div className="text-center space-y-4">
          <blockquote className="scripture-text text-2xl max-w-2xl mx-auto">
            "{devotional.verse}"
          </blockquote>
          <cite className="text-lg text-accent font-medium">
            — {devotional.reference}
          </cite>
        </div>

        {/* Reflection */}
        <div className="glass-effect rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-primary">Reflexión</h3>
          <p className="text-foreground/90 leading-relaxed">
            {devotional.reflection}
          </p>
        </div>

        {/* Question */}
        <div className="glass-effect rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-primary">Pregunta para Reflexionar</h3>
          <p className="text-foreground/90 font-medium">
            {devotional.question}
          </p>
          
          {/* User input */}
          <textarea
            value={userReflection}
            onChange={(e) => setUserReflection(e.target.value)}
            placeholder="Escribe tu reflexión personal aquí..."
            className="w-full p-4 rounded-lg border border-border bg-background/50 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isFavorite 
                  ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                  : 'glass-effect border border-primary/20 text-muted-foreground hover:text-primary'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorito' : 'Favorito'}
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 glass-effect border border-primary/20 text-muted-foreground hover:text-primary rounded-lg font-medium transition-colors"
            >
              <Share className="w-4 h-4" />
              Compartir
            </button>
          </div>

          <button
            onClick={handleComplete}
            disabled={userReflection.trim().length < 10}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              userReflection.trim().length >= 10
                ? 'spiritual-gradient text-white hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            Completar (+{devotional.xp} XP)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyDevotional;
