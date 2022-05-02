import Vue from 'vue'
import Vuex from 'vuex'
import courseStore from './course'
import attribute  from "./attribute";
import lastmessage  from "./lastmessage";
import sections from "./sections";
import user from "./user";

Vue.use(Vuex)

export default new Vuex.Store({
    // // data()  => variables que se pueden obtener de manera global
    // state: {
    //   nombre_user: 'Richard',
    //   surnames_user: 'Lopez'
    // },

    // // Permite obtener los states = valores (variables / propiedades / atributos)
    // getters: {
    //   getNombre(){
    //     return state.nombre_user;
    //   },

    //   value: state => {
    //     return state.value;
    //   }
    // },

    // // Modifican el state, como también no! 
    // mutations: {     //  payload  = value
    //   updateValue(state, value) {
    //     state.value = value;
    //   }
    // },


    // actions: {
    //   updateValue({commit}, payload) {
    //     commit('updateValue', payload);
    //   }
    // }
  modules: {
    
    lastMessage: lastmessage,
    
    course: courseStore,

    user: user,

    attribute: attribute,

    sections

  }

})

