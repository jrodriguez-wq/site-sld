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

Comprime MP4 con ffmpeg para reducir peso (SLD-video2: ~77MB → ~15MB).

```bash
node scripts/optimize-videos.js --dry  # Simular
node scripts/optimize-videos.js        # Procesar (genera .optimized)
```

- Requiere: `ffmpeg` instalado
