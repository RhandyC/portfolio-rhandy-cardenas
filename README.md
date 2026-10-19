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

## CV y avisos por correo

El botón `Download CV` descarga `public/documents/Rhandy-Cardenas-CV.pdf` directamente. Para actualizarlo, reemplaza ese PDF. La URL y el endpoint de avisos se configuran en `src/config.ts` (`cv`).

Los avisos usan FormSubmit: https://formsubmit.co/. La primera solicitud dispara un correo de activación al destinatario; hay que confirmarlo para recibir los siguientes avisos. El endpoint público no requiere claves en el navegador. Los avisos dependen de la disponibilidad del servicio y pueden verse bloqueados por el navegador; la descarga sigue funcionando.

Se envía un evento de clic con el nombre del documento, el dominio y la hora UTC, sin pedir datos al visitante. Esto indica una solicitud de descarga, no que el archivo se haya guardado. No se envían avisos desde localhost y los clics repetidos durante un minuto se agrupan. Para desactivarlos, deja `cv.notificationEndpoint` vacío.

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
