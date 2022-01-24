
export const  setTitle = (state, payload) =>{
    state.title = payload
}

export const setLoading = (state, payload) =>{
    state.isLoading = payload
    state.ultimo = 'setLoading ' + payload
}

