import queryString from 'query-string';
import generateInterface from '@/helpers/request-helpers/generate-interface';

import createUrl from './create-url';

const createSelfAssessmentUrl = (path = '') => createUrl(`/self-assessment${path}`);
const actionPlanUrl = createSelfAssessmentUrl('/action-plans');
const areaGroupUrl = createSelfAssessmentUrl('/area-groups');
const areaUrl = createSelfAssessmentUrl('/areas');
const criteriaUrl = createSelfAssessmentUrl('/criteria');
const streamUrl = createSelfAssessmentUrl('/streams');
const subAreaUrl = createSelfAssessmentUrl('/sub-areas');
const projectUrl = createSelfAssessmentUrl('/projects');

export default {
  /** Action Plans */
  getSelfAssessmentActionPlans(page = 1) {
    const query = queryString.stringify({ page });

    return this.get(`${actionPlanUrl}?${query}`);
  },

  createSelfAssessmentActionPlan(actionPlan) {
    return this.post(actionPlanUrl, actionPlan);
  },

  updateSelfAssessmentActionPlan(id, actionPlan) {
    return this.patch(`${actionPlanUrl}/${id}`, actionPlan);
  },

  deleteSelfAssessmentActionPlan(id) {
    return this.delete(`${actionPlanUrl}/${id}`);
  },

  getSelfAssessmentActionPlanHistories(id) {
    return this.get(`${actionPlanUrl}/${id}/histories`);
  },

  /** Streams */
  getSelfAssessmentStreams: generateInterface('getAll', streamUrl),
  createSelfAssessmentStream: generateInterface('create', streamUrl),
  updateSelfAssessmentStream: generateInterface('update', streamUrl),
  deleteSelfAssessmentStream: generateInterface('delete', streamUrl),

  /** Area Group */
  getSelfAssessmentAreaGroups: generateInterface('getAll', areaGroupUrl),
  createSelfAssessmentAreaGroup: generateInterface('create', areaGroupUrl),
  updateSelfAssessmentAreaGroup: generateInterface('update', areaGroupUrl),
  deleteSelfAssessmentAreaGroup: generateInterface('delete', areaGroupUrl),

  /** Area */
  getSelfAssessmentAreas: generateInterface('getAll', areaUrl),
  createSelfAssessmentArea: generateInterface('create', areaUrl),
  updateSelfAssessmentArea: generateInterface('update', areaUrl),
  deleteSelfAssessmentArea: generateInterface('delete', areaUrl),

  /** Sub Area */
  getSelfAssessmentSubAreas: generateInterface('getAll', subAreaUrl),
  createSelfAssessmentSubArea: generateInterface('create', subAreaUrl),
  updateSelfAssessmentSubArea: generateInterface('update', subAreaUrl),
  deleteSelfAssessmentSubArea: generateInterface('delete', subAreaUrl),

  /** Criteria */
  getSelfAssessmentCriteria: generateInterface('getAll', criteriaUrl),
  createSelfAssessmentCriterion: generateInterface('create', criteriaUrl),
  updateSelfAssessmentCriterion: generateInterface('update', criteriaUrl),
  deleteSelfAssessmentCriterion: generateInterface('delete', criteriaUrl),

  /** Projects */
  createSelfAssessmentProject: generateInterface('create', projectUrl),
  getSelfAssessmentProjectSummary(epicId) {
    return this.get(`${projectUrl}/summary?epic_id=${epicId}`);
  },
  getSelfAssessmentRank(type, epicId) {
    return this.get(`${projectUrl}/${type}-rank?epic_id=${epicId}`);
  },
};
