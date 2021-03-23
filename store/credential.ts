import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import axios from 'axios';

export interface credentialResponse {
  responseCode: string;
  message: string;
  data: {
    accessToken: string;
  };
}
@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule {
  public dataCredential: credentialResponse = {
    responseCode: '0000',
    message: '',
    data: {
      accessToken: '',
    },
  };

  @Mutation
  setToken(value: credentialResponse): void {
    this.dataCredential = value;
  }

  @Action({ rawError: true })
  async getToken(payload: string): Promise<void> {
    const response = await axios.post(
      'https://rrs-api.sumpahpalapa.com/api/v1/auth/login/google_oauth',
      {
        id_token: payload,
      },
    );

    const data: credentialResponse = {
      responseCode: '0000',
      message: '',
      data: {
        accessToken: '',
      },
    };
    // console.log(response);
    data.responseCode = response.data.response_code;
    data.data.accessToken = response.data.data.access_token;

    this.setToken(data);
  }
}
