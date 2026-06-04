# Guía Básica de Clases de Tailwind CSS para React

En proyectos de React modernos, el estilo suele definirse utilizando **Tailwind CSS**. A diferencia de CSS tradicional, Tailwind nos provee "clases utilitarias" que aplicamos directamente dentro del atributo `className` de nuestras etiquetas (por ejemplo: `<input className="p-4 bg-gray-100" />`).

A continuación, se agrupan las utilidades principales que más vas a utilizar al diagramar tus componentes, especialmente formularios:

---

## 1. Espaciado (Margin y Padding)
El sistema de espaciado se basa en proporciones (generalmente 1 unidad = 0.25rem = 4px).

* **Padding (Relleno interno, con la letra `p`):**
  * `p-4`: Padding parejo en los 4 lados (16px).
  * `px-4`: Padding en el eje X (izquierda y derecha).
  * `py-2`: Padding en el eje Y (arriba y abajo).
  * *Específicos:* `pt-2` (top), `pr-5` (right), `pb-2` (bottom), `pl-2` (left). *(ej: `pr-5` = padding-right de 20px).*

* **Margin (Margen externo, con la letra `m`):**
  * `m-4`: Margen en todos los lados.
  * `mx-auto`: Centra un elemento contenedor horizontalmente.
  * *Específicos:* `mt-4` (top), `mr-2` (right), `mb-4` (bottom), `ml-2` (left). *(ej: `mr-2` = margin-right de 8px).*

---

## 2. Tipografía (Textos)
* **Tamaño:** `text-xs`, `text-sm`, `text-base` (por defecto), `text-lg`, `text-xl`, `text-2xl`.
* **Grosor (Peso visual):** `font-normal`, `font-medium`, `font-semibold`, `font-bold` (negrita).
* **Alineación:** `text-left`, `text-center`, `text-right`.
* **Color:** `text-gray-700`, `text-red-500`, `text-white`, `text-blue-600` (el número define qué tan oscuro es).

---

## 3. Tamaños (Alto y Ancho)
* **Ancho (Width - `w`):**
  * `w-full`: Ocupa el 100% del contenedor padre (fundamental para los inputs text).
  * `w-1/2`: Ocupa el 50%.
  * `w-64`: Ancho fijo (aprox. 256px).
  * `w-fit`: Ajusta el ancho para que calce *exactamente* con su contenido interno, en lugar de ocupar toda la pantalla.
* **Ancho Máximo (Max-Width - `max-w`):** *(¡La regla de oro para formularios y lectura corporativa!)*
  * `max-w-2xl` (672px), `max-w-3xl` (768px), `max-w-4xl` (896px).
  * En vez de fijar un ancho o ser porcentaje infinito, establece un tope absoluto. En celulares el formulario será flexible de lado a lado, pero en monitores de PC *frenará* su estiramiento al cruzar esa barrera. *Tip: siempre combinarlos en conjunto con la regla `mx-auto` descrita más arriba para que este tope quede centrado al medio del monitor.*
* **Alto (Height - `h`):**
  * `h-10`: Alto fijo de barra u opción.
  * `h-full`: Ocupa el 100% del alto de su contenedor.

---

## 4. Bordes y Redondeo (Esencial para Inputs)
* **Grosor del Borde:** 
  * `border`: Borde de 1px a la vuelta.
  * `border-0`: Sin borde.
  * `border-b`: Borde solo abajo (bottom).
* **Color del Borde:** `border-gray-300`, `border-blue-500`.
* **Redondeo (Border Radius):**
  * `rounded`: Bordes levemente redondeados.
  * `rounded-md`: Redondeo medio (clásico estilo moderno de botones e inputs).
  * `rounded-full`: Para hacer avatares redondos o botones circulares.

---

## 5. Fondos (Backgrounds)
* `bg-white`: Fondo blanco puro.
* `bg-gray-50`, `bg-gray-100`: Excelentes para separar el formulario del fondo general.
* `bg-blue-600`: Azul fuerte (común para el botón de "Enviar").
* `bg-transparent`: Vuelve el fondo transparente.

---

## 6. Layout: Flexbox
Para acomodar etiquetas a la par o agruparlas ordenadamente (¡adiós al float viejo!).
* `flex`: Convierte el elemento padre en un "cajón" flexible.
* `flex-col`: Pone los hijos en una columna vertical (uno abajo del otro).
* `justify-between`: Separa los elementos hacia los extremos.
* `items-center`: Centra los hijos verticalmente.
* `gap-4`: 🔥 **Súper útil.** En un contenedor `flex`, crea un espaciado exacto e igual de 16px entre todos sus elementos hijos internamente (mucho mejor que llenarlos de márgenes).

---

## 7. Estados Interactivos (Hover y Focus)
Indispensables para que el usuario sepa qué está seleccionando. Se utilizan con el prefijo más dos puntos (`hover:`, `focus:`):
* `hover:bg-blue-700`: Cambia el color de un botón cuando le pasas el mouse por arriba.
* `focus:outline-none`: (Recomendado en inputs) quita el recuadro negro feo por defecto al hacer clic.
* `focus:border-blue-500`: Al hacer clic (focus) en un input, se le pone el borde azul.
* `focus:ring-2 focus:ring-blue-300`: Añade un aura extra azul, muy típica en formularios altamente accesibles.
* `cursor-pointer`: Cambia la flechita por la "manito" de hacer clic, útil en `<label>` asociados a radio-buttons/checkboxes.

---

## 8. Layout: Grid (Cuadrículas)
La herramienta definitiva junto a Flexbox. Excelente para armar distribuciones de varias columnas exactas (ej: tus checkboxes).
* `grid`: Convierte el elemento en una cuadrícula.
* `grid-cols-2`, `grid-cols-3`: Divide el espacio ordenadamente en 2, 3 o más columnas del mismo ancho.
* `gap-4`: Crea espacios uniformes entre filas y columnas.
* `gap-x-12`: Espacio u "hueco" horizontal específico (es decir, separa a las columnas entre sí).
* `gap-y-4`: Espacio vertical específico (separa a las filas arriba y abajo).
