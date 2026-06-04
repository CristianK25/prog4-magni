/**
 * Modelo de Usuario.
 * 
 * En TypeScript, es una excelente práctica tener una carpeta 'models' o 'types'
 * donde definamos las "formas" (Interfaces o Types) de los objetos de negocio.
 * Esto ayuda a mantener el código ordenado y evitar re-declarar interfaces
 * a lo largo de la aplicación.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  /**
   * Las propiedades con el símbolo '?' son opcionales.
   * Significa que un objeto User podría no tener un avatar definido.
   */
  avatarUrl?: string; 
}
