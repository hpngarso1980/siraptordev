import actions from './actions'
import mutations from './mutations'
import setInitialState from './set-initial-state'

export default {
  actions,
  mutations,
  state: setInitialState(),
  namespaced: true,
}
