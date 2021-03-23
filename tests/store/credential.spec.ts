import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import CredentialStore from '@/store/credential';
import axios, { AxiosResponse } from 'axios';

// import { $axios } from '~/utils/api';

// let action: any;
// const testedAction: any = (context = {}, payload = {}) => CredentialStore.actions[action].bind({$axios: axios})(context, payload);

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

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse: AxiosResponse = {
  data: {
    response_code: '9999',
    message: 'test success',
    data: {
      access_token: 'dummy_akses_token',
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxios.post.mockResolvedValue(mockedResponse);
/**
 * The test case
 */
describe('Credential Store', () => {
  it('Mutation - setToken', () => {
    const service = credentialModule();
    service.setToken('123');
    expect(service.dataCredential).toBe('123');
  });

  it('Action - getToken', async () => {
    const service = credentialModule();
    const token = 'token';

    expect(axios.post).not.toHaveBeenCalled();
    await service.getToken(token);
    expect(axios.post).toHaveBeenCalled();

    // expect(actual.data.responseCode).toBe('9999')
    // expect(actual.data.data.accessToken).toBe('dummy_akses_token')
  });
});
