import API from "@utils/apiService";

const state = { data: null };
const mutations = {
  initialConfigurationState(state, data) {
    state.data = data;
  },
  updateConfigurationState(state, data) {
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
      commit("initialConfigurationState", result.data);
    }
  },
  async saveConfigurations({ commit }, payload) {
    const result = await API.put("/configurations/1", payload);
    if (result.ok) {
      commit("updateConfigurationState", result.data);
      return true;
    }

    return false;
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

export default { state, mutations, actions, getters };
