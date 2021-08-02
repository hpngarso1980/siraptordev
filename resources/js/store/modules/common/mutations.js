import {
  setProfile,
  setProfileStats,
  clearProfile,
  setNotifications,
  setActionPlanStatusOptions,
  setCurrentFilter,
  setData,
  setMeta,
  setRequestState,
  setIsFetched,
  setAssigneeOptions,
} from '@/configs/store/mutation-types';
import simpleMutate from '@/helpers/vuex-helpers/simple-mutate';
import mutateGroupedState from '@/helpers/vuex-helpers/mutate-grouped-state';

export default {
  [setProfile]: simpleMutate('profile'),
  [setProfileStats]: simpleMutate('profileStats'),
  [setNotifications]: simpleMutate('notifications'),
  [setActionPlanStatusOptions]: simpleMutate('actionPlanStatusOptions'),
  [setAssigneeOptions]: simpleMutate('assigneeOptions'),

  [clearProfile](state) {
    state.profile = null; // eslint-disable-line
  },

  [setCurrentFilter]: mutateGroupedState('currentFilter'),
  [setData]: mutateGroupedState('data'),
  [setMeta]: mutateGroupedState('meta'),
  [setRequestState]: mutateGroupedState('requestState'),
  [setIsFetched]: mutateGroupedState('isFetched'),
};
