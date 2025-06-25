
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Heart, Share, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

interface BibleVerse {
  reference: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

const BibleModule = () => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTranslation, setSelectedTranslation] = useState('rvr1960');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reflection, setReflection] = useState('');
  const [error, setError] = useState('');

  const translations = [
    { id: 'rvr1960', name: 'RVR1960', full: 'Reina Valera 1960' },
    { id: 'lbla', name: 'LBLA', full: 'La Biblia de las Américas' },
    { id: 'nvi', name: 'NVI', full: 'Nueva Versión Internacional' }
  ];

  const verseOfTheDay = async () => {
    setLoading(true);
    setError('');
    try {
      // Usar la API correcta sin parámetros de traducción que causan 404
      const response = await fetch('https://bible-api.com/juan%203:16');
      if (!response.ok) {
        throw new Error('Error al cargar el versículo');
      }
      const data = await response.json();
      setCurrentVerse(data);
    } catch (error) {
      console.error('Error fetching verse of the day:', error);
      setError('Error al cargar el versículo. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const searchVerse = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      // Limpiar la consulta y usar la API correcta
      const cleanQuery = searchQuery.trim().replace(/\s+/g, '%20');
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(cleanQuery)}`);
      
      if (!response.ok) {
        throw new Error('Versículo no encontrado');
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setCurrentVerse(data);
      setError('');
    } catch (error) {
      console.error('Error searching verse:', error);
      setError('No se pudo encontrar el versículo. Intenta con "Juan 3:16" o "Salmos 23:1"');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!currentVerse) return;
    
    const verseKey = currentVerse.reference;
    if (favorites.includes(verseKey)) {
      setFavorites(favorites.filter(fav => fav !== verseKey));
    } else {
      setFavorites([...favorites, verseKey]);
    }
  };

  const shareVerse = () => {
    if (!currentVerse) return;
    
    if (navigator.share) {
      navigator.share({
        title: `Versículo - ${currentVerse.reference}`,
        text: `"${currentVerse.text}" - ${currentVerse.reference}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`"${currentVerse.text}" - ${currentVerse.reference}`);
      alert('Versículo copiado al portapapeles');
    }
  };

  useEffect(() => {
    verseOfTheDay();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">📖 Biblia</h1>
          <p className="text-gray-700 font-medium">Explora la Palabra de Dios</p>
        </div>

        {/* Translation Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm font-semibold text-gray-800 text-center">
            📚 Usando: Reina Valera 1960
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Traducciones adicionales próximamente
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar versículo (ej. Juan 3:16)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 font-medium"
              onKeyPress={(e) => e.key === 'Enter' && searchVerse()}
            />
            <button
              onClick={searchVerse}
              className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-bold"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Verse Display */}
        {loading ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Cargando versículo...</p>
          </div>
        ) : currentVerse ? (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
            {/* Verse Reference */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-purple-600 mb-2">
                {currentVerse.reference}
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                Reina Valera 1960
              </p>
            </div>

            {/* Verse Text - Mejorado contraste y legibilidad */}
            <blockquote className="text-lg leading-relaxed text-gray-900 font-semibold text-center italic bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              "{currentVerse.text}"
            </blockquote>

            {/* Actions */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={toggleFavorite}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors font-bold ${
                  favorites.includes(currentVerse.reference)
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border-2 border-gray-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(currentVerse.reference) ? 'fill-current' : ''}`} />
                <span className="text-sm font-bold">Favorito</span>
              </button>

              <button
                onClick={shareVerse}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border-2 border-gray-300 font-bold"
              >
                <Share className="w-4 h-4" />
                <span className="text-sm font-bold">Compartir</span>
              </button>
            </div>
          </div>
        ) : null}

        {/* Personal Reflection */}
        {currentVerse && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-3">
            <h4 className="font-bold text-gray-900 flex items-center">
              <Bookmark className="w-4 h-4 mr-2 text-purple-500" />
              Mi Reflexión Personal
            </h4>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Escribe tu reflexión sobre este versículo..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 resize-none font-medium"
              rows={3}
            />
            <button className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-bold">
              Guardar Reflexión
            </button>
          </div>
        )}

        {/* Quick Access */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Acceso Rápido</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Salmos 23:1',
              'Juan 3:16',
              'Filipenses 4:13',
              'Proverbios 3:5-6'
            ].map((verse) => (
              <button
                key={verse}
                onClick={() => {
                  setSearchQuery(verse);
                  searchVerse();
                }}
                className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-bold border border-purple-200"
              >
                {verse}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Verse */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white text-center">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="text-lg font-bold mb-2">Versículo del Día</h3>
          <button 
            onClick={verseOfTheDay}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-50 transition-colors"
          >
            Obtener Versículo
          </button>
        </div>
      </div>
    </div>
  );
};

export default BibleModule;
