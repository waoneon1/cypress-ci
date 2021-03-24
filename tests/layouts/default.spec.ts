import Default from '@/layouts/default.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(Default);

describe('layout > Default.vue', () => {
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
