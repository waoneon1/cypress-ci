// import { shallowMount } from 'ts-jest/utils';
import PrepareOrganization from '@/pages/prepare/organization.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import EmployeeModule from '@/store/employee';
import axios, { AxiosResponse } from 'axios';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

const employeeModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      employee: EmployeeModule,
    },
  });
  return getModule(EmployeeModule, store);
};

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: {},
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxios.get.mockResolvedValue(mockedResponse);

describe('Pages > organization.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(PrepareOrganization, {
      stubs: ['nuxt-link'],
      data() {
        return {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMwNDIxNjEuNDg3MzMyLCJ1c2VyX2lkIjoiNjBiNDZkZjFmZDQwZTliOTgyNmJmMDM3IiwidXNlcl9vYXV0aF9pZCI6IjExMzMzMjc2MTc1ODA4MDc2NzkyOSIsInVzZXJfZW1haWwiOiJkaGFybWF3YW5AYWx0ZXJyYS5pZCIsInVzZXJfbmFtZSI6IkRoYXJtYXdhbiBTdWttYSBIYXJkaSBQcmF0YW1hIiwidXNlcl9vcmdhbml6YXRpb24iOiJURUMgLSBFTkciLCJ1c2VyX29yZ2FuaXphdGlvbl9mdWxsX3RleHQiOiJUZWNobm9sb2d5IC0gRW5naW5lZXJpbmciLCJ1c2VyX2J1c2luZXNzX3VuaXQiOiJITyAtIFRlY2hub2xvZ3kifQ.HuDF88wk1p-MZGiGiWrNHPbzsoqizgKYSa6CcjIUcE4',
        };
      },
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // mounting component
  it('Testing init()', async () => {
    const service = employeeModule();
    await service.getEmployee();
    expect(axios.get).toHaveBeenCalled();
  });

  // mounting component
  it('Testing decodeDataEmployee()', () => {
    expect(wrapper.vm.decodeDataEmployee().user_email).toBe('dharmawan@alterra.id');
    wrapper.setData({ token: '' });
    expect(wrapper.vm.decodeDataEmployee().user_email).toBe('nodata');
  });

  it('test save()', () => {
    wrapper = shallowMount(PrepareOrganization, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
    });
    wrapper.vm.save();
  });
});
