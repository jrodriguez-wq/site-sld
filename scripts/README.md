# Image Optimization Script

Convierte imágenes JPG, PNG, GIF → WebP para reducir peso y acelerar el sitio.

## Uso

```bash
# 1. Simular (ver qué haría sin cambiar nada)
npm run optimize-images:dry

# 2. Convertir + actualizar referencias (mantiene originales)
npm run optimize-images

# 3. Convertir + actualizar + eliminar originales
npm run optimize-images:delete
```

## Qué hace

- Busca `.jpg`, `.jpeg`, `.png`, `.gif` en `public/`
- Convierte cada una a `.webp` (calidad 82%, max 1920px ancho)
- Actualiza referencias en `app/`, `components/`, `lib/`, `data/`
- Opcionalmente elimina los originales (`--delete`)
- Excluye `public/favicon/` (PNG requerido para favicons)

## Requisitos

- `sharp` (dev dependency)
- Node.js 18+
