import Qna from '@/pages/qna/_domain.vue';
import {
  expect, it, describe, beforeEach,
} from '@jest/globals';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import QnaStore from '@/store/qna';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import axios, { AxiosResponse } from 'axios';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

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
const qnaModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      qna: QnaStore,
    },
  });
  return getModule(QnaStore, store);
};
jest.mock('axios');
const mockedAxiosPost = axios as jest.Mocked<typeof axios>;
const mockedResponsePost: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: {
      count_submitted: 5,
      percent_progress: 10.3,
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxiosPost.post.mockResolvedValue(mockedResponsePost);
//= =========================================================

describe('Pages > index.vue > Kondisi Normal', () => {
  beforeEach(() => {
    const override = {
      methods: {
        prepareSubmit() {
          return [
            {
              criteria_id: 'domainid',
              selected_employee_email: 'wawan@alterra.id',
              employee_email_x: 'wawan@alterra.id',
              employee_email_y: 'dedy@alterra.id',
            },
            {
              criteria_id: 'domainid',
              selected_employee_email: 'wawan@alterra.id',
              employee_email_x: 'wawan@alterra.id',
              employee_email_y: 'dedy@alterra.id',
            },
          ];
        },
      },
    };
    // set criteria
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $route: {
          params: { domain: 'design' },
          query: { page: '1' },
        },
        $router: {
          push: jest.fn(),
        },
        $store: jest.fn(),
        submitQna() {
          return jest.fn();
        },
        submitEmployeeData() {
          return jest.fn();
        },
        dataCriteria: {
          data: [{
            id: '',
            criteria_name: 'Design',
            shortdec: 'Loading ...',
            description: 'Loading ...',
            percent_progress: 0,
          }],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        },
      },
      data() {
        return {};
      },
      mixins: [override],
    });
  });

  it('Test > init()', async () => {
    try {
      await wrapper.vm.init();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('Test > submitEmployeeData()', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.submitEmployeeData();
      const service = qnaModule();
      const payload = {
        payload: wrapper.vm.prepareSubmit(),
        criteriaId: 'domainid',
        counter: { all: 48, org: 48 },
      };
      await service.submitQna(payload);
      expect(axios.post).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('Test > nextPage()', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.nextPage();
      expect(wrapper.vm.thankyouPage).toBe(false);
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('Test > selectedAnswerImage()', () => {
    wrapper.vm.selectedAnswerImage();
  });

  it('Test > answerAdd()', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.answerAdd();
      const service = qnaModule();
      const payload = {
        payload: wrapper.vm.prepareSubmit(),
        criteriaId: 'domainid',
        counter: { all: 48, org: 48 },
      };
      await service.submitQna(payload);
      expect(axios.post).toHaveBeenCalled();

      wrapper.setData({ selectedAnswer: ['waone@alterra.id'] });
      await wrapper.vm.answerAdd('waone@alterra.id');
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('Test > prepareSubmit()', () => {
    wrapper.vm.prepareSubmit();
    const prepareSubmit = wrapper.vm.prepareSubmit();
    expect(prepareSubmit.length).toBe(2);
  });

  it('Test > getEmployeeStore()', async () => {
    await wrapper.vm.getEmployeeStore();
  });

  it('Test > initSwipableData()', () => {
    wrapper.vm.initSwipableData({
      selected: {
        employee: [],
        blacklist: [],
        whitelist: [],
        employeeObject: [],
      },
    });
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.allPageLoading).toBe(false);
    expect(wrapper.vm.loadSwipableComponent).toBe(false);
  });
});

describe('Pages > index.vue > Kondisi ke 2', () => {
  beforeEach(() => {
    const override = {
      methods: {
        prepareSubmit() {
          return [
            {
              criteria_id: 'domainid',
              selected_employee_email: 'wawan@alterra.id',
              employee_email_x: 'wawan@alterra.id',
              employee_email_y: 'dedy@alterra.id',
            },
            {
              criteria_id: 'domainid',
              selected_employee_email: 'wawan@alterra.id',
              employee_email_x: 'wawan@alterra.id',
              employee_email_y: 'dedy@alterra.id',
            },
          ];
        },
      },
    };
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $route: {
          params: { domain: 'design' },
          query: { page: '1' },
        },
        $router: {
          push: jest.fn(),
        },
        dataCriteria: {
          data: [{
            id: '',
            criteria_name: 'Design',
            shortdec: 'Loading ...',
            description: 'Loading ...',
            percent_progress: 0,
          }],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        },
      },
      data() {
        return {
          thankyouPage: false,
          employees: 'string',
          local: null,
          selectedAnswer: [1, 2, 3],
          maxSelectedAnswer: 3,
          pages: 10,
          currentPages: 10,
          answers: [],
          answersObject: [
            {
              name: 'string',
              email: 'string',
              image: 'string',
            },
          ],
        };
      },
      mixins: [override],
    });
  });

  it('Test > submitEmployeeData() => this.prepareSubmit().length == false', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.submitEmployeeData();
      const service = qnaModule();
      const payload = {
        payload: wrapper.vm.prepareSubmit(),
        criteriaId: 'domainid',
        counter: { all: 48, org: 48 },
      };
      await service.submitQna(payload);
      expect(axios.post).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('Test > answerAdd() => this.selectedAnswer.length > this.maxSelectedAnswer', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.answerAdd();
      const service = qnaModule();
      const payload = {
        payload: wrapper.vm.prepareSubmit(),
        criteriaId: 'domainid',
        counter: { all: 48, org: 48 },
      };
      await service.submitQna(payload);
      expect(axios.post).toHaveBeenCalled();

      wrapper.setData({ selectedAnswer: ['waone@alterra.id'] });
      await wrapper.vm.answerAdd('waone@alterra.id');
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('Test > nextPage() : this.pages == this.currentPages', async () => {
    await wrapper.vm.nextPage();
    expect(wrapper.vm.thankyouPage).toBe(false);
  });
});

describe('Pages > index.vue : kondisi ke 3', () => {
  beforeEach(() => {
    const override = {
      methods: {
        prepareSubmit() {
          return [
            {
              criteria_id: 'domainid',
              selected_employee_email: 'wawan@alterra.id',
              employee_email_x: 'wawan@alterra.id',
              employee_email_y: 'dedy@alterra.id',
            },
            {
              criteria_id: 'domainid',
              selected_employee_email: 'wawan@alterra.id',
              employee_email_x: 'wawan@alterra.id',
              employee_email_y: 'dedy@alterra.id',
            },
          ];
        },
      },
    };
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $route: {
          params: { domain: 'design' },
          query: { page: '1' },
        },
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          employees: [
            {
              criteria_id: '606d1d89f50eab8cb59f4352',
              criteria_name: 'Quality',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
              employee_name_x: 'Aditya Imannudin Suryomurtjito',
              employee_name_y: 'Ainin Nur Asiyah',
            },
          ],
          answers: ['waone@alterra.id', 'dodi@alterra.id'],
          selectedAnswer: ['xx@alterra.id', 'xx@alterra.id'],
        };
      },
      mixins: [override],
    });
  });

  it('Test > prepareSubmit() selectedAnswer include answer', () => {
    wrapper.vm.prepareSubmit();
  });
});

