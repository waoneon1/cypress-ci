import Employee from '@/pages/prepare/employee.vue';
import { expect, it, describe } from '@jest/globals';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import EmployeeModule from '@/store/employee';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import axios, { AxiosResponse } from 'axios';

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

describe('pages > Faq.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(Employee, {
      stubs: ['nuxt-link'],
      data() {
        return {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMzMTQ2NTEuMTcxMDc0NCwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.Aw8qbhOYxf1E7nrG84n7xAj4i269AJVIW3wocHcB4Vg',
        };
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('berhasil mounting komponen tanpa token', () => {
    const wrapper: any = shallowMount(Employee, {
      stubs: ['nuxt-link'],
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('Action - getCriteria', async () => {
    const service = employeeModule();
    await service.getEmployee();
    expect(axios.get).toHaveBeenCalled();
  });

  it('test toggleSelect(email)', () => {
    const wrapper: any = shallowMount(Employee, {
      stubs: ['nuxt-link'],
      data() {
        return {
          selected: ['a@alterra.id', 'c@alterra.id', 'd@alterra.id'],
        };
      },
    });
    expect(wrapper.vm.selected.length).toBe(3);
    wrapper.vm.toggleSelect('e@alterra.id');
    expect(wrapper.vm.selected.length).toBe(4);
    wrapper.vm.toggleSelect('a@alterra.id');
    expect(wrapper.vm.selected.length).toBe(3);
  });

  it('test save()', () => {
    const wrapper: any = shallowMount(Employee, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          selected: ['a@alterra.id', 'c@alterra.id', 'd@alterra.id'],
        };
      },
    });
    wrapper.vm.save();
  });
});
