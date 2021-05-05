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

const url: string = process.env.NUXT_ENV_RRS_API_URL!;
@Module({ namespaced: true, name: 'criteria' })
export default class CriteriaModule extends VuexModule {
  public dataCriteria: CriteriaResponse = {
    response_code: '',
    message: '',
    data: [],
  }

  public dataCriteriaProgress = [
    {
      criteria_name: 'Design', id: '6062d4c9dd3acd0959261f51', progress: 70, rebbon: false,
    },
    {
      criteria_name: 'Requirements', id: '606d1d5cf50eab8cb59f434c', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Construction', id: '606d1d68f50eab8cb59f434d', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Testing', id: '606d1d6df50eab8cb59f434e', progress: 45, rebbon: false,
    },
    {
      criteria_name: 'Sustainment', id: '606d1d73f50eab8cb59f434f', progress: 15, rebbon: false,
    },
    {
      criteria_name: 'Process', id: '606d1d78f50eab8cb59f4350', progress: 100, rebbon: false,
    },
    {
      criteria_name: 'Systems Engineering', id: '606d1d7ff50eab8cb59f4351', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Quality', id: '606d1d89f50eab8cb59f4352', progress: 0, rebbon: true,
    },
    {
      criteria_name: 'Security', id: '606d1d8ef50eab8cb59f4353', progress: 100, rebbon: false,
    },
    {
      criteria_name: 'Config Management', id: '606d1d95f50eab8cb59f4354', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Measurement', id: '606d1d9ff50eab8cb59f4355', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'HCI', id: '606d1da5f50eab8cb59f4356', progress: 30, rebbon: false,
    },
  ];

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
