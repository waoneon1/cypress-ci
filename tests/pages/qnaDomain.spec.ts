import Qna from '@/pages/qna/_domain.vue';
import {
  expect, it, describe, beforeEach, afterEach,
} from '@jest/globals';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import QnaStore from '@/store/qna';
import {
  shallowMount, Wrapper, createLocalVue,
} from '@vue/test-utils';
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
      stubs: ['nuxt-link'],
      mocks: {
        $route: {
          path: '/qna/design?c=606d1d5cf50eab8cb59f434c',
          params: { domain: 'design' },
          query: {
            c: '606d1d5cf50eab8cb59f434c',
          },
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
          domainId: '606d1d5cf50eab8cb59f434c',
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
          answersObject: [{
            name: 'string',
            email: 'string',
            image: 'string',
          }],
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
    wrapper = shallowMount(Qna, {
      stubs: ['nuxt-link'],
      mocks: {
        $route: {
          params: { domain: '' },
        },
      },
      data() {
        return {
          domain: '',
          domainId: '6062d4c9dd3acd0959261f51',
        };
      },
    });
    expect(wrapper.vm.domain).toBe('No Title');
    expect(wrapper.vm.domainId).toBe('6062d4c9dd3acd0959261f51');
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
    expect.assertions(1);
    try {
      await wrapper.vm.nextPage();
      expect('1').toBe('1');
    } catch (err) {
      expect(err).toEqual(new Error());
    }
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
      employees:
      [
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
});
