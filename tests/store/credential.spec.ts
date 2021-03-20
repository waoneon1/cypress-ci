import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import CredentialStore from '@/store/credential';

const Vue = createLocalVue();
Vue.use(Vuex);

const credentialModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      credential: CredentialStore,
    },
  });
  return getModule(CredentialStore, store);
};

/**
 * The test case
 */
describe('Credential Store', () => {
  it('setToken', () => {
    const service = credentialModule();
    // const todo: ITodo = {
    //   id: "1",
    //   text: "test",
    //   timeCreated: new Date(),
    //   isComplete: false
    // };
    service.setToken('123');
    expect(service.token).toBe('123');
  });
});
