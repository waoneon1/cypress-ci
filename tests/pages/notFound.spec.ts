// import { shallowMount } from 'ts-jest/utils';
import NotFound from '@/pages/notFound.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(NotFound);

describe('pages > notFound.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
