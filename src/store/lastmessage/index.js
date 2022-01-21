import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

const lastmessage = {
    //TODO :  falta algo

    // información que nos interesa mantener
    namespaced: true,

    state,
        // PErmite obtener un estado en especifico 
    getters,
        // getLastMessages

        // modifican el state
    mutations,// recibo
        // acciones que llaman a mutations para modificar el state
    actions        
        // GET_ATTRIBUTES(state,value){
        // }
    
}

export default lastmessage;