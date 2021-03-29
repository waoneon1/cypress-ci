// import { shallowMount } from 'ts-jest/utils';
import Error from '@/layouts/error.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Error.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Error, {
      propsData: {
        error: 'error404',
      },
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
