// import { shallowMount } from 'ts-jest/utils';
import Loading from '@/components/utilities/Loading.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('Components > Utilities > Loading.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Loading, {

    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
