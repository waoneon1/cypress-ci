// import { shallowMount } from 'ts-jest/utils';
import ClassLogin from '@/pages/index.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('Pages > index.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      data() {
        return {
          // supaya bisa memanggil focus, makan mesti aktifkan dulu input textarea replynya
          alert: false,
          email: 'rizky@alterra.id',
          $gAuth: jest.fn(),
        };
      },
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // mounting component
  it('Function Validate email', () => {
    expect(wrapper.vm.validateEmail()).toEqual(true);
  });

  // mounting component
  it('Function Alert login status', () => {    
    const successTitle = 'Your Login Success'
    const successDescription = 'Welcome'
    const successTheme = 'success'
    
    const failTitle = 'Your Login Failed'
    const failDescription = 'Try again using alterra email'
    const failTheme = 'danger'

    wrapper.vm.loginStatus(true)
    expect(wrapper.vm.alertTitle).toEqual(successTitle);
    expect(wrapper.vm.alertDescription).toEqual(successDescription);
    expect(wrapper.vm.alertTheme).toEqual(successTheme);

    wrapper.vm.loginStatus(false)
    expect(wrapper.vm.alertTitle).toEqual(failTitle);
    expect(wrapper.vm.alertDescription).toEqual(failDescription);
    expect(wrapper.vm.alertTheme).toEqual(failTheme);
    
  });

  // mounting component
  it('Handle click login', () => {
    wrapper.vm.handleClickLogin()
    //expect(wrapper.emitted().handleClickLogin).toBeTruthy();
    //wrapper.vm.email = 'dharmawan@alterra.id'
    //wrapper.vm.validateEmail()
    
    //expect(wrapper.vm.$gAuth.signIn()).toHaveBeenCalled();
  }); 
  
});
