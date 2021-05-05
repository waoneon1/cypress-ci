// import { shallowMount } from 'ts-jest/utils';
import CriteriaDomain from '@/pages/criteria/_domain.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const Vue = createLocalVue();
Vue.use(Vuex);

describe('Pages > criteria/_domain.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(CriteriaDomain, {
      stubs: ['nuxt-link'],
      mocks: {
        $route: {
          query: {
            success: '1',
          },
        },
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('test init()', () => {
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
          local: '{"criteria_name":"Requirements","id":"606d1d5cf50eab8cb59f434c"}',
        };
      },
    });

    expect(wrapper.vm.domain).toBe('Requirements');
    expect(wrapper.vm.domainId).toBe('606d1d5cf50eab8cb59f434c');
  });

  it('test goToQnaPage()', () => {
    const mockRouterPush = jest.fn();
    const wrapper: any = shallowMount(CriteriaDomain, {
      stubs: ['nuxt-link'],
      mocks: {
        $router: {
          push: mockRouterPush,
        },
      },
    });
    wrapper.vm.goToQnaPage();
  });
});

describe('Pages > criteria/_domain.vue kondisi 2', () => {
  it('test init() domain.criteria_name.toLowerCase() === url', () => {
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
          domain: '',
          domainId: 'nodata',
          local: '{"criteria_name":"xxx","id":"xxxx"}',
        };
      },
    });

    expect(wrapper.vm.domain).toBe('');
    expect(wrapper.vm.domainId).toBe('nodata');
  });
});
