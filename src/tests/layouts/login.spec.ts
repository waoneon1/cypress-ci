import LayoutLogin from '@/layouts/login.vue';
import { it, describe } from '@jest/globals';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

describe('layout > Login.vue', () => {
  it('Handle click login normal case', async () => {
    const router = jest.fn();
    wrapper = shallowMount(LayoutLogin, {
      stubs: ['Nuxt'],
      mocks: {
        $router: {
          push: router,
        },
      },
      head() {
        return {
          bodyAttrs: {
            /* eslint-disable-next-line no-use-before-define */
            class: 'class login',
          },
        };
      },
    });

    wrapper.vm.pageStatus = true;
    wrapper.vm.check();

    wrapper.vm.pageStatus = false;
    wrapper.vm.check();
  });

  it('Handle if user loggedin', async () => {
    const router = jest.fn();
    wrapper = shallowMount(LayoutLogin, {
      stubs: ['Nuxt'],
      mocks: {
        $router: {
          push: router,
        },
      },
      head() {
        return {
          bodyAttrs: {
            /* eslint-disable-next-line no-use-before-define */
            class: 'class login',
          },
        };
      },
      data() {
        return {
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMzMTQ2NTEuMTcxMDc0NCwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.Aw8qbhOYxf1E7nrG84n7xAj4i269AJVIW3wocHcB4Vg',
          pageStatus: false,
        };
      },
    });

    wrapper.vm.check();
  });
});
