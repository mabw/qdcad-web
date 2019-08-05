import API from "@utils/apiService";

const state = { data: null };
const mutations = {
  initialState(state, data) {
    state.data = data;
  },
  updateState(state, data) {
    state.data.forEach(item => {
      if (data.type === item.type) {
        item.content = data.content;
      }
    });
  }
};

const actions = {
  async getAllConfigurations({ commit }) {
    const result = await API.get("/configurations");
    if (result.ok) {
      commit("initialState", result.data);
    }
  },
  async saveConfigurations({ commit }, payload) {
    const result = await API.put("/configurations/1", payload);
    if (result.ok) {
      commit("updateState", result.data);
    }
  }
};

const getters = {
  configurations: state => {
    let newState = {};
    if (state.data) {
      state.data.forEach(item => {
        newState[`${item.type}`] = item.content.data;
      });
    }
    return newState;
  }
};

export default { namespaced: true, state, mutations, actions, getters };
