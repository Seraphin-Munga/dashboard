// Polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { ColorThemePlugin } from "../services/vuestic-ui";
import store from "../store/index";
import router from "../router/index";
import axios from "axios";
import { VuesticPlugin } from "../services/vuestic-ui/components";
import "../i18n/index";
import YmapPlugin from "vue-yandex-maps";
import VueClipboard from "vue-clipboard2";
import VueGoodTablePlugin from "vue-good-table";

import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

Vue.use(VueGoodTablePlugin);

import "../metrics";
import "../registerServiceWorker";

import { consoleBuildInfo } from "vue-cli-plugin-build-info/plugin";

import VueSession from "vue-session";

consoleBuildInfo();

Vue.use(VuesticPlugin);
Vue.use(YmapPlugin);
Vue.use(VueClipboard);

Vue.prototype.$apiURL = "http://127.0.0.1:8000/api/";

Vue.prototype.$axios = axios;
Vue.use(VueSession);

Vue.use(ColorThemePlugin, {
  // override colors here.
});

router.beforeEach((to, from, next) => {
  store.commit("setLoading", true);
  next();
});

router.afterEach((to, from) => {
  store.commit("setLoading", false);
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  components: {
    VueGoodTable
  }
});
