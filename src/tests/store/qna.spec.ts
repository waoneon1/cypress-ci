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
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePost: AxiosResponse = {
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
    mockedAxios.post.mockResolvedValue(mockedResponsePost);

    const service = qnaModule();
    const payload = {
      criteria_id: 'qwerty',
      limit: 10,
    };

    expect(axios.post).not.toHaveBeenCalled();
    await service.getQna(payload);
    expect(axios.post).toHaveBeenCalled();
  });

  it('Action - getQna response false', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostFalse: AxiosResponse = {
      data: {
        response_code: '404',
        message: 'fail',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValue(mockedResponsePostFalse);

    const service = qnaModule();
    // expect(axios.post).not.toHaveBeenCalled()
    await service.getQna({});
    expect(axios.post).toHaveBeenCalled();
    expect(service.dataQna.data).toHaveLength(0);
  });

  it('Action - getQna catch error', async () => {
    // try error
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxios.post.mockResolvedValue(mockedResponsePostTryError);

    const service = qnaModule();
    // expect(axios.post).not.toHaveBeenCalled()
    await service.getQna({});
    expect(axios.post).toHaveBeenCalled();
  });

  it('Action - submitQna response true', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePost2: AxiosResponse = {
      data: {
        response_code: '0000',
        message: 'test success',
        data: {
          count_submitted: 0,
          percent_progress: 0,
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValue(mockedResponsePost2);

    const service = qnaModule();
    const payload = {};
    // expect(axios.post).not.toHaveBeenCalled()
    await service.submitQna(payload);
    expect(axios.post).toHaveBeenCalled();
  });

  it('Action - submitQna response false', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostFalse: AxiosResponse = {
      data: {
        response_code: '404',
        message: 'fail',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValue(mockedResponsePostFalse);

    const service = qnaModule();
    // expect(axios.post).not.toHaveBeenCalled()
    await service.submitQna({});
    expect(axios.post).toHaveBeenCalled();
  });

  it('Action - submitQna catch error', async () => {
    // try error
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePostTryError: AxiosResponse | boolean = false;
    mockedAxios.post.mockResolvedValue(mockedResponsePostTryError);

    const service = qnaModule();

    await service.submitQna({}).catch((e: any) => expect(e).toEqual({
      error: 'submitQna {} catch error',
    }));
  });

  it('Action - getQuestion', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponsePost: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponsePost);

    const service = qnaModule();
    // expect(axios.post).not.toHaveBeenCalled()
    await service.getQuestion({});
    expect(axios.get).toHaveBeenCalled();
  });
});
