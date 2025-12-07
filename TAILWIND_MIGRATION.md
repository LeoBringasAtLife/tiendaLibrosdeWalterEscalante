# Migración de Tailwind CDN a Tailwind CLI

## ¿Qué se cambió?

Se migró de usar el CDN de Tailwind (no recomendado para producción) a usar Tailwind CLI con compilación local.

### Antes ❌

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="tailwind.config.js"></script>
```

- **Tamaño**: ~300KB+ sin comprimir
- **Rendimiento**: Lento (procesa CSS en el navegador)
- **Producción**: ❌ No recomendado

### Después ✅

```html
<link rel="stylesheet" href="css/output.css" />
```

- **Tamaño**: ~12KB minificado
- **Rendimiento**: Rápido (CSS pre-compilado)
- **Producción**: ✅ Listo para producción

## Beneficios

1. **96% menos peso** - De ~300KB a ~12KB
2. **Mejor rendimiento** - No hay procesamiento en el navegador
3. **Mejor SEO** - Carga más rápida = mejor ranking
4. **Mejor UX** - Sin "flash" de contenido sin estilos
5. **Listo para producción** - Siguiendo las mejores prácticas

## Archivos nuevos

- `package.json` - Configuración de npm y scripts
- `src/input.css` - Archivo fuente de Tailwind
- `css/output.css` - CSS compilado (generado automáticamente)
- `node_modules/` - Dependencias (no se sube a git)

## Archivos modificados

- `index.html` - Reemplazado CDN por link a CSS compilado
- `tailwind.config.js` - Actualizado al formato CLI
- `.gitignore` - Añadido node_modules
- `README.md` - Documentación actualizada

## Comandos importantes

### Desarrollo

```bash
npm run watch:css
```

Ejecuta esto mientras desarrollas. Recompila automáticamente cuando guardas cambios en el HTML.

### Producción

```bash
npm run build:css
```

Ejecuta esto antes de subir a producción. Genera el CSS minificado.

## Workflow de desarrollo

1. Abre una terminal en el proyecto
2. Ejecuta `npm run watch:css`
3. Edita `index.html` normalmente
4. El CSS se recompila automáticamente
5. Refresca el navegador para ver los cambios

## Deployment

Cuando subas a producción, asegúrate de:

1. Ejecutar `npm run build:css` primero
2. Subir solo los archivos necesarios:
   - ✅ `index.html`
   - ✅ `css/output.css`
   - ✅ `libros/`
   - ✅ `imagenes/`

   - ❌ `node_modules/`
   - ❌ `src/`
   - ❌ `package.json`
   - ❌ `tailwind.config.js`

## Notas técnicas

- Usamos Tailwind CSS v3 (estable)
- El CSS solo incluye las clases que realmente usas
- Si añades nuevas clases de Tailwind al HTML, se incluirán automáticamente en la próxima compilación
- Los estilos personalizados van en `src/input.css`
