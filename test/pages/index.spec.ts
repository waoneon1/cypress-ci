// import { shallowMount } from 'ts-jest/utils';
import ClassLogin from '@/pages/index.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<ClassLogin>;

describe('Pages > index.vue', () => {
  beforeEach(() => {
    const props = {
      alert: false,
      email: 'rizky@alterra.id',
    };
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      propsData: props,
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm.validateEmail()).toBeTruthy();
  });
});

// describe('Layouts > default.vue', () => {
//   // mounting component
//   it('berhasil mounting komponen', () => {
//     const wrapper = shallowMount(Default, {
//       stubs: ['ComponentSidebar', 'ComponentHeaderDashboard', 'Nuxt'],
//     });
//     expect(wrapper.vm).toBeTruthy();
//   });

//   it('testing onClose()', () => {
//     const wrapper = shallowMount(Default, {
//       stubs: ['ComponentSidebar', 'ComponentHeaderDashboard', 'Nuxt'],
//     });
//     wrapper.setData({
//       navMobile: false,
//     });
//     wrapper.vm.onClose();
//     expect(wrapper.vm.navMobile).toBeFalsy();
//   });
// });
