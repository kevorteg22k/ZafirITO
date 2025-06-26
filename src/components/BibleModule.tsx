
import React, { useState, useEffect } from 'react';
import { Search, Heart, BookOpen, ChevronDown, Star, MessageCircle } from 'lucide-react';

const BibleModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [translation, setTranslation] = useState('rvr1960');
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [reflection, setReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  const translations = [
    { code: 'rvr1960', name: 'Reina Valera 1960' },
    { code: 'lta', name: 'Lenguaje Actual' },
    { code: 'pdt', name: 'Palabra de Dios para Todos' },
    { code: 'bla', name: 'Biblia de las Américas' }
  ];

  const searchVerse = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Buscando versículo:', searchTerm, 'traducción:', translation);
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(searchTerm)}?translation=${translation}`);
      const data = await response.json();
      
      console.log('Respuesta de la API:', data);
      
      if (data.error) {
        setError('Versículo no encontrado. Intenta con formato "Juan 3:16"');
        setVerseData(null);
      } else {
        setVerseData(data);
      }
    } catch (err) {
      console.error('Error al buscar versículo:', err);
      setError('Error al buscar el versículo. Verifica tu conexión.');
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">📖 Biblia</h1>
          <p className="text-gray-800 font-medium">Explora la Palabra de Dios</p>
        </div>

        {/* Buscador */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar versículo (ej: Juan 3:16, Salmos 23:1)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchVerse()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {translations.map(trans => (
                  <option key={trans.code} value={trans.code} className="text-gray-900 bg-white">
                    {trans.name}
                  </option>
                ))}
              </select>
              
              <button
                onClick={searchVerse}
                disabled={loading}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-bold">{error}</p>
          </div>
        )}

        {/* Resultado del versículo */}
        {verseData && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold text-purple-600">{verseData.reference}</h2>
              <blockquote className="text-lg leading-relaxed text-gray-900 font-semibold px-4 py-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                "{verseData.text}"
              </blockquote>
              <p className="text-sm text-gray-700 font-medium">
                Traducción: {translations.find(t => t.code === translation)?.name}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={addToFavorites}
                className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-colors font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorito
              </button>
              
              <button
                onClick={() => setShowReflection(true)}
                className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Reflexionar
              </button>
            </div>
          </div>
        )}

        {/* Modal de reflexión */}
        {showReflection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
              <h3 className="text-lg font-bold text-gray-900">💭 Mi Reflexión</h3>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Escribe tu reflexión sobre este versículo..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={saveReflection}
                  className="flex-1 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowReflection(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Favoritos */}
        {favorites.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Mis Favoritos ({favorites.length})
            </h3>
            <div className="space-y-3">
              {favorites.slice(0, 3).map((fav, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-bold text-purple-600 text-sm">{fav.reference}</p>
                  <p className="text-gray-900 text-sm mt-1 font-medium">"{fav.text.substring(0, 100)}..."</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Versículo del día */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3 text-center">✨ Versículo del Día</h3>
          <blockquote className="text-center italic text-lg mb-2 font-medium">
            "Todo lo puedo en Cristo que me fortalece"
          </blockquote>
          <p className="text-center text-sm opacity-90 font-medium">— Filipenses 4:13</p>
        </div>

      </div>
    </div>
  );
};

export default BibleModule;
