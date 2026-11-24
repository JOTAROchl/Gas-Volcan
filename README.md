# Gas El Volcán — Frontend

Interfaz web para consultar el catálogo de Gas El Volcán, crear cuentas de
cliente e iniciar sesión. El frontend consume el backend Spring Boot; no se
conecta directamente a MySQL.

## Requisitos

- Node.js 22.13 o superior.
- MySQL de Laragon iniciado.
- API backend disponible en `http://localhost:8080`.

El backend y sus instrucciones están en el
[repositorio de la API](https://github.com/JOTAROchl/Gas-el-volcan-API).

## Ejecución local

1. Inicia MySQL desde Laragon.
2. Configura y ejecuta el backend siguiendo su README. La API debe quedar
   disponible en `http://localhost:8080`.
3. Desde esta carpeta, instala dependencias e inicia Vite:

   ```powershell
   npm ci
   npm run dev
   ```

En desarrollo, Vite reenvía las solicitudes `/api` a
`http://localhost:8080`. Para utilizar otra API, define
`VITE_API_BASE_URL`, incluyendo el prefijo `/api`, por ejemplo:
`https://api.ejemplo.cl/api`.

## Funciones

- Catálogo y detalle de productos cargados desde la API; búsqueda por nombre,
  código, categoría o descripción.
- Registro de clientes e inicio/cierre de sesión con JWT.
- Panel de administración y CRUD de productos para cuentas administradoras.
- Selección de productos conservada localmente en el navegador.

La selección y el formulario de reserva son referenciales: no se crean pedidos
ni se procesan pagos. El formulario de contacto tampoco envía mensajes al
servidor.

El token se conserva en `sessionStorage` durante la sesión del navegador. La
interfaz cierra la sesión cuando vence el token o una operación protegida recibe
`401`. El registro público crea clientes; el alta de administradores se
gestiona por separado en el backend.

## Validación

```powershell
npm test
npm run lint
npm run build
```

## Documentación

- [Especificación de Requisitos del Software (ERS)](docs/ERS.md)
- [API backend y configuración de seguridad](https://github.com/JOTAROchl/Gas-el-volcan-API)

La configuración local está preparada para evaluación y demostración. Antes de
publicar en producción se deben configurar HTTPS, CORS para los orígenes
permitidos y los secretos del entorno.
