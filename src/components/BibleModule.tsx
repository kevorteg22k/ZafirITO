
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

  const translations = [
    { id: 'rvr1960', name: 'RVR1960', full: 'Reina Valera 1960' },
    { id: 'lta', name: 'LTA', full: 'Lenguaje Actual' },
    { id: 'pdt', name: 'PDT', full: 'Palabra de Dios para Todos' }
  ];

  const verseOfTheDay = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/juan%203:16?translation=${selectedTranslation}`);
      const data = await response.json();
      setCurrentVerse(data);
    } catch (error) {
      console.error('Error fetching verse of the day:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchVerse = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(searchQuery)}?translation=${selectedTranslation}`);
      const data = await response.json();
      setCurrentVerse(data);
    } catch (error) {
      console.error('Error searching verse:', error);
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
  }, [selectedTranslation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">📖 Biblia</h1>
          <p className="text-gray-600">Explora la Palabra de Dios</p>
        </div>

        {/* Translation Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Traducción:
          </label>
          <select
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
          >
            {translations.map(trans => (
              <option key={trans.id} value={trans.id}>
                {trans.name} - {trans.full}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar versículo (ej. Juan 3:16)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
              onKeyPress={(e) => e.key === 'Enter' && searchVerse()}
            />
            <button
              onClick={searchVerse}
              className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verse Display */}
        {loading ? (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando versículo...</p>
          </div>
        ) : currentVerse ? (
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            {/* Verse Reference */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-purple-600 mb-2">
                {currentVerse.reference}
              </h3>
              <p className="text-xs text-gray-500">
                {currentVerse.translation_name}
              </p>
            </div>

            {/* Verse Text */}
            <blockquote className="text-lg leading-relaxed text-gray-800 font-medium text-center italic">
              "{currentVerse.text}"
            </blockquote>

            {/* Actions */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={toggleFavorite}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  favorites.includes(currentVerse.reference)
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(currentVerse.reference) ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">Favorito</span>
              </button>

              <button
                onClick={shareVerse}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors"
              >
                <Share className="w-4 h-4" />
                <span className="text-sm font-medium">Compartir</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Busca un versículo para comenzar</p>
          </div>
        )}

        {/* Personal Reflection */}
        {currentVerse && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <Bookmark className="w-4 h-4 mr-2 text-purple-500" />
              Mi Reflexión Personal
            </h4>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Escribe tu reflexión sobre este versículo..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 resize-none"
              rows={3}
            />
            <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
              Guardar Reflexión
            </button>
          </div>
        )}

        {/* Quick Access */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">Acceso Rápido</h4>
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
                className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
              >
                {verse}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleModule;
