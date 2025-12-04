# 🔐 GUÍA PARA ACTIVAR INICIO DE SESIÓN CON GOOGLE

Para que el botón de "Conectar con Google" funcione, necesitas obtener un **Client ID** gratuito de Google.

---

## 🚀 PASO 1: Crear Proyecto en Google Cloud

1. Ve a la **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Inicia sesión con tu cuenta de Google.
3. Arriba a la izquierda, haz clic en el selector de proyectos y selecciona **"Nuevo Proyecto"**.
4. Ponle un nombre (ej: `Velocity Game`) y dale a **Crear**.

## 🔑 PASO 2: Configurar Pantalla de Consentimiento

1. En el menú lateral, ve a **APIs y servicios** > **Pantalla de consentimiento de OAuth**.
2. Selecciona **Externo** y dale a **Crear**.
3. Rellena los datos básicos:
   - **Nombre de la App:** Velocity Typing Game
   - **Correo de soporte:** Tu correo
   - **Logotipo:** (Opcional)
4. Dale a **Guardar y Continuar** hasta terminar.

## 🆔 PASO 3: Crear Credenciales (Client ID)

1. En el menú lateral, ve a **Credenciales**.
2. Haz clic en **+ CREAR CREDENCIALES** > **ID de cliente de OAuth**.
3. En "Tipo de aplicación", selecciona **Aplicación web**.
4. En **Orígenes de JavaScript autorizados**, añade tu dominio:
   - `https://tudominio.com`
   - `http://localhost` (para pruebas locales)
5. Dale a **Crear**.
6. **¡COPIA TU CLIENT ID!** (Será algo como `123456789-abcdefg.apps.googleusercontent.com`).

## ⚙️ PASO 4: Poner el ID en tu Juego

1. Abre el archivo `profile.html`.
2. Busca esta línea (cerca de la línea 180):
   ```html
   data-client_id="TU_CLIENT_ID_DE_GOOGLE_AQUI"
   ```
3. Reemplaza `TU_CLIENT_ID_DE_GOOGLE_AQUI` con el código que copiaste.
4. Guarda el archivo.

---

## 🧪 PASO 5: Probar

1. Sube los archivos a tu hosting.
2. Ve a tu perfil en el juego.
3. Haz clic en el botón de Google.
4. Si todo sale bien, verás "✅ Conectado" y tu foto de perfil.

---

## ⚠️ NOTAS IMPORTANTES

- **HTTPS:** El inicio de sesión con Google **SOLO funciona en sitios con HTTPS** (candadito verde). Si tu dominio no tiene SSL, no funcionará.
- **Facebook:** Para Facebook el proceso es similar en [developers.facebook.com](https://developers.facebook.com), pero requiere verificación de negocio para algunas funciones, por eso Google es más fácil para empezar.
