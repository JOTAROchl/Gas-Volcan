# Gas El Volcán

## Descripción del proyecto

Gas El Volcán es una aplicación web desarrollada para una distribuidora de gas licuado. El sistema permite a los clientes consultar productos, revisar novedades, seleccionar artículos y simular una compra con despacho a domicilio.

El proyecto busca mejorar la forma en que se gestionan los pedidos y la información de los productos, entregando una experiencia más ordenada, rápida y accesible para los clientes y administradores.

## Problemática

Actualmente, parte del proceso de atención y registro de pedidos se realiza mediante llamadas telefónicas y anotaciones manuales en cuadernos o papeles. Esta situación puede provocar:

- Pérdida o confusión de información.
- Demoras en la atención de los clientes.
- Dificultad para consultar productos y precios.
- Errores al registrar pedidos.
- Falta de control sobre el stock.
- Poca visibilidad de las novedades y promociones.
- Dificultad para administrar usuarios y productos.

## Solución propuesta

Gas El Volcán propone una plataforma web que centraliza la información de la empresa y facilita la interacción con los clientes.

La aplicación permite consultar el catálogo de productos, revisar sus detalles, agregarlos a una selección, simular una compra y enviar consultas mediante un formulario de contacto. Además, cuenta con una sección administrativa para gestionar productos y usuarios.

## Objetivos

### Objetivo general

Desarrollar una aplicación web que facilite la consulta, selección y gestión de productos de una distribuidora de gas licuado.

### Objetivos específicos

- Mostrar los productos disponibles junto con sus precios y características.
- Permitir a los clientes seleccionar productos para una compra simulada.
- Entregar información sobre el uso y almacenamiento seguro del gas.
- Incorporar un formulario de contacto para consultas.
- Permitir el registro e inicio de sesión de usuarios.
- Implementar una sección administrativa para gestionar productos y usuarios.
- Mejorar la organización de la información de la empresa.

## Usuarios del sistema

### Cliente

El cliente puede:

- Revisar el catálogo de productos.
- Consultar el detalle de cada producto.
- Agregar productos a su selección.
- Revisar el subtotal de su compra.
- Simular una compra con datos de entrega.
- Consultar novedades y recomendaciones.
- Enviar mensajes mediante el formulario de contacto.
- Registrarse e iniciar sesión.

### Administrador

El administrador puede:

- Consultar información general del sistema.
- Crear, editar y eliminar productos.
- Modificar precios, stock, categorías y descripciones.
- Crear, editar y eliminar usuarios.
- Cambiar los roles de los usuarios.

## Funcionalidades principales

- Página de inicio con productos destacados.
- Catálogo de productos.
- Vista detallada de cada producto.
- Selección de productos para compra.
- Cálculo automático del subtotal.
- Persistencia de la selección utilizando `localStorage`.
- Registro de usuarios.
- Inicio de sesión de demostración.
- Validación de correo electrónico y RUN chileno.
- Formulario de contacto.
- Sección de novedades y recomendaciones.
- Información sobre almacenamiento seguro de cilindros.
- Simulación de compra con datos de entrega.
- Selección de regalo para la primera compra.
- Panel administrativo.
- Gestión de productos.
- Gestión de usuarios.
- Diseño adaptable para computadores y dispositivos móviles.

## Productos disponibles

El catálogo contempla distintos productos relacionados con el consumo residencial y comercial de gas, entre ellos:

- Cilindros de gas de 5 kg.
- Cilindros de gas de 11 kg.
- Cilindros de gas de 15 kg.
- Cilindros de gas de 45 kg.
- Reguladores.
- Mangueras.
- Conexiones.
- Otros accesorios relacionados.

## Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript.
- Bootstrap 5.3.8.
- `localStorage`.
- `sessionStorage`.
- Imágenes locales.
- Bootstrap Icons y componentes visuales de Bootstrap.

El proyecto no utiliza backend, base de datos ni un framework frontend.

## Estructura del proyecto

```text
Gas el volcan(Caso C)/
├── css/
│   └── EstiloPaginaGEV.css
├── html/
│   ├── InicioPagina.html
│   ├── Nosotros.html
│   ├── Catalogo.html
│   ├── DetalleProducto.html
│   ├── Seleccion.html
│   ├── Contacto.html
│   ├── Login.html
│   ├── Registro.html
│   ├── Novedades.html
│   ├── NovedadDetalle.html
│   ├── admin.html
│   ├── admin-contenido.html
│   └── admin-usuarios.html
├── img/
│   └── FormatoAdecuado.jpg
└── js/
    └── LogicaPaginaGEV.js
