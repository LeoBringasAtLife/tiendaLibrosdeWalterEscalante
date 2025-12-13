# Tienda de Libros de Walter Escalante

Sitio web estático para la colección de libros de Walter Escalante.

**Desarrollo**

**Requisitos previos**

- Node.js instalado (versión 14 o superior)

**Instalación**

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

**Scripts disponibles**

**Compilar CSS (producción)**

Genera el archivo CSS optimizado y minificado:

```bash
npm run build:css
```

**Modo desarrollo (watch)**

Compila automáticamente el CSS cada vez que guardas cambios:

```bash
npm run watch:css
```

**Estructura del proyecto**

```
├── src/
│   └── input.css          # Archivo fuente de Tailwind
├── css/
│   └── output.css         # CSS compilado (generado automáticamente)
├── libros/                # Imágenes de los libros
├── imagenes/              # Otros recursos
├── index.html             # Página principal del sitio web
├── tailwind.config.js     # Configuración de Tailwind
└── package.json           # Dependencias del proyecto
```

**Estilos CSS**

Este proyecto usa **Tailwind CSS v3** con compilación local para producción.

- **Archivo de entrada**: `src/input.css`
- **Archivo de salida**: `css/output.css` (~12KB minificado)

**Añadir estilos personalizados**

Edita `src/input.css` para añadir tus propios estilos:

```css
@layer components {
  .mi-clase-personalizada {
    @apply bg-blue-500 text-white p-4;
  }
}
```

Luego ejecuta `npm run build:css` para compilar.

**Despliegue**

1. Ejecuta `npm run build:css` para generar el CSS optimizado
2. Sube todos los archivos excepto:
   - `node_modules/`
   - `src/`
   - `package.json`
   - `package-lock.json`
   - `tailwind.config.js`

Los archivos necesarios para producción son:

- `index.html`
- `css/output.css`
- `libros/`
- `imagenes/`

**Tecnologías**

- HTML5
- Tailwind CSS v3
- JavaScript vanilla
- Formspree (para formularios)

**Notas**

- El CSS está optimizado y solo incluye las clases que se usan en el HTML
- El tamaño del CSS es ~12KB (comparado con ~300KB del CDN)
- No se requiere JavaScript build process, solo CSS compilation

<br/>

**¡Gracias por visitar el repositorio de la Tienda de Libros de Walter Escalante!**
