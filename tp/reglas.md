# Guía de Trabajo con Git y Ramas

Este documento sirve como referencia rápida para el flujo de trabajo en este repositorio, asegurando que el código de cada Trabajo Práctico (TP) se mantenga aislado, ordenado y fácil de corregir para la cátedra.

---

## 1. Crear un TP nuevo (Desde cero)
Si el nuevo TP es independiente y no requiere el código del anterior, la rama debe nacer desde `main`.

```bash
# Asegurarse de estar en main y actualizado
git checkout main
git pull origin main

# Crear la nueva rama y posicionarse en ella
git checkout -b tp2
```

## 2. Crear un TP basado en uno anterior (Continuación)
Si el TP nuevo requiere la base de código que ya hiciste en el anterior, la rama nueva debe nacer desde la rama del TP base.

```bash
# Moverse a la rama del TP base (ejemplo: tp1)
git checkout tp1

# Crear la nueva rama a partir de esta
git checkout -b tp2
```
> **Nota:** Ahora la rama `tp2` tiene exactamente el mismo código que `tp1`, permitiendo agregar nuevas funcionalidades sin alterar la entrega anterior.

## 3. Subir los cambios a GitHub
Para registrar el progreso y subirlo al repositorio remoto:

```bash
# 1. Preparar los archivos modificados
git add .

# 2. Crear el commit con un mensaje descriptivo
git commit -m "Implemento validaciones y persistencia en LocalStorage"

# 3. Subir a GitHub (El '-u origin <rama>' va SOLO la primera vez)
git push -u origin tp2

# Para los siguientes envíos en la misma rama, basta con:
git push
```

---

## 🚫 Lo que NO se debe hacer (Best Practices)

Para mantener la integridad del repositorio y evitar conflictos:

* **No programar en `main`:** Esta rama queda reservada para configuraciones globales o versiones finales. Todo el desarrollo de la materia debe realizarse en su respectiva rama `tpX`.
* **No subir dependencias:** Jamás incluir la carpeta `node_modules/`. El archivo `.gitignore` debe estar correctamente configurado desde el inicio.
* **No hacer commits masivos:** Es preferible realizar commits pequeños por cada funcionalidad terminada (ej: *"Defino interfaces de TypeScript"*, *"Agrego estilos con Tailwind"*). Esto facilita el seguimiento y la corrección.
* **No borrar ramas de entregas pasadas:** Las ramas actúan como el historial de entregas oficial. Deben permanecer activas en el repositorio para su evaluación.
* **No forzar pushes (`git push --force`):** Salvo casos excepcionales, nunca forzar la subida, ya que puede sobrescribir el historial de commits y causar pérdida de datos.
