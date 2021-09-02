import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import EmployeeStore from '@/store/employee';
import axios, { AxiosResponse } from 'axios';

const Vue = createLocalVue();
Vue.use(Vuex);

const employeeModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      employee: EmployeeStore,
    },
  });
  return getModule(EmployeeStore, store);
};

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: [],
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
describe('Employee Store', () => {
  it('Action - getEmployee true', async () => {
    const service = employeeModule();

    expect(axios.get).not.toHaveBeenCalled();
    await service.getEmployee();
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

    const service = employeeModule();
    await service.getEmployee();
    expect(axios.get).toHaveBeenCalled();
  });

  it('Action - getQna catch error', async () => {
    // try error
    const mockedAxiosError = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxiosError.get.mockResolvedValue(mockedResponsePostTryError);

    const service = employeeModule();

    await service.getEmployee({}).catch((e: any) => expect(e).toEqual({
      error: 'getEmployee {} catch error',
    }));
  });
});
