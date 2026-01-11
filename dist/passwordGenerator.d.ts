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
export declare class PasswordGenerator {
    private static readonly UPPER;
    private static readonly LOWER;
    private static readonly NUMBERS;
    private static readonly SYMBOLS;
    private static readonly AMBIGUOUS;
    /**
     * Genera un número aleatorio seguro en el rango [0, max)
     * @param max - El límite superior (exclusivo) del rango
     * @returns Un número aleatorio seguro entre 0 y max-1
     */
    private static getSecureRandomInt;
    /**
     * Filtra un conjunto de caracteres excluyendo ambiguos si es necesario
     * @param charSet - El conjunto de caracteres a filtrar
     * @param exclude - Si true, elimina caracteres ambiguos del conjunto
     * @returns El conjunto de caracteres filtrado
     */
    private static filterSet;
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
    static generate(options: PasswordOptions): string;
}
//# sourceMappingURL=passwordGenerator.d.ts.map