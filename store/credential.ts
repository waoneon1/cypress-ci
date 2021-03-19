import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import { $axios } from '~/utils/api';

export interface CredentialInterface {
  token?: string
  setToken: (value: string) => void
  getToken: (payload: string) => Promise<void>
}

@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule implements CredentialInterface {
  public token: string = '';

  @Mutation
  setToken(value: string): void {
    this.token = value;
  }

  @Action
  async getToken(payload: string): Promise<void> {
    const token = await $axios.$post('/auth/login/google_oauth', {
      id_token: payload,
    });
    console.log(token, 'from be')
    // const dummy: any = JSON.parse('{"response_code" : "0000","message":"OK","data":{"access_token":"xxxxxx"}}');
    // return token;
    this.setToken(token);
  }
}
