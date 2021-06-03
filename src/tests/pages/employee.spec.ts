import Employee from '@/pages/prepare/employee.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

describe('pages > Faq.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(Employee, {
      stubs: ['nuxt-link'],
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
