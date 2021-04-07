import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import CriteriaStore from '@/store/criteria';
import axios, { AxiosResponse } from 'axios';

const Vue = createLocalVue();
Vue.use(Vuex);

const criteriaModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      criteria: CriteriaStore,
    },
  });
  return getModule(CriteriaStore, store);
};

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: [
      {
        criteria_name: 'Design',
        id: '6062d4c9dd3acd0959261f51',
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxios.get.mockResolvedValue(mockedResponse);
/**
 * The test case
 */
describe('Criteria Store', () => {
  it('Mutation - setCriteria', () => {
    const service = criteriaModule();
    service.setCriteria('123');
    expect(service.dataCriteria).toBe('123');
  });

  it('Action - getCriteria true', async () => {
    const service = criteriaModule();

    expect(axios.get).not.toHaveBeenCalled();
    await service.getCriteria();
    expect(axios.get).toHaveBeenCalled();

    // expect(actual.data.responseCode).toBe('9999')
    // expect(actual.data.data.accessToken).toBe('dummy_akses_token')
  });

  it('Action - getQna response false', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostFalse: AxiosResponse = {
      data: {
        response_code: '404',
        message: 'fail',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponsePostFalse);
  
    const service = criteriaModule();
  
    await service.getCriteria();
    expect(axios.get).toHaveBeenCalled();
  });
  
  it('Action - getQna catch error', async () => {
    // try error
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxios.get.mockResolvedValue(mockedResponsePostTryError);
  
    const service = criteriaModule();
  
    await service.getCriteria({}).catch((e: any) => expect(e).toEqual({
      error: 'getCriteria {} catch error',
    }));
  });
  
});