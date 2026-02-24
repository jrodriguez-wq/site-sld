# Scripts de Optimización

## Imágenes (`optimize-images.js`)

Convierte JPG/PNG/GIF → WebP (formato óptimo para web) y re-optimiza WebP que pesen más de 300 KB para que carguen más rápido.

**Ver qué está pesado (sin cambiar nada):**

```bash
npm run optimize-images:check
```

**Optimizar todo (convertir raster → WebP + re-optimizar WebP pesados):**

```bash
npm run optimize-images           # Convierte y re-optimiza (mantiene originales raster)
npm run optimize-images:delete   # Igual + elimina los JPG/PNG/GIF originales
npm run optimize-images:dry      # Simular sin escribir
```

- Requiere: `sharp` (`npm install --save-dev sharp`)
- Límites: ancho máx. 1920 px, calidad WebP 80, re-optimiza WebP > 300 KB

---

## Videos (`optimize-videos.js`)

Comprime MP4 con ffmpeg y aplica **faststart** para que la reproducción sea fluida (sin parones). Si los vídeos se cortan o van lentos, es porque pesan mucho o no tienen la metadata al inicio del archivo.

**Todo en uno (optimizar, usar los nuevos y eliminar los viejos):**

```bash
node scripts/optimize-videos.js --replace --delete-old
```

- Genera versiones optimizadas (hero ≤2MB, content ≤8MB, faststart).
- Sustituye los originales por los optimizados.
- Borra los archivos viejos (no deja .backup).

**Otras opciones:**

```bash
node scripts/optimize-videos.js              # Solo genera .optimized (revisar a mano)
node scripts/optimize-videos.js --replace    # Reemplaza originales y guarda .backup
node scripts/optimize-videos.js --dry        # Simular sin escribir
node scripts/optimize-videos.js --force      # Re-codificar todos (aunque ya cumplan tamaño)
```

- Requiere: `ffmpeg` (`apt install ffmpeg` / `brew install ffmpeg`)
- Después, sube los MP4 actualizados a tu repo y vuelve a desplegar.
