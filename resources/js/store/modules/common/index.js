import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import setInitialState from './set-initial-state';

export default {
  actions,
  getters,
  mutations,
  state: setInitialState(),
  namespaced: true,
};
