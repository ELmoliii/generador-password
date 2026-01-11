import { PasswordGenerator } from './passwordGenerator.js';
const displayEl = document.getElementById('passwordDisplay');
const btnCopy = document.getElementById('btnCopy');
const btnGenerate = document.getElementById('btnGenerate');
const lengthRange = document.getElementById('lengthRange');
const lengthValue = document.getElementById('lengthValue');
const cbUppercase = document.getElementById('cbUppercase');
const cbLowercase = document.getElementById('cbLowercase');
const cbNumbers = document.getElementById('cbNumbers');
const cbSymbols = document.getElementById('cbSymbols');
const cbAmbiguous = document.getElementById('cbAmbiguous');
/**
 * Maneja la generación de una nueva contraseña
 * Obtiene las opciones del formulario y genera una contraseña segura
 */
const handleGenerate = () => {
    const options = {
        length: parseInt(lengthRange.value, 10),
        useUppercase: cbUppercase.checked,
        useLowercase: cbLowercase.checked,
        useNumbers: cbNumbers.checked,
        useSymbols: cbSymbols.checked,
        excludeAmbiguous: cbAmbiguous.checked
    };
    try {
        const password = PasswordGenerator.generate(options);
        displayEl.value = password;
    }
    catch (error) {
        displayEl.value = "Error: Selecciona opciones";
        console.error(error);
    }
};
lengthRange.addEventListener('input', () => {
    lengthValue.textContent = lengthRange.value;
});
btnGenerate.addEventListener('click', handleGenerate);
/**
 * Maneja el evento de clic del botón de copiar
 * Copia la contraseña al portapapeles con feedback visual
 * Intenta usar Clipboard API, y si falla, usa el método fallback
 */
btnCopy.addEventListener('click', async () => {
    if (!displayEl.value)
        return;
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(displayEl.value);
            showCopyFeedback();
        }
        else {
            copyToClipboardFallback(displayEl.value);
            showCopyFeedback();
        }
    }
    catch (error) {
        console.error('Error al copiar:', error);
        try {
            copyToClipboardFallback(displayEl.value);
            showCopyFeedback();
        }
        catch (fallbackError) {
            displayEl.value = "Error al copiar";
            setTimeout(() => {
                displayEl.value = PasswordGenerator.generate({
                    length: parseInt(lengthRange.value, 10),
                    useUppercase: cbUppercase.checked,
                    useLowercase: cbLowercase.checked,
                    useNumbers: cbNumbers.checked,
                    useSymbols: cbSymbols.checked,
                    excludeAmbiguous: cbAmbiguous.checked
                });
            }, 1000);
        }
    }
});
// Función para copiar usando método antiguo
/**
 * Copia texto al portapapeles usando el método legado (document.execCommand)
 * Utilizado como fallback cuando Clipboard API no está disponible
 * @param text - El texto a copiar al portapapeles
 * @throws {Error} Si no se puede copiar al portapapeles
 */
function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (!successful) {
        throw new Error('No se pudo copiar al portapapeles');
    }
}
// Función para mostrar feedback visual
/**
 * Muestra feedback visual al usuario indicando que se copió exitosamente
 * Cambia el texto del botón a ✅ por 1.5 segundos
 */
function showCopyFeedback() {
    const originalText = btnCopy.textContent;
    btnCopy.textContent = '✅';
    setTimeout(() => {
        btnCopy.textContent = originalText;
    }, 1500);
}
/** Genera una contraseña automáticamente al cargar la página */
handleGenerate();
//# sourceMappingURL=popup.js.map