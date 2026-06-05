# Guía: Uso de LocalStorage en React (Para Estudiantes)

Guardar datos en `localStorage` es la forma más fácil de persistir información (como un carrito de compras, un tema oscuro o una sesión) sin tener que armar un backend. Pero, ¿cuál es la mejor forma de hacerlo cuando varios componentes necesitan leer o modificar esos datos?

Aquí vamos desde la forma más "cruda" hasta la "mejor práctica" en React.

---

## 1. La forma más simple ("A lo bruto")

La manera más sencilla y directa de usar localStorage es llamar a la API nativa del navegador directamente dentro de tus funciones.

```javascript
// Para guardar algo (siempre debes convertir objetos a string)
const guardarUsuario = (usuario) => {
  localStorage.setItem('mi_usuario', JSON.stringify(usuario));
};

// Para leer algo (debes volver a convertir de string a objeto)
const leerUsuario = () => {
  const data = localStorage.getItem('mi_usuario');
  return data ? JSON.parse(data) : null;
};
```

> [!WARNING]
> **El problema de "Entrar de una" en cada componente:**
> Si tienes 5 componentes que hacen `localStorage.getItem('mi_usuario')` directamente, React **NO se entera** de cuándo esos datos cambian. Si el Componente A guarda un dato nuevo, el Componente B no se va a re-renderizar para mostrarlo. Vas a tener que recargar la página (F5) para ver los cambios, lo cual arruina la experiencia de React.

---

## 2. Comparación de Estrategias: ¿Directo, Props o Context?

Si varios componentes necesitan acceder al mismo dato del `localStorage`, ¿cuál es la mejor arquitectura?

### Opción A: Directo en cada componente (Mala Práctica ❌)
Cada componente lee y escribe por su cuenta.
- **Por qué no usarlo**: Rompe la reactividad de React. Los componentes se desincronizan entre sí porque no hay un estado (`useState`) que les avise que hubo un cambio.

### Opción B: Leer en el componente Padre y pasar por Props (Aceptable ✅)
Lees el `localStorage` en tu componente principal (ej. `App.tsx` o `HomePage.tsx`), lo guardas en un `useState`, y pasas el estado y la función para modificarlo a los hijos mediante *props*.
- **Por qué usarlo**: Es simple y respeta las reglas de React.
- **Por qué evitarlo si el proyecto crece**: Genera "Prop Drilling". Si un componente "Nieto" necesita el dato, tienes que pasarlo por el Padre y el Hijo solo para que llegue al Nieto.

### Opción C: Usar Context API (La Mejor Práctica 🏆)
Lees el `localStorage` **una sola vez** dentro de un `Provider` (como nuestro `AuthContext`), lo guardas en un `useState` ahí mismo, y cualquier componente que lo necesite lo "absorbe" usando `useContext`.

```javascript
// 1. En tu Context Provider:
const [user, setUser] = useState(() => {
  const guardado = localStorage.getItem('usuario');
  return guardado ? JSON.parse(guardado) : null;
});

// 2. Al hacer login, actualizas el estado Y el localStorage a la vez:
const login = (datos) => {
  setUser(datos); // Esto avisa a React que re-renderice
  localStorage.setItem('usuario', JSON.stringify(datos)); // Esto persiste los datos
};
```

> [!TIP]
> **Por qué Context es la mejor opción:**
> Es la forma más limpia. Mantienes la base de datos (localStorage) sincronizada con la memoria de React (`useState`), y evitas pasar props por todos lados. Cualquier componente llama a `useAuth()` y listo.

---

## 3. El Nivel Pro: El Custom Hook `useLocalStorage`

Si no quieres armar un Contexto completo porque el dato es algo simple (ejemplo: un contador, o guardar el tema 'oscuro'/'claro'), la mejor práctica es hacer un Custom Hook. 

(Es exactamente el archivo `hooks/useLocalStorage.ts` que te armé en la práctica).

Ese hook hace todo el trabajo sucio por detrás:
1. Va al localStorage a buscar el dato.
2. Si lo encuentra, lo pone en un `useState`.
3. Te devuelve la variable y una función para actualizar.
4. Cuando usas esa función para actualizar, el hook modifica el `useState` (para que React se actualice en la pantalla) Y guarda en el `localStorage` al mismo tiempo.

### Conclusión para tu Examen
- **Para un dato global** (Usuario logueado, Carrito de compras, Tema global): Usa un **Context** que internamente maneje el `localStorage`.
- **Para un dato local de una página/componente** (Un borrador de un formulario): Usa el hook **`useLocalStorage`**.
- **NUNCA** hagas `localStorage.getItem()` directamente suelto adentro del HTML (JSX) de tu componente sin pasarlo antes por un estado (`useState`).
