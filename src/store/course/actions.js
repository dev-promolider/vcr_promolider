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
