import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import { $axios } from '~/utils/api';

@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule {
  public token: string = '';

  @Mutation
  setToken(value: string): void {
    this.token = value;
  }

  @Action
  async getToken(payload: string): Promise<void> {
    const token = await $axios.$post('/credentials', {
      idToken: payload,
    });
    // const dummy: any = JSON.parse('{"response_code" : "0000","message":"OK","data":{"access_token":"xxxxxx"}}');
    // return token;
    this.setToken(token);
  }
}
