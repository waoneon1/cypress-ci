import Vuex from 'vuex'
import {createLocalVue} from '@vue/test-utils'
import {getModule} from 'vuex-module-decorators'
import CredentialModule from '@/store/credential.vue';

const Vue = createLocalVue()
Vue.use(Vuex)

/**
 * Factory function returns a new store instance
 */

const credentialsModule = () => {
  const store = new Vuex.Store({
    modules: {
      credential: CredentialModule
    }
  })
  return getModule(CredentialModule, store)
}

/**
 * The test case
 */
describe('TodosStore', () => {

  it('Mutation > setToken', async () => {
    const service = credentialsModule()
    service.setToken('123')
    expect(service.token).toBe('123')
  })
})