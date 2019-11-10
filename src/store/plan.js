import API from "@utils/apiService";

const state = { data: null };
const mutations = {
  updatePlanListState(state, data) {
    state.data = data;
  }
};

const actions = {
  async getPlanList({ commit }, payload) {
    if (!payload) {
      const result = await API.get("/plans");
      if (result.ok) {
        commit("updatePlanListState", result.data);
      }
    }
  }
};

const getters = {
  filteredPlanList: state => filter => {
    if (!filter) return state.data || [];
  }
};

export default { state, mutations, actions, getters };
