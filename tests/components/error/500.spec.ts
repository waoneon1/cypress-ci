// import { shallowMount } from 'ts-jest/utils';
import Error500 from '@/components/error/500.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Error.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Error500, {
      propsData: {
        error: '500',
      },
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
