import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

const user = {
    //TODO :  falta algo
    // información que nos interesa mantener
    namespaced: true,

    state,
    // Permite obtener un estado en especifico 
    getters,
    // modifican el state, mediante un valor brindado
    mutations,
    // acciones que llaman a mutations para modificar el state
    actions      
      
        //example
        // GET_ATTRIBUTES(state,value){
        // }    
}

export default user;