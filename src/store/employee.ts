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

export interface EmployeeResponseData {
    /* eslint-disable camelcase */
    id: string;
    employee_name: string;
    employee_email: string;
    employee_image_url: string;
    employee_alt_id: string;
    employee_organization: string;
    employee_organization_full_text: string;
    employee_business_unit: string;
    created_at: string;
    updated_at: string;
    /* eslint-enable camelcase */
  }

export interface EmployeeResponse {
    /* eslint-disable-next-line camelcase */
    response_code: string;
    message: string;
    data: EmployeeResponseData[];
  }

const url: string = process.env.NUXT_ENV_RRS_API_URL!;
@Module({ namespaced: true, name: 'employee' })
export default class EmployeeModule extends VuexModule {
    public dataEmployee: EmployeeResponse = {
      response_code: '',
      message: '',
      data: [],
    };

    @Mutation
    setEmployee(value: EmployeeResponse): void {
      this.dataEmployee = value;
    }

    @Action({ rawError: true })
    async getEmployee(): Promise<void> {
      const token: string | null = localStorage.getItem('token');
      try {
        const response = await axios.get(`${url}employee_user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data) {
          this.setEmployee(response.data);
        } else {
          this.setEmployee({
            response_code: '404',
            message: 'notfound',
            data: [],
          });
        }
      } catch {
        this.setEmployee({
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
    employee: EmployeeModule,
  },
});
export const employeeModule = getModule(EmployeeModule, store);
