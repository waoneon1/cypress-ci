// import { shallowMount } from 'ts-jest/utils';
import Help from '@/components/utilities/Help.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('Components > Utilities > Help.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Help, {
      propsData: {
        title: 'Ini Judul',
      },
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
