# MisionGo - Plataforma de Aprendizaje Bíblico Interactivo

## 📖 Descripción

MisionGo es una plataforma web moderna diseñada para el aprendizaje interactivo de la Biblia a través de juegos, lecturas y audio dramatizado. Desarrollada con React, TypeScript y Tailwind CSS.

## 🚀 Características Principales

- **🎮 Juegos Educativos**: 4 tipos de juegos para aprender versículos bíblicos
- **📚 Estudio Bíblico**: Módulo completo de lectura de la Biblia
- **🎵 Biblia Dramatizada**: Reproductor de audio con toda la Biblia dramatizada
- **👤 Perfiles de Usuario**: Sistema de autenticación y progreso personalizado
- **🏆 Sistema de Gamificación**: XP, logros y rachas de estudio
- **📱 Diseño Responsivo**: Optimizado para móviles y escritorio

## 🎵 Configuración de la Biblia Dramatizada

### Estructura de Archivos

Los archivos de audio deben estar organizados en la siguiente estructura:

```
public/
└── biblia-dramatizada/
    ├── 01 - Génesis/
    │   ├── 1-Génesis.mp3
    │   ├── 2-Génesis.mp3
    │   └── ...
    ├── 02 - Éxodo/
    │   ├── 1-Éxodo.mp3
    │   ├── 2-Éxodo.mp3
    │   └── ...
    └── ...
```

### ⚠️ Importante: Convención de Nombres

Los archivos de audio **DEBEN** seguir exactamente este patrón:
- **Carpeta**: `XX - NombreLibro/` (ejemplo: `03 - Levítico/`)
- **Archivo**: `X-NombreLibro.mp3` (ejemplo: `1-Levítico.mp3`)

### Personalización de Libros

Para modificar la lista de libros de la Biblia, edita el archivo:
**`src/components/AudioBible.tsx`** - línea 36

```typescript
const bibleBooks: BibleBook[] = [
  { 
    id: 1, 
    name: 'Génesis', 
    folder: '01 - Génesis', 
    chapters: 50, 
    testament: 'Antiguo' 
  },
  // ... más libros
];
```

#### Propiedades de cada libro:
- `id`: Número único del libro
- `name`: Nombre que aparece en la interfaz
- `folder`: Nombre exacto de la carpeta en `/public/biblia-dramatizada/`
- `chapters`: Número total de capítulos del libro
- `testament`: `'Antiguo'` o `'Nuevo'`

### Versículos Inspiracionales

Para cambiar los versículos que aparecen durante la reproducción:
**`src/components/AudioBible.tsx`** - línea 109

```typescript
const inspirationalVerses = [
  { text: "Tu texto aquí", reference: "Referencia aquí" },
  // ... más versículos
];
```

### Resolución de Problemas Comunes

#### 🔧 El audio no se reproduce
1. **Verifica la estructura de carpetas**: Asegúrate de que coincida exactamente
2. **Nombres de archivos**: Deben seguir el patrón `X-NombreLibro.mp3`
3. **Ubicación**: Los archivos deben estar en `/public/biblia-dramatizada/`
4. **Formato**: Solo se admiten archivos `.mp3`

#### 🔧 Aparece "Capítulo aún no disponible"
- El archivo no existe en la ruta especificada
- Revisa que el nombre del archivo coincida con el nombre del libro en el código

#### 🔧 Verificar rutas en desarrollo
Abre las herramientas de desarrollador (F12) en el navegador y ve a la consola para ver las rutas que se están intentando cargar.

## 🎮 Configuración de Juegos

### Añadir Nuevos Niveles

Los juegos utilizan una base de datos Supabase. Para añadir niveles:

1. Accede al panel de Supabase
2. Ve a la tabla `levels`
3. Añade registros con la estructura:

```sql
INSERT INTO levels (id, title, game_type, position, verse_reference, xp_reward, description)
VALUES (
  'nuevo-id',
  'Título del Nivel',
  'versoMix', -- versoMix, emojiverso, rellenoDivino, versoCompleto
  10, -- posición en la lista
  'Juan 3:16',
  50, -- XP que otorga
  'Descripción del nivel'
);
```

### Tipos de Juegos Disponibles

1. **VersoMix**: Ordenar palabras de un versículo
2. **Emojiverso**: Adivinar el versículo por emojis
3. **RellenoDivino**: Completar palabras faltantes
4. **VersoCompleto**: Escribir el versículo completo

## 🏗️ Desarrollo y Configuración

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno

El proyecto utiliza Supabase. La configuración está en:
- `src/integrations/supabase/client.ts`

### Base de Datos

El proyecto incluye las siguientes tablas:
- `profiles`: Información de usuarios
- `levels`: Niveles de juegos
- `levels_progress`: Progreso de niveles por usuario
- `points_history`: Historial de puntos
- `lives`: Sistema de vidas
- `streaks`: Rachas de estudio

### Autenticación

Para configurar administradores, modifica el rol en la tabla `profiles`:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@ejemplo.com';
```

## 🎨 Personalización Visual

### Colores y Temas

Los colores están definidos en:
- `src/index.css`: Variables CSS principales
- `tailwind.config.ts`: Configuración de Tailwind

### Componentes Principales

- `src/components/AudioBible.tsx`: Reproductor de audio
- `src/components/Header.tsx`: Navegación principal
- `src/components/LearningPath.tsx`: Ruta de aprendizaje
- `src/components/games/`: Componentes de juegos

## 📱 Despliegue

### Construcción para Producción

```bash
npm run build
```

### Configuración de Servidor

Asegúrate de que tu servidor web:
1. Sirva archivos estáticos desde `/public/`
2. Redirija todas las rutas a `index.html` (SPA)
3. Tenga configuradas las cabeceras CORS para archivos de audio

### Optimización de Audio

Para mejor rendimiento:
- Usa archivos MP3 con bitrate 128kbps o menor
- Considera usar compresión adicional para archivos grandes
- Implementa lazy loading si hay muchos archivos

## 🔧 Mantenimiento

### Añadir Nuevos Libros Bíblicos

1. Edita `bibleBooks` en `AudioBible.tsx`
2. Crea la carpeta correspondiente en `/public/biblia-dramatizada/`
3. Añade los archivos de audio siguiendo la convención

### Actualizar Versículos Inspiracionales

Edita el array `inspirationalVerses` en `AudioBible.tsx`

### Backup de Datos

Respalda regularmente:
- Base de datos Supabase (configuración → exports)
- Archivos de audio en `/public/biblia-dramatizada/`

## 📞 Soporte

Para problemas técnicos:
1. Revisa la consola del navegador para errores
2. Verifica la estructura de archivos
3. Confirma que las rutas coincidan exactamente

---

**¡Que Dios bendiga tu ministerio digital! 🙏**