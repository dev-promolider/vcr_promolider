import Vue from 'vue'
import Vuex from 'vuex'
import courseStore from './course'
import attribute  from "./attribute";
import lastmessage  from "./lastmessage";
import sections from "./sections";
import user from "./user";
import cart from "./cart";
import wishlist from "./wishlist";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    lastMessage: lastmessage,
    course: courseStore,
    user: user,
    attribute: attribute,
    sections,
    cart,
    wishlist,
  }
})

