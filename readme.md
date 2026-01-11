
# 🔐 Generador de Contraseñas Seguro - Extensión de Chrome

Una extensión de navegador ligera, rápida y privada diseñada para generar contraseñas criptográficamente seguras sin necesidad de conexión a internet. Construida con **TypeScript** y **HTML Semántico** siguiendo las mejores prácticas de seguridad y accesibilidad.

## 🚀 Características

- **Generación Segura:** Utiliza `window.crypto.getRandomValues()` para una entropía real (nada de `Math.random`).
- **Personalizable:**
  - Longitud ajustable (8 - 64 caracteres).
  - Opciones para Mayúsculas, Minúsculas, Números y Símbolos.
  - **Filtro de Ambigüedad:** Opción para excluir caracteres confusos (como `I`, `l`, `1`, `O`, `0`).
- **100% Offline:** La lógica se ejecuta localmente en el navegador. Ningún dato sale de tu ordenador.
- **Accesible:** Interfaz construida con HTML5 semántico (`<fieldset>`, `<output>`, `<form>`) compatible con lectores de pantalla.
- **Portapapeles Inteligente:** Copia con un clic usando la Clipboard API moderna con fallback automático.

## 🧠 Filosofía y Decisiones Técnicas

Este proyecto no es solo un generador, es un ejercicio de buenas prácticas en desarrollo web moderno y seguridad. Aquí explicamos el *porqué* de las decisiones clave:

### 1. TypeScript sobre JavaScript
Se eligió **TypeScript** para garantizar la robustez del código. Al tipar estrictamente las interfaces (`PasswordOptions`) y los elementos del DOM (`HTMLFormElement`, `HTMLOutputElement`), prevenimos errores en tiempo de ejecución y facilitamos el mantenimiento a largo plazo.

### 2. Seguridad Criptográfica (`crypto` vs `Math`)
La mayoría de tutoriales usan `Math.random()`, el cual es predecible y no apto para seguridad. Este proyecto implementa `window.crypto.getRandomValues()`, asegurando que cada contraseña tenga una aleatoriedad criptográficamente fuerte, resistente a ataques de predicción.

### 3. HTML Semántico y Accesibilidad
En lugar de usar `<div>` genéricos, se reestructuró la UI utilizando etiquetas con significado:
- **`<form>`:** Para manejar la lógica de envío y permitir el uso de la tecla "Enter".
- **`<fieldset>` & `<legend>`:** Para agrupar lógicamente los controles de configuración.
- **`<output>`:** Para mostrar dinámicamente el valor de la longitud.
Esto mejora el SEO técnico y permite que usuarios con tecnologías de asistencia usen la herramienta sin barreras.

### 4. Manifest V3 y CSP
El proyecto cumple estrictamente con el **Manifest V3** de Chrome.
- **Sin scripts en línea:** Por seguridad (Content Security Policy), toda la lógica está separada en archivos `.js` externos. No se usa `onclick` ni `onsubmit` en el HTML, todo se maneja mediante `addEventListener` en TypeScript.

## 🛠️ Instalación y Desarrollo

Si deseas ejecutar este proyecto localmente o contribuir:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ELmoliii/generador-password.git
   cd generador-password

1. **Instalar dependencias:**
   ```bash
   npm install

1. ****Compilar TypeScript:
   ```bash
   # Opción A: Compilación única
    npx tsc
    
    # Opción B: Modo observador (recompila al guardar cambios)
    npx tsc -w



4. **Cargar en Chrome:**
* Abre `chrome://extensions/` en tu navegador.
* Activa el **Modo de desarrollador** (interruptor en la esquina superior derecha).
* Haz clic en el botón **Cargar descomprimida** (Load unpacked).
* Selecciona la carpeta raíz del proyecto (`generador-password`).



## 📂 Estructura del Proyecto

```text
.
├── src/
│   ├── popup.ts             # Lógica de interacción con el DOM
│   └── passwordGenerator.ts # Lógica pura de generación (algoritmo)
├── dist/                    # Archivos JS compilados (Lo que usa el navegador)
├── icons/                   # Iconos de la extensión
├── popup.html               # Estructura semántica
├── popup.css                # Estilos
├── manifest.json            # Configuración de la extensión V3
├── package.json             # Dependencias npm
└── tsconfig.json            # Configuración del compilador TS

```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo.

