import Vue from "vue";

export const SET_COURSE= (state, course) =>{

    state.course = course;

    // Calculando el numero total de lecciones con el fin de obtener el progreso
    for(let i=0; i<state.course.modules.length; i++){
        state.allLessons += state.course.modules[i].lessons.length
    }

    state.isLoading=false;
}


// Definimos que curso esta activo o siendo visto en el momento
export const SET_COURSE_ACTIVE = (state, course) => {
    state.course_active = course;
}


// Generamos un array de todos las clases para poder navegar en ellas (botones atras y adelante)
export const listId_NameClass = (state, course) => {
    for(let i=0; i<course.modules.length; i++){
        for(let j=0; j<course.modules[i].lessons.length; j++){
            state.allLessonsId.push(course.modules[i].lessons[j]);
        }
    }
}


// Cambiamos de lección
export const SET_LESSON = (state, lesson) =>{
    state.renderVideo = false;
    state.lesson = lesson;
}


// Definimos los recursos de la clase
export const SET_RESOURCES = (state, resources) => {
    state.resources = resources;

    // Verificamos que la clase tenga recursos que mostrar
    if(resources.length != 0){
        state.isResources=true;
      }else{
        state.isResources=false;
      }
}


// Verificamos que clases fueron vistas anteriormente
export const SET_COMPLETED_LESSONS = (state, lessons) =>{
    for(const index in lessons.data){
        if(lessons.status[index]==="SEEN"){
            state.completedLessons = state.completedLessons.push(lessons.data[index])
        }
    }
}


// Definimos el origen del video de la clase
export const SET_VIDEO = (state, url)=>{
    state.urlVideo=url;
    state.renderVideo = true;
}


// Actualizamos el tiempo de reproduccion de la ultima clase
export const UPDATE_TIME = (state, time) =>{
    state.timeReady = time
}


// Definimos los datos del productor del curso activo
export const SET_PRODUCTOR = (state, productor) =>{
    state.productor = productor
}


// Actualizamos el progreso del curso segun el usuario avance
export const UPDATE_PROGRESS_COURSE = (state, progressCourseSelect ) =>{
    state.progressCourseSelect = progressCourseSelect
}


// Elimanos los datos del progreso del curso cuando el usuario cierre la ventana
export const DESTROY_PROGRESS_COURSE = (state ) =>{
    state.progressCourseSelect = 0;
}


export const GET_PROGRESS = (state) => {
    state.courseSelect = true;
}


// Destruimos algunos estados cuando el usuario cierre la ventana para 
// no generar conflictos con otro curso.
export const DESTROY_PROGRESS = (state) => {
    state.courseSelect = false;
    state.allComments = [],
    state.allRating = [],
    state.lesson = []
    state.allLessonsId = []
    state.allLessons = 0
    state.courseRating = 0
}


// Limpiar todos los estados
export const CLEAR_VIDEO = (state) => {
    state.renderVideo = false,
    state.urlVideo =  null
}


// Llenamos los comentarios de la clase activa
export const GET_COMMENTS = (state, allComments) => {
    if(allComments.data === 'No hay comentarios'){
        state.isLoadingComments = false
        state.allComments = []
    }else{
        state.allComments = allComments
        state.isLoadingComments = false
    }
}

// Llenamos la valoracion de un curso
export const GET_RATING = (state, allRating) => {
    /* if(allRating.data === undefined){
        state.isLoadingRating = false
        state.allRating = []
    }else{ */
        
        //state.allRating = allRating
        Vue.set(state, 'allRating', allRating);
        state.isLoadingRating = false
    /* } */
}

export const GET_COURSE_RATING = (state, courseRating) => {
        state.courseRating = courseRating
}






// Lenamos datos del examen de la clase activa
export const DATA_EX = (state, dataEx) => {
    if(!dataEx)return
    state.dataEx = dataEx
}

// Cargarmos la informacióm del examen de cada modulo
export const setModuleExam = ( state, payload) => {
   state.moduleExamen = payload
}


// Escuchamos el evento hover sobre algun curso para hacer un cambio de fondo
export const COURSE_HOVER = (state, courseHover) =>{
    state.courseHover = courseHover
}

export const NO_EXAM_DAILY = (state, examDaily) =>{
    state.examDaily = examDaily
}

export const setPoints = ( state, points) => {
    state.points = points
}

export const sumPoints = (state, points ) => {
    state.sumPoints = points
    state.points += points
}

export const setComments = (state, comments) => {
    state.allComments = [ ...state.allComments, comments]
}

export const setRating = (state, newRating) => {
    state.allRating = [ ...state.allRating, newRating]
}

export const setCourseRating = (state, courseRating) => {
    state.courseRating = [ ...state.courseRating, courseRating]
}

export const setDataDinamic = ( state , data) => {
    state.dinamicClass = data
}
export const setActiveDinamicModule = ( state , data) => {
    state.moduleDinamic = data
}

export const setGameData = (state, data) => {
    state.gameData = data
}

export const getLeaderBoard = (state, data) => {
    state.leaderBoard = data
}