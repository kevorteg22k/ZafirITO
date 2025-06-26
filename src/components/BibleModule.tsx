
import React, { useState, useEffect } from 'react';
import { Search, Heart, Star, MessageCircle, BookOpen, RefreshCw } from 'lucide-react';

interface VerseData {
  reference: string;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

interface BibleBook {
  name: string;
  testament: string;
  chapters: number;
}

const BibleModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [translation, setTranslation] = useState('rvr1960');
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<VerseData[]>([]);
  const [reflection, setReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);
  const [verseOfTheDay, setVerseOfTheDay] = useState<VerseData | null>(null);
  const [books, setBooks] = useState<BibleBook[]>([]);

  const translations = [
    { code: 'rvr1960', name: 'Reina Valera 1960' },
    { code: 'lta', name: 'Lenguaje Actual' },
    { code: 'pdt', name: 'Palabra de Dios para Todos' },
    { code: 'bla', name: 'Biblia de las Américas' }
  ];

  const dailyVerses = [
    'Juan 3:16',
    'Filipenses 4:13',
    'Salmos 23:1',
    'Romanos 8:28',
    'Proverbios 3:5-6',
    'Isaías 41:10',
    'Jeremías 29:11',
    'Mateo 6:33'
  ];

  useEffect(() => {
    loadVerseOfTheDay();
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetch('https://bible-api.com/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (err) {
      console.error('Error loading books:', err);
    }
  };

  const loadVerseOfTheDay = async () => {
    const todayIndex = new Date().getDate() % dailyVerses.length;
    const todayVerse = dailyVerses[todayIndex];
    
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(todayVerse)}?translation=rvr1960`);
      if (response.ok) {
        const data = await response.json();
        setVerseOfTheDay(data);
      }
    } catch (err) {
      console.error('Error loading verse of the day:', err);
    }
  };

  const searchVerse = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Buscando versículo:', searchTerm, 'traducción:', translation);
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(searchTerm)}?translation=${translation}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Respuesta de la API:', data);
      
      if (data.error || !data.text) {
        setError('Versículo no encontrado. Intenta con formato "Juan 3:16" o "Salmos 23:1"');
        setVerseData(null);
      } else {
        setVerseData(data);
      }
    } catch (err) {
      console.error('Error al buscar versículo:', err);
      setError('Error al buscar el versículo. Verifica tu conexión a internet.');
      setVerseData(null);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (verseData && !favorites.find(fav => fav.reference === verseData.reference)) {
      setFavorites([...favorites, verseData]);
      console.log('Versículo agregado a favoritos:', verseData.reference);
    }
  };

  const saveReflection = () => {
    if (reflection.trim()) {
      console.log('Reflexión guardada:', reflection);
      setShowReflection(false);
      setReflection('');
      // Aquí se guardaría en Supabase
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-100">📖 Biblia</h1>
          <p className="text-slate-300 font-medium">Explora la Palabra de Dios</p>
        </div>

        {/* Versículo del día */}
        {verseOfTheDay && (
          <div className="zafirigo-card p-6 animate-divine-pulse">
            <h3 className="text-lg font-bold mb-3 text-center text-slate-100 flex items-center justify-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Versículo del Día
            </h3>
            <blockquote className="text-center italic text-lg mb-3 text-slate-200 font-medium">
              "{verseOfTheDay.text}"
            </blockquote>
            <p className="text-center text-sm text-slate-400 font-medium">
              — {verseOfTheDay.reference}
            </p>
          </div>
        )}

        {/* Buscador */}
        <div className="zafirigo-card p-6 space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar versículo (ej: Juan 3:16, Salmos 23:1)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchVerse()}
                className="w-full px-4 py-3 border border-slate-600 rounded-lg text-slate-100 bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="px-4 py-3 border border-slate-600 rounded-lg text-slate-100 bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {translations.map(trans => (
                  <option key={trans.code} value={trans.code} className="text-slate-100 bg-slate-700">
                    {trans.name}
                  </option>
                ))}
              </select>
              
              <button
                onClick={searchVerse}
                disabled={loading}
                className="zafirigo-button flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-bold">{error}</p>
          </div>
        )}

        {/* Resultado del versículo */}
        {verseData && (
          <div className="zafirigo-card p-6 space-y-4">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold text-purple-400">{verseData.reference}</h2>
              <blockquote className="scripture-text px-4 py-4 bg-slate-700 rounded-lg border-l-4 border-purple-500">
                "{verseData.text}"
              </blockquote>
              <p className="text-sm text-slate-400 font-medium">
                Traducción: {translations.find(t => t.code === translation)?.name}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={addToFavorites}
                className="flex items-center px-4 py-2 bg-red-900/50 text-red-300 rounded-lg border border-red-600 hover:bg-red-900/70 transition-colors font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorito
              </button>
              
              <button
                onClick={() => setShowReflection(true)}
                className="flex items-center px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded-lg border border-cyan-600 hover:bg-cyan-900/70 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Reflexionar
              </button>
            </div>
          </div>
        )}

        {/* Modal de reflexión */}
        {showReflection && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 max-w-md w-full space-y-4">
              <h3 className="text-lg font-bold text-slate-100">💭 Mi Reflexión</h3>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Escribe tu reflexión sobre este versículo..."
                className="w-full h-32 p-3 border border-slate-600 rounded-lg text-slate-100 bg-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={saveReflection}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowReflection(false)}
                  className="flex-1 py-2 bg-slate-600 text-slate-200 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Favoritos */}
        {favorites.length > 0 && (
          <div className="zafirigo-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Mis Favoritos ({favorites.length})
            </h3>
            <div className="space-y-3">
              {favorites.slice(0, 3).map((fav, index) => (
                <div key={index} className="p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <p className="font-bold text-purple-400 text-sm">{fav.reference}</p>
                  <p className="text-slate-200 text-sm mt-1 font-medium">
                    "{fav.text.substring(0, 100)}..."
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BibleModule;
