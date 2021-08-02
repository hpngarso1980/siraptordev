import {
  setActionPlans,
  setActionPlansMeta,
  setActionPlanHistories,

  setCurrentFilter,
  setData,
  setMeta,
  setRequestState,
} from '@/configs/store/mutation-types';
import simpleMutate from '@/helpers/vuex-helpers/simple-mutate';
import mutateGroupedState from '@/helpers/vuex-helpers/mutate-grouped-state';

export default {
  [setActionPlans]: simpleMutate('actionPlans'),
  [setActionPlansMeta]: simpleMutate('actionPlansMeta'),
  [setActionPlanHistories]: simpleMutate('actionPlanHistories.data'),
  [setCurrentFilter]: mutateGroupedState('currentFilter'),
  [setData]: mutateGroupedState('data'),
  [setMeta]: mutateGroupedState('meta'),
  [setRequestState]: mutateGroupedState('requestState'),
};
