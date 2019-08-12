import Vue from "vue";
import Vuex from "vuex";
import management from "./management";
import bill from "./bill";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    management,
    bill
  },
  strict: debug
});
