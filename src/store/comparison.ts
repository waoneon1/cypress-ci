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
import { ComparisonResponseData } from '~/types/ComparisonData';

export interface ComparisonResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: ComparisonResponseData[];
}

const url: string = process.env.NUXT_ENV_RRS_API_URL!;
@Module({ namespaced: true, name: 'comparison' })
export default class ComparisonModule extends VuexModule {
  public dataComparison: ComparisonResponse = {
    response_code: '',
    message: '',
    data: [],
  };

  @Mutation
  setComparison(value: ComparisonResponse): void {
    this.dataComparison = value;
  }

  @Action({ rawError: true })
  async getComparison(criteriaId): Promise<void> {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await axios.get(`${url}employee_pair_comparison/score/criteria/${criteriaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        this.setComparison(response.data);
      } else {
        this.setComparison({
          response_code: '404',
          message: 'notfound',
          data: [],
        });
      }
    } catch {
      this.setComparison({
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
    comparison: ComparisonModule,
  },
});
export const comparisonModule = getModule(ComparisonModule, store);
