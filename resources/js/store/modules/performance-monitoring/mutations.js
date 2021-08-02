import set from 'lodash-es/set';
import {
  setDetail,
  setLatestFilter,
  setSummaries,
  setTemplates,
  setTemplate,
  setTemplatesMeta,
  setIndicators,
  setActionPlans,
  setActionPlansMeta,
  setActionPlanHistories,
  setRequestState,
} from '@/configs/store/mutation-types'
import simpleMutate from '@/helpers/vuex-helpers/simple-mutate'

export default {
  [setDetail]: simpleMutate('detail'),
  [setLatestFilter]: simpleMutate('latestFilter'),
  [setSummaries]: simpleMutate('summaries'),
  [setTemplates]: simpleMutate('templates'),
  [setTemplate]: simpleMutate('template'),
  [setTemplatesMeta]: simpleMutate('templatesMeta'),
  [setIndicators]: simpleMutate('indicators'),
  [setActionPlans]: simpleMutate('actionPlans'),
  [setActionPlansMeta]: simpleMutate('actionPlansMeta'),
  [setActionPlanHistories]: simpleMutate('actionPlanHistories.data'),
  [setRequestState](state, { key, value }) {
    set(state, `${key}.requestState`, value);
  },
}
