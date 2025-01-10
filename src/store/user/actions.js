import axios from "axios";
import router from "../../router";

export const actionUser = async (context, body) => {
  try {
    const res = await axios.post("auth/login", body);

    // Verificar si res y res.data existen
    if (res && res.data) {
      const userData = res.data.data.user;
      const authToken = res.data.data.access_token;

      // Guardar en localStorage
      localStorage.setItem("rol_user", userData.roles[0].id);
      localStorage.setItem("id_user", userData.id);
      localStorage.setItem("access_token", authToken);
      localStorage.setItem("status_preference", userData.status_preference);
      localStorage.setItem("name_user", userData.name);
      localStorage.setItem("last_name_user", userData.last_name);
      localStorage.setItem("photo_user", userData.photo);
      localStorage.setItem("date_birth_user", userData.date_birth);
      localStorage.setItem("email_user", userData.email);
      localStorage.setItem("country_user", userData.id_country);
      localStorage.setItem("biography_user", userData.biography);
      localStorage.setItem("city", userData.city);
      localStorage.setItem("id_account_type", userData.id_account_type);

      router.push("/home");
    } else {
      // Manejar caso donde la respuesta no tiene los datos esperados
      context.commit("SET_STATUS_REQUEST_LOGIN", 400);
      console.error("Respuesta inválida del servidor");
    }
  } catch (error) {
    // Manejar cualquier error de red o de servidor
    console.error("Error en el inicio de sesión:", error);

    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      context.commit("SET_STATUS_REQUEST_LOGIN", error.response.status);

      // Loguea el error completo para debug
      console.error("Detalles del error:", error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor");
      context.commit("SET_STATUS_REQUEST_LOGIN", 500);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error("Error al configurar la solicitud:", error.message);
      context.commit("SET_STATUS_REQUEST_LOGIN", 500);
    }
  }
};
