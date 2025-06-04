# Frontend

Este proyecto corresponde al frontend de una aplicación web desarrollada como parte del trabajo final del curso de **Finanzas e Ingeniería Económica**. La aplicación permite proyectar el flujo de caja de un **bono corporativo** utilizando el **método alemán**, incluyendo configuraciones avanzadas y cálculos financieros clave.

## 📌 Funcionalidades principales

- Autenticación con usuario y contraseña.
- Registro de valoraciones de bonos con todos los datos requeridos.
- Edición y modificación de bonos ya registrados.
- Configuración de:
  - Moneda del bono.
  - Tipo de tasa de interés (efectiva o nominal).
  - Capitalización, en caso de tasa nominal.
- Proyección del flujo de caja usando el **método alemán**.
- Soporte para plazos de gracia **parciales** o **totales**.
- Visualización de resultados clave:
  - Duración.
  - Duración modificada.
  - Convexidad.
  - **TCEA** (Tasa de Coste Efectivo Anual) para el emisor.
  - **TREA** (Tasa de Rendimiento Efectivo Anual) para el inversor.
  - Precio máximo que estaría dispuesto a pagar el mercado por el bono.

## 🛠️ Tecnologías usadas

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuex](https://vuex.vuejs.org/)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) para consumo de API REST

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Finanzas-UPC/frontend.git
   cd frontend
   cd finanzas
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Crea un archivo `.env` con las variables de entorno necesarias:
    ```bash
    VITE_API_URL=http://localhost:8000/api/v1
    ```
   Asegúrate de que la URL coincida con la del backend que estés utilizando.

4. Ejecuta el proyecto:
    ```bash
    npm run dev
    ```

## ✍️ Autores

- Delgado Corrales, Piero Gonzalo (U202210749)
- Gongora Castillejos, Williams Jesus (U20221C186)
- La Torre Soto, Andre Sebastian (U202217772)
- Paredes Puente, Sebastian Roberto (U202217239)
- Salinas Torres, Salvador Antonio (U20221B127)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Para más información, revisa el archivo [LICENSE](LICENSE).