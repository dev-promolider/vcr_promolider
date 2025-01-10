// Obtener el curso actual
export const course = (state) => state.course;

// Obtener la lección actual
export const lesson = (state) => state.lesson;

// Obtener todas las lecciones del curso
export const allLessons = (state) => state.allLessons;

// Obtener el estado de carga
export const isLoading = (state) => state.isLoading;

// Obtener los recursos de la lección
export const resources = (state) => state.resources;

// Verificar si hay recursos disponibles
export const isResources = (state) => state.isResources;

// Obtener las lecciones completadas
export const completedLessons = (state) => state.completedLessons;

// Obtener la URL del video de la clase
export const urlVideo = (state) => state.urlVideo;

// Obtener el tiempo listo para la reproducción
export const timeReady = (state) => state.timeReady;

// Obtener la información del productor
export const getProductor = (state) => state.productor;

// Obtener todos los comentarios de la clase
export const getComments = (state) => state.allComments;

// Obtener todos los comentarios dinámicos
export const getDynamicComments = (state) => state.allDynamicComments;

// Obtener la calificación de la clase
export const getRating = (state) => state.allRating.rates;

// Obtener la calificación del curso
export const getCourseRating = (state) => state.courseRating;

// Obtener el curso activo
export const getCourseActive = (state) => state.course_active;

// Obtener los datos del examen
export const getDataEx = (state) => state.dataEx;

// Obtener la lista de jugadores del ranking (excluyendo los primeros tres)
export const getListLeaderBoard = (state) =>
  state.leaderBoard.slice(3, state.leaderBoard.length);

// Obtener el primer lugar del ranking
export const getFirstPlaceLeaderBoard = (state) =>
  state.leaderBoard.slice(0, 1)[0] || {
    name: "noName",
    photo: require("@/assets/perfil-del-usuario.png"),
  };

// Obtener el segundo lugar del ranking
export const getSecondPlaceLeaderBoard = (state) =>
  state.leaderBoard.slice(1, 2)[0] || {
    name: "noName",
    photo: require("@/assets/perfil-del-usuario.png"),
  };

// Obtener el tercer lugar del ranking
export const getThirdPlaceLeaderBoard = (state) =>
  state.leaderBoard.slice(2, 3)[0] || {
    name: "noName",
    photo: require("@/assets/perfil-del-usuario.png"),
  };
