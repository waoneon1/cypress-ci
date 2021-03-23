// import { shallowMount } from 'ts-jest/utils';
import ClassDashboard from '@/pages/dashboard.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

describe('Pages > dashboard.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(ClassDashboard, {
      mocks: {
        $route: {
          query: {
            success: '1',
          },
        },
      },
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.vm.alert).toBeTruthy();
  });
  it('berhasil mounting komponen', () => {
    const wrapper: any = shallowMount(ClassDashboard);
    expect(wrapper.vm.alert).toBeFalsy();
  });
});
