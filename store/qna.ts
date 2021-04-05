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

export interface QnaResponseData {
  /* eslint-disable camelcase */
  criteria_id?: string;
  criteria_name?: string;
  employee_name_x?: string;
  employee_name_y?: string;
  employee_email_x?: string;
  employee_email_y?: string;
  employee_image_url_x?: string;
  employee_image_url_y?: string;
  /* eslint-enable camelcase */
}
export interface QnaResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: QnaResponseData[] | string | number;
}

const url: string = 'https://rrs-api.sumpahpalapa.com/api/v1/';
const token: string | null = localStorage.getItem('token');
@Module({ namespaced: true, name: 'qna' })
export default class QnaModule extends VuexModule {
  public dataQna: QnaResponse = {
    response_code: '',
    message: '',
    data: [],
  };

  public dataQuestion: string[] = [];

  @Mutation
  setQna(value: QnaResponse): void {
    this.dataQna = value;
  }

  @Mutation
  setQuestion(value: string[]): void {
    this.dataQuestion = value;
  }

  @Action({ rawError: true })
  async getQna(payload: object): Promise<void> {
    try {
      const response = await axios.post(`${url}pair_data/get_next`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        this.setQna(response.data);
      } else {
        this.setQna({
          response_code: '404',
          message: 'notfound',
          data: [],
        });
      }
    } catch {
      this.setQna({
        response_code: '401',
        message: 'unautorized',
        data: [],
      });
    }
  }

  @Action({ rawError: true })
  async submitQna(payload: object[]): Promise<void> {
    try {
      console.log('submitQna try')
      const response = await axios.post(`${url}pair_data/submit`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        this.setQna(response.data);
      } else {
        this.setQna({
          response_code: '404',
          message: 'notfound',
          data: [],
        });
      }
    } catch {
      console.log('submitQna catch')
      this.setQna({
        response_code: '401',
        message: 'unautorized',
        data: [],
      });
    }
  }

  @Action({ rawError: true })
  async getQuestion(domain: string): Promise<void> {
    const response = await axios.get('/json/question.json', {
      baseURL: window.location.origin,
    });

    this.setQuestion(response.data[domain]);
  }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    qna: QnaModule,
  },
});
export const qnaModule = getModule(QnaModule, store);
