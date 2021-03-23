// import { shallowMount } from 'ts-jest/utils';
import ComponentsRandomPict from '@/components/ComponentsRandomPict.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const wrapper: any = shallowMount(ComponentsRandomPict);

describe('components > ComponentsRandomPict.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
