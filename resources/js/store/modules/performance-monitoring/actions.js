import api from '@/api'
import {
  getAssessments,
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getIndicators,
  syncIndicators,
  getSummaries,
  setLatestFilter,
  updateAssessment,
  getActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  getActionPlanHistories,
} from '@/configs/store/action-types'
import {
  setDetail,
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

export default {
  [getTemplates]({ commit }, page) {
    return api.getPerformanceMonitoringTemplates(page)
      .then(({ data }) => {
        commit(setTemplates, data.data);
        commit(setTemplatesMeta, data.meta);
      });
  },

  [getTemplate]({ commit }, id) {
    return api.getPerformanceMonitoringTemplate(id)
      .then(({ data }) => {
        commit(setTemplate, data.data);
      });
  },

  [createTemplate]({ dispatch }, template) {
    return api.createPerformanceMonitoringTemplate(template)
      .then(() => dispatch(getTemplates));
  },

  [updateTemplate]({ commit, state }, template) {
    return api.updatePerformanceMonitoringTemplate(template.id, template)
      .then(({ data }) => {
        const updatedtemplate = data.data;
        const templates = state.templates.map(template => {
          if (template.id === updatedtemplate.id) {
            return updatedtemplate;
          } else {
            return template;
          }
        });

        commit(setTemplates, templates);
      });
  },

  [deleteTemplate]({ dispatch }, id) {
    return api.deletePerformanceMonitoringTemplate(id)
      .then(() => dispatch(getTemplates));
  },

  [getIndicators]({ commit }, templateId) {
    return api.getPerformanceMonitoringIndicators(templateId)
      .then(({ data }) => {
        commit(setIndicators, data.data);
      });
  },

  [syncIndicators]({ dispatch }, { templateId, indicators, deleted }) {
    return api.syncPerformanceMonitoringIndicators(templateId, indicators, deleted)
      .then(() => dispatch(getIndicators, templateId));
  },

  [getSummaries]({ commit, state }) {
    const { latestFilter } = state
    const filter = {
      month: latestFilter.month,
      cumulative: latestFilter.reportType === 'cumulative',
      template_id: latestFilter.template_id,
    }

    return api.getPerformanceMonitoringSummaries(filter)
      .then(({ data }) => {
        commit(setSummaries, data.data)
      })
  },

  [getAssessments]({ commit }, filter) {
    return api.getPerformanceMonitoringAssessments(filter)
      .then(({ data }) => {
        commit(setDetail, data.data)
      })
  },

  [setLatestFilter]({ commit }, filter) {
    commit(setLatestFilter, filter)
  },

  async [updateAssessment]({ commit }, assessment) {
    const updatedAssessment = await api.updatePerformanceMonitoringAssessment(assessment)
      .then(({ data }) => data.data)

    return updatedAssessment
  },

  [getActionPlans]({ commit }, page) {
    return api.getPerformanceMonitoringActionPlans(page)
      .then(({ data }) => {
        commit(setActionPlans, data.data);
        commit(setActionPlansMeta, data.meta);
      });
  },

  [createActionPlan]({ dispatch }, actionPlan) {
    return api.createPerformanceMonitoringActionPlan(actionPlan)
      .then(() => dispatch(getActionPlans));
  },

  [updateActionPlan]({ commit, state }, actionPlan) {
    return api.updatePerformanceMonitoringActionPlan(actionPlan.id, actionPlan)
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
      })
  },

  [deleteActionPlan]({ dispatch }, id) {
    return api.deletePerformanceMonitoringActionPlan(id)
      .then(() => dispatch(getActionPlans));
  },

  [getActionPlanHistories]({ commit }, id) {
    commit(setRequestState, {
      key: 'actionPlanHistories',
      value: 'loading',
    });

    return api.getPerformanceMonitoringActionPlanHistories(id)
      .then(({ data }) => {
        commit(setActionPlanHistories, data.data);
        commit(setRequestState, {
          key: 'actionPlanHistories',
          value: 'success',
        });
      });
  },
}
