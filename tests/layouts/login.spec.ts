import Login from '@/layouts/login.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Login.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      stubs: ['Nuxt'],
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
