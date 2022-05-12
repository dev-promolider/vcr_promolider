import axios from "axios";

// Curso Activo
export const getCourseActive = async (context, id) => {
    await axios.get('course/details/' + id).then(
        (res) => {
            context.commit("SET_COURSE_ACTIVE", res.data.data)
        }
    ) 
}

// Temario del curso
export const getCourse = async (context, id) => {
    await axios.get('course/temary/get-all-class/' + id).then(
        (res) => {
            context.commit("SET_COURSE", res.data.data)
            context.commit("listId_NameClass", res.data.data)
        }
    )
}

// Clase actual
export const getLesson = (context, less) => {
    context.commit("SET_LESSON", less)
}

// Indicar que clase se esta viendo por ultima vez
export const lastSeenLesson = async (context,data)=>{
    await axios.patch(`purchased/save-class-seen?course_id=${data.course_id}&class_id=${data.class_id}`).then((res)=>{
        console.log('Respuesta del guardado -> '+res.data.data)
    })
}

// Clases completadas
export const getCompletedLessons = async (context, id) => {
    await axios.get(`purchased/show?course_id=${id}`).then(
        (res) => {
            context.commit("SET_COMPLETED_LESSONS", res.data)
        }
    );
}

// Recursos de la clase
export const getResources = async (context, less) => {
    await axios.get(`class-resource/show-resources?name=${less}`).then(
        (res) => {
            context.commit("SET_RESOURCES", res.data)
        }
    )
}

// Video de la clase
export const getVideo = async (context, classId) => {
    await axios.get(`video/stream-video?class_id=${classId}`).then(
        (res) => {
            const data = res.data;
            context.commit('SET_VIDEO', data);
        }
    );
}

// Enviar estado de reproduccion
export const getTimeReproduction = (context, time) => {
    context.commit('UPDATE_TIME', time);
}

export const getComments = async (context, id) => {
    await axios.get(`comments/show-comments?class_id=${id}`)
    .then((res) =>{
      context.commit('GET_COMMENTS', res.data);
    })
}

