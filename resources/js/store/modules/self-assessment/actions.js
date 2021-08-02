import api from '@/api';
import generateAction from '@/helpers/vuex-helpers/generate-action';
import {
  getActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  getActionPlanHistories,
  getStreams,
  createStream,
  updateStream,
  deleteStream,
  getAreaGroups,
  createAreaGroup,
  updateAreaGroup,
  deleteAreaGroup,
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  getSubAreas,
  createSubArea,
  updateSubArea,
  deleteSubArea,
  getCriteria,
  createCriterion,
  updateCriterion,
  deleteCriterion,
  createProject,
  getSummary,
  getRank,
} from '@/configs/store/action-types';
import {
  setActionPlans,
  setActionPlansMeta,
  setActionPlanHistories,

  setData,
  setRequestState,
} from '@/configs/store/mutation-types';
import requestStates from '@/configs/request-states';

export default {
  /** Action Plans */
  [getActionPlans]({ commit }, page) {
    return api.getSelfAssessmentActionPlans(page)
      .then(({ data }) => {
        commit(setActionPlans, data.data);
        commit(setActionPlansMeta, data.meta);
      });
  },

  [createActionPlan]({ dispatch }, actionPlan) {
    return api.createSelfAssessmentActionPlan(actionPlan)
      .then(() => dispatch(getActionPlans));
  },

  [updateActionPlan]({ commit, state }, actionPlan) {
    return api.updateSelfAssessmentActionPlan(actionPlan.id, actionPlan)
      .then(({ data }) => {
        const updatedActionPlan = data.data;
        const actionPlans = state.actionPlans.map((item) => {
          if (item.id === updatedActionPlan.id) {
            return updatedActionPlan;
          }
          return item;
        });

        commit(setActionPlans, actionPlans);
      });
  },

  [deleteActionPlan]({ dispatch }, id) {
    return api.deleteSelfAssessmentActionPlan(id)
      .then(() => dispatch(getActionPlans));
  },

  [getActionPlanHistories]({ commit }, id) {
    commit(setRequestState, {
      key: 'actionPlanHistories',
      value: 'loading',
    });

    return api.getSelfAssessmentActionPlanHistories(id)
      .then(({ data }) => {
        commit(setActionPlanHistories, data.data);
        commit(setRequestState, {
          key: 'actionPlanHistories',
          value: 'success',
        });
      });
  },

  /** Streams */
  [getStreams]: generateAction('getAll', {
    stateKey: 'streams',
    apiInterface: 'getSelfAssessmentStreams',
  }),

  [createStream]: generateAction('create', {
    stateKey: 'streams',
    apiInterface: 'createSelfAssessmentStream',
    getAllAction: getStreams,
  }),

  [updateStream]: generateAction('update', {
    stateKey: 'streams',
    apiInterface: 'updateSelfAssessmentStream',
  }),

  [deleteStream]: generateAction('delete', {
    stateKey: 'streams',
    apiInterface: 'deleteSelfAssessmentStream',
    getAllAction: getStreams,
  }),

  /** Area Groups */
  [getAreaGroups]: generateAction('getAll', {
    stateKey: 'areaGroups',
    apiInterface: 'getSelfAssessmentAreaGroups',
  }),

  [createAreaGroup]: generateAction('create', {
    stateKey: 'areaGroups',
    apiInterface: 'createSelfAssessmentAreaGroup',
    getAllAction: getAreaGroups,
  }),

  [updateAreaGroup]: generateAction('update', {
    stateKey: 'areaGroups',
    apiInterface: 'updateSelfAssessmentAreaGroup',
  }),

  [deleteAreaGroup]: generateAction('delete', {
    stateKey: 'areaGroups',
    apiInterface: 'deleteSelfAssessmentAreaGroup',
    getAllAction: getAreas,
  }),

  /** Areas */
  [getAreas]: generateAction('getAll', {
    stateKey: 'areas',
    apiInterface: 'getSelfAssessmentAreas',
  }),

  [createArea]: generateAction('create', {
    stateKey: 'areas',
    apiInterface: 'createSelfAssessmentArea',
    getAllAction: getAreas,
  }),

  [updateArea]: generateAction('update', {
    stateKey: 'areas',
    apiInterface: 'updateSelfAssessmentArea',
  }),

  [deleteArea]: generateAction('delete', {
    stateKey: 'areas',
    apiInterface: 'deleteSelfAssessmentArea',
    getAllAction: getAreas,
  }),

  /** Sub Areas */
  [getSubAreas]: generateAction('getAll', {
    stateKey: 'subAreas',
    apiInterface: 'getSelfAssessmentSubAreas',
  }),

  [createSubArea]: generateAction('create', {
    stateKey: 'subAreas',
    apiInterface: 'createSelfAssessmentSubArea',
    getAllAction: getSubAreas,
  }),

  [updateSubArea]: generateAction('update', {
    stateKey: 'subAreas',
    apiInterface: 'updateSelfAssessmentSubArea',
  }),

  [deleteSubArea]: generateAction('delete', {
    stateKey: 'subAreas',
    apiInterface: 'deleteSelfAssessmentSubArea',
    getAllAction: getSubAreas,
  }),

  /** Criteria */
  [getCriteria]: generateAction('getAll', {
    stateKey: 'criteria',
    apiInterface: 'getSelfAssessmentCriteria',
  }),

  [createCriterion]: generateAction('create', {
    stateKey: 'criteria',
    apiInterface: 'createSelfAssessmentCriterion',
    getAllAction: getCriteria,
  }),

  [updateCriterion]: generateAction('update', {
    stateKey: 'criteria',
    apiInterface: 'updateSelfAssessmentCriterion',
  }),

  [deleteCriterion]: generateAction('delete', {
    stateKey: 'criteria',
    apiInterface: 'deleteSelfAssessmentCriterion',
    getAllAction: getCriteria,
  }),

  /** Project */
  [createProject]({ dispatch }, data) {
    return api.createSelfAssessmentProject(data)
      .then(() => {
        dispatch('epics/getEpics', null, { root: true });
      });
  },

  [getSummary]({ commit }, epicId) {
    commit(setRequestState, {
      key: 'summary',
      value: requestStates.loading,
    });

    return api.getSelfAssessmentProjectSummary(epicId)
      .then(({ data }) => {
        commit(setData, {
          key: 'summary',
          value: data.data,
        });
        commit(setRequestState, {
          key: 'summary',
          value: requestStates.success,
        });
      });
  },

  [getRank]({ commit }, { type, epicId }) {
    commit(setRequestState, {
      key: `rank.${type}`,
      value: requestStates.loading,
    });

    return api.getSelfAssessmentRank(type, epicId)
      .then(({ data }) => {
        commit(setData, {
          key: `rank.${type}`,
          value: data.data,
        });
        commit(setRequestState, {
          key: `rank.${type}`,
          value: requestStates.success,
        });
      });
  },
};
