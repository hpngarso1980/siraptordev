import api from '@/api';
import {
  login,
  logout,
  getProfile,
  getProfileStats,
  updateProfile,
  updatePassword,
  updatePhoto,
  getNotifications,
  markAllNotificationsAsRead,
  getActionPlanStatusOptions,
  getActionPlanCategories,
  createActionPlanCategory,
  updateActionPlanCategory,
  deleteActionPlanCategory,
  getAssigneeOptions,
  getUserRank,
  getRankGroups,
  createRankGroup,
  updateRankGroup,
  deleteRankGroup,
} from '@/configs/store/action-types';
import {
  setProfile,
  setProfileStats,
  setNotifications,
  setActionPlanStatusOptions,
  setAssigneeOptions,
  setData,
  setRequestState,
  setIsFetched,
} from '@/configs/store/mutation-types';
import requestStates from '@/configs/request-states';
import generateAction from '@/helpers/vuex-helpers/generate-action';

export default {
  [login](context, { email, password }) {
    return api.login(email, password);
  },

  [logout]() {
    return api.logout();
  },

  [getProfile]({ commit, dispatch }) {
    return api.getProfile().then((response) => {
      commit(setProfile, response.data.data);

      return dispatch(getProfileStats);
    });
  },

  [getProfileStats]({ commit }) {
    return api.getProfileStats().then((response) => {
      commit(setProfileStats, response.data.data);
    });
  },

  [updateProfile]({ commit }, profile) {
    return api.updateProfile(profile).then((response) => {
      commit(setProfile, response.data.data);
    });
  },

  [updatePassword](context, data) {
    return api.updatePassword(data);
  },

  [updatePhoto]({ dispatch }, file) {
    return api.updatePhoto(file)
      .then(() => dispatch(getProfile));
  },

  [getNotifications]({ commit }) {
    return api.getNotifications()
      .then(({ data }) => {
        commit(setNotifications, data.data);
      });
  },

  [markAllNotificationsAsRead]() {
    return api.markAllNotificationsAsRead();
  },

  [getActionPlanStatusOptions]({ commit }) {
    return api.getActionPlanStatusOptions().then(({ data }) => {
      commit(setActionPlanStatusOptions, data.data);
    });
  },

  [getAssigneeOptions]({ commit }) {
    return api.getAssigneeOptions().then(({ data }) => {
      const assigneeOptions = data.data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));

      commit(setAssigneeOptions, assigneeOptions);
    });
  },

  [getUserRank]({ commit }, filters) {
    commit(setRequestState, {
      key: 'userRank',
      value: requestStates.loading,
    });

    return api.getUserRank({ query: filters }).then(({ data }) => {
      commit(setData, {
        key: 'userRank',
        value: data.data,
      });
      commit(setRequestState, {
        key: 'userRank',
        value: requestStates.success,
      });
    });
  },

  /** Rank Groups */
  [getRankGroups]({ commit, state }, { preventReload = false } = {}) {
    if (preventReload && state.rankGroups.isFetched) return Promise.resolve();

    commit(setRequestState, {
      key: 'rankGroups',
      value: requestStates.loading,
    });

    return api.getRankGroups().then(({ data }) => {
      commit(setData, {
        key: 'rankGroups',
        value: data.data,
      });
      commit(setRequestState, {
        key: 'rankGroups',
        value: requestStates.success,
      });
      commit(setIsFetched, {
        key: 'rankGroups',
        value: true,
      });
    });
  },

  [createRankGroup]: generateAction('create', {
    stateKey: 'rankGroups',
    apiInterface: 'createRankGroup',
    getAllAction: getRankGroups,
  }),

  [updateRankGroup]: generateAction('update', {
    stateKey: 'rankGroups',
    apiInterface: 'updateRankGroup',
  }),

  [deleteRankGroup]: generateAction('delete', {
    stateKey: 'rankGroups',
    apiInterface: 'deleteRankGroup',
    getAllAction: getRankGroups,
  }),

  /** Action Plan Category */
  [getActionPlanCategories]: generateAction('getAll', {
    stateKey: 'actionPlanCategories',
    apiInterface: 'getActionPlanCategories',
  }),

  [createActionPlanCategory]: generateAction('create', {
    stateKey: 'actionPlanCategories',
    apiInterface: 'createActionPlanCategory',
    getAllAction: getActionPlanCategories,
  }),

  [updateActionPlanCategory]: generateAction('update', {
    stateKey: 'actionPlanCategories',
    apiInterface: 'updateActionPlanCategory',
  }),

  [deleteActionPlanCategory]: generateAction('delete', {
    stateKey: 'actionPlanCategories',
    apiInterface: 'deleteActionPlanCategory',
    getAllAction: getActionPlanCategories,
  }),
};
