// import { shallowMount } from 'ts-jest/utils';
import ClassLogin from '@/pages/index.vue';
import {
  expect, it, describe, beforeEach, afterEach,
} from '@jest/globals';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import CredentialStore from '@/store/credential';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import axios, { AxiosResponse } from 'axios';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

const credentialModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      credential: CredentialStore,
    },
  });
  return getModule(CredentialStore, store);
};

// Mock axios
jest.mock('axios');
let mockedAxios;
let mockedResponse: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: {
      access_token: 'dummy_akses_token',
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
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
    mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(mockedResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('Function Validate email', () => {
    expect(wrapper.vm.validateEmail()).toEqual(true);
  });

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

  it('Handle click login normal case', async () => {
    const router = jest.fn();
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
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            const signin = jest.fn();
            signin.mockReturnValue({
              Aa: '113687123356909921492',
              Qs: {
                EI:
                  'https://lh6.googleusercontent.com/-5e87Ngwkp14/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX-rsvGmnwxBsg4YfzU5VbIdPC5Q/s96-c/photo.jpg',
                ER: '113687123356909921492',
                Te: 'Rizky Maulana',
                kR: 'Maulana',
                oT: 'Rizky',
                zt: 'rmaulana@alterra.id',
              },
              tc: {
                id_token:
                  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNjg3MTIzMzU2OTA5OTIxNDkyIiwiaGQiOiJhbHRlcnJhLmlkIiwiZW1haWwiOiJybWF1bGFuYUBhbHRlcnJhLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUakw2bFJ5T0UzcFhqbEZfekRMT19RIiwibmFtZSI6IlJpemt5IE1hdWxhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01ZTg3Tmd3a3AxNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuWC1yc3ZHbW53eEJzZzRZZnpVNVZiSWRQQzVRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaXpreSIsImZhbWlseV9uYW1lIjoiTWF1bGFuYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE2NDY5OTI4LCJleHAiOjE2MTY0NzM1MjgsImp0aSI6IjU0YjRiZjFhNTM3OGM4YjA0MTk2NzI0ZDM5NzQyZGExN2ExY2MxODAifQ.Mqb0vrJHf_0wLBkbO-uny2z3h4LCmAibOmIVSF1LKOPzOx_kup3W7ZS-IuKKa_iP4EadvYTDT3H_1O-6q2glNrEJcllHr3y4kadL7K3GIFbwWasAFbObtMwpDNw7KcOJKkp9jOzQBQeEMq2z0mAoQ2F5NQqXlKIpNAqX_QHLdKmPENbm0IQrapEyq9dzLoatQWrdWjBHa0W2oVpUcq9282j33BlKLKaVR0AZcSvCnHNXq18a0xmMbgYMoZGazW0svPl5S_SJU9fORa-n20wffdxt2S5mg56CVVxKkoWXYV9-1RrEAEIoaWpy2jjw02YxtGXI3EyoHxJXBhikkuJJuA',
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

    const service = credentialModule();
    const token = 'token';

    await service.getToken(token);
    expect(axios.post).toHaveBeenCalled();
  });

  it('Handle click login respon email nt', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            const signin = jest.fn();
            signin.mockReturnValue({
              Aa: '113687123356909921492',
              Qs: {
                EI: 'https://lh6.googleusercontent.com/-5e87Ngwkp14/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX-rsvGmnwxBsg4YfzU5VbIdPC5Q/s96-c/photo.jpg',
                ER: '113687123356909921492',
                Te: 'Rizky Maulana',
                kR: 'Maulana',
                oT: 'Rizky',
                nt: 'rmaulana@alterra.id',
              },
              tc: {
                id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNjg3MTIzMzU2OTA5OTIxNDkyIiwiaGQiOiJhbHRlcnJhLmlkIiwiZW1haWwiOiJybWF1bGFuYUBhbHRlcnJhLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUakw2bFJ5T0UzcFhqbEZfekRMT19RIiwibmFtZSI6IlJpemt5IE1hdWxhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01ZTg3Tmd3a3AxNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuWC1yc3ZHbW53eEJzZzRZZnpVNVZiSWRQQzVRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaXpreSIsImZhbWlseV9uYW1lIjoiTWF1bGFuYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE2NDY5OTI4LCJleHAiOjE2MTY0NzM1MjgsImp0aSI6IjU0YjRiZjFhNTM3OGM4YjA0MTk2NzI0ZDM5NzQyZGExN2ExY2MxODAifQ.Mqb0vrJHf_0wLBkbO-uny2z3h4LCmAibOmIVSF1LKOPzOx_kup3W7ZS-IuKKa_iP4EadvYTDT3H_1O-6q2glNrEJcllHr3y4kadL7K3GIFbwWasAFbObtMwpDNw7KcOJKkp9jOzQBQeEMq2z0mAoQ2F5NQqXlKIpNAqX_QHLdKmPENbm0IQrapEyq9dzLoatQWrdWjBHa0W2oVpUcq9282j33BlKLKaVR0AZcSvCnHNXq18a0xmMbgYMoZGazW0svPl5S_SJU9fORa-n20wffdxt2S5mg56CVVxKkoWXYV9-1RrEAEIoaWpy2jjw02YxtGXI3EyoHxJXBhikkuJJuA',
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

    const service = credentialModule();
    const token = 'token';

    await service.getToken(token);
    expect(axios.post).toHaveBeenCalled();
    expect(wrapper.vm.alertTitle).toBe('Your Login Success');
    expect(wrapper.vm.alertDescription).toBe('Welcome');
    expect(wrapper.vm.alertTheme).toBe('success');
  });

  it('Handle click login respon email non alterra', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            const signin = jest.fn();
            signin.mockReturnValue({
              Aa: '113687123356909921492',
              Qs: {
                EI: 'https://lh6.googleusercontent.com/-5e87Ngwkp14/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX-rsvGmnwxBsg4YfzU5VbIdPC5Q/s96-c/photo.jpg',
                ER: '113687123356909921492',
                Te: 'Rizky Maulana',
                kR: 'Maulana',
                oT: 'Rizky',
                nt: 'rizky@gmail.com',
              },
              tc: {
                id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNjg3MTIzMzU2OTA5OTIxNDkyIiwiaGQiOiJhbHRlcnJhLmlkIiwiZW1haWwiOiJybWF1bGFuYUBhbHRlcnJhLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUakw2bFJ5T0UzcFhqbEZfekRMT19RIiwibmFtZSI6IlJpemt5IE1hdWxhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01ZTg3Tmd3a3AxNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuWC1yc3ZHbW53eEJzZzRZZnpVNVZiSWRQQzVRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaXpreSIsImZhbWlseV9uYW1lIjoiTWF1bGFuYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE2NDY5OTI4LCJleHAiOjE2MTY0NzM1MjgsImp0aSI6IjU0YjRiZjFhNTM3OGM4YjA0MTk2NzI0ZDM5NzQyZGExN2ExY2MxODAifQ.Mqb0vrJHf_0wLBkbO-uny2z3h4LCmAibOmIVSF1LKOPzOx_kup3W7ZS-IuKKa_iP4EadvYTDT3H_1O-6q2glNrEJcllHr3y4kadL7K3GIFbwWasAFbObtMwpDNw7KcOJKkp9jOzQBQeEMq2z0mAoQ2F5NQqXlKIpNAqX_QHLdKmPENbm0IQrapEyq9dzLoatQWrdWjBHa0W2oVpUcq9282j33BlKLKaVR0AZcSvCnHNXq18a0xmMbgYMoZGazW0svPl5S_SJU9fORa-n20wffdxt2S5mg56CVVxKkoWXYV9-1RrEAEIoaWpy2jjw02YxtGXI3EyoHxJXBhikkuJJuA',
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

    const service = credentialModule();
    const token = 'token';

    await service.getToken(token);
    expect(wrapper.vm.alertTitle).toBe('Your Login Failed');
    expect(wrapper.vm.alertDescription).toBe('Try again using alterra email');
    expect(wrapper.vm.alertTheme).toBe('danger');
  });

  it('Handle click login auth respon fail', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            const signin = jest.fn();
            signin.mockReturnValue({
              Aa: '113687123356909921492',
              Qs: {
                EI: 'https://lh6.googleusercontent.com/-5e87Ngwkp14/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX-rsvGmnwxBsg4YfzU5VbIdPC5Q/s96-c/photo.jpg',
                ER: '113687123356909921492',
                Te: 'Rizky Maulana',
                kR: 'Maulana',
                oT: 'Rizky',
                nt: 'rizky@alterra.id',
              },
              tc: {
                id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNjg3MTIzMzU2OTA5OTIxNDkyIiwiaGQiOiJhbHRlcnJhLmlkIiwiZW1haWwiOiJybWF1bGFuYUBhbHRlcnJhLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUakw2bFJ5T0UzcFhqbEZfekRMT19RIiwibmFtZSI6IlJpemt5IE1hdWxhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01ZTg3Tmd3a3AxNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuWC1yc3ZHbW53eEJzZzRZZnpVNVZiSWRQQzVRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaXpreSIsImZhbWlseV9uYW1lIjoiTWF1bGFuYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE2NDY5OTI4LCJleHAiOjE2MTY0NzM1MjgsImp0aSI6IjU0YjRiZjFhNTM3OGM4YjA0MTk2NzI0ZDM5NzQyZGExN2ExY2MxODAifQ.Mqb0vrJHf_0wLBkbO-uny2z3h4LCmAibOmIVSF1LKOPzOx_kup3W7ZS-IuKKa_iP4EadvYTDT3H_1O-6q2glNrEJcllHr3y4kadL7K3GIFbwWasAFbObtMwpDNw7KcOJKkp9jOzQBQeEMq2z0mAoQ2F5NQqXlKIpNAqX_QHLdKmPENbm0IQrapEyq9dzLoatQWrdWjBHa0W2oVpUcq9282j33BlKLKaVR0AZcSvCnHNXq18a0xmMbgYMoZGazW0svPl5S_SJU9fORa-n20wffdxt2S5mg56CVVxKkoWXYV9-1RrEAEIoaWpy2jjw02YxtGXI3EyoHxJXBhikkuJJuA',
              },
            });
            return signin();
          },
          // isAuthorized() {
          //   return false;
          // },
        },
        $store: jest.fn(),
        getToken() {
          return jest.fn();
        },
      },
    });
    await wrapper.vm.handleClickLogin();

    const service = credentialModule();
    const token = 'token';

    await service.getToken(token);
    expect(wrapper.vm.alertTitle).toBe('Your Login Failed');
    expect(wrapper.vm.alertDescription).toBe('Try again using alterra email');
    expect(wrapper.vm.alertTheme).toBe('danger');
  });

  it('Handle click login respon not 000', async () => {
    const router = jest.fn();
    mockedResponse = {
      data: {
        response_code: '1234',
        message: 'test error',
        data: {
          access_token: 'dummy_akses_token',
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(mockedResponse);
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            const signin = jest.fn();
            signin.mockReturnValue({
              Aa: '113687123356909921492',
              Qs: {
                EI: 'https://lh6.googleusercontent.com/-5e87Ngwkp14/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnX-rsvGmnwxBsg4YfzU5VbIdPC5Q/s96-c/photo.jpg',
                ER: '113687123356909921492',
                Te: 'Rizky Maulana',
                kR: 'Maulana',
                oT: 'Rizky',
                nt: 'rizky@alterra.id',
              },
              tc: {
                id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhOGJhNTY1MmE3MDQ0MTIxZDRmZWRhYzhmMTRkMTRjNTRlNDg5NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjQ2NTMxNTI4NDQ2LTEzNm1maGd2a2ZwNGJwZGVtOG44Y3Jpcml2NG9xbTYwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNjg3MTIzMzU2OTA5OTIxNDkyIiwiaGQiOiJhbHRlcnJhLmlkIiwiZW1haWwiOiJybWF1bGFuYUBhbHRlcnJhLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUakw2bFJ5T0UzcFhqbEZfekRMT19RIiwibmFtZSI6IlJpemt5IE1hdWxhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy01ZTg3Tmd3a3AxNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuWC1yc3ZHbW53eEJzZzRZZnpVNVZiSWRQQzVRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaXpreSIsImZhbWlseV9uYW1lIjoiTWF1bGFuYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE2NDY5OTI4LCJleHAiOjE2MTY0NzM1MjgsImp0aSI6IjU0YjRiZjFhNTM3OGM4YjA0MTk2NzI0ZDM5NzQyZGExN2ExY2MxODAifQ.Mqb0vrJHf_0wLBkbO-uny2z3h4LCmAibOmIVSF1LKOPzOx_kup3W7ZS-IuKKa_iP4EadvYTDT3H_1O-6q2glNrEJcllHr3y4kadL7K3GIFbwWasAFbObtMwpDNw7KcOJKkp9jOzQBQeEMq2z0mAoQ2F5NQqXlKIpNAqX_QHLdKmPENbm0IQrapEyq9dzLoatQWrdWjBHa0W2oVpUcq9282j33BlKLKaVR0AZcSvCnHNXq18a0xmMbgYMoZGazW0svPl5S_SJU9fORa-n20wffdxt2S5mg56CVVxKkoWXYV9-1RrEAEIoaWpy2jjw02YxtGXI3EyoHxJXBhikkuJJuA',
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

    const service = credentialModule();
    const token = 'token';

    await service.getToken(token);
    expect(wrapper.vm.alertTitle).toBe('Your Login Failed');
    expect(wrapper.vm.alertDescription).toBe('Try again using alterra email');
    expect(wrapper.vm.alertTheme).toBe('danger');
  });
});
