import axios from "axios";

export const getCourse = async (context, id) =>{
    await axios.get('course/temary/get-all-class/'+id).then(
        (res) => {
            context.commit("SET_COURSE",res.data.data)
        }
    )
}

export const getLesson = (context, less) =>{
    context.commit("SET_LESSON",less)
}

export const getCompletedLessons = async (context, id) => {
    await axios.get(`purchased/show?course_id=${id}`).then(
        (res) => {
            context.commit("SET_COMPLETED_LESSONS", res.data)
        }
    );
}

export const getResources = async (context, less)=>{
    await axios.get(`class-resource/show-resources?name=${less}`).then(
      (res)=>{
          context.commit("SET_RESOURCES",res.data)
      }
    )
  }


