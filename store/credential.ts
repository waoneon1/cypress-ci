import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import { $axios } from '~/utils/api';

@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule {
  public token: string = '';

  @Mutation
  setToken(token: string): void {
    this.token = token;
  }

  @Action({ commit: 'setToken' })
  async getToken(payload: string): Promise<string> {
    // const token = await $axios.$post('credentials', {
    //   id_token: payload,
    // });
    const dummy: any = JSON.parse('{"response_code" : "0000","message":"OK","data":{"access_token":"xxxxxx"}}');
    return dummy.data.access_token;
  }
}
