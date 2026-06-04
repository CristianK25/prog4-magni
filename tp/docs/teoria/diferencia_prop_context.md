# Props vs Context: ¿Cuál usar y cuándo?

Una de las dudas más comunes al avanzar en React es entender cuándo se deben seguir usando las **Props** y cuándo es el momento adecuado para implementar el **Context API**.

Aunque `useContext` parece una solución mágica para no tener que pasar datos de un componente a otro, abusar de él trae problemas arquitectónicos y de rendimiento. A continuación, analizamos ambos enfoques a detalle.

---

## 1. Props (Propiedades)

Las props son el mecanismo fundamental de React para pasar datos de un componente **Padre** a un componente **Hijo**.

### Ventajas de usar Props:

*   **Alta Reutilización:** Es la mayor ventaja. Un componente que recibe toda su información por props (conocido como componente "Tonto" o *Dumb Component*) es 100% independiente. Puedes llevarte un `<Boton texto="Click" />` a cualquier otro proyecto y funcionará sin problemas.
*   **Flujo de datos explícito:** Al mirar el código, es muy fácil rastrear de dónde viene un dato. Simplemente sigues el rastro hacia arriba (Padre → Hijo).
*   **Mejor Rendimiento:** React está altamente optimizado para el paso de props. Si un padre actualiza una prop, solo los hijos que dependan de ella se verán afectados.

### Desventaja principal:

*   **Prop Drilling:** Si tienes que pasar un dato desde el componente `A` hasta el componente `E` (`A → B → C → D → E`), los componentes `B`, `C` y `D` tendrán que recibir la prop y pasarla hacia abajo aunque ellos mismos no la necesiten. Esto ensucia el código.

---

## 2. Context API (`useContext`)

Context permite crear un "estado global" al que cualquier componente puede suscribirse y acceder directamente, sin importar qué tan profundo esté en el árbol, saltándose a los componentes intermedios.

### Ventajas de usar Context:

*   **Elimina el Prop Drilling:** Resuelve el problema mencionado arriba. Si el componente `E` necesita un dato de `A`, simplemente consume el Contexto y listo. `B`, `C` y `D` se mantienen limpios.
*   **Ideal para Estado Global:** Es perfecto para información que toda la aplicación necesita saber en cualquier momento (ej: Tema Oscuro/Claro, Datos de sesión del Usuario, Idioma seleccionado).

### Desventajas principales:

*   **Acoplamiento (Pérdida de Reutilización):** Si un componente consume un Contexto, queda "atado" a él. Ya no puedes simplemente copiar el componente a otro proyecto a menos que también copies la configuración de ese Contexto.
*   **Problemas de Rendimiento (Re-renders):** Cuando el valor de un `Provider` cambia, **TODOS** los componentes que consumen ese Contexto se vuelven a renderizar automáticamente. Si usas Context para guardar datos que cambian constantemente (como lo que el usuario tipea en un input), forzarás re-renderizados innecesarios en toda la aplicación.

---

## Resumen Comparativo

| Característica | Props | Context API |
| :--- | :--- | :--- |
| **Flujo de datos** | Explícito (Paso a paso, Padre a Hijo) | Implícito (Teletransportación) |
| **Reutilización del componente** | Muy Alta (Componentes independientes) | Baja (Atados al contexto global) |
| **Alcance ideal** | Estado Local y configuraciones de UI | Estado Global y configuraciones de la App |
| **Impacto en Rendimiento** | Bajo/Controlable | Alto si cambia muy frecuentemente |
| **Problema que sufre** | Prop Drilling (Código verboso) | Re-renders innecesarios (Si se usa mal) |

---

## Regla de Oro: ¿Cuándo usar cuál?

1.  **Empieza siempre con Props:** Por defecto, construye tu aplicación pasando datos y funciones hacia abajo mediante props. Esto mantendrá tus componentes puros, predecibles y reutilizables.
2.  **Usa Context solo cuando duela:** Si te encuentras pasando la misma prop por 3 o más niveles de componentes intermedios que no hacen nada con ella más que enviarla al siguiente nivel, es momento de plantearse si esa información debería vivir en un Contexto.
3.  **No metas todo en un solo Contexto:** Si decides usar Context, no crees un `AppContext` gigante. Separa los contextos por dominio: un `AuthContext` (para el usuario), un `ThemeContext` (para colores), y en el caso del TP4, un `ParticipantesContext` (para la gestión de esa entidad específica). Así, cuando cambie el tema oscuro, no harás que se re-renderice la lista de participantes.
