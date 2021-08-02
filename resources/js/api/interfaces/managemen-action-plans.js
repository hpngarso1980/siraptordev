import queryString from 'query-string';
import createUrl from './create-url';

const actionPlanUrl = createUrl('/management-action-plans');

export default {
  getManagementActionPlans(page = 1) {
    const query = queryString.stringify({ page });

    return this.get(`${actionPlanUrl}?${query}`);
  },

  createManagementActionPlan(actionPlan) {
    return this.post(actionPlanUrl, actionPlan);
  },

  updateManagementActionPlan(id, actionPlan) {
    return this.patch(`${actionPlanUrl}/${id}`, actionPlan);
  },

  deleteManagementActionPlan(id) {
    return this.delete(`${actionPlanUrl}/${id}`);
  },

  getManagementActionPlanHistories(id) {
    return this.get(`${actionPlanUrl}/${id}/histories`);
  },
};
