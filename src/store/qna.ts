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
  criteria_id: string;
  criteria_name: string;
  employee_name_x: string;
  employee_name_y: string;
  employee_email_x: string;
  employee_email_y: string;
  employee_image_url_x: string;
  employee_image_url_y: string;
  employee_business_unit_x: string;
  employee_business_unit_y: string;
  employee_organization_full_text_x: string;
  employee_organization_full_text_y: string;
  employee_organization_x: string;
  employee_organization_y: string;
  /* eslint-enable camelcase */
}
export interface QnaResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: QnaResponseData[];
}
export interface SubmitResponseData {
  /* eslint-disable camelcase */
  count_submitted: number;
  percent_progress: number;
  /* eslint-enable camelcase */
}
export interface SubmitResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: SubmitResponseData;
}

const url: string = process.env.NUXT_ENV_RRS_API_URL!;
@Module({ namespaced: true, name: 'qna' })
export default class QnaModule extends VuexModule {
  public dataQna: QnaResponse = {
    response_code: '',
    message: '',
    data: [],
  };

  public submitResponse: SubmitResponse = {
    response_code: '',
    message: '',
    data: {
      count_submitted: 0,
      percent_progress: 0,
    },
  };

  @Mutation
  setQna(value: QnaResponse): void {
    this.dataQna = value;
  }

  @Mutation
  setSubmit(value: SubmitResponse): void {
    this.submitResponse = value;
  }

  @Action({ rawError: true })
  async getQna(payload: object): Promise<void> {
    const token: string | null = localStorage.getItem('token');
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
    } catch (e) {
      this.setQna({
        response_code: '401',
        message: 'unautorized',
        data: [],
      });
    }
  }

  @Action({ rawError: true })
  async submitQna(data: {
    payload: object[];
    criteriaId: string;
  }): Promise<void> {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${url}pair_data/submit/criteria/${data.criteriaId}`,
        data.payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.data) {
        this.setSubmit(response.data);
      } else {
        this.setSubmit({
          response_code: '404',
          message: 'notfound',
          data: {
            count_submitted: 0,
            percent_progress: 0,
          },
        });
      }
    } catch {
      this.setSubmit({
        response_code: '401',
        message: 'unautorized',
        data: {
          count_submitted: 0,
          percent_progress: 0,
        },
      });
    }
  }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    qna: QnaModule,
  },
});
export const qnaModule = getModule(QnaModule, store);
