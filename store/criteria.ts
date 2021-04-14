import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

export interface CriteriaResponseData {
    /* eslint-disable camelcase */
    criteria_name: string;
    id: string;
    /* eslint-enable camelcase */
  }
export interface CriteriaResponse {
    /* eslint-disable-next-line camelcase */
    response_code: string;
    message: string;
    data: CriteriaResponseData[];
  }

const url: string = 'https://rrs-api.sumpahpalapa.com/api/v1/';
@Module({ namespaced: true, name: 'criteria' })
export default class CriteriaModule extends VuexModule {
    public dataCriteria: CriteriaResponse = {
      response_code: '',
      message: '',
      data: [],
    }

    @Mutation
    setCriteria(value: CriteriaResponse): void {
      this.dataCriteria = value;
    }

    @Action({ rawError: true })
    async getCriteria(): Promise<void> {
      const token: string | null = localStorage.getItem('token');
      try {
        const response = await axios.get(`${url}criteria_user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data) {
          this.setCriteria(response.data);
        } else {
          this.setCriteria({
            response_code: '404',
            message: 'notfound',
            data: [],
          });
        }
      } catch {
        this.setCriteria({
          response_code: '401',
          message: 'unautorized',
          data: [],
        });
      }
    }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    criteria: CriteriaModule,
  },
});
export const criteriaModule = getModule(CriteriaModule, store);
