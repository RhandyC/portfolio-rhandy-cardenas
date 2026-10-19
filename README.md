# Portfolio — Rhandy Pablo Cardenas Curo

Portafolio profesional de Rhandy Pablo Cardenas Curo.

**Live:** [rhandycardenas.lat](https://rhandycardenas.lat)

## Tech Stack

- [Astro](https://astro.build/) — Framework
- [Tailwind CSS](https://tailwindcss.com/) — Estilos
- [TypeScript](https://www.typescriptlang.org/) — Tipado

## Editar contenido

Todos los datos del portafolio están en `src/config.ts`. Edita ese archivo para actualizar tu información.

```
src/
├── config.ts          # ← Tus datos van aquí
├── components/        # Componentes visuales
├── layouts/           # Layout principal
└── pages/             # Páginas
public/
├── profile.jpg        # Foto de perfil
└── favicon.svg        # Ícono del sitio
```

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Generar sitio estático
```

## Publicar cambios

Cada push a `main` se publica solo: el workflow `.github/workflows/deploy.yml` hace el build y lo sube a la rama `gh-pages`, que es la que sirve GitHub Pages en [rhandycardenas.lat](https://rhandycardenas.lat). Tarda un par de minutos; el avance se ve en la pestaña **Actions**.

No borres `public/CNAME`: es el archivo que conecta el dominio con el sitio.

---

<p align="center">
  <a href="https://cofoundy.dev">
    <img src="https://i.imgur.com/s8ah1HT.png" alt="Cofoundy" width="36">
  </a>
  <br>
  <sub>Hecho con amor por <a href="https://cofoundy.dev">Cofoundy</a></sub>
  <br>
  <sub>¿Necesitas una landing page, chatbot con IA o potenciar tu marca digital? <a href="https://cofoundy.dev">Escríbenos</a></sub>
</p>
