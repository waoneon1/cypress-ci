// import { shallowMount } from 'ts-jest/utils';
import ClassLogin from '@/pages/index.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;
const googleUser = {
  getBasicProfile() {
    return {
      nt: 'dharmawan@alterra.id',
    };
  },
  getAuthResponse() {
    return {
      id_token: 'fdlksjaflkdsjklfds',
    };
  },
};

describe('Pages > index.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      data() {
        return {
          // supaya bisa memanggil focus, makan mesti aktifkan dulu input textarea replynya
          alert: false,
          email: 'rizky@alterra.id',
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
    const successTitle = 'Your Login Success';
    const successDescription = 'Welcome';
    const successTheme = 'success';

    const failTitle = 'Your Login Failed';
    const failDescription = 'Try again using alterra email';
    const failTheme = 'danger';

    wrapper.vm.loginStatus(true);
    expect(wrapper.vm.alertTitle).toEqual(successTitle);
    expect(wrapper.vm.alertDescription).toEqual(successDescription);
    expect(wrapper.vm.alertTheme).toEqual(successTheme);

    wrapper.vm.loginStatus(false);
    expect(wrapper.vm.alertTitle).toEqual(failTitle);
    expect(wrapper.vm.alertDescription).toEqual(failDescription);
    expect(wrapper.vm.alertTheme).toEqual(failTheme);
  });

  // mounting component
  it('Handle click login', async () => {
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      data() {
        return {
          // supaya bisa memanggil focus, makan mesti aktifkan dulu input textarea replynya
          alert: false,
          email: 'rizky@alterra.id',
        };
      },
      mocks: {
        $gAuth: {
          signIn() {
            const signin = jest.fn();
            signin.mockReturnValue({
              Aa: "113687123356909921492",
              Qs: {
                EI: "https://lh6.googleusercontent.com/-5e87Ngwkp14/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX-rsvGmnwxBsg4YfzU5VbIdPC5Q/s96-c/photo.jpg",
                ER: "113687123356909921492",
                Te: "Rizky Maulana",
                kR: "Maulana",
                oT: "Rizky",
                zt: "rmaulana@alterra.id",
              },
              tc: {
                id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNjg3MTIzMzU2OTA5OTIxNDkyIiwiaGQiOiJhbHRlcnJhLmlkIiwiZW1haWwiOiJybWF1bGFuYUBhbHRlcnJhLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUakw2bFJ5T0UzcFhqbEZfekRMT19RIiwibmFtZSI6IlJpemt5IE1hdWxhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01ZTg3Tmd3a3AxNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuWC1yc3ZHbW53eEJzZzRZZnpVNVZiSWRQQzVRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaXpreSIsImZhbWlseV9uYW1lIjoiTWF1bGFuYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE2NDY5OTI4LCJleHAiOjE2MTY0NzM1MjgsImp0aSI6IjU0YjRiZjFhNTM3OGM4YjA0MTk2NzI0ZDM5NzQyZGExN2ExY2MxODAifQ.Mqb0vrJHf_0wLBkbO-uny2z3h4LCmAibOmIVSF1LKOPzOx_kup3W7ZS-IuKKa_iP4EadvYTDT3H_1O-6q2glNrEJcllHr3y4kadL7K3GIFbwWasAFbObtMwpDNw7KcOJKkp9jOzQBQeEMq2z0mAoQ2F5NQqXlKIpNAqX_QHLdKmPENbm0IQrapEyq9dzLoatQWrdWjBHa0W2oVpUcq9282j33BlKLKaVR0AZcSvCnHNXq18a0xmMbgYMoZGazW0svPl5S_SJU9fORa-n20wffdxt2S5mg56CVVxKkoWXYV9-1RrEAEIoaWpy2jjw02YxtGXI3EyoHxJXBhikkuJJuA"
              },
            });
            return signin();
          },
          isAuthorized() {
            return true;
          },
        },
        $store: jest.fn(),
        getToken() {
          return jest.fn();
        },
      },
    });
    await wrapper.vm.handleClickLogin();
    // const myMock = jest.fn();
    // console.log(myMock());
    // // > undefined

    // myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

    // console.log(myMock(), myMock(), myMock(), myMock());
    // wrapper.setData({
    //   googleUser,
    // });

    // expect(wrapper.emitted().handleClickLogin).toBeTruthy();
    // wrapper.vm.email = 'dharmawan@alterra.id'
    // wrapper.vm.validateEmail()

    // expect(wrapper.vm.$gAuth.signIn()).toHaveBeenCalled();
  });

  test('async test', async () => {
    const asyncMock = jest.fn().mockResolvedValue(43);
    await asyncMock(); // 43
    // console.log(asyncMock)
  });
});
