# Habit Tracker 📊

Aplicación de seguimiento de hábitos diarios con visualización de datos, construida con JavaScript ES6+ modular.

## 🔗 Links

- 🌐 Demo en vivo: [GitHub Pages](https://o0vanfanel0o.github.io/habit-tracker/)
- 💻 Repositorio: [GitHub](https://github.com/o0VanFanel0o/habit-tracker)

## 📸 Vista previa

![Vista previa del proyecto](Demo.gif)

## ✨ Funcionalidades

- Registrar hábitos por día de la semana
- Clasificar hábitos como buenos o malos
- Visualización con gráficas doughnut y barras (Chart.js)
- Barra de progreso de hábitos positivos vs negativos
- Top 3 hábitos más frecuentes
- Hábitos No Negociables con checkboxes
- Persistencia con localStorage

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 — Grid, animaciones, efectos hover
- JavaScript ES6+ — Módulos, arrow functions, destructuring, reduce, filter
- Chart.js — Gráficas doughnut y barras horizontales

## 🗂️ Arquitectura

El proyecto está separado en módulos con responsabilidades claras:

- `app.js` — Coordinador principal y eventos
- `calculations.js` — Lógica de cálculos y agrupación de datos
- `chart.js` — Renderizado de gráficas con Chart.js
- `storage.js` — Persistencia con localStorage
- `ui.js` — Renderizado del DOM

## 🎯 Lo que aprendí

- Arquitectura modular con ES6 imports/exports
- Visualización de datos con Chart.js
- Separación de responsabilidades en proyectos reales
- Manejo de estado por día con filtros dinámicos
- Event delegation con closest() para elementos dinámicos

## 👤 Autor

- GitHub: [@o0VanFanel0o](https://github.com/o0VanFanel0o)