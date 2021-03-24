import Login from '@/layouts/login.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(Login);

describe('layout > Login.vue', () => {
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
