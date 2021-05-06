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
  const router = jest.fn();
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: router,
        },
      },
    });
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

  it('test setRecommendation', async () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      stubs: ['nuxt-link'],
      data() {
        return {
          criteria: [{
            criteria_name: "Design",
            id: "6062d4c9dd3acd0959261f51",
            percent_progress: 0
          },{
            criteria_name: "XXX",
            id: "6062d4c9dd3acd0959261f51",
            percent_progress: 10
          }]
        }
      }
    });
    wrapper.vm.setRecommendation();
  });
});
