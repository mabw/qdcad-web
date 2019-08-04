import Vue from "vue";
import Vuex from "vuex";
import management from "./management";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    management
  },
  strict: debug
});
