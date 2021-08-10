// import { shallowMount } from 'ts-jest/utils';
import SkeletonQna from '@/components/utilities/SkeletonQna.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('Components > Utilities > SkeletonQna.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(SkeletonQna, {
        
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
