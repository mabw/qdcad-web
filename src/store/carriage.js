import API from "@utils/apiService";

const state = { data: null };
const mutations = {
  updateCarriageListState(state, data) {
    state.data = data;
  }
};

const actions = {
  async getCarriageList({ commit }, payload) {
    if (!payload) {
      const result = await API.get("/bills");
      if (result.ok) {
        commit("updateCarriageListState", result.data);
      }
    }
  },
  async addNewCarriage({ commit }, payload) {
    if (payload) {
      const result = await API.post("/carriages", payload);
      if (result.ok) {
        commit("updateCarriageListState", result.data);
        return true;
      }
    }

    return false;
  }
};

// const getters = {
//   filteredBillList: state => filter => {
//     if (!filter) return state.data || [];
//   }
// };

export default { state, mutations, actions };
