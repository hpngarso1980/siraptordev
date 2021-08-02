import queryString from 'query-string';
import createUrl from './create-url';

const createPerfMonitoringUrl = (path = '') => createUrl(`/performance-monitoring${path}`);
const createTemplateUrl = (path = '') => createPerfMonitoringUrl(`/templates${path}`);
const createIndicatorUrl = templateId => createTemplateUrl(`/${templateId}/indicators`);
const actionPlanUrl = createPerfMonitoringUrl('/action-plans');

export default {
  getPerformanceMonitoringTemplates() {
    return this.get(createTemplateUrl());
  },

  getPerformanceMonitoringTemplate(id) {
    return this.get(createTemplateUrl(`/${id}`));
  },

  createPerformanceMonitoringTemplate(template) {
    return this.post(createTemplateUrl(), template);
  },

  updatePerformanceMonitoringTemplate(id, template) {
    return this.patch(createTemplateUrl(`/${id}`), template);
  },

  deletePerformanceMonitoringTemplate(id) {
    return this.delete(createTemplateUrl(`/${id}`));
  },

  getPerformanceMonitoringIndicators(templateId) {
    return this.get(createIndicatorUrl(templateId));
  },

  syncPerformanceMonitoringIndicators(templateId, indicators = [], deleted = []) {
    const payload = {
      indicators,
      deleted,
    };

    return this.post(createIndicatorUrl(templateId), payload);
  },

  getPerformanceMonitoringSummaries(filter) {
    return this.get(createPerfMonitoringUrl('/assessments/summaries'), {
      params: filter,
    })
  },

  getPerformanceMonitoringAssessments(filter) {
    return this.get(createPerfMonitoringUrl('/assessments'), {
      params: filter,
    })
  },

  updatePerformanceMonitoringAssessment(assessment) {
    return this.post(createPerfMonitoringUrl('/assessments'), assessment)
  },

  getPerformanceMonitoringActionPlans(page = 1) {
    const query = queryString.stringify({ page });

    return this.get(`${actionPlanUrl}?${query}`);
  },

  createPerformanceMonitoringActionPlan(actionPlan) {
    return this.post(actionPlanUrl, actionPlan);
  },

  updatePerformanceMonitoringActionPlan(id, actionPlan) {
    return this.patch(`${actionPlanUrl}/${id}`, actionPlan);
  },

  deletePerformanceMonitoringActionPlan(id) {
    return this.delete(`${actionPlanUrl}/${id}`);
  },

  getPerformanceMonitoringActionPlanHistories(id) {
    return this.get(`${actionPlanUrl}/${id}/histories`);
  },
}
