import state from "./state";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const courseStore = {
  // información que nos interesa mantener
  namespaced: true,
  state,
  // 00
  getters,
  // modifican el state
  mutations,
  // acciones que llaman a mutations para modificar el state
  actions,
};

export default courseStore;