describe('Pages > index.vue : kondisi ke 4', () => {
  beforeEach(() => {
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $route: {
          params: { domain: 'design' },
          query: { page: '1' },
        },
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          employees: [
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone1',
              employee_name_y: 'dodi1',
              employee_email_x: 'waone1@alterra.id',
              employee_email_y: 'dodi1@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone2',
              employee_name_y: 'dodi2',
              employee_email_x: 'waone2@alterra.id',
              employee_email_y: 'dodi2@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone3',
              employee_name_y: 'dodi3',
              employee_email_x: 'waone3@alterra.id',
              employee_email_y: 'dodi3@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
            {
              criteria_id: 'string',
              criteria_name: 'design',
              employee_name_x: 'waone',
              employee_name_y: 'dodi',
              employee_email_x: 'waone@alterra.id',
              employee_email_y: 'dodi@alterra.id',
              employee_image_url_x: '',
              employee_image_url_y: '',
            },
          ],
          answers: ['waone@alterra.id', 'dodi@alterra.id'],
          selectedAnswer: ['waone@alterra.id', 'dodi@alterra.id'],
        };
      },
    });
  });

  it('Test > prepareSubmit() selectedAnswer not include answer', () => {
    wrapper.vm.submitEmployeeData();
    wrapper.vm.prepareSubmit();
    expect(wrapper.vm.prepareSubmit().length).toBe(2);

    wrapper.setData({ selectedAnswer: ['xxx@alterra.id', 'xx@alterra.id'] });
    wrapper.vm.prepareSubmit();
    expect(wrapper.vm.prepareSubmit().length).toBe(4);
  });
});
