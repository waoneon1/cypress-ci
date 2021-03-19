// import { shallowMount } from 'ts-jest/utils';
import ClassDashboard from '@/pages/dashboard.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(ClassDashboard);

describe('Pages > dashboard.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
