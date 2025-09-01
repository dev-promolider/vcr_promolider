import axios from "axios";
import moment from "moment";

// Obtener detalles del curso activo
export const getCourseActive = async (context, id) => {
  try {
    const res = await axios.get("course/details/" + id);
    const { data } = res.data;
    context.commit("SET_COURSE_ACTIVE", data);
    return { ok: true, data };
  } catch (error) {
    return { ok: false };
  }
};

// Actualizar progreso del curso
export const updateCourseProgress = ({ commit, state }, courseId) => {
  const course = state.course;
  if (!course || !course.modules) {
    console.warn("Course data not loaded yet");
    return;
  }

  const completedLessons = state.completedLessons.filter((lessonId) =>
    course.modules.some(
      (module) =>
        module.lessons &&
        module.lessons.some((lesson) => lesson.id === lessonId)
    )
  );

  const totalLessons = course.modules.reduce(
    (total, module) => total + (module.lessons ? module.lessons.length : 0),
    0
  );

  if (totalLessons === 0) {
    console.warn("No lessons found in the course");
    return;
  }

  const progress = Math.round((completedLessons.length / totalLessons) * 100);
  commit("SET_COURSE_PROGRESS", { courseId, progress });
};

// Inicializar lecciones completadas desde el almacenamiento local
export const initializeCompletedLessons = ({ commit }) => {
  const storedLessons = localStorage.getItem("completedLessons");
  if (storedLessons) {
    commit("SET_COMPLETED_LESSONS", JSON.parse(storedLessons));
  }
};

// Actualizar lección completada
export const updateCompletedLesson = ({ commit }, lessonId) => {
  commit("ADD_COMPLETED_LESSON", lessonId);
};

// Inicializar estado (progreso y lecciones)
export const initializeState = ({ commit }) => {
  // Cargar lecciones completadas
  const savedLessons = localStorage.getItem("completedLessons");
  if (savedLessons) {
    commit("SET_COMPLETED_LESSONS", JSON.parse(savedLessons));
  }

  // Cargar progreso del curso
  const savedProgress = localStorage.getItem("progressCourseSelect");
  if (savedProgress) {
    commit("UPDATE_PROGRESS_COURSE", parseInt(savedProgress));
  }
};

// Actualizar las lecciones completadas y recalcular el progreso
export const updateCompletedLessons = ({ commit, state }, lessonId) => {
  if (!state.completedLessons.includes(lessonId)) {
    const updatedLessons = [...state.completedLessons, lessonId];
    commit("SET_COMPLETED_LESSONS", updatedLessons);
    localStorage.setItem("completedLessons", JSON.stringify(updatedLessons));

    // Recalcular progreso
    const progress = Math.round(
      (updatedLessons.length / state.allLessons) * 100
    );
    commit("UPDATE_PROGRESS_COURSE", Math.min(progress, 100));
  }
};

// Establecer el estado del curso seleccionado
export const courseSelectedStatus = (context, payload) => {
  context.commit("GET_PROGRESS", payload);
};

// Obtener temario del curso
export const getCourse = async (context, id) => {
  await axios.get("course/temary/get-all-class/" + id).then((res) => {
    context.commit("SET_COURSE", res.data.data);
    context.commit("listId_NameClass", res.data.data);
  });
};

// Establecer la clase actual
export const getLesson = (context, less) => {
  context.commit("SET_LESSON", less);
};

