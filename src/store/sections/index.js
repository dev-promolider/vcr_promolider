import state from './state'
import * as mutations from './mutations'
const courseStore = {
    namespaced: true,

    state,
        // 00
    //getters,
        // modifican el state
    mutations,
        // acciones que llaman a mutations para modificar el state
    //actions        
        // GET_ATTRIBUTES(state,value){
        // }
}

export default courseStore;