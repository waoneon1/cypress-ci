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
  it('Mutation - setCriteria test slug', () => {
    const crit = {
      data: [{
        id: '',
        criteria_name: 'Design System',
        shortdec: 'Loading ...',
        description: 'Loading ...',
        percent_progress: 0,
      }],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    const service = criteriaModule();
    service.setCriteria(crit);
    expect(service.dataCriteria.data[0].slug).toBe('design system');
  });

  it('Action - getCriteria true', async () => {
    const service = criteriaModule();

    expect(axios.get).not.toHaveBeenCalled();
    await service.getCriteria();
    expect(axios.get).toHaveBeenCalled();
  });

  it('Action - getQna response false', async () => {
    const mockedAxiosFalse = axios as jest.Mocked<typeof axios>;
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
    mockedAxiosFalse.get.mockResolvedValue(mockedResponsePostFalse);

    const service = criteriaModule();

    await service.getCriteria();
    expect(axios.get).toHaveBeenCalled();
  });

  it('Action - getQna catch error', async () => {
    // try error
    const mockedAxiosError = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxiosError.get.mockResolvedValue(mockedResponsePostTryError);

    const service = criteriaModule();

    await service.getCriteria({}).catch((e: any) => expect(e).toEqual({
      error: 'getCriteria {} catch error',
    }));
  });
});
