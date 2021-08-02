import {
  setCurrentFilter,
  setData,
  setMeta,
  setRequestState,
} from '@/configs/store/mutation-types';
import mutateGroupedState from '@/helpers/vuex-helpers/mutate-grouped-state';

export default function generateGroupedMutations() {
  return {
    [setCurrentFilter]: mutateGroupedState('currentFilter'),
    [setData]: mutateGroupedState('data'),
    [setMeta]: mutateGroupedState('meta'),
    [setRequestState]: mutateGroupedState('requestState'),
  };
}
