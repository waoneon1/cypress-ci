import {
  Module,
  VuexModule,
  Mutation,
  getModule,
} from 'vuex-module-decorators';
import Vuex from 'vuex';
import Vue from 'vue';

  @Module({ namespaced: true, name: 'alert' })
export default class AlertModule extends VuexModule {
    public showAlert: boolean = false

    @Mutation
    setAlertTrue(): void {
      this.showAlert = true;
    }

    @Mutation
    setAlertFalse(): void {
      this.showAlert = false;
    }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    alert: AlertModule,
  },
});
export const alertModule = getModule(AlertModule, store);
