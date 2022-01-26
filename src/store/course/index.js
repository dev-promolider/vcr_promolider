import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
const courseStore = {
    //TODO :  falta algo

    // información que nos interesa mantener
    namespaced: true,
    state,
        // 00
    getters,
        // modifican el state
    mutations,// recibo
        // acciones que llaman a mutations para modificar el state
    actions        
        // GET_ATTRIBUTES(state,value){
        // }
    
}

export default courseStore;