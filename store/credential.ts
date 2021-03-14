import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'

export const state = () => ({
  things: [] as string[],
  data: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.data,
}

export const mutations: MutationTree<RootState> = {
  TOKEN: (state, token: []) => (state.data = token),
}
  
export const actions: ActionTree<RootState, RootState> = {
  async getToken({ commit }, payload: string) {
    commit('TOKEN', 'new token from backend')
  },
}