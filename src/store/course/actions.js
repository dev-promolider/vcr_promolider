import axios from "axios";
import moment from "moment";

// Curso Activo
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

export const initializeCompletedLessons = ({ commit }) => {
  const storedLessons = localStorage.getItem("completedLessons");
  if (storedLessons) {
    commit("SET_COMPLETED_LESSONS", JSON.parse(storedLessons));
  }
};

export const updateCompletedLesson = ({ commit }, lessonId) => {
  commit("ADD_COMPLETED_LESSON", lessonId);
};

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

export const updateCompletedLessons = ({ commit, state }, lessonId) => {
  if (!state.completedLessons.includes(lessonId)) {
    const updatedLessons = [...state.completedLessons, lessonId];
    commit("SET_COMPLETED_LESSONS", updatedLessons);
    localStorage.setItem("completedLessons", JSON.stringify(updatedLessons));

    // Recalculate progress here
    const progress = Math.round(
      (updatedLessons.length / state.allLessons) * 100
    );
    commit("UPDATE_PROGRESS_COURSE", Math.min(progress, 100)); // Ensure progress doesn't exceed 100%
  }
};

export const courseSelectedStatus = (context, payload) => {
  context.commit("GET_PROGRESS", payload);
};

// Temario del curso
export const getCourse = async (context, id) => {
  await axios.get("course/temary/get-all-class/" + id).then((res) => {
    context.commit("SET_COURSE", res.data.data);
    context.commit("listId_NameClass", res.data.data);
  });
};

// Clase actual
export const getLesson = (context, less) => {
  context.commit("SET_LESSON", less);
};

// Indicar que clase se esta viendo por ultima vez
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

// Recibimos las clases completadas de un determinado curso
// export const getCompletedLessons = async (context, id) => {
//     await axios.get(`purchased/show?course_id=${id}`).then(
//         (res) => {
//             context.commit("SET_COMPLETED_LESSONS", res.data)
//         }
//     );
// }

// Obtenemos los recursos de una clase
export const getResources = async (context, less) => {
  await axios.get(`class-resource/show-resources?name=${less}`).then((res) => {
    context.commit("SET_RESOURCES", res.data);
  });
};

// Obtenemos el video de la clase
export const getVideo = async (context, classId) => {
  await axios.get(`video/stream-video?class_id=${classId}`).then((res) => {
    const data = res.data.data;
    context.commit("SET_VIDEO", data);
  });
};

// Enviar estado de reproduccion de video de la ultima clase vista
export const getTimeReproduction = (context, time) => {
  context.commit("UPDATE_TIME", time);
};

// Obtenemos los comentarios de una clase
export const getComments = async (context, id) => {
  await axios.get(`comments/show-comments?class_id=${id}`).then((res) => {
    context.commit("GET_COMMENTS", res.data);
  });
};

// Obtenemos la valoracion de un curso
//HAY UN ERROR
export const getRating = async (context, id) => {
  await axios.get(`course/rate/show/${id}`).then((res) => {
    context.commit("GET_RATING", res.data);
  });
};

export const getCourseRating = (context, courseRating) => {
  context.commit("GET_COURSE_RATING", courseRating);
};

// Obtenemos el examen de una clase
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

// Obtenemos el examen del modulo
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

//Obtenemos los datos del exam
export const getExam = async (_, data) => {
  const respuesta = await axios.post(`course/exam`, { exam_id: data });
  return respuesta;
};

//Obtenemos los puntos
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
//Enviamos el comentario
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
//Enviamos el comentario
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

//Enviamos el comentario
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
//Obtemos la dinamica activa
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
    // const {  data:moduleDynamics  } = await axios.post( '/course/game/active', { game_for:'module', id_type: dataClass[0].id_modules } )

    // if( !classDynamics && !moduleDynamics ) return
    // const dynamics=[...classDynamics,...moduleDynamics]
    if (!classDynamics) return;
    const dynamics = [...classDynamics];
    commit("setDataDinamic", dynamics);

    return { ok: true, data: dynamics };
  } catch (error) {
    return { ok: false };
  }
};
//Obtenemos los datos de las dinamicas dependiendo el id
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
//Enviamos las respuestas de la dinamica de cartas
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
  // let segundos = 0;

  // segundos = ( tiempo.minutes * 60 ) + tiempo.seconds

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

//Enviar las respuestas del examen

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
    console.log(resp);
    return { ok: true, resp };
  } catch (error) {
    return { ok: false };
  }
};
// ??? Free course ???
// export const buyCourse = async ( _ , id_course ) => {
//     try {
//           await axios.post('/cart/buy-course', { id_course } )

//           return {ok: true}

//     } catch (error) {

//          return {ok: false}

//     }

// }

export const sendRespDailyQuizz = async ({ commit }, isCorrect) => {
  try {
    const resp = await axios.post("course/exam/daily/points", { isCorrect });

    const { earned_points } = resp.data;

    commit("sumPoints", Number(earned_points));

    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

//Enviar mensage al productor
export const sendMessagePro = async (_, payload) => {
  try {
    await axios.post("/messages/add", payload);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

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

export const getCourseRelated = async () => {
  try {
    const data = await axios.get("course/released-courses");
    const { data: datos } = data.data;
    return datos;
  } catch (error) {
    throw new Error(error);
  }
};
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
