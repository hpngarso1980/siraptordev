import generateGroupedMutations from '@/helpers/vuex-helpers/generate-grouped-mutations';
import actions from './actions';
import setInitialState from './set-initial-state';

export default {
  actions,
  namespaced: true,
  mutations: generateGroupedMutations(),
  state: setInitialState(),
};
