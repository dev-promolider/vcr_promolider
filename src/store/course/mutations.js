import Vue from "vue";

export const SET_LOADING = (state, value) => {
  state.isLoading = value;
};

export const SET_COURSE = (state, course) => {
  state.course = course;

  // Calculamos el número total de lecciones para obtener el progreso
  for (let i = 0; i < state.course.modules.length; i++) {
    state.allLessons += state.course.modules[i].lessons.length;
  }

  state.isLoading = false;
};

export const SET_COURSE_ACTIVE = (state, course) => {
  state.course_active = course;
};

export const SET_COURSE_PROGRESS = (state, { courseId, progress }) => {
  Vue.set(state.courseProgress, courseId, progress);
};

export const listId_NameClass = (state, course) => {
  // Generamos un array con todas las clases para navegación
  for (let i = 0; i < course.modules.length; i++) {
    for (let j = 0; j < course.modules[i].lessons.length; j++) {
      state.allLessonsId.push(course.modules[i].lessons[j]);
    }
  }
};

export const SET_LESSON = (state, lesson) => {
  state.renderVideo = false;
  state.lesson = lesson;
};

export const SET_RESOURCES = (state, resources) => {
  state.resources = resources;

  // Verificamos si hay recursos para mostrar
  state.isResources = resources.length !== 0;
};

export const SET_COMPLETED_LESSONS = (state, lessons) => {
  state.completedLessons = lessons;
  // Mantener backup local pero con identificador por curso
  const courseId = state.course?.id || 'default';
  localStorage.setItem(`completedLessons_${courseId}`, JSON.stringify(lessons));
};

export const ADD_COMPLETED_LESSON = (state, lessonId) => {
  if (!state.completedLessons.includes(lessonId)) {
    state.completedLessons.push(lessonId);
    
    // Backup local con identificador de curso
    const courseId = state.course?.id || 'default';
    localStorage.setItem(`completedLessons_${courseId}`, JSON.stringify(state.completedLessons));
  }
};

export const SET_VIDEO = (state, url) => {
  state.urlVideo = url;
  state.renderVideo = true;
};

export const UPDATE_TIME = (state, time) => {
  state.timeReady = time;
};

export const SET_PRODUCTOR = (state, productor) => {
  state.productor = productor;
};

export const UPDATE_PROGRESS_COURSE = (state, progressValue) => {
  state.progressCourseSelect = progressValue;
  
  // Backup local con identificador de curso
  const courseId = state.course?.id || 'default';
  localStorage.setItem(`progressCourse_${courseId}`, progressValue);
};

export const DESTROY_PROGRESS_COURSE = (state) => {
  state.progressCourseSelect = 0;
};

export const GET_PROGRESS = (state, payload = true) => {
  state.courseSelect = payload;
};

export const DESTROY_PROGRESS = (state) => {
  // Limpiamos ciertos estados para evitar conflictos con otros cursos
  state.courseSelect = false;
  state.allComments = [];
  state.allRating = [];
  state.lesson = [];
  state.allLessonsId = [];
  state.allLessons = 0;
  state.courseRating = 0;
};

export const CLEAR_VIDEO = (state) => {
  // Limpiamos los datos del video
  state.renderVideo = false;
  state.urlVideo = null;
};

export const GET_COMMENTS = (state, allComments) => {
  if (allComments.data === "No hay comentarios") {
    state.isLoadingComments = false;
    state.allComments = [];
  } else {
    state.allComments = allComments;
    state.isLoadingComments = false;
  }
};

export const GET_DYNAMIC_COMMENTS = (state, allDynamicComments) => {
  if (allDynamicComments.data === "No hay comentarios") {
    state.isLoadingDynamicComments = false;
    state.allDynamicComments = [];
  } else {
    state.allDynamicComments = allDynamicComments;
    state.isLoadingDynamicComments = false;
  }
};

export const GET_RATING = (state, allRating) => {
  Vue.set(state, "allRating", allRating);
  state.isLoadingRating = false;
};

export const GET_COURSE_RATING = (state, courseRating) => {
  state.courseRating = courseRating;
};

export const DATA_EX = (state, dataEx) => {
  if (!dataEx) return;
  state.dataEx = dataEx;
};

export const setModuleExam = (state, payload) => {
  state.moduleExamen = payload;
};

export const COURSE_HOVER = (state, courseHover) => {
  state.courseHover = courseHover;
};

export const NO_EXAM_DAILY = (state, examDaily) => {
  state.examDaily = examDaily;
};

export const setPoints = (state, points) => {
  state.points = points;
};

export const sumPoints = (state, points) => {
  state.sumPoints = points;
  state.points += points;
};

export const topDynamicData = (state, data) => {
  state.topDynamicData = data;
};

export const setComments = (state, comments) => {
  state.allComments = [...state.allComments, comments];
};

export const setDynamicComments = (state, dynamicComments) => {
  state.allDynamicComments.unshift(dynamicComments);
};

export const setRating = (state, newRating) => {
  state.allRating = [...state.allRating, newRating];
};

export const setCourseRating = (state, courseRating) => {
  state.courseRating = [...state.courseRating, courseRating];
};

export const setDataDinamic = (state, data) => {
  state.dinamicClass = data;
};

export const setActiveDinamicModule = (state, data) => {
  state.moduleDinamic = data;
};

export const setGameData = (state, data) => {
  state.gameData = data;
};

export const getLeaderBoard = (state, data) => {
  state.leaderBoard = data;
};
