// import { shallowMount } from 'ts-jest/utils';
import Onboarding from '@/pages/onboarding.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

describe('Pages > onboarding.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(Onboarding, {
      stubs: ['nuxt-link'],
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
