export const SET_COURSE= (state, course) =>{
    state.course = course;

    // Calculando las lecciones totales
    for(let i=0; i<state.course.modules.length; i++){
        state.allLessons += state.course.modules[i].lessons.length
    }

    state.isLoading=false;
}

export const SET_LESSON = (state, lesson) =>{
    state.lesson = lesson
}

export const SET_RESOURCES = (state, resources) => {
    state.resources = resources;

    if(resources.length != 0){
        state.isResources=true;
      }else{
        state.isResources=false;
      }
}
