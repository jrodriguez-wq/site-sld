# Scripts de Optimización

## Imágenes (`optimize-images.js`)

Convierte imágenes JPG, PNG, GIF → WebP para reducir peso.

```bash
npm run optimize-images:dry    # Simular
npm run optimize-images       # Convertir (mantiene originales)
npm run optimize-images:delete # Convertir + eliminar originales
```

- Requiere: `sharp` (dev dependency)

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
