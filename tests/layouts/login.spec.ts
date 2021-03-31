import LayoutLogin from '@/layouts/login.vue';
import { it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Login.vue', () => {
  it('Handle click login normal case', async () => {
    const router = jest.fn();
    wrapper = shallowMount(LayoutLogin, {
      stubs: ['Nuxt'],
      mocks: {
        $router: {
          push: router,
        },
      },
    });

    wrapper.vm.pageStatus = true;
    wrapper.vm.checkMaintenance();

    wrapper.vm.pageStatus = false;
    wrapper.vm.checkMaintenance();
  });
});
