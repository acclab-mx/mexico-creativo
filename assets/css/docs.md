# Documentación de hojas de estilos

Se usa una estructura similar a atomic-design, en la que se construye el sistema de estilos en capas

Primero se generan los "Design Tokens", que son las constantes de diseño (valores de tamaño, color, espaciado, etc).
En este caso los design tokens son definidos usando variables CSS para facilitar su modificación en el navegador vía JS (por ejemplo para aplicar themes).

Se usan las características de SCSS y VueJS para hacer más modular el sistema, aprovechando el principio DRY (Don't Repeat Yourself).
Principalmente se hace uso de composición de clases usando @extend, reutilización de código con @mixin, por parte de CSS, y usando scoped styles" en los componentes con VueJS.

Los scoped styles son estilos que solo existen dentro del componente, de modo que se encapsulan al scope del mismo.

Ejemplo de uso de extend para composición de clases

```css
/* Entrada SCSS */
%bordered {
	border: 1px solid red;
}

%colored {
	color: white;
	background-color: black;
}

body {
	@extend %bordered;
	@extend %colored;
	/* Más propiedades CSS */
}

/* Salida CSS */
body {
	boder: 1px solid red;
	color: white;
	background-color: black;
	/* Más propiedades CSS */
}
```

Ejemplo de componente con estilos scoped

```html
<template>
	<!-- Template del componente -->
	<div id="app"></div>
</template>

<script>
// Código JS del componente
export default {}
</script>

<style lang="scss" scoped>
/* Cualquier contenido en sintaxis válida de SCSS */
</style>
```
