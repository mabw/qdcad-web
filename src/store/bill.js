import API from "@utils/apiService";

const state = { data: null };
const mutations = {
  updateState(state, data) {
    state.data = data;
  }
};

const actions = {
  async getBillList({ commit }, payload) {
    if (!payload) {
      const result = await API.get("/bills");
      if (result.ok) {
        commit("updateState", result.data);
      }
    }
  },
  async addNewBill({ commit }, payload) {
    if (payload) {
      const result = await API.post("/bills", payload);
      if (result.ok) {
        commit("updateState", result.data);
        return true;
      }
    }

    return false;
  }
};

const getters = {
  filteredBillList: state => filter => {
    if (!filter) return state;
  }
};

export default { namespaced: true, state, mutations, actions, getters };
