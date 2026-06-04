# Etiquetas JSX Mínimas para el Formulario (React)

A continuación se detallan las etiquetas mínimas necesarias para cada uno de los campos solicitados, adaptadas a la sintaxis JSX de React (usando `htmlFor` en lugar de `for` e incluyendo el cierre automático en las etiquetas `input`):

### 1. Nombre (input text)
```tsx
<label htmlFor="nombre">Nombre:</label>
<input type="text" id="nombre" name="nombre" />
```

### 2. Email (input email)
```tsx
<label htmlFor="email">Email:</label>
<input type="email" id="email" name="email" />
```

### 3. Edad (input number)
```tsx
<label htmlFor="edad">Edad:</label>
<input type="number" id="edad" name="edad" />
```

### 4. País (select)
```tsx
<label htmlFor="pais">País:</label>
<select id="pais" name="pais">
    <option value="ar">Argentina</option>
    <option value="br">Brasil</option>
    {/* ... otras opciones ... */}
</select>
```

### 5. Modalidad de asistencia (radio button)
```tsx
<p>Modalidad de asistencia:</p>
<input type="radio" id="presencial" name="modalidad" value="presencial" />
<label htmlFor="presencial">Presencial</label>

<input type="radio" id="virtual" name="modalidad" value="virtual" />
<label htmlFor="virtual">Virtual</label>
```

### 6. Tecnologías conocidas (checkbox)
```tsx
<p>Tecnologías conocidas:</p>
<input type="checkbox" id="tech_react" name="tecnologias" value="react" />
<label htmlFor="tech_react">React</label>

<input type="checkbox" id="tech_tailwind" name="tecnologias" value="tailwind" />
<label htmlFor="tech_tailwind">Tailwind CSS</label>

<input type="checkbox" id="tech_node" name="tecnologias" value="node" />
<label htmlFor="tech_node">Node.js</label>
```

### 7. Nivel de experiencia (select)
```tsx
<label htmlFor="experiencia">Nivel de experiencia:</label>
<select id="experiencia" name="experiencia">
    <option value="junior">Junior</option>
    <option value="ssr">Semi Senior</option>
    <option value="senior">Senior</option>
</select>
```

### 8. Acepta términos (checkbox)
```tsx
<input type="checkbox" id="terminos" name="terminos" />
<label htmlFor="terminos">Acepto los términos y condiciones</label>
```
