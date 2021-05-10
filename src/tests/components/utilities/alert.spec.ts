// import { shallowMount } from 'ts-jest/utils';
import Alert from '@/components/utilities/Alert.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('Components > Utilities > Alert.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Alert, {
      propsData: {
        title: 'Ini Judul',
        description: 'Ini Description',
        theme: 'Ini Theme',
      },
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // mounting component
  it('Emit close > setAlertFalse()', () => {
    wrapper.vm.setAlertFalse();
    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
