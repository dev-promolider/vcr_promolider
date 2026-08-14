import axios from 'axios';

const state = {
  items: [],
  isWishlistOpen: false,
};

const getters = {
  wishlistItems: (state) => state.items,
  isWishlistOpen: (state) => state.isWishlistOpen,
  wishlistCount: (state) => state.items.length,
};

const mutations = {
  TOGGLE_WISHLIST(state, payload) {
    if (typeof payload === 'boolean') {
      state.isWishlistOpen = payload;
    } else {
      state.isWishlistOpen = !state.isWishlistOpen;
    }
  },
  SET_WISHLIST(state, items) {
    state.items = items;
  },
  ADD_TO_WISHLIST(state, item) {
    const exists = state.items.some((i) => i.id == item.id);
    if (!exists) {
      state.items.push(item);
    }
  },
  REMOVE_FROM_WISHLIST(state, id) {
    state.items = state.items.filter((item) => item.id != id);
  },
};

const actions = {
  toggleWishlist({ commit }, payload) {
    commit('TOGGLE_WISHLIST', payload);
  },
  async fetchWishlist({ commit }) {
    try {
      const response = await axios.get('/wishlist');
      commit('SET_WISHLIST', response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  },
  async addToWishlist({ commit }, item) {
    try {
      await axios.post('/wishlist', { course_id: item.id });
      commit('ADD_TO_WISHLIST', item);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  },
  async removeFromWishlist({ commit }, id) {
    try {
      await axios.delete(`/wishlist/${id}`);
      commit('REMOVE_FROM_WISHLIST', id);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
