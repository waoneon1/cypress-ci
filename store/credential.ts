import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import { $axios } from '~/utils/api';

export interface credentialResponse {
  responseCode: string,
  message: string,
  data: {
    accessToken: string
  }
}
@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule {
  public dataCredential: credentialResponse = {
    responseCode: '0000',
    message: '',
    data: {
      accessToken: '',
    },
  }

  @Mutation
  setToken(value: credentialResponse): void {
    this.dataCredential = value;
  }

  @Action
  async getToken(payload: string): Promise<void> {
    const response = await $axios.$post('/auth/login/google_oauth', {
      id_token: payload,
    });
    const data: credentialResponse = {
      responseCode: '0000',
      message: '',
      data: {
        accessToken: '',
      },
    };

    data.responseCode = response.response_code;
    data.data.accessToken = response.data.access_token;

    this.setToken(data);
  }
}
