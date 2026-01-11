/**
 * Opciones de configuración para la generación de contraseñas
 */
export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  excludeAmbiguous?: boolean;
}

/**
 * Generador de contraseñas seguras usando criptografía aleatoria
 * @class PasswordGenerator
 * @example
 * const password = PasswordGenerator.generate({
 *   length: 16,
 *   useUppercase: true,
 *   useLowercase: true,
 *   useNumbers: true,
 *   useSymbols: true,
 *   excludeAmbiguous: false
 * });
 */
export class PasswordGenerator {
  private static readonly UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly LOWER = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly NUMBERS = '0123456789';
  private static readonly SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  private static readonly AMBIGUOUS = 'Il1O0';

  /**
   * Genera un número aleatorio seguro en el rango [0, max)
   * @param max - El límite superior (exclusivo) del rango
   * @returns Un número aleatorio seguro entre 0 y max-1
   */
  private static getSecureRandomInt(max: number): number {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  /**
   * Filtra un conjunto de caracteres excluyendo ambiguos si es necesario
   * @param charSet - El conjunto de caracteres a filtrar
   * @param exclude - Si true, elimina caracteres ambiguos del conjunto
   * @returns El conjunto de caracteres filtrado
   */
  private static filterSet(charSet: string, exclude: boolean): string {
    if (!exclude) return charSet;
    return charSet.split('').filter(c => !this.AMBIGUOUS.includes(c)).join('');
  }

  /**
   * Genera una contraseña segura basada en las opciones proporcionadas
   * @param options - Configuración para la generación de la contraseña
   * @returns Una contraseña aleatoria segura
   * @throws {Error} Si no se selecciona al menos una opción de carácter
   * @example
   * try {
   *   const pwd = PasswordGenerator.generate({ length: 20, useUppercase: true, ... });
   *   console.log(pwd);
   * } catch (e) {
   *   console.error('Error:', e.message);
   * }
   */
  public static generate(options: PasswordOptions): string {
    let charPool = '';
    const { length, excludeAmbiguous } = options;

    if (options.useUppercase) charPool += this.filterSet(this.UPPER, !!excludeAmbiguous);
    if (options.useLowercase) charPool += this.filterSet(this.LOWER, !!excludeAmbiguous);
    if (options.useNumbers) charPool += this.filterSet(this.NUMBERS, !!excludeAmbiguous);
    if (options.useSymbols) charPool += this.filterSet(this.SYMBOLS, !!excludeAmbiguous);

    if (charPool.length === 0) {
      throw new Error('Selecciona al menos una opción.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = this.getSecureRandomInt(charPool.length);
      password += charPool[randomIndex];
    }
    return password;
  }
}