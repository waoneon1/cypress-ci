// import { shallowMount } from 'ts-jest/utils';
import ClassDashboard from '@/pages/dashboard.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import { getModule } from 'vuex-module-decorators';
import CriteriaModule from '@/store/criteria';
import axios, { AxiosResponse } from 'axios';

const Vue = createLocalVue();
Vue.use(Vuex);

const criteriaModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      criteria: CriteriaModule,
    },
  });
  return getModule(CriteriaModule, store);
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

// mock setInterval
jest.useFakeTimers();

describe('Pages > dashboard.vue', () => {
  // mounting component
  const router = jest.fn();
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: router,
        },
      },
      data() {
        return {
          selected: { selected: [] },
        };
      },
    });
    expect(wrapper.vm).toBeTruthy();

    // jalankan setInterval
    jest.advanceTimersByTime(4000);
    expect(setInterval).toBeCalled();
    expect(wrapper.vm.alert).toBeFalsy();
  });

  it('berhasil mounting komponen alert', () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: router,
        },
      },
    });
    expect(wrapper.vm.alert).toBeFalsy();
  });

  it('test goToQnaPage()', () => {
    const mockRouterPush = jest.fn();
    const payload = {
      criteria_name: 'requirements',
      id: '606d1d5cf50eab8cb59f434c',
    };
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: mockRouterPush,
        },
      },
    });
    wrapper.vm.goToQnaPage(payload);
  });

  it('Action - getCriteria', async () => {
    const service = criteriaModule();

    await service.getCriteria();
    expect(axios.get).toHaveBeenCalled();
  });

  it('test setRecommendation', async () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: router,
        },
      },
      data() {
        return {
          criteria: [
            {
              criteria_name: 'Design',
              id: '6062d4c9dd3acd0959261f51',
              percent_progress: 0,
            },
            {
              criteria_name: 'XXX',
              id: '6062d4c9dd3acd0959261f51',
              percent_progress: 10,
            },
          ],
        };
      },
    });
    wrapper.vm.setRecommendation();
  });

  it('test checkRecommandation false', async () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: router,
        },
      },
      data() {
        return {
          criteria: [
            {
              criteria_name: 'Design',
              id: '6062d4c9dd3acd0959261f51',
              percent_progress: 0,
            },
            {
              criteria_name: 'XXX',
              id: '6062d4c9dd3acd0959261f51',
              percent_progress: 10,
            },
          ],
        };
      },
    });
    expect(wrapper.vm.checkRecommandation({ id: false })).toBeFalsy();
  });

  it('Testing decodeDataEmployee()', () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      data() {
        return {
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMzMTQ2NTEuMTcxMDc0NCwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.Aw8qbhOYxf1E7nrG84n7xAj4i269AJVIW3wocHcB4Vg',
        };
      },
    });
    wrapper.vm.decodeDataEmployee();
  });
});
