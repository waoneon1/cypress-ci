// import { shallowMount } from 'ts-jest/utils';
import Error from '@/layouts/error.vue';
import { expect, it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Error.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Error, {
      propsData: {
        error: 404,
      },
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('Function Error Page', () => {
    const successTitle = 'Your Login Success';

    const failTitle = 'Your Login Failed';

    wrapper.vm.errorPage(404);
    expect(wrapper.vm.alertTitle).toBe(successTitle);

    wrapper.vm.errorPage(500);
    expect(wrapper.vm.alertTitle).toBe(failTitle);
  });
});
