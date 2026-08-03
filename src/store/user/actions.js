import axios from "axios";
import router from "../../router";
import { authSet } from "../../helpers/authStorage";

export const actionUser = async (context, body) => {
  try {
    const res = await axios.post("auth/login", body);

    // Verificar si res y res.data existen
    if (res && res.data) {
      const userData = res.data.data.user;
      const authToken = res.data.data.access_token;

      // Obtener rol con fallback seguro
      const roleId =
        (userData?.roles && userData.roles[0]?.id) ||
        (userData?.roles && userData.roles[0]) ||
        (res.data?.data?.role && res.data.data.role[0]?.id) ||
        (res.data?.data?.role && res.data.data.role[0]) ||
        userData?.id_account_type ||
        "";

      // Guardar datos sensibles en sessionStorage (no en localStorage)
      authSet("rol_user", roleId);
      authSet("id_user", userData.id);
      authSet("access_token", authToken);
      authSet("status_preference", userData.status_preference);
      authSet("name_user", userData.name);
      authSet("last_name_user", userData.last_name);
      authSet("photo_user", userData.photo);
      authSet("date_birth_user", userData.date_birth);
      authSet("email_user", userData.email);
      authSet("country_user", userData.id_country);
      authSet("biography_user", userData.biography);
      authSet("city", userData.city);
      authSet("id_account_type", userData.id_account_type);

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
