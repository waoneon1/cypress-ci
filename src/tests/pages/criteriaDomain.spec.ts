import CriteriaDomain from '@/pages/criteria/_domain.vue';
import CriteriaStore from '@/store/criteria';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
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

describe('Pages > criteria/_domain.vue', () => {
  it('test init()', async () => {
    const mockRouterPush = jest.fn();
    const wrapper: any = shallowMount(CriteriaDomain, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: mockRouterPush,
        },
        $route: {
          params: { domain: 'requirements' },
        },
      },
      data() {
        return {
          domain: {
            id: '',
            criteria_name: 'requirements',
            shortdec: 'Loading ...',
            description: 'Loading ...',
            percent_progress: 0,
            slug: '',
          },
          help: false,
        };
      },
    });

    const service = criteriaModule();
    expect(axios.get).toHaveBeenCalled();
    const payload = { all: 48, org: 48 };
    await service.getCriteria(payload);

    expect(wrapper.vm.domain.criteria_name).toBe('requirements');
  });

  it('test goToQnaPage()', () => {
    const mockRouterPush = jest.fn();
    const wrapper: any = shallowMount(CriteriaDomain, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: mockRouterPush,
        },
        $route: {
          params: { domain: 'requirements' },
        },
      },
    });
    wrapper.vm.goToQnaPage();
  });
});
