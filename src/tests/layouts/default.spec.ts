import Default from '@/layouts/default.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Default.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Default, {
      stubs: ['Nuxt'],
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
