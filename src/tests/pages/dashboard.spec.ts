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

describe('Pages > dashboard.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(ClassDashboard, {});
    expect(wrapper.vm).toBeTruthy();
  });

  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
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

  it('Criteria progress', async () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
    });
    wrapper.vm.criteriaProgress();
  });
});
