import Error404 from '@/components/error/404.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(Error404);

describe('components > Error404.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
