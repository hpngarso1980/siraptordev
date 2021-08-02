import set from 'lodash-es/set';
import {
  setActionPlans,
  setMeta,
  setActionPlanHistories,
  setRequestState,
} from '@/configs/store/mutation-types'
import simpleMutate from '@/helpers/vuex-helpers/simple-mutate'

export default {
  [setActionPlans]: simpleMutate('actionPlans'),
  [setMeta]: simpleMutate('meta'),
  [setActionPlanHistories]: simpleMutate('actionPlanHistories.data'),
  [setRequestState](state, { key, value }) {
    set(state, `${key}.requestState`, value);
  },
}
