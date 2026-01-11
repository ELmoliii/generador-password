import { PasswordGenerator, PasswordOptions } from './passwordGenerator.js';

const form = document.getElementById('passwordForm') as HTMLFormElement;
const displayEl = document.getElementById('passwordDisplay') as HTMLInputElement;
const btnCopy = document.getElementById('btnCopy') as HTMLButtonElement;
const lengthRange = document.getElementById('lengthRange') as HTMLInputElement;
const lengthValue = document.getElementById('lengthValue') as HTMLOutputElement;
const cbUppercase = document.getElementById('cbUppercase') as HTMLInputElement;
const cbLowercase = document.getElementById('cbLowercase') as HTMLInputElement;
const cbNumbers = document.getElementById('cbNumbers') as HTMLInputElement;
const cbSymbols = document.getElementById('cbSymbols') as HTMLInputElement;
const cbAmbiguous = document.getElementById('cbAmbiguous') as HTMLInputElement;


const options: PasswordOptions = {
  length: parseInt(lengthRange.value, 10),
  useUppercase: cbUppercase.checked,
  useLowercase: cbLowercase.checked,
  useNumbers: cbNumbers.checked,
  useSymbols: cbSymbols.checked,
  excludeAmbiguous: cbAmbiguous.checked
};

const handleGenerate = (): void => {
  try {
    const password = PasswordGenerator.generate(options);
    displayEl.value = password;
  } catch (error) {
    displayEl.value = "Error: Selecciona opciones";
    console.error(error);
  }
};


lengthRange.addEventListener('input', () => {
  lengthValue.value = lengthRange.value;
});

/**
 * Manejador principal del formulario.
 * Intercepta el evento de envío (submit) para evitar la recarga de la página
 * y generar la contraseña. Esto captura tanto el clic en el botón como la tecla Enter.
 * * @param {Event} e - El evento nativo de envío del formulario.
 * 
 */
form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  handleGenerate();
});

/**
 * Manejador asíncrono para el botón de copiar.
 * Intenta usar la Clipboard API moderna, y si falla, recurre a un método fallback (execCommand).
 * Proporciona feedback visual al usuario en ambos casos.
 */
btnCopy.addEventListener('click', async () => {
  if (!displayEl.value) return;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(displayEl.value);
      showCopyFeedback();
    } else {
      throw new Error('Clipboard API no disponible');
    }
  } catch (error) {
    console.warn('Clipboard API falló, intentando fallback...', error);
    try {
      copyToClipboardFallback(displayEl.value);
      showCopyFeedback();
    } catch (fallbackError) {
      console.error('Falló la copia al portapapeles', fallbackError);
      const originalVal = displayEl.value;
      displayEl.value = "Error al copiar";
      setTimeout(() => {
        displayEl.value = originalVal;
      }, 1000);
    }
  }
});

function texArea(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  return textArea;
}

/**
 * Método de respaldo (fallback) para copiar texto al portapapeles.
 * Crea un elemento textarea invisible, lo selecciona y ejecuta el comando 'copy'.
 * Útil para navegadores antiguos o contextos donde la API Clipboard no funciona.
 * * @param {string} text - El texto que se desea copiar.
 * @throws {Error} Lanza un error si el comando 'execCommand' falla.
 */
function copyToClipboardFallback(text: string): void {
  const textArea = texArea(text);

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const successful = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!successful) {
    throw new Error('No se pudo copiar al portapapeles mediante execCommand');
  }
}

function showCopyFeedback(): void {
  const originalText = btnCopy.textContent;
  btnCopy.textContent = '✅';

  setTimeout(() => {
    btnCopy.textContent = originalText;
  }, 3000);
}

handleGenerate();