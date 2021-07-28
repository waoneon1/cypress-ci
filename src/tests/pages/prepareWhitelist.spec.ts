import Whitelist from '@/pages/prepare/whitelist.vue';
import { expect, it, describe } from '@jest/globals';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex from 'vuex';
import axios, { AxiosResponse } from 'axios';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: {},
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxios.get.mockResolvedValue(mockedResponse);

describe('pages > Faq.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Whitelist, {
      stubs: ['nuxt-link'],
      data() {
        return {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMzMTQ2NTEuMTcxMDc0NCwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.Aw8qbhOYxf1E7nrG84n7xAj4i269AJVIW3wocHcB4Vg',
        };
      },
    });
  });
  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('Test if token false', () => {
    wrapper.setData({ token: false });
    expect(wrapper.vm.token).toBe(false);
  });
});
