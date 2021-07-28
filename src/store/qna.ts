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
  percent_progress_filter?: number;
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
      percent_progress_filter: 0,
    },
  };

  public dataQuestion: string[] = [];

  public dataCounter = { all: 0, org: 0 };

  @Mutation
  setQna(value: QnaResponse): void {
    this.dataQna = value;
  }

  @Mutation
  setCounter(value: { all: number; org: number }): void {
    this.dataCounter = value;
  }

  @Mutation
  setSubmit(value: SubmitResponse): void {
    /* eslint no-param-reassign: "error" */
    const whitelistJson = localStorage.getItem('rrs_whitelist');

    // count progress with filter
    const totalEmployeePercentage = value.data.percent_progress;
    const whitelistCheck = whitelistJson ? JSON.parse(whitelistJson).selected.length : 0;
    const countEmployee = this.dataCounter;

    // count whitelist from check & from organization
    const countWhitelist = whitelistCheck;

    const totalWhitelistPair = countWhitelist * countWhitelist - countWhitelist;
    const totalEmployeePair = (countEmployee.all * countEmployee.all - countEmployee.all) - (countEmployee.all * 2 - 2);
    const percentageForUser = ((totalEmployeePercentage * totalEmployeePair) / totalWhitelistPair);

    value.data.percent_progress_filter = percentageForUser;
    this.submitResponse = value;
  }

  @Mutation
  setQuestion(value: string[]): void {
    this.dataQuestion = value;
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
    } catch {
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
    counter: { all: number; org: number };
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
        this.setCounter(data.counter);
        this.setSubmit(response.data);
      } else {
        this.setSubmit({
          response_code: '404',
          message: 'notfound',
          data: {
            count_submitted: 0,
            percent_progress: 0,
            percent_progress_filter: 0,
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
          percent_progress_filter: 0,
        },
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
