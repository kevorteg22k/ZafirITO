
import React, { useState, useEffect } from 'react';

const dailyVerses = [
  {
    text: "Todo lo puedo en Cristo que me fortalece",
    reference: "Filipenses 4:13",
    theme: "Fortaleza"
  },
  {
    text: "Jehová es mi pastor; nada me faltará",
    reference: "Salmos 23:1",
    theme: "Confianza"
  },
  {
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito",
    reference: "Juan 3:16",
    theme: "Amor"
  },
  {
    text: "Encomienda a Jehová tu camino, y confía en él; y él hará",
    reference: "Salmos 37:5",
    theme: "Fe"
  }
];

const DailyVerse = () => {
  const [currentVerse, setCurrentVerse] = useState(0);

  useEffect(() => {
    // Cambiar versículo cada día basado en la fecha
    const today = new Date().getDate();
    setCurrentVerse(today % dailyVerses.length);
  }, []);

  const verse = dailyVerses[currentVerse];

  return (
    <div className="relative overflow-hidden rounded-2xl spiritual-gradient p-8 text-white">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-light-ray"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10 text-center space-y-4">
        <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
          ✨ Versículo del Día - {verse.theme}
        </div>
        
        <blockquote className="text-2xl font-semibold leading-relaxed max-w-2xl mx-auto">
          "{verse.text}"
        </blockquote>
        
        <cite className="text-lg text-white/80 font-medium">
          — {verse.reference}
        </cite>

        <div className="pt-4">
          <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105">
            💾 Guardar en Favoritos
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;
