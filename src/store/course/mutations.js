export const SET_COURSE= (state, course) =>{

    state.course = course;

    // Calculando las lecciones totales
    for(let i=0; i<state.course.modules.length; i++){
        state.allLessons += state.course.modules[i].lessons.length
    }

    state.isLoading=false;
}

export const SET_COURSE_ACTIVE = (state, course) => {
    state.course_active = course;
}

export const listId_NameClass = (state, course) => {
    for(let i=0; i<course.modules.length; i++){
        for(let j=0; j<course.modules[i].lessons.length; j++){
            // let {id,name} =course.modules[i].lessons[j]
            // let datos = {
            //     id,
            //     name
            // }
            state.allLessonsId.push(course.modules[i].lessons[j]);
        }
    }
}

export const SET_LESSON = (state, lesson) =>{
    state.renderVideo = false;
    state.lesson = lesson;
    // setTimeout(
    //     ()=>{
    //       state.renderVideo = true;
    //     },200
    // )
}

export const SET_RESOURCES = (state, resources) => {
    state.resources = resources;

    if(resources.length != 0){
        state.isResources=true;
      }else{
        state.isResources=false;
      }
}

export const SET_COMPLETED_LESSONS = (state, lessons) =>{
    for(const index in lessons.data){
        if(lessons.status[index]==="SEEN"){
            state.completedLessons = state.completedLessons.push(lessons.data[index])
        }
    }
}

export const SET_VIDEO = (state, url)=>{
    state.urlVideo=url;
    state.renderVideo = true;
}

export const UPDATE_TIME = (state, time) =>{
    state.timeReady = time
}

export const SET_PRODUCTOR = (state, productor) =>{
    state.productor = productor
}

export const UPDATE_PROGRESS_COURSE = (state, progressCourseSelect ) =>{
    state.progressCourseSelect = progressCourseSelect
}

export const DESTROY_PROGRESS_COURSE = (state ) =>{
    state.progressCourseSelect = 0;
}

export const GET_PROGRESS = (state) => {
    state.courseSelect = true;
}

export const DESTROY_PROGRESS = (state) => {
    state.courseSelect = false;
    state.allComments = [],
    state.lesson = []
    state.allLessonsId = []
}

// Limpiar todos los estados
export const CLEAR_VIDEO = (state) => {
    state.renderVideo = false,
    state.urlVideo =  null
}

export const GET_COMMENTS = (state, allComments) => {
    state.allComments = allComments
}

export const DATA_EX = (state, dataEx) => {
    state.dataEx = dataEx
}