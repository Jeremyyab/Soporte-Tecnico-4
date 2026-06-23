# A-TI-314 · Introducción al Soporte Técnico IV

Portal web del curso **A-TI-314 — Introducción al Soporte Técnico IV** (Seguridad Informática) de la
Universidad CENFOTEC, con la misma línea de diseño del portal de TI-313: páginas autocontenidas (CSS
embebido por archivo), presentaciones interactivas con lápiz y casos prácticos detallados.

## Estructura

```
Soporte-Tecnico-4/
├── index.html                                  · Portal principal
├── logo-cenfo.png                              · (agregá tu logo aquí; opcional)
├── presentaciones/
│   ├── images/                                 · 48 ilustraciones SVG (una por slide)
│   ├── semana-1-seguridad-sistemas-operativos.html
│   ├── semana-2-procedimientos-de-seguridad.html
│   ├── semana-3-resolucion-de-problemas.html
│   └── semana-4-habilidades-profesionales.html
├── caso-practico-1/CP1-Seguridad-en-Sistemas-Operativos.html
├── caso-practico-2/CP2-Procedimientos-de-Seguridad.html
├── caso-practico-3/CP3-Resolucion-de-Problemas-de-Seguridad.html
├── proyecto/Proyecto-Final-Seguridad.html
├── materiales/
│   ├── rubricas.html
│   ├── referencia-rapida.html
│   └── datos-del-curso.html
└── README.md
```

Cada página es autocontenida (lleva su propio CSS), igual que el sitio de TI-313. No hay hojas de
estilo compartidas.

## Logo

Las páginas buscan `logo-cenfo.png` en la raíz del repo (la portada) y en `../logo-cenfo.png` (páginas
interiores). Copiá tu archivo de logo con ese nombre y aparecerá automáticamente; si no está, se oculta.

## Presentaciones interactivas

Motor con lápiz de anotación: botones Anterior/Siguiente, teclas ← → / Espacio, barra de progreso,
lápiz con grosor y color, y borrador. Las ilustraciones del panel derecho están en
`presentaciones/images/` (SVG) y se pueden reemplazar.

| Semana | Tema | Slides |
|--------|------|--------|
| 1 | Seguridad en sistemas operativos | 13 |
| 2 | Procedimientos de seguridad | 13 |
| 3 | Resolución de problemas de seguridad | 12 |
| 4 | Habilidades del profesional de TI | 10 |

## Evaluación

| Actividad | Tipo | Peso |
|-----------|------|------|
| Proyecto (1) | Desempeño | 55% (6 criterios) |
| Casos prácticos (3) | Desempeño | 45% (15% c/u, 4 criterios) |

## Publicar en GitHub Pages

1. Subí el contenido de esta carpeta a un repositorio (por ejemplo `Soporte-Tecnico-4`).
2. En **Settings → Pages**, elegí la rama `main` y la carpeta raíz `/`.
3. El sitio queda en `https://<usuario>.github.io/Soporte-Tecnico-4/`.

---

Material del curso — **Ing. Jeremy Alvarado B.** · jalvarado@ucenfotec.ac.cr · 8573-9967
Universidad CENFOTEC © · A-TI-314
