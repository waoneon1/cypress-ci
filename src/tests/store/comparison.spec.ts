import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import ComparisonStore from '@/store/comparison';
import axios, { AxiosResponse } from 'axios';

const Vue = createLocalVue();
Vue.use(Vuex);

const comparisonModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      comparison: ComparisonStore,
    },
  });
  return getModule(ComparisonStore, store);
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
        score: 0.02291289235442241, employee_id: '60c1c6088b9165fab214c6e4', employee_name: 'Septema Umna Maulida', employee_email: 'septema@alterra.id',
      },
      {
        score: 0.022905904234226733, employee_id: '60c1c6088b9165fab214c6da', employee_name: 'Mas Agus Setyo Purwanto', employee_email: 'agus@alterra.id',
      },
      {
        score: 0.02210301382876708, employee_id: '60c1c6088b9165fab214c6dc', employee_name: 'Herman Sutanto', employee_email: 'herman@alterra.id',
      },
      {
        score: 0.02210301382876708, employee_id: '6103aaf832720826e811358c', employee_name: 'Doni H', employee_email: 'dhadiansyah@alterra.id',
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
describe('Comparison Store', () => {
  it('Action - getCriteria true', async () => {
    const service = comparisonModule();

    expect(axios.get).not.toHaveBeenCalled();
    await service.getComparison();
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

    const service = comparisonModule();
    await service.getComparison();
    expect(axios.get).toHaveBeenCalled();
  });

  it('Action - getQna catch error', async () => {
    // try error
    const mockedAxiosError = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxiosError.get.mockResolvedValue(mockedResponsePostTryError);

    const service = comparisonModule();

    await service.getComparison({}).catch((e: any) => expect(e).toEqual({
      error: 'getCriteria {} catch error',
    }));
  });
});
