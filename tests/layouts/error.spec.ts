// import { shallowMount } from 'ts-jest/utils';
import Error from '@/layouts/error.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Error.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Error, {
      propsData: {
        error: {
          statusCode: 404,
          message: 'This page could not be found',
        },
      },
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
