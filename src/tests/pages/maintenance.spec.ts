import Maintenance from '@/pages/maintenance.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(Maintenance);

describe('pages > Maintenance.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
