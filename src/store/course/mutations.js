export const SET_COURSE= (state, course) =>{
    state.course = course;

    // Calculando las lecciones totales
    for(let i=0; i<state.course.modules.length; i++){
        state.allLessons += state.course.modules[i].lessons.length
    }

    state.isLoading=false;
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
            state.completedLessons.push(lessons.data[index])
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
