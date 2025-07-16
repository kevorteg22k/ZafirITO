import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, ArrowLeft, Download, Clock } from 'lucide-react';

interface BibleBook {
  id: number;
  name: string;
  folder: string;
  chapters: number;
  testament: 'Antiguo' | 'Nuevo';
}

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentBook: BibleBook | null;
  currentChapter: number | null;
}

const AudioBible = () => {
  const [view, setView] = useState<'books' | 'chapters' | 'player'>('books');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [audioState, setAudioState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentBook: null,
    currentChapter: null,
  });
  const [audioError, setAudioError] = useState<string>('');
  const [loadingAudio, setLoadingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Lista de libros de la Biblia
  const bibleBooks: BibleBook[] = [
    // Antiguo Testamento
    { id: 1, name: 'Génesis', folder: '01 - Génesis', chapters: 50, testament: 'Antiguo' },
    { id: 2, name: 'Éxodo', folder: '02 - Éxodo', chapters: 40, testament: 'Antiguo' },
    { id: 3, name: 'Levítico', folder: '03 - Levítico', chapters: 27, testament: 'Antiguo' },
    { id: 4, name: 'Números', folder: '04 - Números', chapters: 36, testament: 'Antiguo' },
    { id: 5, name: 'Deuteronomio', folder: '05 - Deuteronomio', chapters: 34, testament: 'Antiguo' },
    { id: 6, name: 'Josué', folder: '06 - Josué', chapters: 24, testament: 'Antiguo' },
    { id: 7, name: 'Jueces', folder: '07 - Jueces', chapters: 21, testament: 'Antiguo' },
    { id: 8, name: 'Rut', folder: '08 - Rut', chapters: 4, testament: 'Antiguo' },
    { id: 9, name: '1 Samuel', folder: '09 - 1 Samuel', chapters: 31, testament: 'Antiguo' },
    { id: 10, name: '2 Samuel', folder: '10 - 2 Samuel', chapters: 24, testament: 'Antiguo' },
    { id: 11, name: '1 Reyes', folder: '11 - 1 Reyes', chapters: 22, testament: 'Antiguo' },
    { id: 12, name: '2 Reyes', folder: '12 - 2 Reyes', chapters: 25, testament: 'Antiguo' },
    { id: 13, name: '1 Crónicas', folder: '13 - 1 Crónicas', chapters: 29, testament: 'Antiguo' },
    { id: 14, name: '2 Crónicas', folder: '14 - 2 Crónicas', chapters: 36, testament: 'Antiguo' },
    { id: 15, name: 'Esdras', folder: '15 - Esdras', chapters: 10, testament: 'Antiguo' },
    { id: 16, name: 'Nehemías', folder: '16 - Nehemías', chapters: 13, testament: 'Antiguo' },
    { id: 17, name: 'Ester', folder: '17 - Ester', chapters: 10, testament: 'Antiguo' },
    { id: 18, name: 'Job', folder: '18 - Job', chapters: 42, testament: 'Antiguo' },
    { id: 19, name: 'Salmos', folder: '19 - Salmos', chapters: 150, testament: 'Antiguo' },
    { id: 20, name: 'Proverbios', folder: '20 - Proverbios', chapters: 31, testament: 'Antiguo' },
    { id: 21, name: 'Eclesiastés', folder: '21 - Eclesiastés', chapters: 12, testament: 'Antiguo' },
    { id: 22, name: 'Cantares', folder: '22 - Cantares', chapters: 8, testament: 'Antiguo' },
    { id: 23, name: 'Isaías', folder: '23 - Isaías', chapters: 66, testament: 'Antiguo' },
    { id: 24, name: 'Jeremías', folder: '24 - Jeremías', chapters: 52, testament: 'Antiguo' },
    { id: 25, name: 'Lamentaciones', folder: '25 - Lamentaciones', chapters: 5, testament: 'Antiguo' },
    { id: 26, name: 'Ezequiel', folder: '26 - Ezequiel', chapters: 48, testament: 'Antiguo' },
    { id: 27, name: 'Daniel', folder: '27 - Daniel', chapters: 12, testament: 'Antiguo' },
    { id: 28, name: 'Oseas', folder: '28 - Oseas', chapters: 14, testament: 'Antiguo' },
    { id: 29, name: 'Joel', folder: '29 - Joel', chapters: 3, testament: 'Antiguo' },
    { id: 30, name: 'Amós', folder: '30 - Amós', chapters: 9, testament: 'Antiguo' },
    { id: 31, name: 'Abdías', folder: '31 - Abdías', chapters: 1, testament: 'Antiguo' },
    { id: 32, name: 'Jonás', folder: '32 - Jonás', chapters: 4, testament: 'Antiguo' },
    { id: 33, name: 'Miqueas', folder: '33 - Miqueas', chapters: 7, testament: 'Antiguo' },
    { id: 34, name: 'Nahúm', folder: '34 - Nahúm', chapters: 3, testament: 'Antiguo' },
    { id: 35, name: 'Habacuc', folder: '35 - Habacuc', chapters: 3, testament: 'Antiguo' },
    { id: 36, name: 'Sofonías', folder: '36 - Sofonías', chapters: 3, testament: 'Antiguo' },
    { id: 37, name: 'Hageo', folder: '37 - Hageo', chapters: 2, testament: 'Antiguo' },
    { id: 38, name: 'Zacarías', folder: '38 - Zacarías', chapters: 14, testament: 'Antiguo' },
    { id: 39, name: 'Malaquías', folder: '39 - Malaquías', chapters: 4, testament: 'Antiguo' },
    
    // Nuevo Testamento
    { id: 40, name: 'Mateo', folder: '40 - Mateo', chapters: 28, testament: 'Nuevo' },
    { id: 41, name: 'Marcos', folder: '41 - Marcos', chapters: 16, testament: 'Nuevo' },
    { id: 42, name: 'Lucas', folder: '42 - Lucas', chapters: 24, testament: 'Nuevo' },
    { id: 43, name: 'Juan', folder: '43 - Juan', chapters: 21, testament: 'Nuevo' },
    { id: 44, name: 'Hechos', folder: '44 - Hechos', chapters: 28, testament: 'Nuevo' },
    { id: 45, name: 'Romanos', folder: '45 - Romanos', chapters: 16, testament: 'Nuevo' },
    { id: 46, name: '1 Corintios', folder: '46 - 1 Corintios', chapters: 16, testament: 'Nuevo' },
    { id: 47, name: '2 Corintios', folder: '47 - 2 Corintios', chapters: 13, testament: 'Nuevo' },
    { id: 48, name: 'Gálatas', folder: '48 - Gálatas', chapters: 6, testament: 'Nuevo' },
    { id: 49, name: 'Efesios', folder: '49 - Efesios', chapters: 6, testament: 'Nuevo' },
    { id: 50, name: 'Filipenses', folder: '50 - Filipenses', chapters: 4, testament: 'Nuevo' },
    { id: 51, name: 'Colosenses', folder: '51 - Colosenses', chapters: 4, testament: 'Nuevo' },
    { id: 52, name: '1 Tesalonicenses', folder: '52 - 1 Tesalonicenses', chapters: 5, testament: 'Nuevo' },
    { id: 53, name: '2 Tesalonicenses', folder: '53 - 2 Tesalonicenses', chapters: 3, testament: 'Nuevo' },
    { id: 54, name: '1 Timoteo', folder: '54 - 1 Timoteo', chapters: 6, testament: 'Nuevo' },
    { id: 55, name: '2 Timoteo', folder: '55 - 2 Timoteo', chapters: 4, testament: 'Nuevo' },
    { id: 56, name: 'Tito', folder: '56 - Tito', chapters: 3, testament: 'Nuevo' },
    { id: 57, name: 'Filemón', folder: '57 - Filemón', chapters: 1, testament: 'Nuevo' },
    { id: 58, name: 'Hebreos', folder: '58 - Hebreos', chapters: 13, testament: 'Nuevo' },
    { id: 59, name: 'Santiago', folder: '59 - Santiago', chapters: 5, testament: 'Nuevo' },
    { id: 60, name: '1 Pedro', folder: '60 - 1 Pedro', chapters: 5, testament: 'Nuevo' },
    { id: 61, name: '2 Pedro', folder: '61 - 2 Pedro', chapters: 3, testament: 'Nuevo' },
    { id: 62, name: '1 Juan', folder: '62 - 1 Juan', chapters: 5, testament: 'Nuevo' },
    { id: 63, name: '2 Juan', folder: '63 - 2 Juan', chapters: 1, testament: 'Nuevo' },
    { id: 64, name: '3 Juan', folder: '64 - 3 Juan', chapters: 1, testament: 'Nuevo' },
    { id: 65, name: 'Judas', folder: '65 - Judas', chapters: 1, testament: 'Nuevo' },
    { id: 66, name: 'Apocalipsis', folder: '66 - Apocalipsis', chapters: 22, testament: 'Nuevo' },
  ];

  // Versículos inspiracionales para mostrar durante la reproducción
  const inspirationalVerses = [
    { text: "La palabra de Dios es viva y eficaz", reference: "Hebreos 4:12" },
    { text: "Lámpara es a mis pies tu palabra", reference: "Salmos 119:105" },
    { text: "Toda la Escritura es inspirada por Dios", reference: "2 Timoteo 3:16" },
    { text: "El cielo y la tierra pasarán, pero mis palabras no pasarán", reference: "Mateo 24:35" },
    { text: "Bienaventurados los que oyen la palabra de Dios", reference: "Lucas 11:28" },
  ];

  const [currentVerse] = useState(() => 
    inspirationalVerses[Math.floor(Math.random() * inspirationalVerses.length)]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadedMetadata = () => {
      setAudioState(prev => ({
        ...prev,
        duration: audio.duration || 0,
      }));
      setLoadingAudio(false);
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
      // Auto-play next chapter
      if (audioState.currentBook && audioState.currentChapter && audioState.currentChapter < audioState.currentBook.chapters) {
        playChapter(audioState.currentBook, audioState.currentChapter + 1);
      }
    };

    const handleError = () => {
      setAudioError('Capítulo aún no disponible');
      setLoadingAudio(false);
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioState.currentBook, audioState.currentChapter]);

  const selectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setView('chapters');
    setAudioError('');
  };

  const playChapter = async (book: BibleBook, chapter: number) => {
    setLoadingAudio(true);
    setAudioError('');
    
    const audio = audioRef.current;
    if (!audio) return;

    // Construct the audio file path
    const audioPath = `/biblia-dramatizada/${book.folder}/${chapter}-${book.name}.mp3`;
    
    try {
      audio.src = audioPath;
      await audio.load();
      
      setAudioState({
        isPlaying: true,
        currentTime: 0,
        duration: 0,
        currentBook: book,
        currentChapter: chapter,
      });
      
      setView('player');
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioError('Capítulo aún no disponible');
      setLoadingAudio(false);
    }
  };

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audioState.isPlaying) {
        audio.pause();
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      } else {
        await audio.play();
        setAudioState(prev => ({ ...prev, isPlaying: true }));
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setAudioError('Error de reproducción');
    }
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
  };

  const skipChapter = (direction: 'prev' | 'next') => {
    if (!audioState.currentBook || !audioState.currentChapter) return;

    const newChapter = direction === 'next' 
      ? audioState.currentChapter + 1 
      : audioState.currentChapter - 1;

    if (newChapter >= 1 && newChapter <= audioState.currentBook.chapters) {
      playChapter(audioState.currentBook, newChapter);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderBooks = () => {
    const antiguoTestamento = bibleBooks.filter(book => book.testament === 'Antiguo');
    const nuevoTestamento = bibleBooks.filter(book => book.testament === 'Nuevo');

    return (
      <div className="min-h-screen bg-slate-900 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-100 flex items-center justify-center">
              <Volume2 className="w-8 h-8 mr-3 text-purple-400" />
              Biblia Dramatizada
            </h1>
            <p className="text-slate-300 font-medium">Escucha la Palabra de Dios</p>
          </div>

          {/* Antiguo Testamento */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-purple-400 flex items-center">
              <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
              Antiguo Testamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {antiguoTestamento.map((book) => (
                <button
                  key={book.id}
                  onClick={() => selectBook(book)}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-left hover:bg-slate-700 hover:border-purple-500 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-slate-100 font-semibold group-hover:text-purple-300">
                        {book.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {book.chapters} capítulos
                      </p>
                    </div>
                    <Volume2 className="w-5 h-5 text-slate-400 group-hover:text-purple-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nuevo Testamento */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-cyan-400 flex items-center">
              <span className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></span>
              Nuevo Testamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {nuevoTestamento.map((book) => (
                <button
                  key={book.id}
                  onClick={() => selectBook(book)}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-left hover:bg-slate-700 hover:border-cyan-500 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-slate-100 font-semibold group-hover:text-cyan-300">
                        {book.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {book.chapters} capítulos
                      </p>
                    </div>
                    <Volume2 className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderChapters = () => {
    if (!selectedBook) return null;

    const chapters = Array.from({ length: selectedBook.chapters }, (_, i) => i + 1);

    return (
      <div className="min-h-screen bg-slate-900 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView('books')}
              className="text-slate-300 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">{selectedBook.name}</h1>
              <p className="text-slate-300">Selecciona un capítulo</p>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {chapters.map((chapter) => (
              <button
                key={chapter}
                onClick={() => playChapter(selectedBook, chapter)}
                className="aspect-square bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-100 font-bold text-lg hover:bg-purple-600 hover:border-purple-500 transition-all duration-200 hover:scale-105"
              >
                {chapter}
              </button>
            ))}
          </div>

          {audioError && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-center">
              <p className="text-red-200 font-medium">{audioError}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPlayer = () => {
    if (!audioState.currentBook || !audioState.currentChapter) return null;

    const progressPercentage = audioState.duration > 0 
      ? (audioState.currentTime / audioState.duration) * 100 
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView('chapters')}
              className="text-slate-300 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-slate-100">
                {audioState.currentBook.name}
              </h1>
              <p className="text-slate-300">
                Capítulo {audioState.currentChapter}
              </p>
            </div>
          </div>

          {/* Inspirational Verse */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center space-y-3">
            <div className="text-4xl">🎵</div>
            <blockquote className="text-lg text-slate-200 italic font-medium">
              "{currentVerse.text}"
            </blockquote>
            <p className="text-slate-400 text-sm">— {currentVerse.reference}</p>
          </div>

          {/* Audio Player */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>{formatTime(audioState.currentTime)}</span>
                <span>{formatTime(audioState.duration)}</span>
              </div>
              <div 
                className="w-full h-2 bg-slate-700 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = x / rect.width;
                  seekTo(percentage * audioState.duration);
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-150"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => skipChapter('prev')}
                disabled={!audioState.currentChapter || audioState.currentChapter <= 1}
                className="text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SkipBack className="w-8 h-8" />
              </button>

              <button
                onClick={togglePlayPause}
                disabled={loadingAudio}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform disabled:opacity-50 shadow-lg"
              >
                {loadingAudio ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : audioState.isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>

              <button
                onClick={() => skipChapter('next')}
                disabled={!audioState.currentBook || !audioState.currentChapter || audioState.currentChapter >= audioState.currentBook.chapters}
                className="text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SkipForward className="w-8 h-8" />
              </button>
            </div>

            {/* Chapter Info */}
            <div className="text-center space-y-2">
              <div className="text-slate-300 text-sm">
                Capítulo {audioState.currentChapter} de {audioState.currentBook.chapters}
              </div>
              {audioError && (
                <div className="text-red-400 text-sm font-medium">
                  {audioError}
                </div>
              )}
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: Math.min(audioState.currentBook.chapters, 15) }, (_, i) => {
              const chapterNum = Math.max(1, audioState.currentChapter - 7) + i;
              if (chapterNum > audioState.currentBook.chapters) return null;
              
              return (
                <button
                  key={chapterNum}
                  onClick={() => playChapter(audioState.currentBook!, chapterNum)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                    chapterNum === audioState.currentChapter
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {chapterNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />
      </div>
    );
  };

  switch (view) {
    case 'chapters':
      return renderChapters();
    case 'player':
      return renderPlayer();
    default:
      return renderBooks();
  }
};

export default AudioBible;