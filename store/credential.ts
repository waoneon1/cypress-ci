import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Vuex from 'vuex'
import { $axios } from '~/utils/api'
@Module({ namespaced: true, name: 'credential' })
export default class CredentialModule extends VuexModule {
  public token: string = ''

  @Mutation
  setToken(token: string): void {
    this.token = token
  }
  
  @Action({ commit: 'setToken' })
  async getToken(payload: string): Promise<string> {
    // process backend here
    console.log(payload);
    // {"id_token" : "xxxxx"}
    // dummy return from server
    // const token = await $axios.$post('credentials', {
    //   id_token: payload,
    // });
    // console.log('token axios: ', token);
    return '{"response_code" : "0000","message":"OK","data":{"access_token":"xxxxxx"}}'
  }
}

const store = new Vuex.Store({
  modules: {
    credential: CredentialModule
  }
})