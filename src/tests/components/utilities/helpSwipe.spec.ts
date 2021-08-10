// import { shallowMount } from 'ts-jest/utils';
import HelpSwipe from '@/components/utilities/HelpSwipe.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('Components > Utilities > HelpSwipe.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(HelpSwipe, {
        
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
