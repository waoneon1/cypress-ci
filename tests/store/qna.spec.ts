import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'vuex-module-decorators';
import { expect, it, describe } from '@jest/globals';
import QnaStore from '@/store/qna';
import axios, { AxiosResponse } from 'axios';

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
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponsePost: AxiosResponse = {
  data: {
    response_code: '0000',
    message: 'test success',
    data: {
      criteria_id: 'string',
      criteria_name: 'string',
      employee_name_x: 'string',
      employee_name_y: 'string',
      employee_email_x: 'string',
      employee_email_y: 'string',
      employee_image_url_x: 'string',
      employee_image_url_y: 'string',
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
mockedAxios.post.mockResolvedValue(mockedResponsePost);

/**
 * The test case
 */
describe('QNA Store', () => {

  it('Mutation - setQna', () => {
    const service = qnaModule();
    service.setQna('123');
    expect(service.dataQna).toBe('123');
  });

  it('Mutation - setQuestion', () => {
    const service = qnaModule();
    service.setQuestion('123');
    expect(service.dataQuestion).toBe('123');
  });

  it('Action - getQna response true', async () => {
    const service = qnaModule();
    const payload = {
      criteria_id: 'qwerty',
      limit: 10,
    };
    
    expect(axios.post).not.toHaveBeenCalled()
    await service.getQna(payload)
    expect(axios.post).toHaveBeenCalled()
  });
  
  it('Action - getQna response false', async () => {
    const service = qnaModule();
    const mockedResponsePostFalse: AxiosResponse = {
      data: {
        response_code: '404',
        message: 'fail'
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValue(mockedResponsePostFalse);
    //expect(axios.post).not.toHaveBeenCalled()
    await service.getQna({})
    expect(axios.post).toHaveBeenCalled()
    expect(service.dataQna.data).toHaveLength(0)
  });

  it('Action - getQna catch error', async () => {
    const service = qnaModule();
    // try error
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxios.post.mockResolvedValue(mockedResponsePostTryError);
    //expect(axios.post).not.toHaveBeenCalled()
    await service.getQna({})
    expect(axios.post).toHaveBeenCalled()
  });

  // it('Action - getQuestion', async () => {
  //   const service = qnaModule();
  //   const payload = 'Design';
  //   expect(axios.get).not.toHaveBeenCalled()
  //   await service.getQna(payload)
  //   expect(axios.get).toHaveBeenCalled()
  // });

});
