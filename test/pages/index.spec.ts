// import { shallowMount } from 'ts-jest/utils';
import ClassLogin from '@/pages/index.vue';
import { expect, it, describe, beforeEach } from '@jest/globals';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';

let wrapper: Wrapper<ClassLogin>;

describe('Layouts > default.vue', () => {
  beforeEach(() => {
    const props = {
      alert: false,
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
