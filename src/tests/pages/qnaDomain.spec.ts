import Qna from '@/pages/qna/_domain.vue';
import {
  expect, it, describe, beforeEach, afterEach,
} from '@jest/globals';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import QnaStore from '@/store/qna';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import axios, { AxiosResponse } from 'axios';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

const qnaModule: any = () => {
  const store = new Vuex.Store({
    modules: {
      qna: QnaStore,
    },
  });
  return getModule(QnaStore, store);
};

// Mock axios
jest.mock('axios');
let mockedAxios;
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

describe('Pages > index.vue', () => {
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
          params: { domain: 'requirements' },
        },
        $store: jest.fn(),
        getQuestion() {
          return jest.fn();
        },
        submitQna() {
          return jest.fn();
        },
        loadEmployeeData() {
          return jest.fn();
        },
      },
      data() {
        return {
          domain: 'design',
          domainId: 'nodata',
          thankyouPage: false,
          local:
            '{"criteria_name":"requirements","id":"606d1d5cf50eab8cb59f434c"}',
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
          ],
          questions: [],
          selectedAnswer: [],
          allSelectedAnswer: [],
          answers: [],
          answersObject: [
            {
              name: 'string',
              email: 'string',
              image: 'string',
            },
          ],
          maxSelectedAnswer: 3,
          indenClass: ['', '-left-2', '-left-3.5'],
          pages: 10,
          currentPages: 1,
        };
      },
      mixins: [override],
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

  it('test init()', () => {
    expect(wrapper.vm.domain).toBe('requirements');
    expect(wrapper.vm.domainId).toBe('606d1d5cf50eab8cb59f434c');
  });

  it('test loadEmployeeData()', async () => {
    const service = qnaModule();
    const payload = {
      criteria_id: 'qwerty',
      limit: 10,
    };

    expect.assertions(1);
    try {
      await service.getQna(payload);
      expect(axios.post).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test loadQuestionData()', async () => {
    const mockedAxios1 = axios as jest.Mocked<typeof axios>;
    const mockedResponsePost1: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios1.get.mockResolvedValue(mockedResponsePost1);

    const service = qnaModule();

    expect.assertions(1);
    try {
      await service.getQuestion('Design');
      expect(axios.get).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test submitEmployeeData()', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.submitEmployeeData();
      const service = qnaModule();
      await service.submitQna(wrapper.vm.prepareSubmit());
      expect(axios.post).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test answerAdd()', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.answerAdd();
      const service = qnaModule();
      await service.submitQna(wrapper.vm.prepareSubmit());
      expect(axios.post).toHaveBeenCalled();

      wrapper.setData({ selectedAnswer: ['waone@alterra.id'] });
      await wrapper.vm.answerAdd('waone@alterra.id');
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test buttonLabel()', () => {
    const buttonLabel1 = wrapper.vm.buttonLabel();
    expect(buttonLabel1).toBe('Lewati');

    wrapper.setData({ currentPages: 10 });
    wrapper.setData({ pages: 10 });
    const buttonLabel2 = wrapper.vm.buttonLabel();
    expect(buttonLabel2).toBe('Selesai');

    wrapper.setData({ currentPages: 1 });
    wrapper.setData({ selectedAnswer: ['1', '2'] });
    const buttonLabel3 = wrapper.vm.buttonLabel();
    expect(buttonLabel3).toBe('Selanjutnya');

    wrapper.setData({ currentPages: 10 });
    const buttonLabel4 = wrapper.vm.buttonLabel();
    expect(buttonLabel4).toBe('Selesai');
  });

  it('test nextPage()', async () => {
    await wrapper.vm.nextPage();
    expect(wrapper.vm.thankyouPage).toBe(true);
  });

  it('test selectedAnswerClass()', async () => {
    let data = wrapper.vm.selectedAnswerClass('waone@alterra.id');
    expect(data).toBe('shadow-lg');

    wrapper.setData({ selectedAnswer: ['waone@alterra.id'] });
    data = wrapper.vm.selectedAnswerClass('waone@alterra.id');
    expect(data).toBe('opacity-30 shadow-md');
  });

  it('test getUniqueEmployees()', async () => {
    expect.assertions(2);
    try {
      await wrapper.vm.getUniqueEmployees();
      expect(wrapper.vm.answers.length).toBe(2);
    } catch (err) {
      expect(err).toEqual(new Error());
    }

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

    try {
      await wrapper.vm.getUniqueEmployees();
      expect(wrapper.vm.answers.length).toBe(9);
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test prepareSubmit()', () => {
    wrapper.vm.prepareSubmit();
    const prepareSubmit = wrapper.vm.prepareSubmit();
    expect(prepareSubmit.length).toBe(2);
  });

  it('Criteria progress', async () => {
    wrapper.vm.criteriaProgress();
  });

  it('test selectedAnswerImage()', () => {
    wrapper.vm.selectedAnswerImage();
  });
});

describe('Pages > index.vue : kondisi ke 2', () => {
  beforeEach(() => {
    const override = {
      methods: {
        prepareSubmit() {
          return [];
        },
      },
    };
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $route: {
          params: { domain: 'requirements' },
        },
      },
      data() {
        return {
          domain: '',
          domainId: 'nodata',
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
    mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(mockedResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('test init()', () => {
    expect(wrapper.vm.domain).toBe('');
    expect(wrapper.vm.domainId).toBe('nodata');
  });

  it('test submitEmployeeData()', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.submitEmployeeData();
      const service = qnaModule();
      await service.submitQna(wrapper.vm.prepareSubmit());
      expect(axios.post).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test answerAdd() : this.selectedAnswer.length > this.maxSelectedAnswer', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.answerAdd();
      const service = qnaModule();
      await service.submitQna(wrapper.vm.prepareSubmit());
      expect(axios.post).toHaveBeenCalled();

      wrapper.setData({ selectedAnswer: ['waone@alterra.id'] });
      await wrapper.vm.answerAdd('waone@alterra.id');
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test nextPage() : (this.pages == this.currentPages)', async () => {
    expect.assertions(1);
    try {
      await wrapper.vm.nextPage();
      expect(wrapper.vm.thankyouPage).toBe(true);
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('test getUniqueEmployees() : employees !== object', async () => {
    await wrapper.vm.getUniqueEmployees();
    expect(wrapper.vm.employees).toBe('string');
  });
});

describe('Pages > index.vue : kondisi ke 3', () => {
  beforeEach(() => {
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
      mocks: {
        $route: {
          params: { domain: 'requirements' },
        },
      },
      data() {
        return {
          local: '{"criteria_name":"xxx","id":"xxx"}',
          employees: [
            {
              criteria_id: 'string',
              criteria_name: 'design',
            },
          ],
          answers: ['waone@alterra.id', 'dodi@alterra.id'],
          selectedAnswer: ['waone@alterra.id', 'dodi@alterra.id'],
        };
      },
    });
  });

  it('test init()', () => {
    expect(wrapper.vm.domain).toBe('');
    expect(wrapper.vm.domainId).toBe('nodata');
  });

  it('test getUniqueEmployees() : employee_email_x === undefined && employee_email_y === undefined', async () => {
    await wrapper.vm.getUniqueEmployees();
    expect(wrapper.vm.employees.length).toBe(1);
  });

  it('test prepareSubmit() selectedAnswer include answer', () => {
    wrapper.vm.prepareSubmit();
  });
});

describe('Pages > index.vue : kondisi ke 4', () => {
  beforeEach(() => {
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link', 'v-lazy-image'],
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
          selectedAnswer: ['xx@alterra.id', 'yy@alterra.id'],
        };
      },
    });
  });

  it('test getUniqueEmployees() : answers array memiliki employee x dan y', async () => {
    await wrapper.vm.getUniqueEmployees();
    expect(wrapper.vm.employees).toBeTruthy();
  });

  it('test prepareSubmit() selectedAnswer not include answer', () => {
    wrapper.vm.prepareSubmit();
  });
});
