import { expect, it, describe } from '@jest/globals';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import EmployeeModule from '@/store/employee';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import axios, { AxiosResponse } from 'axios';
import PrepareEmployee from '@/components/PrepareEmployee.vue';

const Vue = createLocalVue();
Vue.use(Vuex);

const employeeModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      employee: EmployeeModule,
    },
  });
  return getModule(EmployeeModule, store);
};

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: [
      {
        created_at: '2021-06-10T07:58:00.730000',
        employee_alt_id: '1506180007d',
        employee_business_unit: 'HO - Technology',
        employee_email: 'ekky@alterra.id',
        employee_image_url: 'https://talenta.s3.ap-southeast-1.amazonaws.com/avatar/CspYQOuMSoci5qemjeTMCB5INttwkphG.jpg',
        employee_name: 'Ekky Patria Kencana',
        employee_organization: 'TEC - ENG',
        employee_organization_full_text: 'Technology - Engineering',
        id: '60c1c6088b9165fab214c6d0',
        updated_at: '2021-06-10T07:58:00.730000',
      },
      {
        created_at: '2021-06-10T07:58:00.730000',
        employee_alt_id: '1506180007',
        employee_business_unit: 'HO - Technology',
        employee_email: 'waone@alterra.id',
        employee_image_url: 'https://talenta.s3.ap-southeast-1.amazonaws.com/avatar/CspYQOuMSoci5qemjeTMCB5INttwkphG.jpg',
        employee_name: 'Dharmawan Sukma',
        employee_organization: 'TEC - ENG',
        employee_organization_full_text: 'Technology - Engineering',
        id: '60c1c6088b9165fab214c6d0',
        updated_at: '2021-06-10T07:58:00.730000',
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxios.get.mockResolvedValue(mockedResponse);

describe('pages > Faq.vue', () => {
  // mounting component
  it('berhasil mounting komponen', async () => {
    const wrapper: any = shallowMount(PrepareEmployee, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      data() {
        return {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMzMTQ2NTEuMTcxMDc0NCwidXNlcl9pZCI6IjYwYjQ2ZGYxZmQ0MGU5Yjk4MjZiZjAzNyIsInVzZXJfb2F1dGhfaWQiOiIxMTMzMzI3NjE3NTgwODA3Njc5MjkiLCJ1c2VyX2VtYWlsIjoiZGhhcm1hd2FuQGFsdGVycmEuaWQiLCJ1c2VyX25hbWUiOiJEaGFybWF3YW4gU3VrbWEgSGFyZGkgUHJhdGFtYSIsInVzZXJfb3JnYW5pemF0aW9uIjoiVEVDIC0gRU5HIiwidXNlcl9vcmdhbml6YXRpb25fZnVsbF90ZXh0IjoiVGVjaG5vbG9neSAtIEVuZ2luZWVyaW5nIiwidXNlcl9idXNpbmVzc191bml0IjoiSE8gLSBUZWNobm9sb2d5In0.Aw8qbhOYxf1E7nrG84n7xAj4i269AJVIW3wocHcB4Vg',
        };
      },
    });
    const service = employeeModule();
    await service.getEmployee();
    expect(axios.get).toHaveBeenCalled();
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.vm.employeeSearch.length).toBe(2);
    wrapper.setData({ empSearch: 'dhar' });
  });

  it('berhasil mounting komponen tanpa token', () => {
    const wrapper: any = shallowMount(PrepareEmployee, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      data() {
        return {
          localStorageBlacklist: '[]',
          localStorageWhitelist: '[]',
        };
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('Action - getCriteria', async () => {
    const service = employeeModule();
    await service.getEmployee();
    expect(axios.get).toHaveBeenCalled();
  });

  it('test toggleSelect(email)', () => {
    const wrapper: any = shallowMount(PrepareEmployee, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      data() {
        return {
          selected: ['a@alterra.id', 'c@alterra.id', 'd@alterra.id'],
        };
      },
    });
    expect(wrapper.vm.selected.length).toBe(3);
    wrapper.vm.toggleSelect('e@alterra.id');
    expect(wrapper.vm.selected.length).toBe(4);
    wrapper.vm.toggleSelect('a@alterra.id');
    expect(wrapper.vm.selected.length).toBe(3);
  });

  it('test save()', () => {
    const wrapper: any = shallowMount(PrepareEmployee, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          selected: ['a@alterra.id', 'c@alterra.id', 'd@alterra.id'],
          localStorageBlacklist: '',
          localStorageWhitelist: '',
        };
      },
    });
    wrapper.vm.save();
  });

  it('test save() empty', () => {
    const wrapper: any = shallowMount(PrepareEmployee, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
    });
    wrapper.vm.save();
  });
});
