import Vue from "vue";
import Vuex from "vuex";
import management from "./management";
import bill from "./bill";
import carriage from "./carriage";
import vehicles from "./vehicle";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    management,
    carriage,
    vehicles,
    bill
  },
  strict: debug
});
