import axios from "axios";
import moment from "moment";


// Curso Activo
export const getCourseActive = async (context, id) => {
    try {
        const res =  await axios.get('course/details/' + id)

        const { data }  = res.data

        context.commit("SET_COURSE_ACTIVE", data)

        return{ok: true , data}
    } catch (error) {
        return {ok: false}
    }

 
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
    await axios.patch(`purchased/save-class-seen?course_id=${data.course_id}&class_id=${data.class_id}`)
}


// Recibimos las clases completadas de un determinado curso
export const getCompletedLessons = async (context, id) => {
    await axios.get(`purchased/show?course_id=${id}`).then(
        (res) => {
            context.commit("SET_COMPLETED_LESSONS", res.data)
        }
    );
}


// Obtenemos los recursos de una clase
export const getResources = async (context, less) => {
    await axios.get(`class-resource/show-resources?name=${less}`).then(
        (res) => {
            context.commit("SET_RESOURCES", res.data)
        }
    )
}


// Obtenemos el video de la clase
export const getVideo = async (context, classId) => {
    await axios.get(`video/stream-video?class_id=${classId}`).then(
        (res) => {
            const data = res.data;
            context.commit('SET_VIDEO', data);
        }
    );
}


// Enviar estado de reproduccion de video de la ultima clase vista
export const getTimeReproduction = (context, time) => {
    context.commit('UPDATE_TIME', time);
}


// Obtenemos los comentarios de una clase
export const getComments = async (context, id) => {
    await axios.get(`comments/show-comments?class_id=${id}`)
    .then((res) =>{
      context.commit('GET_COMMENTS', res.data);
    })
}


// Obtenemos el examen de una clase
export const getTest = async (context, data) => {
    await axios.post(`course/exam/active`, data).then((res)=>{
        context.commit('DATA_EX', res)
    })
    .catch((e)=>{
        context.commit('DATA_EX', e.response.status)
    })
    
}

//Obtenemos los datos del exam
export const getExam= async (_, data) => {
    const respuesta =  await axios.post(`course/exam`, {exam_id : data})
    return respuesta
}

//Obtenemos los puntos
export const getPoints = async ( {commit} , id) => {
    try {
        const data = await axios.get(`profile/points/${id}`)
        
        const {total} = data.data

        commit( 'setPoints', total )

    } catch (error) {
        console.log(error);
    }
}
//Enviamos el comentario
export const setComments = async ( { commit } , comment ) => {
        try {
            const { comments } = comment    
    
           const resp = await axios.post('comments/send-comments', comment)
           
           if( resp.data.status === 200){

            const { user_photo, username, created_at } = resp.data.data[0]

            const fecha = moment(created_at).format("DD-MM-YYYY")

            const payload = {
                comments,
                user_photo,
                username,
                fecha
            }
        
           
            commit('setComments', payload )


           }
            
        } catch (error) {
            throw new Error(error)
        }
   
}
//Obtemos la dinamica activa
export const getActiveDinamicClass = async ( { commit } , { game_for, idClass }) => {
    
    try {
        
        const { data:dataClass } = await axios.get(`class/show-class?name=${idClass}`)
        const {  data  } = await axios.post( '/course/game/active', { game_for, id_type: dataClass[0].id } )
        if( !data ) return 
        
        commit('setDataDinamic', data)

        return { ok: true , data}
    } catch (error) {
        
        return { ok: false }
        
    }

     



}
//Obtenemos los datos de las dinamicas dependiendo el id
export const getDataDinamic = async ({commit}, id ) => {

    try {
        const { data } = await axios.post('/course/game', { game_id: id } )
        commit('setGameData', data )
        return {ok: true, data }


    } catch (error) {
        return {ok: false}
    }

}
//Enviamos las respuestas de la dinamica de cartas
export const sendAnswersCards = async ({commit},{  tiempo = 0 , productor_id , game_type , data  }) => {

    let segundos = 0;

    segundos = ( tiempo.minutes * 60 ) + tiempo.seconds 

    try {
        const resp = await axios.post( '/course/game/add-points', { game_type , productor_id , tiempo: segundos, data } )
       
        commit('sumPoints', resp.data)
        return { ok :true }
    } catch (error) {
        return {ok: false}
    }

}

//Enviar las respuestas del examen

export const sendAnswersExamen = async ( _ , { id_exam , answers , course_id , seconds_used } ) =>{
    
    try {
        const resp = await axios.post("course/exam/answers", { id_exam, answers, course_id ,seconds_used })

        console.log(resp);
        return { ok: true , resp }

    } catch (error) {

        return { ok: false}

    }

}
