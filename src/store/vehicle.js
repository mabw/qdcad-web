import API from "@utils/apiService";

const state = { data: null };
const mutations = {
  updateVehicleListState(state, data) {
    state.data = data;
  }
};

const actions = {
  async getVehicleList({ commit }, payload) {
    if (!payload) {
      const result = await API.get("/vehicles");
      if (result.ok) {
        commit("updateVehicleListState", result.data);
      }
    }
  },
  async addNewVehicle({ commit }, payload) {
    if (payload) {
      const result = await API.post("/vehicles", payload);
      if (result.ok) {
        commit("updateVehicleListState", result.data);
        return true;
      }
    }

    return false;
  },
  async updateVehicle({ commit }, payload) {
    if (payload) {
      const { id, ...requestParams } = payload;
      console.log("requestParams: ", requestParams);
      const result = await API.put(`/vehicles/${id}`, requestParams);
      if (result.ok) {
        commit("updateVehicleListState", result.data);
        return true;
      }
    }

    return false;
  },
  async deleteVehicle({ commit }, id) {
    if (id) {
      const result = await API.delete(`/vehicles/${id}`);
      if (result.ok) {
        commit("updateVehicleListState", result.data);
        return true;
      }
    }

    return false;
  }
};

export default { state, mutations, actions };
