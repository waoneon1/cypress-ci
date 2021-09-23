import SwipeableCard from '@/components/SwipeableCard.vue';
import Vuex from 'vuex';
import { expect, it, describe } from '@jest/globals';

import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import axios, { AxiosResponse } from 'axios';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

//= =========================================================
jest.mock('axios');
const mockedAxiosGet = axios as jest.Mocked<typeof axios>;
const mockedResponseGet: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: [
      {
        id: '',
        criteria_name: 'Design',
        percent_progress: 0,
      },
      {
        id: '65a248199ad87f22412ad',
        criteria_name: 'HCI',
        percent_progress: 20,
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxiosGet.get.mockResolvedValue(mockedResponseGet);
//= =========================================================

jest.mock('axios');
const mockedAxiosPost = axios as jest.Mocked<typeof axios>;

const mockedQnaResponseData: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: [{
      id: '123',
      employee_name: 'waone',
      employee_email: 'waone@gmail.com',
      employee_image_url: 'x',
      employee_alt_id: 'x',
      employee_organization: 'x',
      employee_organization_full_text: 'x',
      employee_business_unit: 'x',
      created_at: 'x',
      updated_at: 'x',
    }],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('components > SwipeableCard.vue', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    wrapper = shallowMount(SwipeableCard, {
      stubs: ['nuxt-link'],
      propsData: {
        domain: {
          id: '65a248199ad87f22412ad',
          criteria_name: 'Testing',
          percent_progress: 10,
          slug: '',
          description: '',
          shortdec: '',
        },
        allEmployee: [{
          id: 'string',
          employee_name: 'string',
          employee_email: 'string',
          employee_image_url: 'string',
          employee_alt_id: 'string',
          employee_organization: 'string',
          employee_organization_full_text: 'string',
        }, {
          id: 'string',
          employee_name: 'string',
          employee_email: 'string',
          employee_image_url: 'string',
          employee_alt_id: 'string',
          employee_organization: 'string',
          employee_organization_full_text: 'string',
        }],
        currentPages: 1,
      },
      data() {
        return {
          index: 0,
          selected: {
            employee: ['wawan@alterra.id'],
            blacklist: [],
            whitelist: ['wawan@alterra.id', 'user2@alterra.id'],
            employeeObject: [
              {
                employee_name: 'wawan',
                employee_email: 'wawan@alterra.id',
                employee_image_url: 'wawan.jpg',
                employee_organization: 'org',
                employee_organization_full_text: 'organization',
                employee_business_unit: 'ho',
              },
            ],
          },
          answersObject: [{
            employee_name: 'wawan',
            employee_email: 'wawan@alterra.id',
            employee_image_url: 'wawan.jpg',
            employee_organization: 'org',
            employee_organization_full_text: 'organization',
            employee_business_unit: 'ho',
          }, {
            employee_name: 'user2',
            employee_email: 'user2@alterra.id',
            employee_image_url: 'user2.jpg',
            employee_organization: 'org',
            employee_organization_full_text: 'organization',
            employee_business_unit: 'ho',
          }],
          counterSelected: 1,
          answers: ['wawan@alterra.id', 'user2@alterra.id'],
          localStorageBlacklist: '[xxx@alterra.id]',
          localStorageWhitelist: '[yyy@alterra.id]',
        };
      },
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('Test currentComputed() & nextComputed() index', () => {
    wrapper.setData({ index: 2 });
    expect(wrapper.vm.next.employee_name).toBe(undefined);
  });

  it('Test match()', () => {
    expect(wrapper.vm.index).toBe(0);
    wrapper.vm.match();
    setTimeout(() => {
      expect(wrapper.vm.index).toBe(1);
      expect(wrapper.vm.selected.length).toBe(1);
    }, 500);
  });

  it('Test reject()', () => {
    expect(wrapper.vm.index).toBe(0);
    wrapper.vm.reject();
    setTimeout(() => {
      expect(wrapper.vm.index).toBe(1);
      expect(wrapper.vm.selected.length).toBe(1);
    }, 500);
  });

  it('Test emitAndNext()', () => {
    jest.useFakeTimers();
    wrapper.vm.emitAndNext('reject');
    expect(wrapper.vm.btnDisabled).toBe(true);
    wrapper.setData({
      answersObject: [{
        employee_name: 'wawan',
        employee_email: 'wawan@alterra.id',
        employee_image_url: 'wawan.jpg',
        employee_organization: 'org',
        employee_organization_full_text: 'organization',
        employee_business_unit: 'ho',
      }, {
        employee_name: 'user2',
        employee_email: 'user2@alterra.id',
        employee_image_url: 'user2.jpg',
        employee_organization: 'org',
        employee_organization_full_text: 'organization',
        employee_business_unit: 'ho',
      }],
    });
    wrapper.vm.emitAndNext('match');
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('Test checkWhitelist()', () => {
    wrapper.vm.checkWhitelist();
    wrapper.setData({ limitEmp: 1 });
    wrapper.vm.checkWhitelist();
  });

  it('Test visibleTrue()', () => {
    wrapper.vm.visibleTrue();
    expect(wrapper.vm.index).toBe(1);
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.vm.btnDisabled).toBe(false);

    wrapper.setData({ index: 1 });
    wrapper.vm.visibleTrue();
  });

  it('Test visibleFalse()', () => {
    wrapper.vm.visibleFalse();
    expect(wrapper.vm.isVisible).toBe(false);
  });

  it('Test getUniqueEmployees()', () => {
    mockedAxiosPost.post.mockResolvedValue(mockedQnaResponseData);
    wrapper.vm.getUniqueEmployees();
    expect(wrapper.vm.answers.length).toBe(0);

    wrapper.setData({
      employees: [
        {
          criteria_id: 'string',
          criteria_name: 'design',
          employee_name_x: 'waone',
          employee_name_y: 'dodi',
          employee_email_x: '1@alterra.id',
          employee_email_y: '2@alterra.id',
          employee_image_url_x: '',
          employee_image_url_y: '',
        },
        {
          criteria_id: 'string',
          criteria_name: 'design',
          employee_name_x: 'waone',
          employee_name_y: 'dodi',
          employee_email_x: '3@alterra.id',
          employee_email_y: '4@alterra.id',
          employee_image_url_x: '',
          employee_image_url_y: '',
        },
        {
          criteria_id: 'string',
          criteria_name: 'design',
          employee_name_x: 'waone',
          employee_name_y: 'dodi',
          employee_email_x: '5@alterra.id',
          employee_email_y: '6@alterra.id',
          employee_image_url_x: '',
          employee_image_url_y: '',
        },
        {
          criteria_id: 'string',
          criteria_name: 'design',
          employee_name_x: 'waone',
          employee_name_y: 'dodi',
          employee_email_x: '7@alterra.id',
          employee_email_y: '8@alterra.id',
          employee_image_url_x: '',
          employee_image_url_y: '',
        },
        {
          criteria_id: 'string',
          criteria_name: 'design',
          employee_name_x: 'waone',
          employee_name_y: 'dodi',
          employee_email_x: '9@alterra.id',
          employee_email_y: '10@alterra.id',
          employee_image_url_x: '',
          employee_image_url_y: '',
        },
      ],
    });

    wrapper.vm.getUniqueEmployees();
    expect(wrapper.vm.answers.length).toBe(10);

    wrapper.setData({
      answers: [],
      selected: {
        whitelist: {
          employee_name: '-',
          employee_email: '-',
          employee_image_url: '-',
          employee_organization: '-',
          employee_organization_full_text: '-',
          employee_business_unit: '-',
        },
        employee: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
    wrapper.vm.getUniqueEmployees();
  });

  it('Test proceedQnaPage()', () => {
    wrapper.vm.proceedQnaPage();
    expect(wrapper.vm.proceedQnaPage().employee[0]).toBe('wawan@alterra.id');
  });

  it('Test checkTotalSwipe()', () => {
    expect(wrapper.vm.moreWhitelist).toBeFalsy();
    wrapper.setData({
      selected: {
        whitelist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        blacklist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
    wrapper.vm.checkTotalSwipe();
    expect(wrapper.vm.moreWhitelist).toBe(false);
  });

  it('Test closeMoreEmployee()', () => {
    wrapper.vm.closeMoreEmployee([
      {
        id: 'string;',
        employee_name: 'string;',
        employee_email: 'xx@gmail.com',
        employee_image_url: 'string;',
        employee_alt_id: 'string;',
        employee_organization: 'string;',
        employee_organization_full_text: 'string;',
        employee_business_unit: 'string;',
        created_at: 'string;',
        updated_at: 'string;',
      },
    ]);
  });

  it('Test checkEmployeeRemain()', () => {
    wrapper.setData({
      allEmployee: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    wrapper.vm.checkEmployeeRemain();
  });
});

describe('components > SwipeableCard.vue case 2', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    wrapper = shallowMount(SwipeableCard, {
      stubs: ['nuxt-link'],
      propsData: {
        domain: {
          id: '65a248199ad87f22412ad',
          criteria_name: 'Testing',
          percent_progress: 10,
          slug: '',
          description: '',
          shortdec: '',
        },
        allEmployee: [{
          id: 'string',
          employee_name: 'string',
          employee_email: 'string',
          employee_image_url: 'string',
          employee_alt_id: 'string',
          employee_organization: 'string',
          employee_organization_full_text: 'string',
        }],
        currentPages: 0,
      },
      data() {
        return {
          index: 0,
          selected: {
            employee: ['wawan@alterra.id'],
            blacklist: [],
            whitelist: ['wawan@alterra.id', 'user2@alterra.id'],
            employeeObject: [
              {
                employee_name: 'wawan',
                employee_email: 'wawan@alterra.id',
                employee_image_url: 'wawan.jpg',
                employee_organization: 'org',
                employee_organization_full_text: 'organization',
                employee_business_unit: 'ho',
              },
            ],
          },
          answersObject: [{
            employee_name: 'wawan',
            employee_email: 'wawan@alterra.id',
            employee_image_url: 'wawan.jpg',
            employee_organization: 'org',
            employee_organization_full_text: 'organization',
            employee_business_unit: 'ho',
          }, {
            employee_name: 'user2',
            employee_email: 'user2@alterra.id',
            employee_image_url: 'user2.jpg',
            employee_organization: 'org',
            employee_organization_full_text: 'organization',
            employee_business_unit: 'ho',
          }],
          counterSelected: 1,
          answers: ['wawan@alterra.id', 'user2@alterra.id'],
          localStorageBlacklist: '  ',
          localStorageWhitelist: '  ',
        };
      },
    });
  });

  it('Test checkTotalSwipe()', () => {
    expect(wrapper.vm.moreWhitelist).toBeFalsy();
    wrapper.setData({
      selected: {
        whitelist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        blacklist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
    wrapper.vm.checkTotalSwipe();
    expect(wrapper.vm.moreWhitelist).toBe(false);

    wrapper.setData({
      totalSwipe: 19,
    });
    wrapper.vm.checkTotalSwipe();

    wrapper.setData({
      totalSwipe: 19,
      currentPages: 1,
    });
    wrapper.vm.checkTotalSwipe();
  });
});

describe('components > SwipeableCard.vue case 3', () => {
  beforeEach(() => {
    wrapper = shallowMount(SwipeableCard, {
      stubs: ['nuxt-link'],
      propsData: {
        domain: {
          id: '65a248199ad87f22412ad',
          criteria_name: 'Testing',
          percent_progress: 10,
          slug: '',
          description: '',
          shortdec: '',
        },
        allEmployee: [{
          id: 'string',
          employee_name: 'string',
          employee_email: 'string',
          employee_image_url: 'string',
          employee_alt_id: 'string',
          employee_organization: 'string',
          employee_organization_full_text: 'string',
        }],
        currentPages: 0,
      },
      data() {
        return {
          localStorageBlacklist: undefined,
          localStorageWhitelist: null,
        };
      },
    });
  });

  it('Test closeMoreEmployee() else case 3', () => {
    wrapper.setData({
      localStorageBlacklist: undefined,
      localStorageWhitelist: null,
    });
    wrapper.vm.closeMoreEmployee([
      {
        id: 'string;',
        employee_name: 'string;',
        employee_email: 'xx@gmail.com',
        employee_image_url: 'string;',
        employee_alt_id: 'string;',
        employee_organization: 'string;',
        employee_organization_full_text: 'string;',
        employee_business_unit: 'string;',
        created_at: 'string;',
        updated_at: 'string;',
      },
    ]);
  });

  it('Test checkDataAnswer()', () => {
    wrapper.setData({
      selected: {
        employee: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
  });
});
