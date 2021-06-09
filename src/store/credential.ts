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

export interface CredentialResponse {
  responseCode: string;
  message: string;
  data: {
    accessToken: string;
  };
}
@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule {
  public dataCredential: CredentialResponse = {
    responseCode: '0000',
    message: '',
    data: {
      accessToken: '',
    },
  };

  @Mutation
  setToken(value: CredentialResponse): void {
    this.dataCredential = value;
  }

  @Action({ rawError: true })
  async getToken(payload: string): Promise<void> {
    console.log( process.env.NUXT_ENV_RRS_API_URL, 'url api endpoin')
    const response = await axios.post(
      `${process.env.NUXT_ENV_RRS_API_URL!}auth/login/google_oauth`,
      {
        id_token: payload,
      },
    );

    const data: CredentialResponse = {
      responseCode: '0000',
      message: '',
      data: {
        accessToken: '',
      },
    };
    data.responseCode = response.data.response_code;
    data.data.accessToken = response.data.data.access_token;

    this.setToken(data);
  }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    credential: CredentialModule,
  },
});
export const credentialModule = getModule(CredentialModule, store);
