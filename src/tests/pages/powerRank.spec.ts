import PowerRank from '@/pages/powerRank.vue';
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

describe('pages > Faq.vue', () => {
  beforeEach(() => {
    // set criteria
    wrapper = shallowMount(PowerRank, {
      stubs: ['nuxt-link'],
      data() {
        return {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMzMTQ2NTEuMTcxMDc0NCwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.Aw8qbhOYxf1E7nrG84n7xAj4i269AJVIW3wocHcB4Vg',
          comparison: [
            { score: 0.02291289235442241, employee_email: 'septema@alterra.id' },
            { score: 0.022905904234226733, employee_email: 'agus@alterra.id' },
            { score: 0.02210301382876708, employee_email: 'herman@alterra.id' },
            { score: 0.02210301382876707, employee_email: 'one@alterra.id' },
            { score: 0.02210301382876706, employee_email: 'two@alterra.id' },
            { score: 0.02210301382876705, employee_email: 'three@alterra.id' },
            { score: 0.02210301382876704, employee_email: 'four@alterra.id' },
            { score: 0.02210301382876703, employee_email: 'five@alterra.id' },
            { score: 0.02210301382876702, employee_email: 'six@alterra.id' },
            { score: 0.02210301382876701, employee_email: 'seven@alterra.id' },
          ],
        };
      },
    });
  });

  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('berhasil mounting komponen tanpa token', () => {
    const mockedResponse: AxiosResponse = {
      data: {
        response_code: '0000',
        message: 'test success',
        data: [{
          id: '1',
          criteria_name: 'string',
          percent_progress: 'number',
          slug: 'design',
          description: 'string',
          shortdec: 'string',
        }, {
          id: '2',
          criteria_name: 'string',
          percent_progress: 'number',
          slug: 'quality',
          description: 'string',
          shortdec: 'string',
        }],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponse);

    wrapper = shallowMount(PowerRank, {
      stubs: ['nuxt-link'],
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('test comparisonProcess()', () => {
    const mockedResponse: AxiosResponse = {
      data: {
        response_code: '0000',
        message: 'test success',
        data: [
          {
            score: 0.02291289235442241, employee_id: '60c1c6088b9165fab214c6e4', employee_name: 'Septema Umna Maulida', employee_email: 'septema@alterra.id',
          },
          {
            score: 0.022905904234226733, employee_id: '60c1c6088b9165fab214c6da', employee_name: 'Mas Agus Setyo Purwanto', employee_email: 'agus@alterra.id',
          },
          {
            score: 0.02210301382876708, employee_id: '60c1c6088b9165fab214c6dc', employee_name: 'Herman Sutanto', employee_email: 'herman@alterra.id',
          },
          {
            score: 0.02210301382876708, employee_id: '6103aaf832720826e811358c', employee_name: 'Doni H', employee_email: 'dhadiansyah@alterra.id',
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponse);
    wrapper.vm.comparisonProcess();
  });

  it('test getRanker()', () => {
    // normal
    wrapper.vm.getRanker(0);
    wrapper.setData({ user: 'nouser@alterra.id' });

    // else
    wrapper.vm.getRanker(0);

    // point 5
    wrapper.setData({ user: 'agus@alterra.id' });
    wrapper.vm.getRanker(0);

    // point 4
    wrapper.setData({ user: 'herman@alterra.id' });
    wrapper.vm.getRanker(0);

    // point 3
    wrapper.setData({ user: 'two@alterra.id' });
    wrapper.vm.getRanker(0);

    // point 2
    wrapper.setData({ user: 'four@alterra.id' });
    wrapper.vm.getRanker(0);

    // else
    wrapper.setData({ user: 'six@alterra.id' });
    wrapper.vm.getRanker(0);
  });
});
