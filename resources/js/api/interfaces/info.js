import generateInterface from '@/helpers/request-helpers/generate-interface';
import createUrl from './create-url';

const createInfoUrl = (path) => createUrl(`/info${path}`);
const actionPlanCategoriesUrl = createUrl('/action-plan-categories');
const rankGroupsUrl = createUrl('/rank-groups');

export default {
  getActionPlanStatusOptions() {
    return this.get(createInfoUrl('/action-plan-status'));
  },

  getAssigneeOptions() {
    return this.get(createUrl('/users'));
  },

  getUserRank: generateInterface('getAll', createUrl('/users/rank')),

  /** Rank Groups */
  getRankGroups: generateInterface('getAll', rankGroupsUrl),
  createRankGroup: generateInterface('create', rankGroupsUrl),
  updateRankGroup: generateInterface('update', rankGroupsUrl),
  deleteRankGroup: generateInterface('delete', rankGroupsUrl),

  /** Action Plan Category */
  getActionPlanCategories: generateInterface('getAll', actionPlanCategoriesUrl),
  createActionPlanCategory: generateInterface('create', actionPlanCategoriesUrl),
  updateActionPlanCategory: generateInterface('update', actionPlanCategoriesUrl),
  deleteActionPlanCategory: generateInterface('delete', actionPlanCategoriesUrl),
};
