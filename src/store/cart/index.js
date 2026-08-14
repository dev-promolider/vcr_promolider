// Vuex Store Module for Shopping Cart
const STORAGE_KEY = 'promolider_virtual_classroom_cart';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error loading cart from localStorage', e);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
};

export default {
  namespaced: true,
  state: () => ({
    items: loadCartFromStorage(),
    shippingFee: 0.00,
    taxRate: 0.08, // 8% tax rate matching design
    isCartOpen: false,
  }),
  getters: {
    cartItems: (state) => state.items,
    isCartOpen: (state) => state.isCartOpen,
    itemCount: (state) => {
      return state.items.length;
    },
    subtotal: (state) => {
      return state.items.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        return total + price;
      }, 0);
    },
    taxAmount: (state, getters) => {
      return getters.subtotal * state.taxRate;
    },
    shippingAmount: (state) => state.shippingFee,
    total: (state, getters) => {
      return getters.subtotal + getters.taxAmount + getters.shippingAmount;
    },
    isInCart: (state) => (id) => {
      return state.items.some((item) => item.id == id);
    },
  },
  mutations: {
    TOGGLE_CART(state, payload) {
      if (typeof payload === 'boolean') {
        state.isCartOpen = payload;
      } else {
        state.isCartOpen = !state.isCartOpen;
      }
    },
    ADD_TO_CART(state, item) {
      const existingIndex = state.items.findIndex((i) => i.id == item.id);
      if (existingIndex === -1) {
        state.items.push({
          id: item.id,
          title: item.title || item.name || 'Curso',
          price: parseFloat(item.price_with_discount > 0 ? item.price_with_discount : (item.price || item.precio || 0)),
          originalPrice: parseFloat(item.precio || item.price || 0),
          url_portada: item.url_portada || item.img || item.coverUrl || '',
          category: item.categoria || item.category || 'Curso',
          slug: item.slug || '',
        });
      }
      saveCartToStorage(state.items);
    },
    REMOVE_FROM_CART(state, id) {
      state.items = state.items.filter((item) => item.id != id);
      saveCartToStorage(state.items);
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      const item = state.items.find((i) => i.id == id);
      if (item) {
        const newQty = parseInt(quantity);
        if (newQty > 0) {
          item.quantity = newQty;
        }
      }
      saveCartToStorage(state.items);
    },
    INCREMENT_QTY(state, id) {
      const item = state.items.find((i) => i.id == id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.items);
    },
    DECREMENT_QTY(state, id) {
      const item = state.items.find((i) => i.id == id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToStorage(state.items);
    },
    CLEAR_CART(state) {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
  actions: {
    toggleCart({ commit }, open) {
      commit('TOGGLE_CART', open);
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
      commit('TOGGLE_CART', true); // Auto open cart on add
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_FROM_CART', id);
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload);
    },
    incrementQty({ commit }, id) {
      commit('INCREMENT_QTY', id);
    },
    decrementQty({ commit }, id) {
      commit('DECREMENT_QTY', id);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
  },
};
