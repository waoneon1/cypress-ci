// import { shallowMount } from 'ts-jest/utils';
import Error404 from '@/components/error/404.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Error.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Error404, {
      propsData: {
        error: '404',
      },
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
