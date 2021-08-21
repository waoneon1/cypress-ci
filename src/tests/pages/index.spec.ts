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
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            return {
              getAuthResponse() {
                return {
                  id_token: 'xxxx',
                };
              },
              getBasicProfile() {
                return {
                  getEmail() {
                    return 'dharmawan@alterra.id';
                  },
                };
              },
            };
          },
          isAuthorized: true,
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

  it('Handle click login respon email validate success', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $route: {
          query: {
            redirect_url: '/onboarding',
          },
        },
        $gAuth: {
          signIn() {
            return {
              getAuthResponse() {
                return {
                  id_token: 'xxxx',
                };
              },
              getBasicProfile() {
                return {
                  getEmail() {
                    return 'dharmawan@alterra.id';
                  },
                };
              },
            };
          },
          isAuthorized: true,
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

  it('Handle click login respon email validate failed (non alterra login)', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            return {
              getAuthResponse() {
                return {
                  id_token: 'xxxx',
                };
              },
              getBasicProfile() {
                return {
                  getEmail() {
                    return 'dharmawan@gmail.com';
                  },
                };
              },
            };
          },
          isAuthorized: true,
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

  it('Handle click login respon email validate success > $gAuth.isAuthorized failed', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            return {
              getAuthResponse() {
                return {
                  id_token: 'xxxx',
                };
              },
              getBasicProfile() {
                return {
                  getEmail() {
                    return 'dharmawan@alterra.id';
                  },
                };
              },
            };
          },
          isAuthorized: false,
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

  it('Handle click login respon not 0000', async () => {
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
            return {
              getAuthResponse() {
                return {
                  id_token: 'xxxx',
                };
              },
              getBasicProfile() {
                return {
                  getEmail() {
                    return 'dharmawan@alterra.id';
                  },
                };
              },
            };
          },
          isAuthorized: true,
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

  it('Handle click login catch error', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $gAuth: {
          signIn() {
            return false;
          },
        },
      },
    });

    await wrapper.vm.handleClickLogin();
  });

  it('Handle click login respon email validate success > redirect dashboard', async () => {
    const router = jest.fn();
    wrapper = shallowMount(ClassLogin, {
      stubs: ['Alert'],
      mocks: {
        $router: {
          push: router,
        },
        $route: {
          query: {
            redirect_url: [],
          },
        },
      },
    });

    wrapper.vm.redirectUri();
  });
});
