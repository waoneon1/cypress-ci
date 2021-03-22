
// import Vuex from 'vuex';
// import { createLocalVue } from '@vue/test-utils';
// import { getModule } from 'vuex-module-decorators';
// import { expect, it, describe } from '@jest/globals';
// import CredentialStore from '@/store/credential';
// // import { $axios } from '~/utils/api';

// let mockAxiosResult: any;
// jest.mock('', () => ({
//   $post: jest.fn(() => Promise.resolve(mockAxiosResult)),
// }));

// // let action: any;
// // const testedAction: any = (context = {}, payload = {}) => CredentialStore.actions[action].bind({$axios: axios})(context, payload);

// const Vue = createLocalVue();
// Vue.use(Vuex);

// const credentialModule: any = () => {
//   const store = new Vuex.Store({
//     modules: {
//       credential: CredentialStore,
//     },
//   });
//   return getModule(CredentialStore, store);
// };

// /**
//  * The test case
//  */
// describe('Credential Store', () => {
  

//   it('setToken', () => {
//     const service = credentialModule();
//     service.setToken('123');
//     expect(service.token).toBe('123');
//   });
//   it('getToken', async () => {
//     const service = credentialModule();
//     console.log(await service.getToken('123'));
//     // expect(service.getToken('123'))
//   })
// });