// Guardar última clase vista
export const lastSeenLesson = async (_, { course_id, class_id }) => {
  if (!course_id || !class_id) return;
  try {
    await axios.patch(
      `purchased/save-class-seen?course_id=${course_id}&class_id=${class_id}`
    );
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

// Obtener recursos de una clase
export const getResources = async (context, less) => {
  await axios.get(`class-resource/show-resources?name=${less}`).then((res) => {
    context.commit("SET_RESOURCES", res.data);
  });
};

// Obtener video de la clase
export const getVideo = async (context, classId) => {
  await axios.get(`video/stream-video?class_id=${classId}`).then((res) => {
    const data = res.data.data;
    context.commit("SET_VIDEO", data);
  });
};

// Enviar tiempo de reproducción del video
export const getTimeReproduction = (context, time) => {
  context.commit("UPDATE_TIME", time);
};

// Actualizar tiempo de la clase vista
export const updateTime = (_, { course, time, lessonId }) => {
  try {
    axios.patch(
      `purchased/save-class-seen?course_id=${course}&display_time=${time}&class_id=${lessonId}`
    );
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

// Obtener comentarios de la clase
export const getComments = async (context, id) => {
  await axios.get(`comments/show-comments?class_id=${id}`).then((res) => {
    context.commit("GET_COMMENTS", res.data);
  });
};

// Obtener valoración del curso
export const getRating = async (context, id) => {
  await axios.get(`course/rate/show/${id}`).then((res) => {
    context.commit("GET_RATING", res.data);
  });
};

// Obtener valoración del curso
export const getCourseRating = (context, courseRating) => {
  context.commit("GET_COURSE_RATING", courseRating);
};

// Obtener examen de la clase
export const getTest = async (context, data) => {
  await axios
    .post(`course/exam/active`, data)
    .then((res) => {
      context.commit("DATA_EX", res.data);
    })
    .catch((e) => {
      context.commit("DATA_EX", e.response.status);
    });
};

// Obtener examen del módulo
export const getModuleExam = async ({ commit }, payload) => {
  try {
    const resp = await axios.post(`course/exam/module/active`, {
      id_course: payload,
    });

    const { data } = resp;

    commit("setModuleExam", data);
  } catch (error) {
    return { ok: false };
  }
};

// Obtener datos del examen
export const getExam = async (_, data) => {
  const respuesta = await axios.post(`course/exam`, { exam_id: data });
  return respuesta;
};

// Obtener puntos del perfil
export const getPoints = async ({ commit }, id) => {
  try {
    const data = await axios.get(`profile/points/${id}`);
    const { total } = data.data;
    commit("setPoints", total);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

// Enviar comentario
export const setComments = async ({ commit }, comment) => {
  try {
    const { comments } = comment;

    const resp = await axios.post("comments/send-comments", comment);

    if (resp.data.status === 200) {
      const { user_photo, username, created_at } = resp.data.data[0];

      const fecha = moment(created_at).format("DD-MM-YYYY");

      const payload = {
        comments,
        user_photo,
        username,
        fecha,
      };

      commit("setComments", payload);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Enviar comentario dinámico
export const setDynamicComments = async ({ commit }, commentData) => {
  try {
    const { content } = commentData;

    const resp = await axios.post("course/game/comments/create", commentData);
    console.log(resp);
    if (resp.data.status === 200) {
      const { id, user_photo, username, created_at } = resp.data.data[0];

      const payload = {
        id,
        content,
        photo: user_photo,
        username,
        created_at,
      };

      commit("setDynamicComments", payload);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Obtener comentarios dinámicos
export const fetchDynamicComments = async ({ commit }, dynamic_id) => {
  try {
    const resp = await axios.get(`course/game/comments/list/${dynamic_id}`);
    if (resp.data.status === 200) {
      console.log(resp.data.data);

      commit("GET_DYNAMIC_COMMENTS", resp.data.data);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Enviar calificación del curso
export const setRating = async ({ commit }, comment) => {
  try {
    const resp = await axios.post("course/rate/store", comment);
    if (resp.data.status === 200) {
      commit("setRating", comment);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Obtener dinámica activa de clase
export const getActiveDinamicClass = async (
  { commit },
  { game_for, courseId, idClass }
) => {
  try {
    const { data: dataClass } = await axios.get(
      `class/show-class/${courseId}?name=${idClass}`
    );
    const { data: classDynamics } = await axios.post("/course/game/active", {
      game_for,
      id_type: dataClass.id,
    });
    if (!classDynamics) return;
    const dynamics = [...classDynamics];
    commit("setDataDinamic", dynamics);

    return { ok: true, data: dynamics };
  } catch (error) {
    return { ok: false };
  }
};

// Obtener datos de dinámica por ID
export const getDataDinamic = async ({ commit }, id) => {
  try {
    const { data } = await axios.post("/course/game", { game_id: id });
    console.log(data);
    commit("setGameData", data);
    return { ok: true, data };
  } catch (error) {
    return { ok: false };
  }
};

// Enviar respuestas de la dinámica de cartas
export const sendAnswersCards = async (
  { commit },
  {
    tiempo = 0,
    productor_id,
    achieved_points = 0,
    game_type,
    data,
    course_game_id,
  }
) => {
  try {
    const resp = await axios.post("/course/game/add-points", {
      game_type,
      achieved_points,
      productor_id,
      tiempo: tiempo,
      data,
      course_game_id,
    });
    const dynamicTop = await axios.post("course/game/retrieve-dynamic-top", {
      course_game_id: course_game_id,
    });
    commit("topDynamicData", dynamicTop.data);
    commit("sumPoints", resp.data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

// Enviar respuestas del examen
export const sendAnswersExamen = async (
  _,
  { id_exam, answers, course_id, seconds_used }
) => {
  try {
    const resp = await axios.post("course/exam/answers", {
      id_exam,
      answers,
      course_id,
      seconds_used,
    });

    return {
      ok: true,
      resp,
      error: null,
    };
  } catch (error) {
    console.error("Error al enviar respuestas:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Error al enviar las respuestas";

    return {
      ok: false,
      resp: null,
      error: errorMessage,
    };
  }
};

// Enviar respuesta diaria del quiz
export const sendRespDailyQuizz = async ({ commit }, payload) => {
  try {
    const resp = await axios.post("course/exam/daily/points", {
      userAnswer: payload.userAnswer,
      questionId: payload.questionId
    });
    
    const { earned_points, correct } = resp.data;
    
    commit("sumPoints", Number(earned_points));
    
    // Retornar si la respuesta fue correcta para actualizar la UI
    return { ok: true, isCorrect: correct };
  } catch (error) {
    console.error('Error sending daily quiz response:', error);
    return { ok: false, error: error.response?.data?.error || 'Unknown error' };
  }
};

// Enviar mensaje al productor
export const sendMessagePro = async (_, payload) => {
  try {
    await axios.post("/messages/add", payload);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

// Obtener tabla de líderes
export const getLeaderBoard = async ({ commit }) => {
  try {
    const resp = await axios.get("classroom-points/ranking");
    const { data } = resp;
    commit("getLeaderBoard", data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

// Obtener cursos relacionados
export const getCourseRelated = async () => {
  try {
    const data = await axios.get("course/released-courses");
    const { data: datos } = data.data;
    return datos;
  } catch (error) {
    throw new Error(error);
  }
};

// Obtener módulo activo de la dinámica
export const getActiveDinamicModule = async ({ commit }, payload) => {
  try {
    const { data } = await axios.post("/course/game/module/active", {
      id_course: payload,
    });
    console.log(data);
    commit("setActiveDinamicModule", data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
