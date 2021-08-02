import api from '@/api'
import {
  getActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  getProfileStats,
  getActionPlanHistories,
} from '@/configs/store/action-types'
import {
  setActionPlans,
  setMeta,
  setActionPlanHistories,
  setRequestState,
} from '@/configs/store/mutation-types'

export default {
  [getActionPlans]({ commit }, page) {
    return api.getManagementActionPlans(page)
      .then(({ data }) => {
        commit(setActionPlans, data.data);
        commit(setMeta, data.meta);
      });
  },

  [createActionPlan]({ dispatch }, ActionPlan) {
    return api.createManagementActionPlan(ActionPlan)
      .then(() => {
        dispatch(getActionPlans);
        dispatch(`common/${getProfileStats}`, null, { root: true });
      });
  },

  [updateActionPlan]({ commit, dispatch, state }, ActionPlan) {
    return api.updateManagementActionPlan(ActionPlan.id, ActionPlan)
      .then(({ data }) => {
        const updatedActionPlan = data.data;
        const actionPlans = state.actionPlans.map(actionPlan => {
          if (actionPlan.id === updatedActionPlan.id) {
            return updatedActionPlan;
          } else {
            return actionPlan;
          }
        });

        commit(setActionPlans, actionPlans);
        dispatch(`common/${getProfileStats}`, null, { root: true });
      })
  },

  [deleteActionPlan]({ dispatch }, id) {
    return api.deleteManagementActionPlan(id)
      .then(() => {
        dispatch(getActionPlans);
        dispatch(`common/${getProfileStats}`, null, { root: true });
      });
  },

  [getActionPlanHistories]({ commit }, id) {
    commit(setRequestState, {
      key: 'actionPlanHistories',
      value: 'loading',
    });

    return api.getManagementActionPlanHistories(id)
      .then(({ data }) => {
        commit(setActionPlanHistories, data.data);
        commit(setRequestState, {
          key: 'actionPlanHistories',
          value: 'success',
        });
      });
  },
}
