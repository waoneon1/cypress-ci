import ClassLogout from '@/pages/logout.vue';
import {
  expect, it, describe, jest,
} from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

const mockRouterPush = jest.fn();
const wrapper: any = shallowMount(ClassLogout, {
  mocks: {
    $router: {
      push: mockRouterPush,
    },
  },
});

describe('Pages > logout.vue', () => {
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
