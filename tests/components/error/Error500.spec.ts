import Error500 from '@/components/error/Error500.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(Error500);

describe('components > Error500.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
